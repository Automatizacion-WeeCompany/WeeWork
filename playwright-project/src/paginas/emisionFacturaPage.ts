import { Page } from "@playwright/test";

export class EmisionFacturaPage{
    constructor(private readonly page:Page){}

    async seleccionaRegimenFiscal(){
        await this.page.selectOption('#RegimenFiscal','Sueldos y Salarios e Ingresos Asimilados a Salarios');
    }
    async clicBtnSiguiente(){
        await this.page.click('#ValidaDatosFiscales');
    }
}