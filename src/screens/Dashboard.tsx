import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { open } from '@tauri-apps/plugin-shell';
import logoW from "../../src-tauri/icons/W.png";

type Project = {
  name: string;
  path: string;
};

interface DashboardProps {
  onSelectProject: (project: Project) => void;
  onGoToHistory: () => void;
  userRole: "admin" | "viewer" | null;
}

export default function Dashboard({ onSelectProject, onGoToHistory, userRole }: DashboardProps) {
  // --- ESTADOS ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [urlState, setRepoUrl] = useState("");
  const [nameState, setNewName] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showDocumentation,setShowDocumentation] = useState(false);
  
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

  const checkForUpdates = async (isManualClick = false) => {
    try {
      if (isManualClick) setIsChecking(true);
      
      const update = await check();
      
      if (update) {
        setUpdateAvailable(update);
        // Si el usuario hizo clic manualmente, no lo molestamos con alerts, 
        // el banner naranja aparecerá solo.
      } else if (isManualClick) {
        // Solo mostramos este alert si el usuario presionó el botón explícitamente
        alert("¡Estás al día! No hay nuevas actualizaciones disponibles.");
      }
    } catch (e) {
      console.error("Error buscando actualizaciones:", e);
      if (isManualClick) alert("Error al conectar con el servidor de actualizaciones.");
    } finally {
      if (isManualClick) setIsChecking(false);
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
    
    checkForUpdates(false);
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
    if (userRole !== "admin") {
      alert("Solo un administrador puede agregar o actualizar proyectos.");
      return;
    }
    if (!urlState || !nameState) {
      alert("Por favor, completa la URL y el nombre de la carpeta.");
      return;
    }
    const isDuplicate = projects.some((project) => project.name.toLowerCase() === nameState.toLowerCase());
    if (isDuplicate) {
      alert(`El proyecto "${nameState}" ya existe en tu lista. No es necesario clonarlo de nuevo.`);
      return;
    }
    setLoading(true);
    try {
      await invoke("sync_project", { repoUrl: urlState, projectName: nameState, role: userRole });
      alert("¡Operación exitosa!");
      setRepoUrl(""); setNewName("");
      await loadProjects();
    } catch (e) {
      alert(e); setShowGuide(true);
    } finally { setLoading(false); }
  };

  const handleDeleteProject = async (e: React.MouseEvent, projectName: string) => {
    if (userRole !== "admin") {
      alert("Solo un administrador puede eliminar proyectos.");
      return;
    }
    // Esto evita que al hacer clic en borrar, se seleccione el proyecto (se abra)
    e.stopPropagation(); 
  
    const confirm = window.confirm(
    `⚠️ ¡ADVERTENCIA!\n\nEstás a punto de eliminar TODO el proyecto "${projectName}" de tu equipo.\n\nSi decides continuar, se borrará todo y tendrías que clonarlo de nuevo si lo necesitas.\n\n¿Estás seguro de que deseas eliminarlo?`
    );
  
    if (!confirm) return;

    try {
      await invoke("delete_project", { projectName, role: userRole });
      alert("Proyecto eliminado con éxito.");
      await loadProjects(); // Recargamos la lista automáticamente
    } catch (error) {
      alert(`Error al eliminar: ${error}`);
    }
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

  const handleOpenDocs= async (url:string) => {
    try{
      await open(url)
    }catch{
      console.error("Error abiendo la url");
    }
  }
  return (
    <div className="screen">
      
      {/* CA04 — Notificación de Nueva Versión (Banner) */}
      {updateAvailable && (
        <div style={{
          backgroundColor: "#ff9800", color: "#111", padding: "10px 20px", borderRadius: "8px",
          marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          fontWeight: "bold", border: "1px solid #e68a00"
        }}>
          <span>Existe una nueva versión disponible: v{updateAvailable.version}</span>
          <button className="btn btn-dark btn-sm" onClick={() => setShowSettings(true)}>
            Actualizar ahora
          </button>
        </div>
      )}

      <div style={{ flex: 1 }}>
        {/* --- MODAL CONFIGURACIÓN / ACERCA DE (CA01, CA02, CA03, CA08) --- */}
        {showSettings && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100 }}>
            <div style={{ backgroundColor: "var(--panel-bg)", padding: "30px", borderRadius: "15px", maxWidth: "600px", width: "90%", border: "1px solid var(--panel-border)" }}>
              <h2 style={{ color: "#006ab3", marginTop: 0 }}>Configuración del Sistema</h2>
              
              {/* CA01 — Info Versión */}
              <section style={{ marginBottom: "20px", backgroundColor: "var(--panel-bg-strong)", padding: "15px", borderRadius: "8px", border: "1px solid var(--panel-border)" }}>
                <h4 style={{ margin: "0 0 10px 0" }}>Información de la Herramienta</h4>
                <p style={{ margin: "5px 0" }}><strong>QA Automation Tool</strong></p>
                <p style={{ margin: "5px 0", opacity: 0.8 }}>Versión: {appVersion}</p>
                <p style={{ margin: "5px 0", opacity: 0.8 }}>Build: {buildDate}</p>
              </section>

              {/* CA02 — Changelog */}
              <section style={{ marginBottom: "20px" }}>
                <button className="btn btn-link" onClick={openChangelog} style={{ marginBottom: "10px" }}>
                  Consultar Historial de Cambios (Changelog)
                </button>
                {changelog && (
                  <pre style={{ backgroundColor: "#000", padding: "10px", borderRadius: "5px", fontSize: "12px", maxHeight: "150px", overflowY: "auto", border: "1px solid var(--panel-border)" }}>
                    {changelog}
                  </pre>
                )}
              </section>

              {/* CA03 — Botón Buscar Actualizaciones */}
              <section style={{ display: "flex", gap: "10px" }}>
                <button 
                  onClick={updateAvailable ? handleUpdate : () => checkForUpdates(true)}
                  disabled={isUpdating || isChecking}
                  className={`btn ${updateAvailable ? "btn-success" : "btn-primary"}`}
                  style={{ flex: 1 }}
                >
                  {isUpdating ? "Instalando..." 
                  : isChecking
                  ? "Consultando servidor..."
                  : updateAvailable
                  ? `Instalar v${updateAvailable.version}`
                  : "Buscar actualizaciones"}
                </button>
                <button className="btn btn-secondary" onClick={() => setShowSettings(false)}>Cerrar</button>
              </section>
            </div>
          </div>
        )}

        {/* --- MODAL GUÍA GIT --- */}
        {showGuide && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
            <div style={{ backgroundColor: "var(--panel-bg)", padding: "30px", borderRadius: "15px", maxWidth: "600px", border: "1px solid var(--panel-border)" }}>
              <h3 style={{ color: "#006ab3", marginTop: 0 }}>Guía de Acceso a Git</h3>
              <p>Si el clonado falla, intenta usar un Personal Access Token:</p>
              <code style={{ fontSize: "12px", wordBreak: "break-all", color: "#61dafb", backgroundColor: "#000", padding: "10px", display: "block", borderRadius: "5px", border: "1px solid var(--panel-border)" }}>
                https://USUARIO:TOKEN@github.com/WeeCompany/repo.git
              </code>
              <button className="btn btn-primary btn-block" onClick={() => setShowGuide(false)} style={{ marginTop: "20px" }}>Entendido</button>
            </div>
          </div>
        )}
        {/* --- MODAL DOCUMENTACION Y MATRICES --- */}
        {showDocumentation && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
            <div style={{backgroundColor: "var(--panel-bg)", padding: "30px", borderRadius: "15px", maxWidth: "600px", border: "1px solid var(--panel-border)"}}>
              <h3 style={{ color: "#006ab3", marginTop: 0 }}>Documentacion de los proyectos</h3>
              <p style={{ color: "var(--muted-text)", marginBottom: "25px" }}>La documentacion proporcionada aqui es responsabilidad del equipo QA y el equipo de Documentacion</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <button
                  onClick={() => handleOpenDocs("https://docs.google.com/spreadsheets/d/1OfhO6OAOXXjvbnaXQeWJ7t0jaVnnKlmJ/edit?usp=sharing&ouid=100188614620631772642&rtpof=true&sd=true")}
                  className="btn btn-secondary btn-block"
                >
                  Abrir Matriz Gasto Médico Mayor Banorte
                </button>
                <button
                  onClick={() => handleOpenDocs("https://drive.google.com/drive/folders/1LouYr5JCTszzbt-uZAoTJbjGcPoqtFOW?usp=sharing")}
                  className="btn btn-secondary btn-block"
                >
                  Manuales de proyectos
                </button>
              <button className="btn btn-primary btn-block" onClick={() => setShowDocumentation(false)} style={{ marginTop: "20px" }}>Aceptar</button>
              </div>
            </div>
          </div>    
        )}

        {/* --- HEADER --- */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={logoW} alt="WeeBot" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
            <h2 style={{ margin: 0 }}>Proyectos WeeCompany</h2>
          </div>
          <button className="btn btn-primary" onClick={onGoToHistory}>Historial</button>
        </header>

        {/* --- SECCIÓN CLONAR --- */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center", backgroundColor: "var(--panel-bg)", padding: "20px", borderRadius: "12px", border: "1px solid var(--panel-border)" }}> 
          <input placeholder="URL de Git (HTTPS)" value={urlState} onChange={e => setRepoUrl(e.target.value)} style={{ flex: 2, padding: "12px", borderRadius: "8px" }} disabled={loading} />
          <input placeholder="Nombre del Proyecto" value={nameState} onChange={e => setNewName(e.target.value)} style={{ flex: 1, padding: "12px", borderRadius: "8px" }} disabled={loading} />
          <button className="btn btn-primary" onClick={handleClone} disabled={loading || userRole !== "admin"}>
            {loading ? "Procesando..." : "Agregar / Actualizar proyecto"}
          </button>
          <button className="btn btn-outline btn-icon" onClick={() => setShowGuide(true)}>❓</button>
          <button className="btn btn-outline" onClick={() => setShowDocumentation(true)}>Documentacion</button>
        </div>
        {loading && (
          <div className="loading-row" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            Clonando proyecto... esto puede tardar unos minutos.
          </div>
        )}

        {/* --- GRID DE PROYECTOS --- */}
        <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {projects.map((p, i) => (
            <div key={i} onClick={() => onSelectProject(p)} style={{ backgroundColor: "#006ab3", padding: "20px", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.backgroundColor = "#007cd1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#006ab3"; }}>
                {/* Contenedor Flex para el título y el botón de borrar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <strong style={{ fontSize: "1.1rem", display: "block" }}>📁 {p.name}</strong>
                  {/* BOTÓN DE ELIMINAR */}
                  <button
                    onClick={(e) => handleDeleteProject(e, p.name)}
                    title="Eliminar proyecto"
                    className="btn btn-danger btn-xs"
                    disabled={userRole !== "admin"}
                    >
                      Eliminar
                    </button>
                </div>
                <span style={{ fontSize: "10px", color: "#b0d4ff", opacity: 0.8, wordBreak: "break-all" }}>{p.path}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER (CA01) --- */}
      <footer style={{ marginTop: "40px", padding: "15px 0", borderTop: "1px solid var(--panel-border)", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--muted-text)", fontSize: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#4caf50" }}>●</span> 
          <strong>Estatus:</strong> Sistema Operativo
        </div>
        
        <div>
          QA Automation Suite — <strong style={{ color: "#006ab3" }}>v{appVersion}</strong> 
        </div>

        <button 
          onClick={() => setShowSettings(true)} 
          className="btn btn-link"
          style={{ fontSize: "12px" }}
        >
          Acerca de
        </button>
      </footer>
    </div>
  );
}
