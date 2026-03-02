// import {test} from '@playwright/test';
// import { InicioCotizacionFlow } from '@flows/iniciarCotizacion.flow';
// import {CapturaDatosEligeElSeguro} from '@flows/cotizacionIndividual.flow'
// import { EligeTusCoberturas } from '@flows/cotizacionIndividual.flow';
// import { SeleccionTramitesIndemnizatorio } from '@flows/cotizacionIndividual.flow';
// import { InformacionPago } from '@flows/cotizacionIndividual.flow';
// import { ConfiguracionPoliza } from '@flows/cotizacionIndividual.flow';
// import { CompletarDatosCotizacion } from '@flows/cotizacionIndividual.flow';
// import { CapturaDireccion } from '@flows/cotizacionIndividual.flow';
// import { EmisionFactura } from '@flows/cotizacionIndividual.flow';
// import { CapturaInformacionPersonaPagaSeguro } from '@flows/cotizacionIndividual.flow';
// import { PagoSanbox } from '@flows/cotizacionIndividual.flow';
// import { accesos } from 'src/datos/Valores';

// test.describe('Cotizacion Individual genericos Anual', () => {
//     test('Cobertura $10,000.00 MXN', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
//     test('Cobertura $20,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $30,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$30,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $40,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$40,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $50,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$50,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
    

// });

// test.describe('Cotizacion Individual genericos Semestral', () => {
//     test('Cobertura $10,000.00 MXN', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
//     test('Cobertura $20,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $30,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$30,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $40,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$40,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $50,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$50,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

// });

// test.describe('Cotizacion Individual genericos Trimestral', () => {
//     test('Cobertura $10,000.00 MXN', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
//     test('Cobertura $20,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $30,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$30,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $40,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$40,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $50,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$50,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

// });

// test.describe('Cotizacion Individual genericos Mensual', () => {
//     test('Cobertura $10,000.00 MXN', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
//     test('Cobertura $20,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $30,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$30,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $40,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$40,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura $50,000.00 MXN', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$50,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

// });

// test.describe('Cotizacion Individual genericos Anual $10,000.00 MXN', () => {
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
// })

// test.describe('Cotizacion Individual genericos Semestral $10,000.00 MXN', () => { 
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
    
// })

// test.describe('Cotizacion Individual genericos Trimestral $10,000.00 MXN', () => {
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
// })

// test.describe('Cotizacion Individual genericos Mensual $10,000.00 MXN', () => {
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$10,000.00 MXN','$1,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
// })

// test.describe('Cotizacion Individual genericos Anual $20,000.00 MXN', () => {
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
// })

// test.describe('Cotizacion Individual genericos Semestral $20,000.00 MXN', () => { 
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Semestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
    
// })

// test.describe('Cotizacion Individual genericos Trimestral $20,000.00 MXN', () => {
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Trimestral','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
// })

// test.describe('Cotizacion Individual genericos Mensual $20,000.00 MXN', () => {
//     test('Cobertura con Servicios Odontologicos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosOdontologicos('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Urgencias Medicas', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasUrgenciasMedicas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Servicios Auxiliares', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasServiciosAuxiliares('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con Medicamentos Fs', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturasMedicamentos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cobertura con los 6 prodcutos', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.SeleccionaTodosLosProductos('$20,000.00 MXN','$2,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Mensual','No');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await pagoSanbox.ClickBtnEnviar();
//     });
// })


// test.describe('Cotizacion Paquete cinco productos Flex Generico', () => {

// })

// test.describe('Cotizaciones Individuales paquete menores con factura', () => {
//     test('Cotizacion cobertura $10,000.00 MXN Anual', async ({page}) => {
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaDatosFactura = new EmisionFactura(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$10,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','Si');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await capturaDatosFactura.CapturaDatosEmisionFactura();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cotizacion cobertura $20,000.00 MXN Anual', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaDatosFactura = new EmisionFactura(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$20,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','Si');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await capturaDatosFactura.CapturaDatosEmisionFactura();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cotizacion cobertura $30,000.00 MXN Anual', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaDatosFactura = new EmisionFactura(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$30,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','Si');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await capturaDatosFactura.CapturaDatosEmisionFactura();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cotizacion cobertura $40,000.00 MXN Anual', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaDatosFactura = new EmisionFactura(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$40,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','Si');
//         await configuracionPoliza.ClickBtnConfigurarPoliza();
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await capturaDatosFactura.CapturaDatosEmisionFactura();
//         await pagoSanbox.ClickBtnEnviar();
//     });

//     test('Cotizacion cobertura $50,000.00 MXN Anual', async ({page}) =>{
//         await page.goto(accesos.urlFlexQAHomo);
//         const inicioCotizador = new InicioCotizacionFlow(page);
//         const capturaDatosInvididual = new CapturaDatosEligeElSeguro(page);
//         const eligeTusCoberturas = new EligeTusCoberturas(page);
//         const eligeLosIndemnizatorios = new SeleccionTramitesIndemnizatorio(page);
//         const informacionPago = new InformacionPago(page);
//         const configuracionPoliza = new ConfiguracionPoliza(page);
//         const capturaInfoPagaSeguro = new CapturaInformacionPersonaPagaSeguro(page);
//         const completarDatosCotizacion = new CompletarDatosCotizacion(page);
//         const capturaDireccion = new CapturaDireccion(page);
//         const capturaDatosFactura = new EmisionFactura(page);
//         const pagoSanbox = new PagoSanbox(page);
//         await inicioCotizador.CotizaCionIndividual();   
//         await capturaDatosInvididual.CapturaDatos();
//         await eligeTusCoberturas.EleccionCoberturas('$50,000.00 MXN');
//         await eligeLosIndemnizatorios.EleccionCoberturasIndemnizatorias();
//         await informacionPago.CapturaDatosDePago('Anual','Si');
//         await completarDatosCotizacion.CompletarDatosCotizacion('Aguascalientes','Casado(a)');
//         await capturaDireccion.CapturaDatosDireccion();
//         await capturaInfoPagaSeguro.CapturaInformacionPersonaPaga();
//         await capturaDatosFactura.CapturaDatosEmisionFactura();
//         await pagoSanbox.ClickBtnEnviar();
//     });
// })
