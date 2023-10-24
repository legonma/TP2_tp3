import Servicio from '../servicio/Biblioteca.js';
/* controladorRutaDefault = (req,res) => {
    const { url:ruta, method:metodo } = req
    res.status(500).send(`<h3 style="color: red;">Error en ruta: ${ruta} / método: ${metodo} -> no implementada</h3>`)
} */

class Controlador_Biblioteca {
    constructor() {
        this.servicio =  new Servicio();
    }

    listarLibros = async (req, res) => {
        const { id } = req.params;
        if (id === undefined) {
            const libros =  await this.servicio.obtenerLibros();
            res.json(libros);
        } else {
            const libro = await this.servicio.obtenerLibro(id);
            res.json(libro);
        }
    }

    guardarLibro = async (req, res) => {
        try {
            const libro = req.body;
            const libroGuardado = await this.servicio.guardarLibro(libro);
            //res.json(libroGuardado);
            res.redirect('/');
        } catch (error) {
            const { url:ruta, method:metodo } = req
            res.status(500).send(`<h3 style="color: red;">Error : ${ruta} / método: ${metodo} -> no implementada\n Error: ${error}</h3>`)
        }
    }

    actualizarLibro = async (req, res) => {
        const { id } = req.params;
        const libro = req.body;
        const libroActualizado = await this.servicio.actualizarLibro(id, libro);
        res.json(libroActualizado);
    }

    borrarLibro = async (req, res) => {
        const { id } = req.params;
        const libroBorrado = await this.servicio.borrarLibro(id);
        res.json(libroBorrado);
    }
    
    error = async (req, res) => {
        const { baseUrl, method:metodo} = req;
        res.status(500).send(`<h3 style="color: red;">Error en ruta: ${baseUrl} / método: ${metodo} -> no implementada</h3>`)
    }
}

export default Controlador_Biblioteca;
