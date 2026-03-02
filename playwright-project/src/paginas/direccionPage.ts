import { getFaker } from "../utilidades/FakerHelper";
import { Page } from "@playwright/test";
import { seleccionarOpcionAleatoriaOriginal } from "src/utilidades/SelectAleatoreo";

export class CapturaDireccionPage {
    constructor(private readonly page: Page) { }

    async ingresaCalle() {
        const faker = await getFaker();
        const direccion = faker.location.county();
        await this.page.fill('#calleDatosFlexSalud', direccion);
    }
    async ingresaNoExterior() {
        const faker = await getFaker();
        const noExterior = faker.location.buildingNumber();
        await this.page.fill('#noExtDatosFlexSalud', noExterior);
    }
    async ingresaNoInterior() {
        const faker = await getFaker();
        const noInterior = faker.location.buildingNumber();
        await this.page.fill('#noIntDatosFlexSalud', noInterior);
    }
    async ingresaCP(CP: string) {
        await this.page.fill('#CPDireccionFlexSalud', CP);
    }
    async seleccionaEntidadNacimiento() {
        await this.page.click('#selectEntidadNacFlex');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEntidadNacFlex');
    }
    async seleccionaColonia() {
        await this.page.click('#selectColonia0');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectColonia0');
    }
    async clicBtnContinuar() {
        await this.page.click('#ValidaDireccionTitular');
    }
    async clicBtnAtras() {
        await this.page.click('#idAtrasDireccion');
    }
}