import { getFaker } from "../utilidades/FakerHelper";
import { Page } from "@playwright/test";
import { seleccionarOpcionAleatoriaOriginal, seleccionarYVerificar } from "src/utilidades/SelectAleatoreo";

export class CompletarDatosPolizaage {
    constructor(private readonly page: Page) { };

    async seleccionaEstadoCivil(EstadoCivil: string) {
        await this.page.selectOption('#estadoCivilPagaFlexSalud', EstadoCivil);
    }
    async seleccionaEntidadNacimiento(Entidad: string) {
        await this.page.locator('#selectEntidadNacFlex').focus();
        await this.page.click('#selectEntidadNacFlex');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEntidadNacFlex');
    }
    async clicBtnAgregarOtroBeneficiario() {
        await this.page.click('#addBeneficiario');
    }
    async btnContinuar() {
        await this.page.click('#ValidaDatosTitular');
    }
}

export class Beneficiario1Page {
    constructor(private readonly page: Page) { }

    async ingresaNombreBeneficiario1() {
        const faker = await getFaker();
        const NombreBeneficiario1 = faker.person.firstName();
        await this.page.locator('input.NombreBeneficiario').nth(0).fill(NombreBeneficiario1);
    }
    async ingresaApellidoPaternoBeneficiario1() {
        const faker = await getFaker();
        const ApellidoPaternoBeneficiario1 = faker.person.lastName();
        await this.page.locator('input.ApellidoPaternoBeneficiario').nth(0).fill(ApellidoPaternoBeneficiario1);
    }
    async ingresaApellidoMaternoBeneficiario1() {
        const faker = await getFaker();
        const ApellidoMaternoBeneficiario1 = faker.person.middleName();
        await this.page.locator('input.ApellidoMaternoBeneficiario').nth(0).fill(ApellidoMaternoBeneficiario1);
    }
    async seleccionaAnioNacimiento() {
        await this.page.click('#selectAno1');
        await seleccionarOpcionAleatoriaOriginal(this.page, "#selectAno1");
    }
    async seleccionaMesNacimiento() {
        await this.page.click('.selectMesNacFlex');
        await seleccionarOpcionAleatoriaOriginal(this.page, ".selectMesNacFlex");
    }
    async seleccionaDiaNacimiento() {
        await this.page.click('#selectDia1');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDia1');
    }
    async seleccionaSexo(SexoBeneficiario1: string) {
        await this.page.click('.selectSexo');
        await this.page.selectOption('.selectSexo', SexoBeneficiario1);
    }
    async seleccionaEntidadNacimiento() {
        await this.page.click('#selectEdo1', { delay: 500 });
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEdo1');
    }
    async seleccionaParentescoBeneficiario1() {
        await this.page.click('#selectParentesco1');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectParentesco1');
    }
    async ingresaPorcentaje(Porcentaje: string) {
        await this.page.fill('.PorcentajeBeneficiario', Porcentaje.toString());
    }
    async ingresaNumeroTelefonoBeneficiario1() {
        const faker = await getFaker();
        const Numerobeneficiario1 = faker.string.numeric(10);
        await this.page.fill('.TelefonoBeneficiario', Numerobeneficiario1);
    }
    async ingresaCorreoBeneficiario1() {
        const faker = await getFaker();
        const CorreoBeneficiario1 = faker.internet.email({ provider: 'yopmail.com' });
        await this.page.locator('.CorreoBeneficiario').focus();
        await this.page.waitForTimeout(120);
        await this.page.locator('.CorreoBeneficiario').pressSequentially(CorreoBeneficiario1, { delay: 70 });
    }
    async ingresaCalleBeneficiario1() {
        const faker = await getFaker();
        const CalleBeneficiario1 = faker.location.street();
        await this.page.fill('.CalleBeneficiario', CalleBeneficiario1);
    }
    async ingresaNoExterior() {
        const faker = await getFaker();
        const NoExterior = faker.location.buildingNumber();
        await this.page.fill('.NoExteriorBeneficiario', NoExterior);
    }
    async ingresaNoInterior() {
        const faker = await getFaker();
        const NoInterior = faker.location.secondaryAddress();
        await this.page.fill('.NoInteriorBeneficiario', NoInterior);
    }
    async ingresaCP() {
        //const CPBeneficiario1 = faker.location.zipCode(); se genera el valor de manera random pero tiene dependencia
        await this.page.fill('#CPBeneficiario', '55510')
    }
    async seleccionaColonia() {
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectColonia1');
    }
}

export class Beneficiario2Page {
    constructor(private readonly page: Page) { }

    async ingresaNombreBeneficiario2() {
        const faker = await getFaker();
        const NombreBeneficiario2 = faker.person.firstName();
        await this.page.locator('input.NombreBeneficiario').nth(1).fill(NombreBeneficiario2);
    }
    async ingresaApellidoPaternoBeneficiario2() {
        const faker = await getFaker();
        const ApellidoPaternoBeneficiario2 = faker.person.lastName();
        await this.page.locator('input.ApellidoPaternoBeneficiario').nth(1).fill(ApellidoPaternoBeneficiario2);
    }
    async ingresaApellidoMaternoBeneficiario2() {
        const faker = await getFaker();
        const ApellidoMaternoBeneficiario2 = faker.person.middleName();
        await this.page.locator('input.ApellidoMaternoBeneficiario').nth(1).fill(ApellidoMaternoBeneficiario2);
    }
    async seleccionaAnioNacimiento2() {
        await this.page.click('#selectAno2');
        await seleccionarOpcionAleatoriaOriginal(this.page, "#selectAno2");
    }
    async seleccionaMesNacimiento2() {
        const MesNacimiento = this.page.locator('.selectMesNacFlex').nth(1);
        await MesNacimiento.click();
        await this.page.locator('.selectMesNacFlex').nth(1).selectOption('Marzo');
    }
    async seleccionaDiaNacimiento2() {
        await this.page.click('#selectDia2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDia2');
    }
    async seleccionaSexo2(SexoBeneficiario2: string) {
        const SexoBeneficiariodos = this.page.locator('.selectSexo').nth(1);
        await SexoBeneficiariodos.click();
        await this.page.locator('.selectSexo').nth(1).selectOption(SexoBeneficiario2);
    }
    async seleccionaEntidadNacimiento2() {
        await this.page.click('#selectEdo2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEdo2');
    }
    async seleccionaParentescoBeneficiario2() {
        await this.page.click('#selectParentesco2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectParentesco2');
    }
    async ingresaPorcentaje(Porcentaje: string) {
        await this.page.locator('.PorcentajeBeneficiario').nth(1).fill(Porcentaje);
    }
    async ingresaNumeroTelefonoBeneficiario2() {
        const faker = await getFaker();
        const Numerobeneficiario2 = faker.string.numeric(10);
        await this.page.locator('.TelefonoBeneficiario').nth(1).fill(Numerobeneficiario2);
    }
    async ingresaCorreoBeneficiario2() {
        const faker = await getFaker();
        const CorreoBeneficiario2 = faker.internet.email({ provider: 'yopmail.com' });
        await this.page.locator('.CorreoBeneficiario').nth(1).fill(CorreoBeneficiario2);
    }
    async ingresaCalleBeneficiario2() {
        const faker = await getFaker();
        const CalleBeneficiario2 = faker.location.street();
        await this.page.locator('.CalleBeneficiario').nth(1).fill(CalleBeneficiario2);
    }
    async ingresaNoExterior2() {
        const faker = await getFaker();
        const NoExterior = faker.location.buildingNumber();
        await this.page.locator('.NoExteriorBeneficiario').nth(1).fill(NoExterior.toString());
    }
    async ingresaNoInterior2() {
        const faker = await getFaker();
        const NoInterior = faker.location.secondaryAddress();
        await this.page.locator('.NoInteriorBeneficiario').nth(1).fill(NoInterior);
    }
    async ingresaCP2() {
        //const CPBeneficiario1 = faker.location.zipCode(); se genera el valor de manera random pero tiene dependencia
        await this.page.locator('#CPBeneficiario').nth(1).fill('55510')
    }
    async seleccionaColonia2() {
        await this.page.click('#selectColonia2');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectColonia2');
    }
    async clicBtnAgregarOtroBeneficiario() {
        await this.page.click('#addBeneficiario');
    }
}

export class Beneficiario3Page {
    constructor(private readonly page: Page) { }

    async ingresaNombreBeneficiario3() {
        const faker = await getFaker();
        const NombreBeneficiario3 = faker.person.firstName();
        await this.page.locator('input.NombreBeneficiario').nth(2).fill(NombreBeneficiario3);
    }
    async ingresaApellidoPaternoBeneficiario3() {
        const faker = await getFaker();
        const ApellidoPaternoBeneficiario3 = faker.person.lastName();
        await this.page.locator('input.ApellidoPaternoBeneficiario').nth(2).fill(ApellidoPaternoBeneficiario3);
    }
    async ingresaApellidoMaternoBeneficiario3() {
        const faker = await getFaker();
        const ApellidoMaternoBeneficiario3 = faker.person.middleName();
        await this.page.locator('input.ApellidoMaternoBeneficiario').nth(2).fill(ApellidoMaternoBeneficiario3);
    }
    async seleccionaAnioNacimiento3() {
        await this.page.click('#selectAno3');
        await seleccionarOpcionAleatoriaOriginal(this.page, "#selectAno3");
    }
    async seleccionaMesNacimiento3() {
        const MesNacimiento = this.page.locator('.selectMesNacFlex').nth(2);
        await MesNacimiento.click();
        await this.page.locator('.selectMesNacFlex').nth(2).selectOption('Marzo');
    }
    async seleccionaDiaNacimiento3() {
        await this.page.click('#selectDia3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDia3');
    }
    async seleccionaSexo3(SexoBeneficiario3: string) {
        const SexoBeneficiariodos = this.page.locator('.selectSexo').nth(2);
        await SexoBeneficiariodos.click();
        await this.page.locator('.selectSexo').nth(2).selectOption(SexoBeneficiario3);
    }
    async seleccionaEntidadNacimiento3() {
        await this.page.click('#selectEdo3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEdo3');
    }
    async seleccionaParentescoBeneficiario3() {
        await this.page.click('#selectParentesco3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectParentesco3');
    }
    async ingresaPorcentaje(Porcentaje: string) {
        await this.page.locator('.PorcentajeBeneficiario').nth(2).fill(Porcentaje);
    }
    async ingresaNumeroTelefonoBeneficiario3() {
        const faker = await getFaker();
        const Numerobeneficiario3 = faker.string.numeric(10);
        await this.page.locator('.TelefonoBeneficiario').nth(2).fill(Numerobeneficiario3);
    }
    async ingresaCorreoBeneficiario3() {
        const faker = await getFaker();
        const CorreoBeneficiario3 = faker.internet.email({ provider: 'yopmail.com' });
        await this.page.locator('.CorreoBeneficiario').nth(2).fill(CorreoBeneficiario3);
    }
    async ingresaCalleBeneficiario3() {
        const faker = await getFaker();
        const CalleBeneficiario3 = faker.location.street();
        await this.page.locator('.CalleBeneficiario').nth(2).fill(CalleBeneficiario3);
    }
    async ingresaNoExterior3() {
        const faker = await getFaker();
        const NoExterior = faker.location.buildingNumber();
        await this.page.locator('.NoExteriorBeneficiario').nth(2).fill(NoExterior.toString());
    }
    async ingresaNoInterior3() {
        const faker = await getFaker();
        const NoInterior = faker.location.secondaryAddress();
        await this.page.locator('.NoInteriorBeneficiario').nth(2).fill(NoInterior);
    }
    async ingresaCP3() {
        //const CPBeneficiario1 = faker.location.zipCode(); se genera el valor de manera random pero tiene dependencia
        await this.page.locator('#CPBeneficiario').nth(2).fill('55510')
    }
    async seleccionaColonia3() {
        await this.page.click('#selectColonia3');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectColonia3');
    }
    async clicBtnAgregarOtroBeneficiario() {
        await this.page.click('#addBeneficiario');
    }
}

export class Beneficiario4Page {
    constructor(private readonly page: Page) { }

    async ingresaNombreBeneficiario4() {
        const faker = await getFaker();
        const NombreBeneficiario4 = faker.person.firstName();
        await this.page.locator('input.NombreBeneficiario').nth(3).fill(NombreBeneficiario4);
    }
    async ingresaApellidoPaternoBeneficiario4() {
        const faker = await getFaker();
        const ApellidoPaternoBeneficiario4 = faker.person.lastName();
        await this.page.locator('input.ApellidoPaternoBeneficiario').nth(3).fill(ApellidoPaternoBeneficiario4);
    }
    async ingresaApellidoMaternoBeneficiario4() {
        const faker = await getFaker();
        const ApellidoMaternoBeneficiario4 = faker.person.middleName();
        await this.page.locator('input.ApellidoMaternoBeneficiario').nth(3).fill(ApellidoMaternoBeneficiario4);
    }
    async seleccionaAnioNacimiento4() {
        await this.page.click('#selectAno4');
        await seleccionarOpcionAleatoriaOriginal(this.page, "#selectAno4");
    }
    async seleccionaMesNacimiento4() {
        const MesNacimiento = this.page.locator('.selectMesNacFlex').nth(3);
        await MesNacimiento.click();
        await this.page.locator('.selectMesNacFlex').nth(3).selectOption('Marzo');
    }
    async seleccionaDiaNacimiento4() {
        await this.page.locator('#selectDia4').click();
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDia4');
    }
    async seleccionaSexo4(SexoBeneficiario4: string) {
        await this.page.locator('.selectSexo').nth(3).click();
        await this.page.locator('.selectSexo').nth(3).selectOption(SexoBeneficiario4);
    }
    async seleccionaEntidadNacimiento4() {
        await this.page.locator('#selectEdo4').click();
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEdo4');
    }
    async seleccionaParentescoBeneficiario4() {
        await this.page.locator('#selectParentesco4').click();
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectParentesco4');
    }
    async ingresaPorcentaje(Porcentaje: string) {
        await this.page.locator('.PorcentajeBeneficiario').nth(3).fill(Porcentaje);
    }
    async ingresaNumeroTelefonoBeneficiario4() {
        const faker = await getFaker();
        const Numerobeneficiario4 = faker.string.numeric(10);
        await this.page.locator('.TelefonoBeneficiario').nth(3).fill(Numerobeneficiario4);
    }
    async ingresaCorreoBeneficiario4() {
        const faker = await getFaker();
        const CorreoBeneficiario4 = faker.internet.email({ provider: 'yopmail.com' });
        await this.page.locator('.CorreoBeneficiario').nth(3).fill(CorreoBeneficiario4);
    }
    async ingresaCalleBeneficiario4() {
        const faker = await getFaker();
        const CalleBeneficiario4 = faker.location.street();
        await this.page.locator('.CalleBeneficiario').nth(3).fill(CalleBeneficiario4);
    }
    async ingresaNoExterior4() {
        const faker = await getFaker();
        const NoExterior = faker.location.buildingNumber();
        await this.page.locator('.NoExteriorBeneficiario').nth(3).fill(NoExterior);
    }
    async ingresaNoInterior4() {
        const faker = await getFaker();
        const NoInterior = faker.location.secondaryAddress();
        await this.page.locator('.NoInteriorBeneficiario').nth(3).fill(NoInterior);
    }
    async ingresaCP4() {
        //const CPBeneficiario1 = faker.location.zipCode(); se genera el valor de manera random pero tiene dependencia
        await this.page.locator('#CPBeneficiario').nth(3).fill('55510')
    }
    async seleccionaColonia4() {
        await this.page.click('#selectColonia4');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectColonia4');
    }
    async clicBtnAgregarOtroBeneficiario() {
        await this.page.click('#addBeneficiario');
    }
}
export class Beneficiario5Page {
    constructor(private readonly page: Page) { }

    async ingresaNombreBeneficiario5() {
        const faker = await getFaker();
        const NombreBeneficiario5 = faker.person.firstName();
        await this.page.locator('input.NombreBeneficiario').nth(4).fill(NombreBeneficiario5);
    }
    async ingresaApellidoPaternoBeneficiario5() {
        const faker = await getFaker();
        const ApellidoPaternoBeneficiario5 = faker.person.lastName();
        await this.page.locator('input.ApellidoPaternoBeneficiario').nth(4).fill(ApellidoPaternoBeneficiario5);
    }
    async ingresaApellidoMaternoBeneficiario5() {
        const faker = await getFaker();
        const ApellidoMaternoBeneficiario5 = faker.person.middleName();
        await this.page.locator('input.ApellidoMaternoBeneficiario').nth(4).fill(ApellidoMaternoBeneficiario5);
    }
    async seleccionaAnioNacimiento5() {
        await this.page.locator('#selectAno5').click();
        await seleccionarOpcionAleatoriaOriginal(this.page, "#selectAno5");
    }
    async seleccionaMesNacimiento5() {
        const MesNacimiento = this.page.locator('.selectMesNacFlex').nth(4);
        await MesNacimiento.click();
        await this.page.locator('.selectMesNacFlex').nth(4).selectOption('Marzo');
    }
    async seleccionaDiaNacimiento5() {
        await this.page.locator('#selectDia5').click();
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectDia5');
    }
    async seleccionaSexo5(SexoBeneficiario5: string) {
        await this.page.locator('.selectSexo').nth(4).click();
        await this.page.locator('.selectSexo').nth(4).selectOption(SexoBeneficiario5);
    }
    async seleccionaEntidadNacimiento5() {
        await this.page.locator('#selectEdo5').click();
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectEdo5');
    }
    async seleccionaParentescoBeneficiario5() {
        await this.page.locator('#selectParentesco5').click();
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectParentesco5');
    }
    async ingresaPorcentaje5(Porcentaje: string) {
        await this.page.locator('.PorcentajeBeneficiario').nth(4).fill(Porcentaje);
    }
    async ingresaNumeroTelefonoBeneficiario5() {
        const faker = await getFaker();
        const Numerobeneficiario5 = faker.string.numeric(10);
        await this.page.locator('.TelefonoBeneficiario').nth(4).fill(Numerobeneficiario5);
    }
    async ingresaCorreoBeneficiario5() {
        const faker = await getFaker();
        const CorreoBeneficiario5 = faker.internet.email({ provider: 'yopmail.com' });
        await this.page.locator('.CorreoBeneficiario').nth(4).fill(CorreoBeneficiario5);
    }
    async ingresaCalleBeneficiario5() {
        const faker = await getFaker();
        const CalleBeneficiario5 = faker.location.street();
        await this.page.locator('.CalleBeneficiario').nth(4).fill(CalleBeneficiario5);
    }
    async ingresaNoExterior5() {
        const faker = await getFaker();
        const NoExterior = faker.location.buildingNumber();
        await this.page.locator('.NoExteriorBeneficiario').nth(4).fill(NoExterior);
    }
    async ingresaNoInterior5() {
        const faker = await getFaker();
        const NoInterior = faker.location.secondaryAddress();
        await this.page.locator('.NoInteriorBeneficiario').nth(4).fill(NoInterior);
    }
    async ingresaCP5() {
        //const CPBeneficiario1 = faker.location.zipCode(); se genera el valor de manera random pero tiene dependencia
        await this.page.locator('#CPBeneficiario').nth(4).fill('55510')
    }
    async seleccionaColonia5() {
        await this.page.click('#selectColonia5');
        await seleccionarOpcionAleatoriaOriginal(this.page, '#selectColonia5');
    }
    async clicBtnAgregarOtroBeneficiario() {
        await this.page.locator('#addBeneficiario').click();
    }
}