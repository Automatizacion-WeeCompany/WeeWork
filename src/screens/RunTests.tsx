import { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from "@tauri-apps/api/event";

// --- Tipos para el Health Check ---
type HealthStatus = {
  node_installed: boolean;
  node_modules_exists: boolean;
  playwright_browsers_installed: boolean;
  project_ready: boolean;
};

type TestItem = {
  id: string;
  name: string;
};

type Suite = {
  suite: string;
  tests: TestItem[];
};

type SelectedTests = {
  [suite: string]: string[];
};

type Props = {
  project: {
    name: string;
    path: string;
  };
  onExecute: (config: { grep: string; browser: string }) => void;
  logs: string;
  isRunning: boolean;
  onCancel: () => void;
  onBack: () => void;
};

export default function RunTests({ project, onExecute, logs, isRunning, onCancel, onBack }: Props) {
  const [suites, setSuites] = useState<Suite[]>([]);
  const [selected, setSelected] = useState<SelectedTests>({});
  const [browser, setBrowser] = useState("Chromium");

  // --- Estados del Health Check ---
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairMessage, setRepairMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Control de carga inicial

  // Ref para manejar la limpieza del listener de forma segura
  const unlistenRef = useRef<UnlistenFn | null>(null);

  useEffect(() => {
    if (!project?.path) return;

    let isMounted = true;

    const initialize = async () => {
      setIsLoading(true);
      try {
        // Ejecutamos ambas llamadas en paralelo para evitar múltiples re-renders
        const [healthRes, testsRes] = await Promise.all([
          invoke<HealthStatus>("check_environment", { projectPath: project.path }),
          invoke<Suite[]>("list_playwright_tests", { projectPath: project.path })
        ]);

        if (!isMounted) return;

        // Mapeo seguro para evitar crash si el backend devuelve algo inesperado
        const mapped: Suite[] = (testsRes || []).map((s: any) => ({
          suite: s.suite || "Sin suite",
          tests: (s.tests || []).map((t: any) => ({
            id: t.id,
            name: t.name
          }))
        }));

        setHealth(healthRes);
        setSuites(mapped);
      } catch (error) {
        console.error("Error inicializando RunTests:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Configuración de Listeners
    const setupListeners = async () => {
      const u1 = await listen("repair-status", (event) => {
        if (isMounted) setRepairMessage(event.payload as string);
      });

      const u2 = await listen("repair-finished", (event) => {
        if (isMounted) {
          setRepairMessage(event.payload as string);
          setIsRepairing(false);
          checkEnv(); 
        }
      });

      unlistenRef.current = () => {
        u1();
        u2();
      };
    };

    initialize();
    setupListeners();

    return () => {
      isMounted = false;
      if (unlistenRef.current) unlistenRef.current();
    };
  }, [project.path]);

  const checkEnv = async () => {
    if (!project?.path) return;
    try {
      const status = await invoke<HealthStatus>("check_environment", { 
        projectPath: project.path 
      });
      setHealth(status);
    } catch (error) {
      console.error("Error en health check:", error);
    }
  };

  const handleRepair = async () => {
    try {
      setIsRepairing(true);
      setRepairMessage("Iniciando reparación...");
      await invoke("repair_environment", { projectPath: project.path });
    } catch (error) {
      alert("Error al reparar: " + error);
      setIsRepairing(false);
    }
  };

  const toggleTest = (suite: string, testId: string) => {
    setSelected((prev) => {
      const tests = prev[suite] || [];
      return {
        ...prev,
        [suite]: tests.includes(testId)
          ? tests.filter((t) => t !== testId)
          : [...tests, testId]
      };
    });
  };

  const handleExecute = async () => {
    const allSelectedRaw = Object.values(selected).flat();
    if (allSelectedRaw.length === 0) {
      alert("Selecciona al menos una prueba");
      return;
    }

    const cleanIds = allSelectedRaw.map(id => {
      const match = id.match(/ESC_\d+/);
      return match ? match[0] : id;
    });

    const grepPattern = Array.from(new Set(cleanIds)).join("|");
    onExecute({ grep: grepPattern, browser });
  };

  // --- RENDERIZADO DE CARGA PARA EVITAR CRASH ---
  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
        <h3>🔍 Validando configuración...</h3>
        <p>Escaneando archivos en {project.name}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      <button onClick={onBack} disabled={isRunning} style={{ marginBottom: "15px" }}>⬅️ Volver al Dashboard</button>
      
      {/* --- CARD DE ESTADO DE SALUD (HEALTH CHECK) --- */}
      <div style={{ 
        background: "#1e1e1e", 
        color: "white", 
        padding: "15px", 
        borderRadius: "8px", 
        marginBottom: "20px",
        border: health?.project_ready ? "1px solid #2e7d32" : "1px solid #d32f2f"
      }}>
        <h4 style={{ margin: "0 0 10px 0" }}>🛠 Validación del Proyecto</h4>
        <div style={{ display: "flex", gap: "15px", fontSize: "0.85rem", marginBottom: "10px" }}>
          <span style={{ color: health?.node_installed ? "#4caf50" : "#f44336" }}>
            {health?.node_installed ? "● Node.js OK" : "○ Node.js no encontrado"}
          </span>
          <span style={{ color: health?.node_modules_exists ? "#4caf50" : "#f44336" }}>
            {health?.node_modules_exists ? "● Dependencias OK" : "○ node_modules ausente"}
          </span>
          <span style={{ color: health?.playwright_browsers_installed ? "#4caf50" : "#f44336" }}>
            {health?.playwright_browsers_installed ? "● Navegadores OK" : "○ Faltan Navegadores"}
          </span>
        </div>

        {!health?.project_ready && !isRepairing && (
          <button 
            onClick={handleRepair}
            style={{ 
              background: "#d32f2f", 
              color: "white", 
              border: "none", 
              padding: "8px 12px", 
              borderRadius: "4px", 
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🔧 Reparar Entorno Automáticamente
          </button>
        )}

        {isRepairing && (
          <div style={{ color: "#ff9800", fontWeight: "bold" }}>
            ⏳ {repairMessage}...
          </div>
        )}
      </div>

      <h2>Flujos del proyecto: {project?.name}</h2>

      <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #444", padding: "10px", borderRadius: "5px" }}>
        {suites.length === 0 ? (
           <p style={{ color: "#888" }}>No se encontraron archivos de prueba.</p>
        ) : suites.map((s) => (
          <div key={s.suite} style={{ marginBottom: "15px" }}>
            <h3 style={{ borderBottom: "1px solid #444" }}>{s.suite}</h3>
            {s.tests.map((t) => (
              <label key={t.id} style={{ display: "block", padding: "4px 0", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={selected[s.suite]?.includes(t.id) || false}
                  onChange={() => toggleTest(s.suite, t.id)}
                />
                {" "}{t.name}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: "10px" }}>
        <label htmlFor="browser-select"><b>Navegador:</b></label>
        <select
          id="browser-select"
          value={browser}
          onChange={(e) => setBrowser(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="Chromium">Chrome</option>
          <option value="Firefox">Firefox</option>
        </select>
      </div>

      <div style={{ marginTop: 20 }}>
        <button 
          style={{ 
            padding: "10px 25px", 
            fontSize: "1rem", 
            cursor: (isRunning || !health?.project_ready) ? "not-allowed" : "pointer",
            background: (isRunning || !health?.project_ready) ? "#555" : "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }} 
          disabled={isRunning || !health?.project_ready}
          onClick={handleExecute}
        >
          {isRunning ? "🚀 Ejecutando..." : health?.project_ready ? "▶ Ejecutar pruebas" : "⚠️ Entorno no listo"}
        </button>

        {isRunning && (
          <button
            style={{ marginLeft: 10, padding: "10px", background: "#d32f2f", color: "white", border: "none", borderRadius: "5px" }}
            onClick={onCancel}
          >
            ⛔ Cancelar
          </button>
        )}
      </div>

      <div style={{ 
        marginTop: 20, 
        background: "#111", 
        color: "#0f0", 
        padding: "10px", 
        height: "200px", 
        overflowY: "auto", 
        fontFamily: "monospace",
        fontSize: "0.85rem",
        borderRadius: "5px",
        border: "1px solid #333"
      }}>
        <pre style={{ margin: 0 }}>{logs || "> Esperando ejecución..."}</pre>
      </div>
    </div>
  );
}