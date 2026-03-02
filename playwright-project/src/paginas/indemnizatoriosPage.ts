import { Page } from "@playwright/test";

export class IndemnizatoriosPage {
    constructor(private readonly page: Page) { }

    async seleccionaRecuperacion() {
        const cardRecuperacion = this.page.locator('label[for="idRelacionInputLabelSec21"]');
        await cardRecuperacion.click();
    }
    async seleccionaNumeroIntervenciones67() {
        const check67 = this.page.locator('label[for="checkProtesis23"]');
        await check67.click();
    }
    async seleccionaNumeroIntervenciones90() {
        const check90 = this.page.locator('label[for="checkProtesis24"]');
        await check90.click();
    }
    async seleccionaSumaAseguradaRecuperacion(SumaAseguradaRecuperacion: string) {
        await this.page.click('#recuperacionEsquemaSuma');
        await this.page.selectOption('#recuperacionEsquemaSuma', SumaAseguradaRecuperacion.toString());
    }
    async seleccionaRentaHospitalaria() {
        const cardRentaHospitalaria = this.page.locator('label[for="idRelacionInputLabelSec31"]');
        await cardRentaHospitalaria.click();
    }
    async seleccionaRentaDiariaHospitalizacion(RentaDiariaHospitalizacion: string) {
        await this.page.click('#rentaHospSelect');
        console.log(RentaDiariaHospitalizacion);
        await this.page.selectOption('#rentaHospSelect', RentaDiariaHospitalizacion);
    }
    async seleccionaInfarto() {
        const cardInfarto = this.page.locator('label[for="idRelacionInputLabelSec32"]');
        await cardInfarto.click();
    }
    async seleccionaEsquemaSumaAseguradaInfarto(SumaAseguradaInfarto: string) {
        await this.page.click('#ddl_divinfarto');
        await this.page.selectOption('#ddl_divinfarto', SumaAseguradaInfarto);
    }
    async seleccionaOncologia() {
        const cardOncologia = this.page.locator('label[for="idRelacionInputLabelSec24"]');
        await cardOncologia.click();
    }
    async seleccionaOncologiaTotal() {
        const checkOncologiaTotal = this.page.locator('label[for="box_checkboxCancer33"]');
        await checkOncologiaTotal.click();
    }
    async seleccionaOncologiaEsencial() {
        const checkOncologiaEsencial = this.page.locator('label[for="box_checkboxCancer34"]');
        await checkOncologiaEsencial.click();
    }
    async seleccionaEsquemaSumaaseguradaOncologia(EsquemaSumaAseguradaOncologia: string) {
        await this.page.click('#ddlSumaAseguradaCancer');
        await this.page.selectOption('#ddlSumaAseguradaCancer', EsquemaSumaAseguradaOncologia);
    }
    async clicBtnContinuar() {
        await this.page.click('#idConfiguracionContinuarPago');
    }
    async cierraModalRecuerdaQue() {
        await this.page.click('#Btn_entendidoModal_recuerdaque');
    }
}