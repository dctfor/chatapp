// server.js

const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

// Inicializar Express
const app = express();

// Crear servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.io
const io = socketio(server);

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Manejar la conexión de Socket.io
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Escuchar eventos de chat
    socket.on('chatMessage', (data) => {
        const { username, msg } = data;
        const message = { username, msg };
        // Emitir el mensaje a todos los clientes
        io.emit('message', message);
    });

    // Manejar la desconexión
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});


// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
