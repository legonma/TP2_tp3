import ModelFile from '../model/DAO/BibliotecaFile.js';

class Servicio_Biblioteca {
    constructor() {
        this.model = new ModelFile();
    }

    obtenerLibros = async () => { 
        try {
            const libros = await this.model.obtenerLibros();
            return libros;    
        } catch (error) {
            throw error
        }
    }

    obtenerLibro = async (id) => {
        try {
            const libro = await this.model.obtenerLibro(id);
            return libro;    
        } catch (error) {
            throw error
        }
    }

    guardarLibro = async (libro) => {
        try {
            const libroGuardado = await this.model.guardarLibro(libro);
            return libroGuardado;
    
        } catch (error) {
            throw error
        }
    }

    actualizarLibro = async (id, libro) =>{
        try {
            const libroActualizado = await this.model.actualizarLibro(id, libro);
            return libroActualizado;
    
        } catch (error) {
            throw error
        }
    }

    borrarLibro = async (id) => {
        try {
            const libroBorrado = await this.model.borrarLibro(id);
            return libroBorrado;    
        } catch (error) {
            throw error
        }
    }
}

export default Servicio_Biblioteca;
