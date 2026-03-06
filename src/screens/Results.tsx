import { useState } from "react";
import "./History.css";

type Props = {
  results: any;
  logs: string;
  onRetry: () => void;
  projectPath: string;
  onOpenReport: () => Promise<void>; 
};

export default function Results({ results, onRetry, onOpenReport }: Props) {
  // 1. Los Hooks siempre deben ir al inicio (Regla de React)
  const [isOpening, setIsOpening] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // 2. Validación de resultados después de los Hooks
  if (!results) return <div>No results yet</div>;

  const handleOpenReport = async () => {
    try {
      setIsOpening(true);
      await onOpenReport(); 
      showToast("Se abrió el reporte de manera correcta", "success");
    } catch (error) {
      console.error(error);
      showToast("No se pudo abrir el reporte. Asegúrate de que las pruebas hayan terminado.", "error");
    } finally {
      setTimeout(() => setIsOpening(false), 3000);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div>
      <h2>Test Summary</h2>
      <p>Total Suites: {results.suites?.length}</p>

      {/* --- INICIO DEL MAPEO DETALLADO --- */}
      {results.suites?.map((fileSuite: any, i: number) => (
        <div key={i}>
          <h3>Archivo: {fileSuite.title}</h3>

          {fileSuite.suites?.map((describeSuite: any, j: number) => (
            <div key={j} style={{ marginLeft: 20 }}>
              <h4>{describeSuite.title}</h4>

              {describeSuite.specs?.map((spec: any, k: number) => (
                <div key={k} style={{ marginLeft: 20 }}>
                  <strong>{spec.title}</strong>

                  {spec.tests?.map((test: any, m: number) => {
                    const result = test.results?.[0];

                    return (
                      <div key={m} style={{ marginLeft: 20 }}>
                        Status:{" "}
                        <span
                          style={{
                            color:
                              result?.status === "passed"
                                ? "limegreen"
                                : "red",
                            fontWeight: "bold"
                          }}
                        >
                          {result?.status}
                        </span>
                        <br />
                        Duration: {result?.duration} ms
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      {/* --- FIN DEL MAPEO DETALLADO --- */}

      <hr />
      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button 
          onClick={onRetry} 
          style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#006ab3", color: "white", border: "none", borderRadius: "5px" }}
        >
          Ejecutar una nueva prueba
        </button>
        
        <button 
          onClick={handleOpenReport} 
          disabled={isOpening}
          style={{ padding: "10px 20px", cursor: isOpening ? "wait" : "pointer", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}
        >
          {isOpening ? "Abriendo..." : "Ver Reporte HTML"}
        </button>
      </div>

      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}