import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

type Props = {
  config: any;
  onFinish: () => void;
};

export default function Logs({ config, onFinish }: Props) {
  const [logs, setLogs] = useState<string[]>([]);

  //Escuchar logs en tiempo real desde Rust
  useEffect(() => {
    let unlisten: (() => void) | undefined;

    listen<string>("log", (e) => {
      setLogs((prev) => [...prev, e.payload]);
    }).then((fn) => {
      unlisten = fn;
    });

    return () => {
      if (unlisten) unlisten();
    };
  }, []);

  // Ejecutar Playwright SOLO al entrar a Logs
  useEffect(() => {
    if (!config) return;

    async function run() {
      try {
        setLogs([]);
        setLogs((l) => [...l, "▶️ Ejecutando pruebas seleccionadas..."]);
        setLogs((l) => [...l, JSON.stringify(config, null, 2)]);

        await invoke("run_playwright_with_config", {
          config,
        });

        setLogs((l) => [...l, "🟢 Ejecución finalizada"]);
        onFinish();
      } catch (err) {
        setLogs((l) => [...l, `❌ Error: ${String(err)}`]);
      }
    }

    run();
  }, [config]);

  return (
    <div>
      <h1>Logs de ejecución</h1>

      <div
        style={{
          background: "#111",
          color: "#0f0",
          padding: 12,
          minHeight: 300,
          fontFamily: "monospace",
          fontSize: 13,
          overflowY: "auto",
          borderRadius: 4,
        }}
      >
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
