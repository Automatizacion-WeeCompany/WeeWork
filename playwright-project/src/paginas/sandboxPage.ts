import { Page } from "@playwright/test";

export class SandboxPage{
    constructor(private readonly page:Page){}

    async BtnEnviar(){
        await this.page.click('#SendButton');
    }
}