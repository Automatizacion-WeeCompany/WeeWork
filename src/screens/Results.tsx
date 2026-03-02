import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./History.css";

type Props = {
  results: any;
  logs: string;
  onRetry: () => void;
  onOpenReport: () => void;
};

export default function Results({ results, onRetry, onOpenReport }: Props) {
  if (!results) return <div>No results yet</div>;
  const [isOpening, setIsOpening] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const handleOpenReport = async () => {
    try {
      setIsOpening(true);
      await invoke("open_html_report");
      showToast("Se abrio el reporte de manera correcta");
    } catch (error) {
      console.error(error);
      showToast("No se pudo abrir el reporte. Asegúrate de que las pruebas hayan terminado.");
    } finally {
      // Re-habilitamos después de 3 segundos
      setTimeout(() => setIsOpening(false), 3000);
    }
  };
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // Se oculta solo
  };

  return (
    <div>
      <h2>Test Summary</h2>
      <p>Total Suites: {results.suites?.length}</p>

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

      <hr />
      <button onClick={onRetry}>Ejecutar una nueva prueba</button>
      <button onClick={handleOpenReport} disabled={isOpening}>
        {isOpening ? "Abriendo..." : "Ver Reporte HTML"}
      </button>
      {toast && (
            <div className={`toast-notification ${toast.type}`}>
                {toast.message}
            </div>
        )}
    </div>
  );
}
