import { FullConfig, FullResult, Reporter } from '@playwright/test/reporter';
import { consolidarReportesPolizas } from '../utilidades/consolidarReportesPolizas';
class MergeReporter implements Reporter {

    onBegin(config: FullConfig, suite: any) {
        // excuted on start
    }
    // Changed from FullConfig to FullResult
    onEnd(result: FullResult) {
        console.log("🔄 Consolidando reportes de pólizas...");
        consolidarReportesPolizas();
        console.log("✅ Consolidado generado correctamente.");
    }
}
export default MergeReporter;