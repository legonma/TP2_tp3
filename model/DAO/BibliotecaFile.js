import fs from 'fs';

class Model_BibliotecaFile {
    constructor() {
        this.nombreArchivo = 'libros.json';
    }

    leerArchivo = async () => {
        let libros = [];
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            libros = JSON.parse(data);
        } catch (err) {
            // retornar un error en vez de tirarlo a ver que pasa
            throw (`No se logro leer el archivo en la ruta ${this.nombreArchivo}`);
        }

        return libros;
    }


    escribirLibro = async (libros) => {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(libros, null, '\t'));            
        } catch {
            throw (`No se logro escribir el el libro ${libro} en el archivo de la ruta ${this.nombreArchivo}`);
        }
    }

    obtenerLibros = async () => {         
        try {
            const libros = await this.leerArchivo();
            return libros;
        } catch {
            return [];
        }
    }

    obtenerLibro = async (id) => {
        try {
            const libros = await this.leerArchivo();
            if (id) {
                const libro = libros.find(libro => libro.id === id);
                return libro || {};
            }
        } catch {
            return {};
        }
    }

    guardarLibro = async (libro) => {
        try {
            if (libro.titulo && libro.autor && libro.year && Object.keys(libro).length < 4) {
                const libros = await this.leerArchivo();
                libro.id = String(parseInt(libros[libros.length - 1]?.id || 0) + 1);
                libro.titulo = String(libro.titulo)|| '';
                libro.autor = String(libro.autor) || '';
                libro.year = Number(libro.year);
                libros.push(libro);
                await this.escribirLibro(libros);        
                return libro;
            } else {
                throw (`los datos titulo, autor y year deben tener datos`);
            }
        } catch (err){
            throw (`no se logro guardar el libro: ${err}`);
        }
    }


    actualizarLibro = async (id, libro) => {
        try {
            const libros = await this.leerArchivo();
            const index = libros.findIndex(libro => libro.id === id);
            if (index != -1) {
                const libroActual = libros[index];
                const libroActualizado = {...libroActual, ...libro};
                libros.splice(index, 1, libroActualizado);
                await this.escribirLibro(libros);
                return libroActualizado;
            } else {
                libros.push(libro);
                await this.escribirLibro(libros);
                return libro;
            }
        } catch (err) {
            throw ('error al actualizar: ' + err);
        }
    }

    borrarLibro = async (id) => {
        try {
            let libro = {};
            const libros = await this.leerArchivo();
            const index = libros.findIndex(libro => libro.id === id);
            if (index != -1) {
                libro = libros.splice(index, 1)
                await this.escribirLibro(libros);
            }
            return libro;
        } catch {
            throw (`no se logro borrar el libro`);
        }
    }
}

export default Model_BibliotecaFile;
