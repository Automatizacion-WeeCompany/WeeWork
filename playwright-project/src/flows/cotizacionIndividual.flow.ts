import { Page, expect } from "@playwright/test";
import path from 'path';
import { CotizacionIndividualPage } from "@pages/cotizacionIndividualPage";
import { CoberturasGMPage } from "@pages/coberturasGMPage";
import { IndemnizatoriosPage } from "@pages/indemnizatoriosPage";
import { RevisionInformacionPagoPage } from "@pages/revisionInformacionPagoPage";
import { ConfiguracionPolizaPage } from "@pages/configuracionPolizaPage";
import { CompletarDatosPolizaage } from "@pages/completarDatosPolizaPage";
import { Beneficiario1Page } from "@pages/completarDatosPolizaPage";
import { Beneficiario2Page } from "@pages/completarDatosPolizaPage";
import { Beneficiario3Page } from "@pages/completarDatosPolizaPage";
import { Beneficiario4Page } from "@pages/completarDatosPolizaPage";
import { Beneficiario5Page } from "@pages/completarDatosPolizaPage";
import { FamiliaresPolizaFamPageFam1 } from "@pages/familiaresPolizaFamPage";
import { FamiliaresPolizaFamPageFam2 } from "@pages/familiaresPolizaFamPage";
import { FamiliaresPolizaFamPageFam3 } from "@pages/familiaresPolizaFamPage";
import { FamiliaresPolizaFamPageFam4 } from "@pages/familiaresPolizaFamPage";
import { FamiliaresPolizaFamPageFam5 } from "@pages/familiaresPolizaFamPage";
import { CapturaDireccionPage } from "@pages/direccionPage";
import { CapturaInformacionpersonaQuePagaSeguroPage } from "@pages/informacionpersonaQuePagaPage";
import { EmisionFacturaPage } from "@pages/emisionFacturaPage";
import { CompletarDatosComplementoPolizaFamPage } from "@pages/completarDatosComplementoPolizaFamPage";
import { SandboxPage } from "@pages/sandboxPage";
import { guardarExcelConfirmacionHistorico, obtenerDatosConfirmacion } from "src/utilidades/extraccionDatos";
import { guardarDatosEnExcel } from "src/utilidades/guardarDatosEnExcel";

export class CapturaDatosEligeElSeguro {
    capturaDeDatos: CotizacionIndividualPage;
    DatosFamiliar1: FamiliaresPolizaFamPageFam1;
    DatosFamiliar2: FamiliaresPolizaFamPageFam2;
    DatosFamiliar3: FamiliaresPolizaFamPageFam3;
    DatosFamiliar4: FamiliaresPolizaFamPageFam4;
    DatosFamiliar5: FamiliaresPolizaFamPageFam5;
    constructor(private readonly page: Page) {
        this.capturaDeDatos = new CotizacionIndividualPage(page);
        this.DatosFamiliar1 = new FamiliaresPolizaFamPageFam1(page);
        this.DatosFamiliar2 = new FamiliaresPolizaFamPageFam2(page);
        this.DatosFamiliar3 = new FamiliaresPolizaFamPageFam3(page);
        this.DatosFamiliar4 = new FamiliaresPolizaFamPageFam4(page);
        this.DatosFamiliar5 = new FamiliaresPolizaFamPageFam5(page);
    }

    async CapturaDatos(SexoSolicitante: string, TipoCotizacion: string, Familiar1: string, Familiar2: string, Familiar3: string, Familiar4: string, Familiar5: string) {
        await this.capturaDeDatos.inputNombres();
        await this.capturaDeDatos.inputApellidoPaterno();
        await this.capturaDeDatos.inputApellidoMaterno();
        if (SexoSolicitante === 'Hombre') {
            await this.capturaDeDatos.btnSexoHombre();
        } else if (SexoSolicitante === 'Mujer') {
            await this.capturaDeDatos.btnSexoMujer();
        }
        await this.capturaDeDatos.seleccionaAnioNacimiento();
        await this.capturaDeDatos.seleccionaMesNacimiento();
        await this.capturaDeDatos.seleccionaDiaNacimiento();
        await this.capturaDeDatos.inputCorreo();
        await this.capturaDeDatos.inputTelefono();
        if (TipoCotizacion === 'Familiar') {
            const TextoFamiliar = await this.page.locator('#DivDatosFamiliares1').filter({ hasText: 'Familiar' })
            await expect(TextoFamiliar).toBeVisible();
            if (TextoFamiliar) {
                if (Familiar1 === 'Si') {
                    await this.DatosFamiliar1.seleccionaAnioFamiliar1();
                    await this.DatosFamiliar1.seleccionaMesFamiliar1();
                    await this.DatosFamiliar1.seleccionaDiaFamiliar1();
                    await this.DatosFamiliar1.seleccionaSexoFamiliar1();
                    await this.DatosFamiliar1.seleccionaParentescoFamiliar1();
                    await this.DatosFamiliar1.ingresaNombreFamiliar1();
                }
                if (Familiar2 === 'Si') {
                    await this.DatosFamiliar1.btnAgregarFamiliar();
                    await this.DatosFamiliar2.seleccionaAnioFamiliar2();
                    await this.DatosFamiliar2.seleccionaMesFamiliar2();
                    await this.DatosFamiliar2.seleccionaDiaFamiliar2();
                    await this.DatosFamiliar2.seleccionaSexoFamiliar2();
                    await this.DatosFamiliar2.seleccionaParentescoFamiliar2();
                    await this.DatosFamiliar2.ingresaNombreFamiliar2();
                }
                if (Familiar3 === 'Si') {
                    await this.DatosFamiliar2.btnAgregarFamiliar();
                    await this.DatosFamiliar3.seleccionaAnioFamiliar3();
                    await this.DatosFamiliar3.seleccionaMesFamiliar3();
                    await this.DatosFamiliar3.seleccionaDiaFamiliar3();
                    await this.DatosFamiliar3.seleccionaSexoFamiliar3();
                    await this.DatosFamiliar3.seleccionaParentescoFamiliar3();
                    await this.DatosFamiliar3.ingresaNombreFamiliar3();
                }
                if (Familiar4 === 'Si') {
                    await this.DatosFamiliar3.btnAgregarFamiliar();
                    await this.DatosFamiliar4.seleccionaAnioFamiliar4();
                    await this.DatosFamiliar4.seleccionaMesFamiliar4();
                    await this.DatosFamiliar4.seleccionaDiaFamiliar4();
                    await this.DatosFamiliar4.seleccionaSexoFamiliar4();
                    await this.DatosFamiliar4.seleccionaParentescoFamiliar4();
                    await this.DatosFamiliar4.ingresaNombreFamiliar4();
                }
                if (Familiar5 === 'Si') {
                    await this.DatosFamiliar4.btnAgregarFamiliar();
                    await this.DatosFamiliar5.seleccionaAnioFamiliar5();
                    await this.DatosFamiliar5.seleccionaMesFamiliar5();
                    await this.DatosFamiliar5.seleccionaDiaFamiliar5();
                    await this.DatosFamiliar5.seleccionaSexoFamiliar5();
                    await this.DatosFamiliar5.seleccionaParentescoFamiliar5();
                    await this.DatosFamiliar5.ingresaNombreFamiliar5();
                }
            }
        }
        await this.capturaDeDatos.checkNo();
        await this.capturaDeDatos.btnPersonalizarMiSeguro();
    }
}

export class EligeTusCoberturas {
    eleccionCoberturas: CoberturasGMPage;
    constructor(private readonly page: Page) {
        this.eleccionCoberturas = new CoberturasGMPage(page);
    }

    async EleccionCoberturas(SumaAseg: string) {
        await this.eleccionCoberturas.cerrarModal();
        await this.eleccionCoberturas.seleccionaSumaAseguradaCoberturas(SumaAseg);
        await this.eleccionCoberturas.btnContinuar()
    }
    async EleccionCoberturasServiciosOdontologicos(SumaAseg: string) {
        await this.eleccionCoberturas.cerrarModal();
        await this.eleccionCoberturas.seleccionaServiciosOdontologicos();
        await this.eleccionCoberturas.seleccionaSumaAseguradaCoberturas(SumaAseg);
        await this.eleccionCoberturas.btnContinuar()
    }
    async EleccionCoberturasUrgenciasMedicas(SumaAseg: string) {
        await this.eleccionCoberturas.cerrarModal();
        await this.eleccionCoberturas.seleccionaUrgenciasMedicas();
        await this.eleccionCoberturas.seleccionaSumaAseguradaCoberturas(SumaAseg);
        await this.eleccionCoberturas.btnContinuar()
    }
    async EleccionCoberturasServiciosAuxiliares(SumaAseg: string) {
        await this.eleccionCoberturas.cerrarModal();
        await this.eleccionCoberturas.seleccionaServiciosAuxiliares();
        await this.eleccionCoberturas.seleccionaSumaAseguradaCoberturas(SumaAseg);
        await this.eleccionCoberturas.btnContinuar()
    }
    async EleccionCoberturasMedicamentos(SumaAseg: string, SumaMedicamentos: string) {
        await this.eleccionCoberturas.cerrarModal();
        await this.eleccionCoberturas.seleccionaMedicamnetos();
        await this.eleccionCoberturas.seleccionaSumaAseguradaCoberturas(SumaAseg);
        await this.eleccionCoberturas.seleccionaSumaAseguradaMedicamentos(SumaMedicamentos);
        await this.eleccionCoberturas.btnContinuar()
    }
    async SeleccionaTodosLosProductos(SumaAseg: string, SumaMedicamentos: string) {
        await this.eleccionCoberturas.cerrarModal();
        await this.eleccionCoberturas.seleccionaServiciosOdontologicos();
        await this.eleccionCoberturas.seleccionaUrgenciasMedicas();
        await this.eleccionCoberturas.seleccionaServiciosAuxiliares();
        await this.eleccionCoberturas.seleccionaMedicamnetos();
        await this.eleccionCoberturas.seleccionaSumaAseguradaCoberturas(SumaAseg);
        await this.eleccionCoberturas.seleccionaSumaAseguradaMedicamentos(SumaMedicamentos);
        await this.eleccionCoberturas.btnContinuar()
    }
    async SeleccionaCoberturas(SumaAseg: string, MedicinaPreventiva: string, MantenimientoSalud: string, ServiciosOdontologicos: string,
        UrgenciasMedicas: string, ServiciosAuxiliares: string, Medicamentos: string, SumaMedicamentos: string) {
        type CoberturaKey =
            | "ServiciosOdontologicos"
            | "UrgenciasMedicas"
            | "ServiciosAuxiliares"
            | "Medicamentos";
        const valores = {
            ServiciosOdontologicos,
            UrgenciasMedicas,
            ServiciosAuxiliares,
            Medicamentos
        };
        await this.eleccionCoberturas.cerrarModal();
        if (MantenimientoSalud === 'No') {
            console.log('Mantenimiento Salud no')
            await this.eleccionCoberturas.eliminaSeleccionMantenimientoSalud();
        }
        if (MedicinaPreventiva === 'No') {
            console.log('Medicina preventiva no')
            await this.eleccionCoberturas.eliminaSeleccionMedicinaPreventiva();
        }
        if (MantenimientoSalud === 'No' || MedicinaPreventiva === 'No') {
            console.log('No se selecciono algun producto de menores');
            await this.eleccionCoberturas.btnContinuar()
        }
        const mapaCoberturas: Record<CoberturaKey, () => Promise<void>> = {
            ServiciosOdontologicos: this.eleccionCoberturas.seleccionaServiciosOdontologicos.bind(this.eleccionCoberturas),
            UrgenciasMedicas: this.eleccionCoberturas.seleccionaUrgenciasMedicas.bind(this.eleccionCoberturas),
            ServiciosAuxiliares: this.eleccionCoberturas.seleccionaServiciosAuxiliares.bind(this.eleccionCoberturas),
            Medicamentos: this.eleccionCoberturas.seleccionaMedicamnetos.bind(this.eleccionCoberturas)
        };
        for (const clave of Object.keys(mapaCoberturas) as CoberturaKey[]) {
            if (valores[clave] === "Si") {
                await mapaCoberturas[clave]();
            }
        }
        if (MantenimientoSalud === 'Si' || MedicinaPreventiva === 'Si') {
            console.log('se Selecciono un producto de menores')
            await this.eleccionCoberturas.seleccionaSumaAseguradaCoberturas(SumaAseg);
        }
        if (Medicamentos === 'Si') {
            await this.eleccionCoberturas.seleccionaSumaAseguradaMedicamentos(SumaMedicamentos);
        }
        if (MantenimientoSalud === 'Si' || MedicinaPreventiva === 'Si') {
            await this.eleccionCoberturas.btnContinuar()
        }
    }
}

export class SeleccionTramitesIndemnizatorio {
    coberturasIndemnizatorias: IndemnizatoriosPage;
    constructor(private readonly page: Page) {
        this.coberturasIndemnizatorias = new IndemnizatoriosPage(page);
    }

    async EleccionCoberturasIndemnizatorias() {
        await this.page.waitForTimeout(3000);
        await this.coberturasIndemnizatorias.clicBtnContinuar();
        await this.coberturasIndemnizatorias.cierraModalRecuerdaQue();
    }
    async SeleccionaTramitesIndemnizatorios(Recuperacion: string, NumeroIntervenciones: string, EsquemaSumaAseguradaRecuperacion: string,
        RentaHospitalaria: string, RentaDiariaHospitalizacion: string, Oncologia: string, AtencionOncologia: string, EsquemaSumaOncologia: string,
        Infarto: string, EsquemaSumaInfarto: string) {
        await this.page.waitForTimeout(3000);
        if (Recuperacion === 'Si') {
            await this.coberturasIndemnizatorias.seleccionaRecuperacion();
            if (NumeroIntervenciones === '67') {
                await this.coberturasIndemnizatorias.seleccionaNumeroIntervenciones67();
                console.log(EsquemaSumaAseguradaRecuperacion);
                await this.coberturasIndemnizatorias.seleccionaSumaAseguradaRecuperacion(EsquemaSumaAseguradaRecuperacion);
            }
            else if (NumeroIntervenciones === '90') {
                await this.coberturasIndemnizatorias.seleccionaNumeroIntervenciones90();
                await this.coberturasIndemnizatorias.seleccionaSumaAseguradaRecuperacion(EsquemaSumaAseguradaRecuperacion);
            }
            else {
                throw new Error('Numero de intervensiones no valido');
            }
        }
        if (RentaHospitalaria === 'Si') {
            await this.coberturasIndemnizatorias.seleccionaRentaHospitalaria();
            await this.coberturasIndemnizatorias.seleccionaRentaDiariaHospitalizacion(RentaDiariaHospitalizacion);
        }
        if (Oncologia === 'Si') {
            await this.coberturasIndemnizatorias.seleccionaOncologia();
            if (AtencionOncologia === 'Oncología Total') {
                await this.coberturasIndemnizatorias.seleccionaOncologiaTotal();
            }
            else if (AtencionOncologia === 'Oncología Esencial') {
                await this.coberturasIndemnizatorias.seleccionaOncologiaEsencial();
            }
            else {
                throw new Error('Atencion Oncologia no valida');
            }
            await this.coberturasIndemnizatorias.seleccionaEsquemaSumaaseguradaOncologia(EsquemaSumaOncologia);
        }
        if (Infarto === 'Si') {
            await this.coberturasIndemnizatorias.seleccionaInfarto();
            await this.coberturasIndemnizatorias.seleccionaEsquemaSumaAseguradaInfarto(EsquemaSumaInfarto);
        }
        await this.page.waitForTimeout(3000);
        await this.coberturasIndemnizatorias.clicBtnContinuar();
        await this.coberturasIndemnizatorias.cierraModalRecuerdaQue();
    }
}

export class InformacionPago {
    informacionDePago: RevisionInformacionPagoPage;
    constructor(private readonly page: Page) {
        this.informacionDePago = new RevisionInformacionPagoPage(page);
    }

    async CapturaDatosDePago(tipoPago: string, Factura: string) {
        await this.page.waitForTimeout(3000);
        await this.informacionDePago.seleccionaPagoYAseguradoMismaPersona('No');
        console.log(`El valor de factura es ${Factura}`);
        if (Factura.toString() === 'Si') {
            await this.informacionDePago.seleccionaNecesitasFacturaSi();
        }
        else {
            await this.informacionDePago.seleccionaNecesitasFacturaNo();
        }
        await this.informacionDePago.ingresaNumeroTarjeta();
        await this.informacionDePago.ingresaTitularDeTarjeta();
        await this.informacionDePago.ingresaMesTarjeta();
        await this.informacionDePago.ingresaAnioTarjeta();
        await this.informacionDePago.ingresaCVV();
        await this.informacionDePago.ingresaCorreoPago();
        await this.informacionDePago.seleccionaComoDeseasPagarlos(tipoPago.trim());
        await this.informacionDePago.checkTerminosYCondiciones();
        await this.informacionDePago.btnPagar();
        await this.informacionDePago.btnPagarModalConfirmacion();
    }
}

export class ConfiguracionPoliza {
    btnConfigurarPoliza: ConfiguracionPolizaPage;
    constructor(private readonly page: Page) {
        this.btnConfigurarPoliza = new ConfiguracionPolizaPage(page);
    }

    async ClickBtnConfigurarPoliza() {
        await this.btnConfigurarPoliza.btnConfigurarPoliza();
    }
}

export class CompletarDatosCotizacion {
    completarDatosCotizacion: CompletarDatosPolizaage;
    beneficiario1: Beneficiario1Page;
    beneficiario2: Beneficiario2Page;
    beneficiario3: Beneficiario3Page;
    beneficiario4: Beneficiario4Page;
    beneficiario5: Beneficiario5Page;
    constructor(private readonly page: Page) {
        this.completarDatosCotizacion = new CompletarDatosPolizaage(page);
        this.beneficiario1 = new Beneficiario1Page(page);
        this.beneficiario2 = new Beneficiario2Page(page);
        this.beneficiario3 = new Beneficiario3Page(page);
        this.beneficiario4 = new Beneficiario4Page(page);
        this.beneficiario5 = new Beneficiario5Page(page);
    }

    async CompletarDatosCotizacion(EntidadNacimiento: string, EstadoCivil: string) {
        const btnContinuar = this.page.locator('#ValidaDatosTitular');
        await btnContinuar.waitFor({ state: 'visible', timeout: 30000 });
        await this.page.waitForTimeout(3000);
        await this.completarDatosCotizacion.seleccionaEstadoCivil(EstadoCivil);
        await this.completarDatosCotizacion.seleccionaEntidadNacimiento(EntidadNacimiento);
        await this.completarDatosCotizacion.seleccionaEntidadNacimiento(EntidadNacimiento);
        await this.completarDatosCotizacion.seleccionaEstadoCivil(EstadoCivil);
        await this.page.waitForFunction(() => {
            const curp = document.querySelector<HTMLInputElement>('#curpDatospolFlexSalud');
            return curp && curp.value.trim().length > 0;
        }, { timeout: 15000 });
    }
    async CompletarDatosCotizacionIndimnizatorio(Beneficiario1: string, PorcentajeBeneficiario1: string, Beneficiario2: string, PorcentajeBeneficiario2: string
        , Beneficiario3: string, PorcentajeBeneficiario3: string, Beneficiario4: string, PorcentajeBeneficiario4: string, Beneficiario5: string, PorcentajeBeneficiario5: string) {
        const LabelBeneficiarios = this.page.locator('text=Informacion de los beneficiarios');
        if (await LabelBeneficiarios.isVisible() && Beneficiario1 === 'Si') {
            await this.beneficiario1.ingresaNombreBeneficiario1();
            await this.beneficiario1.ingresaApellidoPaternoBeneficiario1();
            await this.beneficiario1.ingresaApellidoMaternoBeneficiario1();
            await this.beneficiario1.seleccionaAnioNacimiento();
            await this.beneficiario1.seleccionaMesNacimiento();
            await this.beneficiario1.seleccionaDiaNacimiento();
            await this.beneficiario1.seleccionaSexo('Hombre');
            await this.beneficiario1.seleccionaEntidadNacimiento();
            await this.beneficiario1.seleccionaParentescoBeneficiario1();
            await this.beneficiario1.ingresaPorcentaje(PorcentajeBeneficiario1.toString());
            await this.page.waitForFunction(() => {
                const curp = document.querySelector<HTMLInputElement>('#CurpBeneficiario1');
                return curp && curp.value.trim().length > 0;
            }, { timeout: 15000 });
            await this.beneficiario1.ingresaCP();
            await this.beneficiario1.ingresaNumeroTelefonoBeneficiario1();
            await this.beneficiario1.ingresaCorreoBeneficiario1();
            await this.beneficiario1.ingresaCalleBeneficiario1();
            await this.beneficiario1.ingresaNoExterior();
            await this.beneficiario1.ingresaNoInterior();
            await this.beneficiario1.seleccionaColonia();
            if (Beneficiario2 === 'Si') {
                await this.beneficiario2.clicBtnAgregarOtroBeneficiario();
                await this.beneficiario2.ingresaCP2();
                await this.beneficiario2.ingresaNombreBeneficiario2();
                await this.beneficiario2.ingresaApellidoPaternoBeneficiario2();
                await this.beneficiario2.ingresaApellidoMaternoBeneficiario2();
                await this.beneficiario2.seleccionaAnioNacimiento2();
                await this.beneficiario2.seleccionaMesNacimiento2();
                await this.beneficiario2.seleccionaDiaNacimiento2();
                await this.beneficiario2.seleccionaSexo2('Hombre');
                await this.beneficiario2.seleccionaEntidadNacimiento2();
                await this.beneficiario2.seleccionaParentescoBeneficiario2();
                await this.beneficiario2.ingresaPorcentaje(PorcentajeBeneficiario2.toString());
                await this.page.waitForFunction(() => {
                    const curp = document.querySelector<HTMLInputElement>('#CurpBeneficiario2');
                    return curp && curp.value.trim().length > 0;
                }, { timeout: 15000 });
                await this.beneficiario2.ingresaNumeroTelefonoBeneficiario2();
                await this.beneficiario2.ingresaCorreoBeneficiario2();
                await this.beneficiario2.ingresaCalleBeneficiario2();
                await this.beneficiario2.ingresaNoExterior2();
                await this.beneficiario2.ingresaNoInterior2();
                await this.beneficiario2.seleccionaColonia2();
            }
            if (Beneficiario3 === 'Si') {
                await this.beneficiario3.clicBtnAgregarOtroBeneficiario();
                await this.beneficiario3.ingresaCP3();
                await this.beneficiario3.ingresaNombreBeneficiario3();
                await this.beneficiario3.ingresaApellidoPaternoBeneficiario3();
                await this.beneficiario3.ingresaApellidoMaternoBeneficiario3();
                await this.beneficiario3.seleccionaAnioNacimiento3();
                await this.beneficiario3.seleccionaMesNacimiento3();
                await this.beneficiario3.seleccionaDiaNacimiento3();
                await this.beneficiario3.seleccionaSexo3('Hombre');
                await this.beneficiario3.seleccionaEntidadNacimiento3();
                await this.beneficiario3.seleccionaParentescoBeneficiario3();
                await this.beneficiario3.ingresaPorcentaje(PorcentajeBeneficiario3.toString());
                await this.page.waitForFunction(() => {
                    const curp = document.querySelector<HTMLInputElement>('#CurpBeneficiario3');
                    return curp && curp.value.trim().length > 0;
                }, { timeout: 15000 });
                await this.beneficiario3.ingresaNumeroTelefonoBeneficiario3();
                await this.beneficiario3.ingresaCorreoBeneficiario3();
                await this.beneficiario3.ingresaCalleBeneficiario3();
                await this.beneficiario3.ingresaNoExterior3();
                await this.beneficiario3.ingresaNoInterior3();
                await this.beneficiario3.seleccionaColonia3();
            }
            if (Beneficiario4 === 'Si') {
                await this.beneficiario4.clicBtnAgregarOtroBeneficiario();
                await this.beneficiario4.ingresaCP4();
                await this.beneficiario4.ingresaNombreBeneficiario4();
                await this.beneficiario4.ingresaApellidoPaternoBeneficiario4();
                await this.beneficiario4.ingresaApellidoMaternoBeneficiario4();
                await this.beneficiario4.seleccionaAnioNacimiento4();
                await this.beneficiario4.seleccionaMesNacimiento4();
                await this.beneficiario4.seleccionaDiaNacimiento4();
                await this.beneficiario4.seleccionaSexo4('Hombre');
                await this.beneficiario4.seleccionaEntidadNacimiento4();
                await this.beneficiario4.seleccionaParentescoBeneficiario4();
                await this.beneficiario4.ingresaPorcentaje(PorcentajeBeneficiario4.toString());
                await this.page.waitForFunction(() => {
                    const curp = document.querySelector<HTMLInputElement>('#CurpBeneficiario4');
                    return curp && curp.value.trim().length > 0;
                }, { timeout: 15000 });
                await this.beneficiario4.ingresaCP4();
                await this.beneficiario4.ingresaNumeroTelefonoBeneficiario4();
                await this.beneficiario4.ingresaCorreoBeneficiario4();
                await this.beneficiario4.ingresaCalleBeneficiario4();
                await this.beneficiario4.ingresaNoExterior4();
                await this.beneficiario4.ingresaNoInterior4();
                await this.beneficiario4.seleccionaColonia4();
            }
            if (Beneficiario5 === 'Si') {
                await this.beneficiario5.clicBtnAgregarOtroBeneficiario();
                await this.beneficiario5.ingresaCP5();
                await this.beneficiario5.ingresaNombreBeneficiario5();
                await this.beneficiario5.ingresaApellidoPaternoBeneficiario5();
                await this.beneficiario5.ingresaApellidoMaternoBeneficiario5();
                await this.beneficiario5.seleccionaAnioNacimiento5();
                await this.beneficiario5.seleccionaMesNacimiento5();
                await this.beneficiario5.seleccionaDiaNacimiento5();
                await this.beneficiario5.seleccionaSexo5('Hombre');
                await this.beneficiario5.seleccionaEntidadNacimiento5();
                await this.beneficiario5.seleccionaParentescoBeneficiario5();
                await this.beneficiario5.ingresaPorcentaje5(PorcentajeBeneficiario5.toString());
                await this.page.waitForFunction(() => {
                    const curp = document.querySelector<HTMLInputElement>('#CurpBeneficiario5');
                    return curp && curp.value.trim().length > 0;
                }, { timeout: 15000 });
                await this.beneficiario5.ingresaCP5();
                await this.beneficiario5.ingresaNumeroTelefonoBeneficiario5();
                await this.beneficiario5.ingresaCorreoBeneficiario5();
                await this.beneficiario5.ingresaCalleBeneficiario5();
                await this.beneficiario5.ingresaNoExterior5();
                await this.beneficiario5.ingresaNoInterior5();
                await this.beneficiario5.seleccionaColonia5();
            }
        }
        await this.completarDatosCotizacion.btnContinuar();

    }
}

export class CapturaDireccion {
    capturaDireccion: CapturaDireccionPage;
    constructor(private readonly page: Page) {
        this.capturaDireccion = new CapturaDireccionPage(page);
    }

    async CapturaDatosDireccion() {
        await this.page.waitForTimeout(3000);
        await this.capturaDireccion.ingresaCP('55510');
        await this.capturaDireccion.ingresaCalle();
        await this.capturaDireccion.ingresaNoExterior();
        await this.capturaDireccion.ingresaNoInterior();
        await this.page.waitForTimeout(3000);
        await this.capturaDireccion.seleccionaColonia();
        await this.capturaDireccion.clicBtnContinuar();
    }

    async CapturaDatosDireccionFam(TipoCotizacion: string) {
        console.log(TipoCotizacion);
        if (TipoCotizacion === 'Familiar') {
            await this.page.waitForTimeout(3000);
            await this.capturaDireccion.ingresaCP('55510');
            await this.capturaDireccion.ingresaCalle();
            await this.capturaDireccion.ingresaNoExterior();
            await this.capturaDireccion.ingresaNoInterior();
            await this.page.waitForTimeout(3000);
            await this.capturaDireccion.seleccionaColonia();
            await this.capturaDireccion.clicBtnContinuar();
        }
    }
}

export class EmisionFactura {
    capturaEmisionFactura: EmisionFacturaPage;
    constructor(private readonly page: Page) {
        this.capturaEmisionFactura = new EmisionFacturaPage(page);
    }

    async CapturaDatosEmisionFactura(Factura: string) {
        if (Factura === 'Si') {
            await this.capturaEmisionFactura.seleccionaRegimenFiscal();
            await this.capturaEmisionFactura.clicBtnSiguiente();
        }
    }
}

export class CapturaInformacionPersonaPagaSeguro {
    capturaInformacionPersonaPagaSeguro: CapturaInformacionpersonaQuePagaSeguroPage;
    constructor(private readonly page: Page) {
        this.capturaInformacionPersonaPagaSeguro = new CapturaInformacionpersonaQuePagaSeguroPage(page);
    }

    async CapturaInformacionPersonaPaga() {
        await this.page.waitForTimeout(5000);
        await this.capturaInformacionPersonaPagaSeguro.ingresaCP('55510');
        await this.capturaInformacionPersonaPagaSeguro.ingresaApellidoPaterno();
        await this.capturaInformacionPersonaPagaSeguro.ingresaApellidoMaterno();
        await this.capturaInformacionPersonaPagaSeguro.ingresaTelefono();
        await this.capturaInformacionPersonaPagaSeguro.ingresaNombrePaga();
        await this.capturaInformacionPersonaPagaSeguro.ingresaCorreoPaga();
        await this.capturaInformacionPersonaPagaSeguro.seleccionaEstadoCivil();
        await this.capturaInformacionPersonaPagaSeguro.seleccionaAnioNacimiento();
        await this.capturaInformacionPersonaPagaSeguro.seleccionaMesNacimiento();
        await this.capturaInformacionPersonaPagaSeguro.seleccionaDiaNacimiento();
        await this.capturaInformacionPersonaPagaSeguro.seleccionaEntidadNacimiento();
        await this.capturaInformacionPersonaPagaSeguro.ingresaCalle();
        await this.capturaInformacionPersonaPagaSeguro.ingresaNoExterior();
        await this.capturaInformacionPersonaPagaSeguro.ingresaNoInterior();
        await this.page.waitForTimeout(3000);
        await this.capturaInformacionPersonaPagaSeguro.seleccionaColonia();
        await this.capturaInformacionPersonaPagaSeguro.seleccionaSexo();
        await this.page.waitForTimeout(3000);
        await this.capturaInformacionPersonaPagaSeguro.clicBtnContinuar();
    }

}

export class CompletarDatosComplementoPolizaFam {
    completarDatosComplementoPolizaFam: CompletarDatosComplementoPolizaFamPage;
    constructor(private readonly page: Page) {
        this.completarDatosComplementoPolizaFam = new CompletarDatosComplementoPolizaFamPage(page);
    }

    async CompletarDatosComplementoPolizaFam(TipoCotizacion: string) {
        if (TipoCotizacion === 'Familiar') {
            await this.page.waitForTimeout(3000);
            await this.completarDatosComplementoPolizaFam.ingresaApellidoMaterno();
            await this.completarDatosComplementoPolizaFam.ingresaApellidoPaterno();
            await this.completarDatosComplementoPolizaFam.seleccionaEstadoCivil();
            await this.completarDatosComplementoPolizaFam.seleccionaEntidadNacimiento();
            await this.completarDatosComplementoPolizaFam.ingresaCorreo();
            await this.completarDatosComplementoPolizaFam.ingresaTelefono();
            await this.page.waitForFunction(() => {
                const curp = document.querySelector<HTMLInputElement>('#curpDatospolFlexSalud');
                return curp && curp.value.trim().length > 0;
            }, { timeout: 15000 });
            await this.completarDatosComplementoPolizaFam.ClickBtnEnviar();
        } else {
            console.log('Cotizacion Individual');
        }
        await this.page.waitForTimeout(5000);
    }
}
export class PagoSanbox {
    pagosanbox: SandboxPage;
    constructor(private readonly page: Page) {
        this.pagosanbox = new SandboxPage(page);
    }

    async ClickBtnEnviar() {
        await this.pagosanbox.BtnEnviar();
        const productos = this.page.locator('h2:has-text("Nombre del Producto")');
        await productos.first().waitFor({ state: 'visible', timeout: 20000 });
        const total = await productos.count();
        console.log(`Se encontraron ${total} productos`);
        // const mensajeValidacion = this.page.locator('#lbl_NoPoliza');
        // await expect(mensajeValidacion).toBeVisible({ timeout: 20000 });
        console.log('Poliza emitida de manera correcta');
        const datos = await obtenerDatosConfirmacion(this.page);
        const workerId = process.env.TEST_WORKER_INDEX ?? '0';
        await guardarExcelConfirmacionHistorico(datos, workerId);
        // const datos = await obtenerDatosConfirmacion(this.page);
        // const rutaExcel = path.join(__dirname, '../Evidencias/ReportePolizas.xlsx');
        // guardarDatosEnExcel(datos, rutaExcel);
        // console.log('✅ Datos guardados en Excel:', datos);
    }
}
