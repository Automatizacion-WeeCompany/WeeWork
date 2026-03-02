import { Page } from "@playwright/test";
import { id } from "../selectores/Selector.js";

import { seleccionarOpcionAleatoriaOriginal } from "../utilidades/SelectAleatoreo.js";
import { seleccionarAnoMayor18 } from "../utilidades/SelectAleatoreo.js";

// Importacion dinamica para ESM module compatible con CommonJS environment
const fakerPromise = import('@faker-js/faker');

export class CotizacionIndividualPage {
    constructor(private readonly page: Page) { }

    async inputNombres() {
        const { fakerES_MX } = await fakerPromise;
        const nombreTitular = fakerES_MX.person.firstName();
        await this.page.locator(id.fill_nombre).focus();
        await this.page.waitForTimeout(120);
        await this.page.locator(id.fill_nombre).pressSequentially(nombreTitular, { delay: 70 });
    }
    async inputApellidoPaterno() {
        const { fakerES_MX } = await fakerPromise;
        const apellidoPaterno = fakerES_MX.person.lastName();
        await this.page.locator(id.fill_a_paterno).focus();
        await this.page.waitForTimeout(120);
        await this.page.locator(id.fill_a_paterno).pressSequentially(apellidoPaterno, { delay: 70 });
    }
    async inputApellidoMaterno() {
        const { fakerES_MX } = await fakerPromise;
        const apellidoMaterno = fakerES_MX.person.middleName();
        await this.page.locator(id.fill_a_materno).focus();
        await this.page.waitForTimeout(120);
        await this.page.locator(id.fill_a_materno).pressSequentially(apellidoMaterno, { delay: 70 });
    }
    async btnSexoHombre() {
        await this.page.click('label[for="idRelacionInputLabel2"]');
    }
    async btnSexoMujer() {
        await this.page.click('label[for="idRelacionInputLabel1"]');
    }
    async seleccionaDiaNacimiento() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDiaNacFlexTitular');
    }
    async seleccionaMesNacimiento() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectMesNacFlexTitular');
    }
    async seleccionaAnioNacimiento() {
        await seleccionarAnoMayor18(this.page, '#selectAnoNacFlexTitular');
    }
    async inputCorreo() {
        const { fakerES_MX } = await fakerPromise;
        const correo = fakerES_MX.internet.email({ provider: 'yopmail.com' });
        await this.page.locator('#FlexSalud_Correo').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#FlexSalud_Correo').pressSequentially(correo, { delay: 70 });
    }
    async inputTelefono() {
        const telefono = "2890174012";
        await this.page.locator('#FlexSalud_Telefono').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#FlexSalud_Telefono').pressSequentially(telefono, { delay: 70 });
        // use keyboard.press which accepts a single key argument
        await this.page.keyboard.press('Tab');
    }
    async checkNo() {
        const checkFuncionesublicas = this.page.locator('label[for="box_checkboxExample_NO"]');
        await checkFuncionesublicas.click();
    }
    async checkSi() {
        await this.page.check('#box_checkboxExample_NO');
    }
    async btnPersonalizarMiSeguro() {
        await this.page.click('#idBtnContinuarPersonalizacion');
    }
}