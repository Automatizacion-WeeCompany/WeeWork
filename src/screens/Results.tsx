import { useState } from "react";
import "./History.css";

type Props = {
  results: any;
  logs: string;
  onRetry: () => void;
  projectPath: string;
  onOpenReport: () => Promise<void>; // <--- Agregado para cumplir con App.tsx
};

export default function Results({ results, onRetry, onOpenReport }: Props) {
  if (!results) return <div>No results yet</div>;

  const [isOpening, setIsOpening] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleOpenReport = async () => {
    try {
      setIsOpening(true);
      // Usamos la prop que viene de App o el invoke directamente
      await onOpenReport(); 
      showToast("Se abrió el reporte de manera correcta");
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

      {/* ... (tu mapeo de resultados se mantiene igual) ... */}
      {results.suites?.map((fileSuite: any, i: number) => (
         <div key={i}>
           <h3>Archivo: {fileSuite.title}</h3>
           {/* Resto del mapa... */}
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