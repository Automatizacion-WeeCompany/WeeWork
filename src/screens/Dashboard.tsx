import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Project = {
  name: string;
  path: string;
};

interface DashboardProps {
  onSelectProject: (project: Project) => void;
  onGoToHistory: () => void;
}

export default function Dashboard({ onSelectProject, onGoToHistory }: DashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const result = await invoke<[string, string][]>("list_projects");
        const mapped = result.map(([name, path]) => ({ name, path }));
        setProjects(mapped);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    }
    loadProjects();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px" 
      }}>
        <h2 style={{ margin: 0, color: "white" }}>Proyectos WeeCompany</h2>
        <button
          onClick={onGoToHistory}
          style={{
            padding: "10px 20px",
            backgroundColor: "#006ab3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📜 Historial
        </button>
      </header>

      <div style={{ display: "grid", gap: "15px" }}>
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => onSelectProject(p)}
            style={{
              backgroundColor: "#006ab3", // Fondo oscuro para contrastar con el fondo general
              border: "1px solid #0f1b5f",
              padding: "20px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0f1b5f";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#0f1b5f";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <strong style={{ color: "#ffffff", fontSize: "1.2rem", display: "block" }}>
              {p.name}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}