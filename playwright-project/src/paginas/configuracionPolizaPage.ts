import { Page } from "@playwright/test";

export class ConfiguracionPolizaPage{
    constructor(private readonly page:Page){}

    async btnConfigurarPoliza(){
        await this.page.click('#idContinuarConfiguracion');
    }
}