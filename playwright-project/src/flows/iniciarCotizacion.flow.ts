import { Page } from "@playwright/test";
import { InicioCotizadorPage } from "@pages/inicioCotizadorPage";

export class InicioCotizacionFlow {
    iniciarCotizacion: InicioCotizadorPage;
    constructor(private readonly page: Page) {
        this.iniciarCotizacion = new InicioCotizadorPage(page);
    }

    async CotizacionIndividual() {
        await this.iniciarCotizacion.btnCotizacionAmi();
        await this.iniciarCotizacion.checkTerminosYCondiciones();
        await this.iniciarCotizacion.btnSiguiente();
    }

    async CotizacionFamiliar() {
        await this.iniciarCotizacion.btnCoatizacionAmiFamilia();
        await this.iniciarCotizacion.checkTerminosYCondiciones();
        await this.iniciarCotizacion.btnSiguiente();
    }
    async CotizacionInicio(TipoCotizacion: string) {
        if (TipoCotizacion === 'Individual') {
            await this.CotizacionIndividual();
        } else if (TipoCotizacion === 'Familiar') {
            await this.CotizacionFamiliar();
        }
    }
}