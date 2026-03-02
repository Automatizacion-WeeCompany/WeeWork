import { test } from '@playwright/test';
import { InicioCotizacionFlow } from '@flows/iniciarCotizacion.flow';
import {
  CapturaDatosEligeElSeguro, EligeTusCoberturas, SeleccionTramitesIndemnizatorio,
  InformacionPago,
  ConfiguracionPoliza,
  CompletarDatosCotizacion,
  CapturaDireccion,
  CapturaInformacionPersonaPagaSeguro,
  CompletarDatosComplementoPolizaFam,
  PagoSanbox,
  EmisionFactura
} from '@flows/cotizacionIndividual.flow'
import { accesos } from 'src/datos/Valores';
import path from 'node:path';
import { CargarExcel } from 'src/utilidades/CargaDatosExcel';
import { ExtraerDatosExcel } from "src/utilidades/ObtencionDeDatos";

const rutaExcel = path.join(__dirname, "../datos/SuitePruebas.xlsx");
const Escenarios = new CargarExcel(rutaExcel);
const datos = Escenarios.obtenerDato(0);

const Tests = ExtraerDatosExcel.obtenerEscenariosPorHoja('CotizacionIndividual');

test.describe('Cotizaciones Individuales', () => {
  console.log("Escenarios cargados:", Tests?.length);
  for (const escenario of Tests) {
    test(`Validacion - ${escenario.EscenarioPrueba}`, { tag: [`@${escenario.EscenarioId}`] }, async ({ page }) => {
      await page.goto(accesos.urlFlexQAHomo);
      const inicioCotizador = new InicioCotizacionFlow(page);
      const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
      const eligeTusCoberturas = new EligeTusCoberturas(page);
      const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
      const informacionPago = new InformacionPago(page);
      const configuracionPoliza = new ConfiguracionPoliza(page);
      const completarDatosCotizacion = new CompletarDatosCotizacion(page);
      const capturaDireccion = new CapturaDireccion(page);
      const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
      const emisionFactura = new EmisionFactura(page);
      const completarDatosComplementoPolizaFam = new CompletarDatosComplementoPolizaFam(page);
      const pagoSanbox = new PagoSanbox(page);
      const MedicinaPreventiva = escenario.MedicinaPreventiva;
      const MantenimientoSalud = escenario.MantenimientoSalud;
      const ServiciosOdontologicos = escenario.ServiciosOdontologicos;
      const UrgenciasMedicas = escenario.UrgenciasMedicas;
      const ServiciosAuxiliares = escenario.ServiciosAuxiliares;
      const Medicamentos = escenario.Medicamnetos;
      const SumaAsegurada = escenario.Cobertura;
      const SumaMedicamentos = escenario.CoberturaMedicamentos;
      const Recuperacion = escenario.Recuperacion;
      const NumeroIntervenciones = escenario.NumeroIntervenciones;
      const EsquemaSumaAseguradaRecuperacion = escenario.EsquemaSumaAsegurada;
      const RentaHospitalaria = escenario.RentaHospitalaria;
      const RentaDiariaHospitalizacion = escenario.RentaDiariaHospitalizacion;
      const Oncologia = escenario.Oncologia;
      const AtencionOncologia = escenario.AtencionOncologia;
      const EsquemaSumaOncologia = escenario.EsquemaSumaOncologia;
      const Infarto = escenario.Infarto;
      const EsquemaSumaInfarto = escenario.EsquemaSumaInfarto;
      const Beneficiario1 = escenario.Beneficiario1;
      const Beneficiario2 = escenario.Beneficiario2;
      const Beneficiario3 = escenario.Beneficiario3;
      const Beneficiario4 = escenario.Beneficiario4;
      const Beneficiario5 = escenario.Beneficiario5;
      const PorcentajeBeneficiario1 = escenario.ProcentajeBen1;
      const PorcentajeBeneficiario2 = escenario.ProcentajeBen2;
      const PorcentajeBeneficiario3 = escenario.ProcentajeBen3;
      const PorcentajeBeneficiario4 = escenario.ProcentajeBen4;
      const PorcentajeBeneficiario5 = escenario.ProcentajeBen5;
      const Familiar1 = escenario.Familiar1;
      const Familiar2 = escenario.Familiar2;
      const Familiar3 = escenario.Familiar3;
      const Familiar4 = escenario.Familiar4;
      const Familiar5 = escenario.Familiar5;
      await inicioCotizador.CotizacionInicio(escenario.TipoCotizacion);
      await capturaDatosInvididual.CapturaDatos(escenario.SexoSolicitante, escenario.TipoCotizacion, Familiar1, Familiar2, Familiar3, Familiar4, Familiar5);
      await eligeTusCoberturas.SeleccionaCoberturas(SumaAsegurada, MedicinaPreventiva, MantenimientoSalud, ServiciosOdontologicos,
        UrgenciasMedicas, ServiciosAuxiliares, Medicamentos, SumaMedicamentos);
      await eligeLosIndemnizatorios.SeleccionaTramitesIndemnizatorios(Recuperacion, NumeroIntervenciones.toString(),
        EsquemaSumaAseguradaRecuperacion.toString(),
        RentaHospitalaria, RentaDiariaHospitalizacion, Oncologia, AtencionOncologia, EsquemaSumaOncologia,
        Infarto, EsquemaSumaInfarto);
      await informacionPago.CapturaDatosDePago(escenario.PeriodoPago, escenario.Factura);
      await configuracionPoliza.ClickBtnConfigurarPoliza();
      await completarDatosCotizacion.CompletarDatosCotizacion(escenario.EstadoNacimiento, escenario.EstadoCivil);
      await completarDatosCotizacion.CompletarDatosCotizacionIndimnizatorio(Beneficiario1, PorcentajeBeneficiario1, Beneficiario2, PorcentajeBeneficiario2
        , Beneficiario3, PorcentajeBeneficiario3, Beneficiario4, PorcentajeBeneficiario4, Beneficiario5, PorcentajeBeneficiario5);
      await capturaDireccion.CapturaDatosDireccion();
      await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
      await completarDatosComplementoPolizaFam.CompletarDatosComplementoPolizaFam(escenario.TipoCotizacion);
      await emisionFactura.CapturaDatosEmisionFactura(escenario.Factura);
      await capturaDireccion.CapturaDatosDireccionFam(escenario.TipoCotizacion);
      await pagoSanbox.ClickBtnEnviar();
    });
  }
})