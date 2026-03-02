import { Page } from "@playwright/test";
import { getFaker } from "../utilidades/FakerHelper";
import { seleccionarOpcionAleatoriaOriginal } from "src/utilidades/SelectAleatoreo";

export class CompletarDatosComplementoPolizaFamPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async ingresaApellidoPaterno() {
        const faker = await getFaker();
        const ApellidoPaternoComplementoPoliza = faker.person.firstName();
        await this.page.fill('#FlexSalud_ApellidoPaternoComplementaPoliza', ApellidoPaternoComplementoPoliza)
    }
    async ingresaApellidoMaterno() {
        const faker = await getFaker();
        const ApellidoMaternoComplementoPoliza = faker.person.lastName();
        await this.page.fill('#FlexSalud_ApellidoMaternoComplementaPoliza', ApellidoMaternoComplementoPoliza)
    }
    async seleccionaEstadoCivil() {
        await this.page.locator('#estadoCivilPagaFlexSalud').focus();
        await this.page.waitForTimeout(120);
        await this.page.selectOption('#estadoCivilPagaFlexSalud', 'Divorciado(a)');
    }
    async seleccionaEntidadNacimiento() {
        await this.page.click('#selectEntidadNacFlex');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEntidadNacFlex');
    }
    async ingresaCorreo() {
        const faker = await getFaker();
        const CorreoComplementoPoliza = faker.internet.email();
        await this.page.fill('#correoDatosPolFlexSalud', CorreoComplementoPoliza)
    }
    async ingresaTelefono() {
        const faker = await getFaker();
        const TelefonoComplementoPoliza = faker.string.numeric(10);
        await this.page.fill('#TelefonoDatosPolFlexSalud', TelefonoComplementoPoliza)
    }
    async ClickBtnEnviar() {
        await this.page.click('#ValidaDatosTitular');
    }
}
