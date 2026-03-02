import { Page } from "@playwright/test";
import { getFaker } from "../utilidades/FakerHelper";
import { seleccionarAnoMayor18 } from "../utilidades/SelectAleatoreo.js";
import { seleccionarOpcionAleatoriaOriginal } from "../utilidades/SelectAleatoreo.js";

export class CapturaInformacionpersonaQuePagaSeguroPage {
    constructor(private readonly page: Page) { }

    async ingresaNombrePaga() {
        const faker = await getFaker();
        const NombrePaga = faker.person.lastName();
        await this.page.locator('#nombrePersonaPagaFlexSalud').evaluate(el => (el as HTMLInputElement).value = '');
        await this.page.fill('#nombrePersonaPagaFlexSalud', NombrePaga);
    }
    async ingresaApellidoPaterno() {
        const faker = await getFaker();
        const apellidoPaternoPersonaPagp = faker.person.lastName();
        await this.page.fill('#apellidoPatPagaFlexSalud', apellidoPaternoPersonaPagp);
    }
    async ingresaApellidoMaterno() {
        const faker = await getFaker();
        const apellidoMaternoPeronaPago = faker.person.firstName();
        await this.page.fill('#apellidoMatPagaFlexSalud', apellidoMaternoPeronaPago);
    }
    async ingresaCorreoPaga() {
        const faker = await getFaker();
        const CorreoPaga = faker.internet.email({ provider: 'yopmail.com' });
        await this.page.locator('#correoPagaFlexSalud').evaluate(el => (el as HTMLInputElement).value = '');
        await this.page.fill('#correoPagaFlexSalud', CorreoPaga);
    }
    async ingresaTelefono() {
        const faker = await getFaker();
        const telefonoPersonaPaga = faker.phone.number();
        await this.page.fill('#telefonoPagaFlexSalud', telefonoPersonaPaga.toString());
    }
    async seleccionaAnioNacimiento() {
        await seleccionarAnoMayor18(this.page, '#selectAnoContratante');
    }
    async seleccionaMesNacimiento() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectMesContratante');
    }
    async seleccionaDiaNacimiento() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDiasContratante');
    }
    async seleccionaEstadoCivil() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEcivilContratante');
    }
    async seleccionaSexo() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#generoPagaFlexSalud');
    }
    async seleccionaEntidadNacimiento() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#entidadNacPagoFlexSalud');
    }
    async ingresaCalle() {
        const faker = await getFaker();
        const direccion = faker.location.county();
        await this.page.fill('#calleContratanteFlex', direccion);
    }
    async ingresaNoExterior() {
        const faker = await getFaker();
        const noExterior = faker.location.buildingNumber();
        await this.page.fill('#noExtContratanteFlex', noExterior);
    }
    async ingresaNoInterior() {
        const faker = await getFaker();
        const noInterior = faker.location.buildingNumber();
        await this.page.fill('#noIntContratanteFlex', noInterior);
    }
    async ingresaCP(CP: string) {
        await this.page.fill('#cpContratanteFlex', CP);
    }
    async seleccionaColonia() {
        await this.page.click('#selectColoniaContratante');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectColoniaContratante');
    }
    async clicBtnContinuar() {
        await this.page.click('#idInfoContratante');
    }
    async clicBtnAtras() {
        await this.page.click('#AtrasInfoContratante');
    }
}