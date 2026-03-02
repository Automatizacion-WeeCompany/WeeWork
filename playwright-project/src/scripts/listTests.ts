// playwright/scripts/listTests.ts
import { ExtraerDatosExcel } from "../utilidades/ObtencionDeDatos";

type TestItem = {
    suite: string;
    testName: string;
};

function listTests() {
    const rows = ExtraerDatosExcel.obtenerEscenariosPorHoja('CotizacionIndividual');
    // rows = [{ Suite, TestName, Execute, ... }]

    const suitesMap: Record<string, string[]> = {};

    rows.forEach((row: any) => {
        if (row.Execute !== 'YES') return;

        const suite = row.Suite;
        const testName = row.EscenarioPrueba;

        if (!suitesMap[suite]) {
            suitesMap[suite] = [];
        }

        suitesMap[suite].push(testName);
    });

    return Object.entries(suitesMap).map(([suite, tests]) => ({
        suite,
        tests
    }));
}

const result = listTests();

// 🚨 CLAVE: stdout limpio, solo JSON
console.log(JSON.stringify(result));
