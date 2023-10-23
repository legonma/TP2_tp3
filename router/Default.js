import express from 'express';
import Controlador from '../controlador/Biblioteca.js';

class Router_Default {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }

    start() {
        this.router.get('/*', this.controlador.error);
        this.router.post('/*', this.controlador.error);
        this.router.put('/*', this.controlador.error);
        this.router.delete('/*', this.controlador.error);

        return this.router;
    }

}

export default Router_Default;
