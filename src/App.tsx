import { useState, useEffect } from "react";
import Dashboard from "./screens/Dashboard";
import RunTests from "./screens/RunTests";
import Results from "./screens/Results";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import "./App.css";
import History from "./screens/History";
import Login from "./screens/Login";
import logoW from "../src-tauri/icons/W.png";

// Definición de tipos
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
  
  // Estado de seguridad y roles
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "viewer" | null>(null);

  // --- LÓGICA DE PERSISTENCIA ---
  const persistExecution = async (parsedJson: any) => {
    if (!selectedProject) return;

    try {
      const agg = { total: 0, passed: 0, names: [] as string[] };

      const walkSuites = (suite: any) => {
        suite?.specs?.forEach((spec: any) => {
          agg.total += 1;
          agg.names.push(spec.title);
          const anyPassed = spec.tests?.some((t: any) =>
            t.results?.some((r: any) => r.status === "passed")
          );
          if (anyPassed) agg.passed += 1;
        });
        suite?.suites?.forEach((child: any) => walkSuites(child));
      };

      parsedJson?.suites?.forEach((suite: any) => walkSuites(suite));

      const failed = agg.total - agg.passed;
      const durationMs = parsedJson.stats?.duration || 0;

      await invoke("save_test_execution", {
        projectName: selectedProject.name,
        projectPath: selectedProject.path,
        testNames: agg.names.join(", "),
        totalTests: agg.total,
        passed: agg.passed,
        failed: failed,
        duration: durationMs / 1000,
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
      setIsRunning(false);
    } catch (e) {
      console.error("Error al cancelar", e);
      setIsRunning(false);
    }
  };

  // Escuchadores de eventos de Tauri
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
  }, [selectedProject]);

  const renderRunScreen = () => {
    if (!selectedProject) {
      return <div>Cargando proyecto...</div>;
    }

    return (
      <RunTests
        project={selectedProject}
        userRole={userRole} // Enviamos el rol para controlar permisos de edición de Excel
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

  // --- RENDERIZADO CONDICIONAL DE SEGURIDAD ---
  if (!isAuthenticated) {
    return (
      <Login 
        onLoginSuccess={(role: string) => {
          setIsAuthenticated(true);
          setUserRole(role as "admin" | "viewer");
        }}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="corner-logo" aria-hidden="true">
        <img src={logoW} alt="WeeBot" />
      </div>
      {/* Alerta de Error Global */}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span><strong>⚠️ Error:</strong> {error}</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setError(null)}>Limpiar</button>
        </div>
      )}

      {/* Navegación de Pantallas */}
      {screen === "dashboard" && (
        <Dashboard
          userRole={userRole}
          onSelectProject={(project) => {
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
