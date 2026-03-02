import { useState, useEffect } from "react";
import Dashboard from "./screens/Dashboard";
import RunTests from "./screens/RunTests";
import Results from "./screens/Results";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import "./App.css";
import History from "./screens/History";

// Añadimos "history" a los tipos de pantalla por si quieres navegar allí luego
type Screen = "dashboard" | "run" | "results" | "history";

type Project = {
  name: string;
  path: string;
};

function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [logs, setLogs] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LÓGICA DE PERSISTENCIA ---
  const persistExecution = async (parsedJson: any) => {
    if (!selectedProject) return;

    try {
      // 1. Extraer métricas del JSON de Playwright
      // Recorremos las suites y specs para contar resultados
      let total = 0;
      let passed = 0;
      let namesArray: string[] = [];

      parsedJson.suites?.forEach((suite: any) => {
        suite.specs?.forEach((spec: any) => {
          total++;
          // Verificamos el estado del primer resultado del test
          namesArray.push(spec.title);
          if (spec.tests?.[0]?.results?.[0]?.status === "passed") {
            passed++;
          }
        });
        // Si hay suites anidadas (describe)
        suite.suites?.forEach((subSuite: any) => {
            subSuite.specs?.forEach((spec: any) => {
                total++;
                namesArray.push(spec.title);
                if (spec.tests?.[0]?.results?.[0]?.status === "passed") {
                  passed++;
                }
            });
        });
      });

      const failed = total - passed;
      const durationMs = parsedJson.stats?.duration || 0;

      // 2. Invocar el comando de Rust para guardar en SQLite
      await invoke("save_test_execution", {
        projectName: selectedProject.name,
        projectPath: selectedProject.path,
        testNames: namesArray.join(", "),
        totalTests: total,
        passed: passed,
        failed: failed,
        duration: durationMs / 1000, // Guardamos en segundos para legibilidad
      });

      console.log("📊 Ejecución persistida en base de datos correctamente.");
    } catch (e) {
      console.error("❌ Error al persistir datos:", e);
    }
  };

  const executeTests = async (config: { grep: string; browser: string }) => {
    if (!selectedProject) return;

    setLogs("");
    setError(null);
    setIsRunning(true);

    try {
      console.log("Project path:", selectedProject.path);
      await invoke<any>("run_playwright_tests", {
        projectPath: selectedProject.path,
        grep: config.grep,
        browser: config.browser,
      });
    } catch (error) {
      setError(String(error));
      setIsRunning(false);
    }
  };

  const cancelExecution = async () => {
    try {
      await invoke("cancel_tests");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unlistenOutput = listen<string>("test-output", (event) => {
      setLogs((prev) => prev + event.payload + "\n");
    });

    const unlistenError = listen<string>("test-error", (event) => {
      setError(event.payload);
      setIsRunning(false);
    });

    const unlistenFinished = listen<string>("test-finished", (event) => {
      setIsRunning(false);
      const json = event.payload;

      if (json && json.length > 0) {
        try {
          const parsed = JSON.parse(json);
          setExecutionResult(parsed);
          
          // LLAMADA A LA PERSISTENCIA:
          // Guardamos los datos automáticamente al terminar
          persistExecution(parsed);
          
        } catch (e) {
          console.error("Error parseando JSON de resultados:", e);
        }
      }

      setScreen("results");
    });

    return () => {
      unlistenOutput.then((fn) => fn());
      unlistenFinished.then((fn) => fn());
      unlistenError.then((fn) => fn());
    };
  }, [selectedProject]); // Escuchamos cambios en el proyecto seleccionado para la persistencia

  const renderRunScreen = () => {
    if (!selectedProject) {
      return <div>Cargando proyecto...</div>;
    }

    return (
      <RunTests
        project={selectedProject}
        onExecute={executeTests}
        logs={logs}
        isRunning={isRunning}
        onCancel={cancelExecution}
        onBack={() => {
          setScreen('dashboard');
          setSelectedProject(null);
          setLogs('');
        }}
      />
    );
  };

  return (
    <div className="app-container">
      {/* Botón opcional para volver al dashboard si ocurre un error */}
      {error && (
        <div style={{ background: "#f8d7da", color: "#721c24", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
          <strong>⚠️ Error:</strong> {error}
          <button onClick={() => setError(null)} style={{ marginLeft: "10px" }}>Limpiar</button>
        </div>
      )}

      {screen === "dashboard" && (
        <Dashboard
          onSelectProject={(project) => {
            console.log("📥 Recibido en App:", project);
            setSelectedProject(project);
            setScreen("run");
          }}
          onGoToHistory={() => setScreen("history")}
        />
      )}

      {screen === "history" && (
        <History onBack={() => setScreen("dashboard")} />
      )}

      {screen === "run" && renderRunScreen()}

      {screen === "results" && executionResult && (
        <Results
          results={executionResult}
          logs={logs}
          projectPath={selectedProject?.path || ""}
          onRetry={() => {
            setExecutionResult(null);
            setScreen("run");
          }}
          onOpenReport={async () => {
            await invoke("open_html_report");
          }}
        />
      )}
    </div>
  );
}

export default App;