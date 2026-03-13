import { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { open as openDialog, confirm } from "@tauri-apps/plugin-dialog";

// --- Tipos ---
type HealthStatus = {
  node_installed: boolean;
  node_modules_exists: boolean;
  playwright_browsers_installed: boolean;
  project_ready: boolean;
};

type TestItem = { id: string; name: string; };
type Suite = { suite: string; tests: TestItem[]; };

type Props = {
  project: { name: string; path: string; };
  userRole: "admin" | "viewer" | null;
  onExecute: (config: { grep: string; browser: string }) => void;
  logs: string;
  isRunning: boolean;
  onCancel: () => void;
  onBack: () => void;
};

export default function RunTests({ project, userRole, onExecute, logs, isRunning, onCancel, onBack }: Props) {
  const [suites, setSuites] = useState<Suite[]>([]);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [browser, setBrowser] = useState("Chromium");
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairMessage, setRepairMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [wasCancelled, setWasCancelled] = useState(false);
  const unlistenRef = useRef<UnlistenFn | null>(null);

  // --- CONFIGURACIÓN ESCALABLE ---
  const MAX_SELECTED_TESTS = Number(import.meta.env.VITE_MAX_SELECTED_TESTS) || 2;

  const initializeData = async (isMounted: boolean) => {
    if (isMounted) setIsLoading(true);
    try {
      const [healthRes, testsRes] = await Promise.all([
        invoke<HealthStatus>("check_environment", { projectPath: project.path }),
        invoke<Suite[]>("list_playwright_tests", { projectPath: project.path })
      ]);

      if (!isMounted) return;
      setHealth(healthRes);
      setSuites((testsRes || []).map((s: any) => ({
        suite: s.suite || "Sin suite",
        tests: (s.tests || []).map((t: any) => ({ id: t.id, name: t.name }))
      })));
    } catch (error) {
      console.error("Error inicializando:", error);
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!project?.path) return;
    let isMounted = true;

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
      const u3 = await listen("test-cancelled", () => {
        if (isMounted) setWasCancelled(true);
      });
      const u4 = await listen("test-finished", () => {
        if (isMounted) setWasCancelled(false);
      });

      unlistenRef.current = () => { u1(); u2(); u3(); u4(); };
    };

    initializeData(isMounted);
    setupListeners();
    return () => { isMounted = false; if (unlistenRef.current) unlistenRef.current(); };
  }, [project.path]);

  const checkEnv = async () => {
    if (!project?.path) return;
    const status = await invoke<HealthStatus>("check_environment", { projectPath: project.path });
    setHealth(status);
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

  const handleReplaceExcel = async () => {
    try {
      const isConfirmed = await confirm(
        "ADVERTENCIA IMPORTANTE\n\nReemplazar el archivo Excel base modificará los datos y flujos de prueba para este proyecto. Un archivo con formato incorrecto o columnas faltantes podría causar que las automatizaciones fallen.\n\nEsta acción es bajo tu responsabilidad.\n\n¿Estás seguro de que deseas continuar y seleccionar un nuevo archivo?",
        { title: 'Confirmar reemplazo de Matriz', kind: 'warning' }
      );
      if (!isConfirmed) return; 

      const selectedFile = await openDialog({
        multiple: false,
        filters: [{ name: 'Excel', extensions: ['xlsx'] }]
      });

      if (selectedFile) {
        setIsUploading(true);
        const result = await invoke("replace_excel_file", { 
          projectPath: project.path, 
          sourcePath: selectedFile,
          role: userRole
        });
        alert("✅ " + result);
        await initializeData(true);
      }
    } catch (error) {
      alert("Error al reemplazar el archivo: " + error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInternalCancel = () => {
    setWasCancelled(true);
    onCancel(); 
  };

  const handleResetAfterCancel = () => {
    setWasCancelled(false);
  };

  const handleExecute = () => {
    setWasCancelled(false);
    const allSelectedRaw = Object.values(selected).flat();
    if (allSelectedRaw.length === 0) return alert("Selecciona al menos una prueba");
    const cleanIds = allSelectedRaw.map(id => {
      const match = id.match(/ESC_\d+/);
      if (match) return match[0];

      return id
        .replace(/^(Escenario|Validacion|Test):\s*/i, "")
        .replace(/^\[|\]$/g, "")
        .split(" - ")[0]
        .trim();
    });
    const greepPattern = Array.from(new Set(cleanIds)).join("|")
    console.log(`Greep optimizado: ${greepPattern}`);
    onExecute({grep:greepPattern,browser})
  };

  // NUEVA LÓGICA DE TOGGLE CON MODAL
  const toggleTest = (suite: string, testId: string) => {
    const totalSelected = Object.values(selected).flat().length;
    const isAlreadySelected = selected[suite]?.includes(testId);

    if (!isAlreadySelected && totalSelected >= MAX_SELECTED_TESTS) {
      alert(`Solo puedes elegir hasta ${MAX_SELECTED_TESTS} pruebas por ejecución.`);
      return;
    }

    setSelected((prev) => {
      const tests = prev[suite] || [];
      return { ...prev, [suite]: tests.includes(testId) ? tests.filter(t => t !== testId) : [...tests, testId] };
    });
  };

  const totalSelectedCount = Object.values(selected).flat().length;

  if (isLoading) return <div style={{ padding: "40px", textAlign: "center", color: "#666" }}><h3>🔍 Validando configuración...</h3></div>;

  return (
    <div style={{ padding: "10px" }}>
      {/* --- UI DE CANCELACIÓN --- */}
      {wasCancelled && (
        <div style={{ background: "rgba(244, 67, 54, 0.15)", border: "1px solid #f44336", padding: "20px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#f44336", margin: "0 0 10px 0" }}>⛔ Ejecución Detenida</h3>
          <p style={{ color: "#eee", marginBottom: "15px" }}>La prueba se canceló correctamente.</p>
          <button onClick={handleResetAfterCancel} style={{ padding: "10px 25px", background: "#2e7d32", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Aceptar</button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <button onClick={onBack} disabled={isRunning && !wasCancelled}>⬅️ Volver</button>
        {userRole === "admin" && (
          <button 
            onClick={handleReplaceExcel}
            disabled={isRunning || isUploading}
            style={{ padding: "8px 15px", background: "#006ab3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
          >
            {isUploading ? "⏳ Subiendo..." : "Cargar Nuevo Excel"}
          </button>
        )}
      </div>
      
      {/* --- CARD DE ESTADO DE SALUD --- */}
      <div style={{ background: "#1e1e1e", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: health?.project_ready ? "1px solid #2e7d32" : "1px solid #d32f2f", opacity: isRunning ? 0.6 : 1 }}>
        <h4 style={{ margin: "0 0 10px 0" }}>🛠 Validación del Proyecto</h4>
        <div style={{ display: "flex", gap: "15px", fontSize: "0.85rem", marginBottom: "10px" }}>
          <span style={{ color: health?.node_installed ? "#4caf50" : "#f44336" }}>{health?.node_installed ? "● Node.js OK" : "○ Node.js no encontrado"}</span>
          <span style={{ color: health?.node_modules_exists ? "#4caf50" : "#f44336" }}>{health?.node_modules_exists ? "● Dependencias OK" : "○ node_modules ausente"}</span>
          <span style={{ color: health?.playwright_browsers_installed ? "#4caf50" : "#f44336" }}>{health?.playwright_browsers_installed ? "● Navegadores OK" : "○ Faltan Navegadores"}</span>
        </div>
        {!health?.project_ready && !isRepairing && (
          <button onClick={handleRepair} style={{ background: "#d32f2f", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginTop: "5px" }}>🔧 Reparar Entorno</button>
        )}
        {isRepairing && <div style={{ color: "#ff9800", fontWeight: "bold", marginTop: "10px" }}>⏳ {repairMessage}...</div>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2>Flujos: {project?.name}</h2>
        <span style={{ color: "#888", fontSize: "0.8rem" }}>Rol: <b>{userRole ? userRole.toUpperCase() : "SIN ROL"}</b></span>
      </div>

      <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #444", padding: "10px", borderRadius: "5px", background: "#1a1a1a" }}>
        {suites.length === 0 ? (
          <p style={{ color: "#888" }}>No se encontraron archivos de prueba.</p>
        ) : suites.map((s) => (
          <div key={s.suite} style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #444", paddingBottom: "5px" }}>
                <h3 style={{ fontSize: "1rem", margin: 0 }}>{s.suite}</h3>
                <span style={{ color: "#00d4ff", fontSize: "0.75rem", cursor: "help" }}>ℹ️ Flujo desde Excel</span>
            </div>
            {s.tests.map((t) => {
              const isSelected = selected[s.suite]?.includes(t.id);
              const isDisabledVisual = !isSelected && totalSelectedCount >= MAX_SELECTED_TESTS;

              return (
                <label key={t.id} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  padding: "6px 0", 
                  cursor: (isRunning || isDisabledVisual) ? "not-allowed" : "pointer", 
                  fontSize: "0.9rem",
                  opacity: isDisabledVisual ? 0.55 : 1
                }}>
                  <input 
                    type="checkbox" 
                    disabled={isRunning} 
                    checked={isSelected || false} 
                    onChange={() => toggleTest(s.suite, t.id)} 
                    style={{ marginRight: "10px" }}
                  /> {t.name}
                </label>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: "10px" }}>
        <label htmlFor="browser-select"><b>Navegador:</b></label>
        <select id="browser-select" value={browser} onChange={(e) => setBrowser(e.target.value)} style={{ padding: "5px", borderRadius: "4px", background: "#333", color: "white", border: "1px solid #555" }}>
          <option value="Chromium">Chrome</option>
          <option value="Firefox">Firefox</option>
        </select>
      </div>

      <div style={{ marginTop: 20 }}>
        {!isRunning && !wasCancelled && (
            <button 
              style={{ padding: "10px 25px", fontSize: "1rem", cursor: !health?.project_ready ? "not-allowed" : "pointer", background: !health?.project_ready ? "#555" : "#2e7d32", color: "white", border: "none", borderRadius: "5px" }} 
              disabled={!health?.project_ready}
              onClick={handleExecute}
            >
              {health?.project_ready ? "▶ Ejecutar pruebas" : "⚠️ Entorno no listo"}
            </button>
        )}

        {isRunning && !wasCancelled && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
             <span style={{ color: "#4caf50", fontWeight: "bold" }}>🚀 Ejecutando...</span>
             <button style={{ padding: "10px 20px", background: "#d32f2f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={handleInternalCancel}>⛔ Cancelar</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20, background: "#000", color: "#0f0", padding: "15px", height: "180px", overflowY: "auto", fontFamily: "monospace", fontSize: "0.85rem", borderRadius: "5px", border: "1px solid #333" }}>
        <pre style={{ margin: 0 }}>{logs || "> Esperando ejecución..."}</pre>
      </div>
    </div>
  );
}
