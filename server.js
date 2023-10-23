import express from "express";
import RouterBiblioteca from './router/Biblioteca.js';
import RouterDefault from './router/Default.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); //preguntar bien

app.use(express.static('public'));
app.use('/api/biblioteca', new RouterBiblioteca().start());
app.use('/*', new RouterDefault().start());

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`));
server.on('error', error => console.log(`Error en servidor: ${error.message}`));
