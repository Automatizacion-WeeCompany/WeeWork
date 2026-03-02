import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./History.css";
import * as XLSX from 'xlsx';

type ExecutionRecord = {
  id: number;
  project_name: string;
  test_names: string;
  execution_date: string;
  total_tests: number;
  passed: number;
  failed: number;
  duration: number;
  report_path: string | null;
};

interface HistoryProps {
  onBack: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [records, setRecords] = useState<ExecutionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // --- ESTADOS PARA SELECCIÓN ---
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // --- ESTADOS PARA LOS FILTROS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await invoke<ExecutionRecord[]>("get_test_history");
      setRecords(data);
    } catch (error) {
      console.error("Error cargando historial:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
        // Reemplazamos espacio por T para formato ISO si es necesario
        const d = new Date(dateString.replace(" ", "T"));
        return d.toLocaleString('es-MX',{
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
    } catch {
        return dateString;
    }
  };

  const openReport = async (path: string) => {
    try {
      await invoke("open_history_report", { reportPath: path });
    } catch (error) {
      console.error("Error abriendo reporte:", error);
      alert("No se pudo abrir el reporte: " + error);
    }
  };

  // --- LÓGICA DE ELIMINACIÓN ---
  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allFilteredIds = filteredRecords.map(r => r.id);
      setSelectedIds(allFilteredIds);
    } else {
      setSelectedIds([]);
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;

    const confirmMessage = selectedIds.length === 1 
      ? "¿Estás seguro de eliminar este registro y su evidencia?" 
      : `¿Estás seguro de eliminar ${selectedIds.length} registros y sus evidencias físicas?`;

    if (window.confirm(confirmMessage)) {
      try {
        // Invocamos el comando de Rust (Asegurar de tenerlo en main.rs con snake_case)
        await invoke("delete_history_records", { ids: selectedIds });
        setSelectedIds([]);
        await loadHistory(); // Recargar datos
      } catch (error) {
        alert("Error al eliminar registros: " + error);
      }
    }
  };

  const exportToExcel = () => {
    if (filteredRecords.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    // 1. Preparamos los datos para Excel
    // Mapeamos solo los campos que queremos mostrar en la tabla
    const dataToExport = filteredRecords.map(rec => ({
      "Fecha": formatDate(rec.execution_date),
      "Proyecto": rec.project_name,
      "Tests": rec.test_names || "N/A",
      "Total": rec.total_tests,
      "Pasados": rec.passed,
      "Fallados": rec.failed,
      "Éxito %": ((rec.passed / rec.total_tests) * 100).toFixed(2) + "%",
      "Duración (s)": rec.duration.toFixed(2),
      "Ruta de Evidencia": rec.report_path || "Sin evidencia"
    }));

    // 2. Crear el libro y la hoja
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historial de Pruebas");
    
    // 3. Ajustar el ancho de las columnas
    const maxWidths = [
        { wpx: 100 }, // Fecha
        { wpx: 200 }, // Proyecto
        { wpx: 250 }, // Tests
        { wpx: 100 }, // Total
        { wpx: 80 },  // Passed
        { wpx: 80 },  // Failed
        { wpx: 100 }, // Success %
        { wpx: 100 }, // Duration
        { wpx: 300 }  // Report Path
    ];
    worksheet['!cols'] = maxWidths;
    // 4. Generar el archivo y descargarlo
    try {
        const fileName = `Reporte_Tests_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        showToast(`Reporte descargado en la carpeta descargas: ${fileName}`);
    } catch (error) {
        console.error("Error exportando a Excel:", error);
        showToast("Hubo un error al generar el archivo Excel.", "error");
    }

  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // Se oculta solo
  };

  // --- LÓGICA DE FILTRADO ---
  const filteredRecords = records.filter((rec) => {
    const textMatch = 
      rec.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rec.test_names && rec.test_names.toLowerCase().includes(searchTerm.toLowerCase()));

    let dateMatch = true;
    if (startDate || endDate) {
      const recDate = new Date(rec.execution_date).toISOString().split('T')[0];
      if (startDate && recDate < startDate) dateMatch = false;
      if (endDate && recDate > endDate) dateMatch = false;
    }

    return textMatch && dateMatch;
  });

  const renderContent = () => {
    if (loading) return <p className="loading-text">Cargando datos...</p>;

    if (filteredRecords.length === 0) {
      return (
        <div className="empty-state">
          <p>{records.length === 0 ? "No hay registros aún." : "No se encontraron resultados con estos filtros."}</p>
        </div>
      );
    }

    return (
      <div className="table-container">
        <table className="history-table">
            <thead className="table-header">
            <tr>
                <th className="text-center" style={{ width: "50px" }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={selectedIds.length === filteredRecords.length && filteredRecords.length > 0}
                  />
                </th>
                <th className="text-left">Fecha</th>
                <th className="text-left">Proyecto / Tests</th>
                <th className="text-center" style={{ width: "150px" }}>Éxito %</th>
                <th className="text-center">Total</th>
                <th className="text-center">Pasaron ✅</th>
                <th className="text-center">Fallaron ❌</th>
                <th className="text-right">Duración</th>
                <th className="text-center">Evidencia</th>
            </tr>
            </thead>
            <tbody>
            {filteredRecords.map((rec) => {
                const isSelected = selectedIds.includes(rec.id);
                const passPercentage = rec.total_tests > 0 
                    ? (rec.passed / rec.total_tests) * 100 
                    : 0;

                return (
                <tr key={rec.id} className={`table-row ${isSelected ? "row-selected" : ""}`}>
                    <td className="table-cell text-center">
                      <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={() => toggleSelection(rec.id)}
                      />
                    </td>
                    <td className="table-cell cell-date">{formatDate(rec.execution_date)}</td>
                    <td className="table-cell cell-project">
                        <div style={{ fontWeight: 'bold', color: '#e0e0e0' }}>{rec.project_name}</div>
                        <div className="test-names-subtext">
                            {rec.test_names || "Sin detalles"}
                        </div>
                    </td>
                    <td className="table-cell">
                        <div className="progress-container">
                            <div 
                            className="progress-bar" 
                            style={{ 
                                width: `${passPercentage}%`,
                                backgroundColor: passPercentage === 100 ? '#4caf50' : (passPercentage > 50 ? '#ff9800' : '#f44336')
                            }}
                            ></div>
                        </div>
                        <div className="percentage-label">{passPercentage.toFixed(0)}%</div>
                    </td>
                    <td className="table-cell text-center">{rec.total_tests}</td>
                    <td className="table-cell text-center cell-passed">{rec.passed}</td>
                    <td className={`table-cell text-center ${rec.failed > 0 ? "cell-failed" : "cell-failed-none"}`}>
                        {rec.failed}
                    </td>
                    <td className="table-cell text-right cell-duration">
                        {rec.duration.toFixed(2)}s
                    </td>
                    <td className="table-cell text-center">
                        {rec.report_path ? (
                            <button 
                                className="evidence-btn"
                                onClick={() => openReport(rec.report_path!)}
                                title="Ver Reporte HTML guardado"
                            >
                                Ver Reporte
                            </button>
                        ) : (
                            <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>No disponible</span>
                        )}  
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        {toast && (
            <div className={`toast-notification ${toast.type}`}>
                {toast.message}
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <div className="header-left">
          <button className="export-excel-btn" onClick={onBack}>
          ← Volver
          </button>
          <h2>📜 Historial de Ejecuciones</h2>
          {selectedIds.length > 0 && (
            <button className="delete-selected-btn" onClick={deleteSelected}>
               🗑️ Eliminar Seleccionados ({selectedIds.length})
            </button>
          )}
        </div>
        <div className="header-left">
    <div className="actions-group">
        <button className="export-excel-btn" onClick={exportToExcel}>
            Exportar Excel
        </button>
    </div>
</div>
      </div>

      {/* --- BARRA DE FILTROS --- */}
      <div className="filters-bar">
        <div className="filter-group">
            <input 
                type="text" 
                placeholder="🔍 Buscar proyecto o test..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input search-input"
            />
        </div>
        <div className="filter-group date-group">
            <label>Desde:</label>
            <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="filter-input date-input"
            />
        </div>
        <div className="filter-group date-group">
            <label>Hasta:</label>
            <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="filter-input date-input"
            />
        </div>
        {(searchTerm || startDate || endDate) && (
            <button 
                className="clear-filters-btn"
                onClick={() => {
                    setSearchTerm("");
                    setStartDate("");
                    setEndDate("");
                    setSelectedIds([]);
                }}
            >
                Limpiar
            </button>
        )}
      </div>

      {renderContent()}
    </div>
  );
};

export default History;