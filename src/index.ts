import http from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 4500;
const server = http.createServer(app);

server.on('error', () => {
  console.log('Error en el server');
});

server.on('listening', () => {
  console.log('Listening in http://localhost:' + PORT);
});

server.listen(PORT);
