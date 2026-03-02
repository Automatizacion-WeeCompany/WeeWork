import { Page } from "@playwright/test";
import { id } from "../selectores/Selector.js";

export class InicioCotizadorPage{
    constructor(private readonly page: Page){}

    async btnCotizacionAmi(){
        await this.page.click(id.btn_a_mi);
    }
    async btnCoatizacionAmiFamilia(){
        await this.page.click(id.btn_a_mi_y_mi_familia);
    }
    async checkTerminosYCondiciones(){
        const checkTerminos = this.page.locator('label[for="checkTerminos"]');
        await this.page.waitForFunction((el: any) => !el.disabled, await checkTerminos.elementHandle(), { timeout: 10000 });
        await checkTerminos.click();
    }
    async btnSiguiente(){
        await this.page.click('#btnPasoUnoAdd');
    }
}