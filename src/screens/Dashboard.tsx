import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

type Project = {
  name: string;
  path: string;
};

interface DashboardProps {
  onSelectProject: (project: Project) => void;
  onGoToHistory: () => void;
}

export default function Dashboard({ onSelectProject, onGoToHistory }: DashboardProps) {
  // --- ESTADOS ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [urlState, setRepoUrl] = useState("");
  const [nameState, setNewName] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // CA01 & CA02 States
  const [appVersion, setAppVersion] = useState("0.0.0");
  const [buildDate, setBuildDate] = useState("2026.02.10"); // Placeholder
  const [changelog, setChangelog] = useState("");
  
  // CA03 & CA04 States
  const [updateAvailable, setUpdateAvailable] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // --- CARGA INICIAL ---
  const loadProjects = async () => {
    try {
      const result = await invoke<[string, string][]>("list_projects");
      const mapped = result.map(([name, path]) => ({ name, path }));
      setProjects(mapped);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const checkForUpdates = async () => {
    try {
      const update = await check();
      if (update) {
        setUpdateAvailable(update);
      }
    } catch (e) {
      console.error("Error buscando actualizaciones:", e);
    }
  };

  useEffect(() => {
  loadProjects();
  
  invoke<any>("get_app_version")
    .then((data) => {
      setAppVersion(data.version);
      setBuildDate(data.build); // Ahora esto será dinámico
    })
    .catch(err => console.error(err));
    
    checkForUpdates();
  }, []);

  // --- LÓGICA DE ACTUALIZACIÓN (CA05, CA07) ---
  const handleUpdate = async () => {
    if (!updateAvailable) return;
    
    const confirm = window.confirm(`Nueva versión v${updateAvailable.version} disponible. ¿Deseas actualizar ahora?`);
    if (!confirm) return;

    setIsUpdating(true);
    try {
      // El updater de Tauri maneja la integridad y el rollback automáticamente (CA07)
      await updateAvailable.downloadAndInstall();
      alert("Actualización descargada. La aplicación se reiniciará.");
      await relaunch();
    } catch (e) {
      alert("La actualización no pudo completarse. Restaurando versión anterior.\n" + e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClone = async () => {
    if (!urlState || !nameState) {
      alert("Por favor, completa la URL y el nombre de la carpeta.");
      return;
    }
    setLoading(true);
    try {
      await invoke("sync_project", { repoUrl: urlState, projectName: nameState });
      alert("¡Operación exitosa!");
      setRepoUrl(""); setNewName("");
      await loadProjects();
    } catch (e) {
      alert(e); setShowGuide(true);
    } finally { setLoading(false); }
  };

  const openChangelog = async () => {
    try {
      const log = await invoke<string>("get_changelog");
      setChangelog(log);
    } 
    catch (error) {
      // Mostramos el error real que viene de Rust en lugar del texto fijo
      setChangelog(`Error: ${error}`);
      console.error("Detalle del error del changelog:", error);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", minHeight: "95vh", color: "white" }}>
      
      {/* CA04 — Notificación de Nueva Versión (Banner) */}
      {updateAvailable && (
        <div style={{
          backgroundColor: "#ff9800", color: "black", padding: "10px 20px", borderRadius: "8px",
          marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          fontWeight: "bold", border: "1px solid #e68a00"
        }}>
          <span>🚀 Existe una nueva versión disponible: v{updateAvailable.version}</span>
          <button onClick={() => setShowSettings(true)} style={{ backgroundColor: "black", color: "white", border: "none", padding: "5px 15px", borderRadius: "5px", cursor: "pointer" }}>
            Actualizar ahora
          </button>
        </div>
      )}

      <div style={{ flex: 1 }}>
        {/* --- MODAL CONFIGURACIÓN / ACERCA DE (CA01, CA02, CA03, CA08) --- */}
        {showSettings && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100 }}>
            <div style={{ backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "15px", maxWidth: "600px", width: "90%", border: "1px solid #006ab3" }}>
              <h2 style={{ color: "#006ab3", marginTop: 0 }}>Configuración del Sistema</h2>
              
              {/* CA01 — Info Versión */}
              <section style={{ marginBottom: "20px", backgroundColor: "#2d2d2d", padding: "15px", borderRadius: "8px" }}>
                <h4 style={{ margin: "0 0 10px 0" }}>Información de la Herramienta</h4>
                <p style={{ margin: "5px 0" }}><strong>QA Automation Tool</strong></p>
                <p style={{ margin: "5px 0", opacity: 0.8 }}>Versión: {appVersion}</p>
                <p style={{ margin: "5px 0", opacity: 0.8 }}>Build: {buildDate}</p>
              </section>

              {/* CA02 — Changelog */}
              <section style={{ marginBottom: "20px" }}>
                <button onClick={openChangelog} style={{ background: "none", border: "none", color: "#006ab3", cursor: "pointer", textDecoration: "underline", padding: 0, marginBottom: "10px" }}>
                  Consultar Historial de Cambios (Changelog)
                </button>
                {changelog && (
                  <pre style={{ backgroundColor: "#000", padding: "10px", borderRadius: "5px", fontSize: "12px", maxHeight: "150px", overflowY: "auto", border: "1px solid #333" }}>
                    {changelog}
                  </pre>
                )}
              </section>

              {/* CA03 — Botón Buscar Actualizaciones */}
              <section style={{ display: "flex", gap: "10px" }}>
                <button 
                  onClick={updateAvailable ? handleUpdate : checkForUpdates} 
                  disabled={isUpdating}
                  style={{ flex: 1, padding: "12px", backgroundColor: updateAvailable ? "#4caf50" : "#006ab3", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
                >
                  {isUpdating ? "Instalando..." : updateAvailable ? "Instalar v" + updateAvailable.version : "Buscar actualizaciones"}
                </button>
                <button onClick={() => setShowSettings(false)} style={{ padding: "12px", backgroundColor: "#444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Cerrar</button>
              </section>
            </div>
          </div>
        )}

        {/* --- MODAL GUÍA GIT --- */}
        {showGuide && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
            <div style={{ backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "15px", maxWidth: "600px", border: "1px solid #006ab3" }}>
              <h3 style={{ color: "#006ab3", marginTop: 0 }}>🔑 Guía de Acceso a Git</h3>
              <p>Si el clonado falla, intenta usar un Personal Access Token:</p>
              <code style={{ fontSize: "12px", wordBreak: "break-all", color: "#61dafb", backgroundColor: "#000", padding: "10px", display: "block", borderRadius: "5px" }}>
                https://USUARIO:TOKEN@github.com/WeeCompany/repo.git
              </code>
              <button onClick={() => setShowGuide(false)} style={{ marginTop: "20px", width: "100%", padding: "10px", backgroundColor: "#006ab3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Entendido</button>
            </div>
          </div>
        )}

        {/* --- HEADER --- */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ margin: 0 }}>Proyectos WeeCompany</h2>
          <button onClick={onGoToHistory} style={{ padding: "10px 20px", backgroundColor: "#006ab3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>📜 Historial</button>
        </header>

        {/* --- SECCIÓN CLONAR --- */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "40px", flexWrap: "wrap", alignItems: "center", backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "12px" }}> 
          <input placeholder="URL de Git (HTTPS)" value={urlState} onChange={e => setRepoUrl(e.target.value)} style={{ flex: 2, padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#000", color: "white" }} />
          <input placeholder="Nombre del Proyecto" value={nameState} onChange={e => setNewName(e.target.value)} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#000", color: "white" }} />
          <button onClick={handleClone} disabled={loading} style={{ padding: "12px 25px", backgroundColor: loading ? "#555" : "#006ab3", color: "white", border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold" }}>
            {loading ? "Procesando..." : "Clonar / Actualizar"}
          </button>
          <button onClick={() => setShowGuide(true)} style={{ padding: "12px", backgroundColor: "transparent", color: "#006ab3", border: "1px solid #006ab3", borderRadius: "8px", cursor: "pointer" }}>❓</button>
        </div>

        {/* --- GRID DE PROYECTOS --- */}
        <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {projects.map((p, i) => (
            <div key={i} onClick={() => onSelectProject(p)} style={{ backgroundColor: "#006ab3", padding: "20px", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.backgroundColor = "#007cd1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#006ab3"; }}>
              <strong style={{ fontSize: "1.1rem", display: "block" }}>📁 {p.name}</strong>
              <span style={{ fontSize: "10px", color: "#b0d4ff", opacity: 0.8 }}>{p.path}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER (CA01) --- */}
      <footer style={{ marginTop: "40px", padding: "15px 0", borderTop: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#888", fontSize: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#4caf50" }}>●</span> 
          <strong>Estatus:</strong> Sistema Operativo
        </div>
        
        <div>
          QA Automation Suite — <strong style={{ color: "#006ab3" }}>v{appVersion}</strong> 
        </div>

        <button 
          onClick={() => setShowSettings(true)} 
          style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}
        >
          Configuración / Acerca de
        </button>
      </footer>
    </div>
  );
}