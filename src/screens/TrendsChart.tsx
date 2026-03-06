import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendsChartProps {
  historyData: any[];
}

const TrendsChart: React.FC<TrendsChartProps> = ({ historyData }) => {
  // 1. Procesamos los datos para que sean legibles por la gráfica
  const data = historyData
    .filter(item => item.total_tests > 0) // Ignoramos registros vacíos para no arruinar la línea
    .map((item) => {
      const date = new Date(item.execution_date.replace(/-/g, '/'));
      return {
        // Nombre para el eje X (Fecha corta + Hora)
        name: date.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
        fullDate: item.execution_date,
        project: item.project_name,
        // Calculamos porcentajes reales
        pasadas: parseFloat(((item.passed / item.total_tests) * 100).toFixed(1)),
        falladas: parseFloat(((item.failed / item.total_tests) * 100).toFixed(1)),
        total: item.total_tests,
        raw_passed: item.passed,
        raw_failed: item.failed
      };
    });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const info = payload[0].payload;
      return (
        <div className="custom-tooltip-chart">
          <p className="tooltip-project">{info.project}</p>
          <p className="tooltip-date">📅 {info.fullDate}</p>
          <p className="tooltip-total">🧪 Total: {info.total} pruebas</p>
          <hr />
          <p style={{ color: "#4caf50" }}>✅ Pasadas: {info.pasadas}% ({info.raw_passed})</p>
          <p style={{ color: "#f44336" }}>❌ Falladas: {info.falladas}% ({info.raw_failed})</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">Tendencia de Éxito vs. Fallos</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#999" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#999" 
            domain={[0, 100]} 
            tickFormatter={(value) => `${value}%`} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36}/>
          
          {/* Línea de Pruebas Pasadas */}
          <Line
            name="% Pruebas Pasadas"
            type="monotone"
            dataKey="pasadas"
            stroke="#4caf50"
            strokeWidth={3}
            dot={{ r: 6, fill: "#4caf50" }}
            activeDot={{ r: 8 }}
            animationDuration={1000}
          />
          
          {/* Línea de Pruebas Falladas */}
          <Line
            name="% Pruebas Falladas"
            type="monotone"
            dataKey="falladas"
            stroke="#f44336"
            strokeWidth={3}
            dot={{ r: 6, fill: "#f44336" }}
            activeDot={{ r: 8 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;