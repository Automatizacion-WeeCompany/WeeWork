import { Page } from "@playwright/test";
const fakerPromise = import('@faker-js/faker');
import { seleccionarOpcionAleatoriaOriginal } from "src/utilidades/SelectAleatoreo";

export class FamiliaresPolizaFamPageFam1 {
    constructor(private readonly page: Page) { }

    async ingresaNombreFamiliar1() {
        const { fakerES_MX } = await fakerPromise;
        const apellidoMaterno = fakerES_MX.person.lastName();
        await this.page.locator('#idNombreFmiliar1').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#idNombreFmiliar1').pressSequentially(apellidoMaterno, { delay: 70 });
    }
    async seleccionaAnioFamiliar1() {
        await this.page.click('#selectNacAnioFlexSalud1');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectNacAnioFlexSalud1');
    }
    async seleccionaMesFamiliar1() {
        await this.page.click('#selectMesNacFlexSalud1');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectMesNacFlexSalud1');
    }
    async seleccionaDiaFamiliar1() {
        await this.page.click('#selectDiaNacFlexSalud1');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDiaNacFlexSalud1');
    }
    async seleccionaSexoFamiliar1() {
        await this.page.click('#FlexSalud_generoFamiliar1');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_generoFamiliar1');
    }
    async seleccionaParentescoFamiliar1() {
        await this.page.click('#FlexSalud_ParentescoFamiliar1');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_ParentescoFamiliar1');
    }
    async btnAgregarFamiliar() {
        await this.page.click('#lbl_masfamiliares');
    }
}

export class FamiliaresPolizaFamPageFam2 {
    constructor(private readonly page: Page) { }

    async ingresaNombreFamiliar2() {
        const { fakerES_MX } = await fakerPromise;
        const apellidoMaterno = fakerES_MX.person.lastName();
        await this.page.locator('#idNombreFmiliar2').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#idNombreFmiliar2').pressSequentially(apellidoMaterno, { delay: 70 });
    }
    async seleccionaAnioFamiliar2() {
        await this.page.click('#selectNacAnioFlexSalud2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectNacAnioFlexSalud2');
    }
    async seleccionaMesFamiliar2() {
        await this.page.click('#selectMesNacFlexSalud2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectMesNacFlexSalud2');
    }
    async seleccionaDiaFamiliar2() {
        await this.page.click('#selectDiaNacFlexSalud2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDiaNacFlexSalud2');
    }
    async seleccionaSexoFamiliar2() {
        await this.page.click('#FlexSalud_generoFamiliar2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_generoFamiliar2');
    }
    async seleccionaParentescoFamiliar2() {
        await this.page.click('#FlexSalud_ParentescoFamiliar2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_ParentescoFamiliar2');
    }
    async btnAgregarFamiliar() {
        await this.page.click('#lbl_masfamiliares');
    }
}

export class FamiliaresPolizaFamPageFam3 {
    constructor(private readonly page: Page) { }

    async ingresaNombreFamiliar3() {
        const { fakerES_MX } = await fakerPromise;
        const apellidoMaterno = fakerES_MX.person.lastName();
        await this.page.locator('#idNombreFmiliar3').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#idNombreFmiliar3').pressSequentially(apellidoMaterno, { delay: 70 });
    }
    async seleccionaAnioFamiliar3() {
        await this.page.click('#selectNacAnioFlexSalud3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectNacAnioFlexSalud3');
    }
    async seleccionaMesFamiliar3() {
        await this.page.click('#selectMesNacFlexSalud3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectMesNacFlexSalud3');
    }
    async seleccionaDiaFamiliar3() {
        await this.page.click('#selectDiaNacFlexSalud3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDiaNacFlexSalud3');
    }
    async seleccionaSexoFamiliar3() {
        await this.page.click('#FlexSalud_generoFamiliar3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_generoFamiliar3');
    }
    async seleccionaParentescoFamiliar3() {
        await this.page.click('#FlexSalud_ParentescoFamiliar3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_ParentescoFamiliar3');
    }
    async btnAgregarFamiliar() {
        await this.page.click('#lbl_masfamiliares');
    }
}

export class FamiliaresPolizaFamPageFam4 {
    constructor(private readonly page: Page) { }

    async ingresaNombreFamiliar4() {
        const { fakerES_MX } = await fakerPromise;
        const apellidoMaterno = fakerES_MX.person.lastName();
        await this.page.locator('#idNombreFmiliar4').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#idNombreFmiliar4').pressSequentially(apellidoMaterno, { delay: 70 });
    }
    async seleccionaAnioFamiliar4() {
        await this.page.click('#selectNacAnioFlexSalud4');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectNacAnioFlexSalud4');
    }
    async seleccionaMesFamiliar4() {
        await this.page.click('#selectMesNacFlexSalud4');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectMesNacFlexSalud4');
    }
    async seleccionaDiaFamiliar4() {
        await this.page.click('#selectDiaNacFlexSalud4');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDiaNacFlexSalud4');
    }
    async seleccionaSexoFamiliar4() {
        await this.page.click('#FlexSalud_generoFamiliar4');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_generoFamiliar4');
    }
    async seleccionaParentescoFamiliar4() {
        await this.page.click('#FlexSalud_ParentescoFamiliar4');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_ParentescoFamiliar4');
    }
    async btnAgregarFamiliar() {
        await this.page.click('#lbl_masfamiliares');
    }
}

export class FamiliaresPolizaFamPageFam5 {
    constructor(private readonly page: Page) { }

    async ingresaNombreFamiliar5() {
        const { fakerES_MX } = await fakerPromise;
        const apellidoMaterno = fakerES_MX.person.lastName();
        await this.page.locator('#idNombreFmiliar5').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('#idNombreFmiliar5').pressSequentially(apellidoMaterno, { delay: 70 });
    }
    async seleccionaAnioFamiliar5() {
        await this.page.click('#selectNacAnioFlexSalud5');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectNacAnioFlexSalud5');
    }
    async seleccionaMesFamiliar5() {
        await this.page.click('#selectMesNacFlexSalud5');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectMesNacFlexSalud5');
    }
    async seleccionaDiaFamiliar5() {
        await this.page.click('#selectDiaNacFlexSalud5');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDiaNacFlexSalud5');
    }
    async seleccionaSexoFamiliar5() {
        await this.page.click('#FlexSalud_generoFamiliar5');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_generoFamiliar5');
    }
    async seleccionaParentescoFamiliar5() {
        await this.page.click('#FlexSalud_ParentescoFamiliar5');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#FlexSalud_ParentescoFamiliar5');
    }
}