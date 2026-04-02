import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./History.css";
import * as XLSX from 'xlsx';
import TrendsChart from "./TrendsChart";

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
  const [loading, setLoading] = useState(true); // Se mantiene para mostrar estado de carga

  // --- ESTADOS DE VISTA Y FILTROS ---
  const [showChart, setShowChart] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
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

  // Obtener lista única de proyectos de los registros actuales
  const uniqueProjects = Array.from(new Set(records.map(r => r.project_name)));

  const formatDate = (dateString: string) => {
    try {
      // Reemplazo para asegurar compatibilidad con navegadores
      const date = new Date(dateString.replace(/-/g, '/'));
      return date.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
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
      alert("No se pudo abrir el reporte: " + error);
    }
  };

  // --- FILTRADO ---
  const filteredRecords = records.filter((rec) => {
    const textMatch = rec.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     (rec.test_names && rec.test_names.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let dateMatch = true;
    if (startDate || endDate) {
      const recDate = rec.execution_date.split(' ')[0]; // YYYY-MM-DD
      if (startDate && recDate < startDate) dateMatch = false;
      if (endDate && recDate > endDate) dateMatch = false;
    }

    const projectMatch = selectedProject === "" || rec.project_name === selectedProject;

    return textMatch && dateMatch && projectMatch;
  });

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`¿Eliminar ${selectedIds.length} registros?`)) {
      try {
        await invoke("delete_history_records", { ids: selectedIds });
        setSelectedIds([]);
        loadHistory();
      } catch (error) {
        alert("Error: " + error);
      }
    }
  };

  const exportToExcel = () => {
    const data = filteredRecords.map(rec => ({
      "Fecha": formatDate(rec.execution_date),
      "Proyecto": rec.project_name,
      "Total": rec.total_tests,
      "Pasados": rec.passed,
      "Fallados": rec.failed,
      "Éxito %": rec.total_tests > 0 ? ((rec.passed / rec.total_tests) * 100).toFixed(2) + "%" : "0%"
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Historial");
    XLSX.writeFile(wb, "Reporte_QA.xlsx");
  };

  const renderTable = () => {
    // AQUÍ ESTÁ EL USO DE LA VARIABLE "loading": Si está cargando, muestra el mensaje, si no, muestra la tabla.
    if (loading) {
      return (
        <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>
          <h3>⏳ Cargando historial de ejecuciones...</h3>
        </div>
      );
    }

    return (
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th><input type="checkbox" onChange={(e) => setSelectedIds(e.target.checked ? filteredRecords.map(r => r.id) : [])} /></th>
              <th>FECHA</th>
              <th>PROYECTO / TESTS</th>
              <th className="text-center">ÉXITO %</th>
              <th className="text-center">TOTAL</th>
              <th className="text-center">✅</th>
              <th className="text-center">❌</th>
              <th className="text-right">DURACIÓN</th>
              <th className="text-center">EVIDENCIA</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((rec) => {
              const pct = rec.total_tests > 0 ? (rec.passed / rec.total_tests) * 100 : 0;
              return (
                <tr key={rec.id} className={selectedIds.includes(rec.id) ? "row-selected" : ""}>
                  <td><input type="checkbox" checked={selectedIds.includes(rec.id)} onChange={() => {
                    setSelectedIds(prev => prev.includes(rec.id) ? prev.filter(i => i !== rec.id) : [...prev, rec.id]);
                  }} /></td>
                  <td className="cell-date">{formatDate(rec.execution_date)}</td>
                  <td>
                    <div className="project-name-bold">{rec.project_name}</div>
                    <div className="test-names-subtext">{rec.test_names || "Sin detalles"}</div>
                  </td>
                  <td className="text-center">
                     <div className="progress-container"><div className="progress-bar" style={{width: `${pct}%`, backgroundColor: pct > 50 ? '#4caf50' : '#f44336'}} /></div>
                     <small>{pct.toFixed(0)}%</small>
                  </td>
                  <td className="text-center">{rec.total_tests}</td>
                  <td className="text-center cell-passed">{rec.passed}</td>
                  <td className="text-center cell-failed">{rec.failed}</td>
                  <td className="text-right">{rec.duration.toFixed(2)}s</td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-xs" onClick={() => rec.report_path && openReport(rec.report_path)}>Ver</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <div className="header-left">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Volver</button>
          <h2>Historial de ejecuciones</h2>
          {selectedIds.length > 0 && <button className="btn btn-danger btn-sm" onClick={deleteSelected}>Eliminar</button>}
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowChart(!showChart)}>
            {showChart ? "Ver Tabla" : "Ver Tendencias"}
          </button>
          <button className="btn btn-primary btn-sm" onClick={exportToExcel}>Excel</button>
        </div>
      </div>

      <div className="filters-bar">
        <input type="text" placeholder="🔍 Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="filter-input" />
        <select className="filter-input" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
          <option value="">Todos los Proyectos</option>
          {uniqueProjects.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <div className="date-input-wrapper">
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="filter-input date-input" />
          <span className="date-input-icon" aria-hidden="true" />
        </div>
        <div className="date-input-wrapper">
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="filter-input date-input" />
          <span className="date-input-icon" aria-hidden="true" />
        </div>
      </div>

      {showChart 
        ? <TrendsChart historyData={[...filteredRecords].reverse()} /> 
        : renderTable()
      }
    </div>
  );
};

export default History;
