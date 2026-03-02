import { Page } from "@playwright/test";

export class RevisionInformacionPagoPage {
    constructor(private readonly page: Page) { }

    async seleccionaPagoYAseguradoMismaPersona(PersonaPago: string) {
        await this.page.selectOption('#Flexsalud_PersonaPaga', PersonaPago);
    }
    async seleccionaNecesitasFacturaSi() {
        const checkNecesitasFacturaSI = this.page.locator('label[for="box_checkboxFacturaSi"]');
        await checkNecesitasFacturaSI.click();
    }
    async seleccionaNecesitasFacturaNo() {
        const checkNecesitasFacturaNO = this.page.locator('label[for="box_checkboxFacturaNo"]');
        await checkNecesitasFacturaNO.click();
    }
    async ingresaTitularDeTarjeta() {
        await this.page.locator('#txt_Nombre_Titular').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#txt_Nombre_Titular').pressSequentially('Carlos Prueba Robot', { delay: 70 });
    }
    async ingresaNumeroTarjeta() {
        await this.page.locator('#txt_Numero_Tarjeta').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#txt_Numero_Tarjeta').pressSequentially('5105105105105100', { delay: 70 });
    }
    async ingresaMesTarjeta() {
        await this.page.locator('#txt_Mes').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#txt_Mes').pressSequentially('12', { delay: 70 });
    }
    async ingresaAnioTarjeta() {
        await this.page.locator('#txt_Anno').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#txt_Anno').pressSequentially('29', { delay: 70 });
    }
    async ingresaCVV() {
        await this.page.locator('#txt_Cdx_Tar').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#txt_Cdx_Tar').pressSequentially('123', { delay: 70 });
    }
    async ingresaCorreoPago() {
        await this.page.locator('#txt_Correo_Titular').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#txt_Correo_Titular').pressSequentially('pruebasflexrobot@yopmail.com', { delay: 70 });
    }
    async seleccionaComoDeseasPagarlos(MesesDePago: string) {
        await this.page.click('#MensualidadesPago');
        await this.page.selectOption('#MensualidadesPago', MesesDePago);
    }
    async checkTerminosYCondiciones() {
        const checkTerminos = this.page.locator('label[for="checkTerminos"]');
        await this.page.waitForFunction((el: any) => !el.disabled, await checkTerminos.elementHandle(), { timeout: 10000 });
        await checkTerminos.click();
    }
    async btnPagar() {
        await this.page.click('#idPagar');
    }
    async btnAtras() {
        await this.page.click('#idAtrasPago');
    }
    async btnPagarModalConfirmacion() {
        await this.page.click('#idConfirmPagoModal');
    }
    async btnAtrasModalConfirmacion() {
        await this.page.click('.MarginBot15px.HideMovil');
    }
}