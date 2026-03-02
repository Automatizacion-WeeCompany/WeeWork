import { Page } from "@playwright/test";

export class CoberturasGMPage {
    constructor(private readonly page: Page) { }

    async cerrarModal() {
        await this.page.click('#Tooltip_cerrar');
    }
    async seleccionaMedicinaPreventiva() {
        const checkPrevensionDelaSalud = this.page.locator('label[for="idRelacionInputLabel1"]');
        await checkPrevensionDelaSalud.click();
    }
    async eliminaSeleccionMedicinaPreventiva() {
        const cobertura = 'Medicina Preventiva FS';
        await this.page.locator(`text="${cobertura}" >> xpath=ancestor::label//div[contains(@class,"IconCerrarConfiguracion")]`).click({ force: true });

    }
    async seleccionaMantenimientoDeLaSalud() {
        const checkMantenimientoDeLaSalud = this.page.locator('label[for="idRelacionInputLabel3"]')
        await checkMantenimientoDeLaSalud.click();
    }
    async eliminaSeleccionMantenimientoSalud() {
        const cobertura1 = 'Mantenimiento de la Salud FS';
        await this.page.locator(`text="${cobertura1}" >> xpath=ancestor::label//div[contains(@class,"IconCerrarConfiguracion")]`).click({ force: true });
    }
    async seleccionaServiciosOdontologicos() {
        const checkServiciosOdontologicos = this.page.locator('label[for="idRelacionInputLabel2"]')
        await checkServiciosOdontologicos.click();
    }
    async eliminaSeleccionServiciosOdontologicos() {
        const cobertura1 = 'Servicios Odontológicos FS';
        await this.page.locator(`text="${cobertura1}" >> xpath=ancestor::label//div[contains(@class,"IconCerrarConfiguracion")]`).click({ force: true });
    }
    async seleccionaUrgenciasMedicas() {
        const checkUrgenciasMedicas = this.page.locator('label[for="idRelacionInputLabel4"]')
        await checkUrgenciasMedicas.click();
    }
    async eliminaSeleccionUrgenciasMedicas() {
        const cobertura1 = 'Urgencias Médicas FS';
        await this.page.locator(`text="${cobertura1}" >> xpath=ancestor::label//div[contains(@class,"IconCerrarConfiguracion")]`).click({ force: true });
    }
    async seleccionaServiciosAuxiliares() {
        const checkServiciosAuxiliares = this.page.locator('label[for="idRelacionInputLabel12"]')
        await checkServiciosAuxiliares.click();
    }
    async eliminaServiciosAuxiliares() {
        const cobertura1 = 'Servicios Auxiliares de Diagnóstico FS';
        await this.page.locator(`text="${cobertura1}" >> xpath=ancestor::label//div[contains(@class,"IconCerrarConfiguracion")]`).click({ force: true });
    }
    async seleccionaSumaAseguradaCoberturas(SumaAsegurada: string) {
        await this.page.click('#sumaAseguradaCob');
        await this.page.selectOption('#sumaAseguradaCob', SumaAsegurada);
    }
    async seleccionaMedicamnetos() {
        const checkMedicamentos = this.page.locator('label[for="idRelacionInputLabel11"]')
        await checkMedicamentos.click();
    }
    async eliminaSeleccionMedicamentos() {
        const cobertura1 = 'Medicamentos FS';
        await this.page.locator(`text="${cobertura1}" >> xpath=ancestor::label//div[contains(@class,"IconCerrarConfiguracion")]`).click({ force: true });
    }
    async seleccionaSumaAseguradaMedicamentos(SumaAseguradaMedicamentos: string) {
        await this.page.click('#sumaAseguradaCobSub');
        await this.page.selectOption('#sumaAseguradaCobSub', SumaAseguradaMedicamentos);
    }
    async btnContinuar() {
        await this.page.click('#idContinuarConfiguracionSecundaSeccion');
    }
    async btnAtras() {
        await this.page.click('#idAtras2Configuracion');
    }



}