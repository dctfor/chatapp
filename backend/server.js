// backend/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const sanitizeHtml = require('sanitize-html');
const cors = require('cors');
require('dotenv').config();

// Configuración de Redis
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

// Crear clientes de Redis
const pubClient = createClient({
    url: `redis://${redisHost}:${redisPort}`
});
const subClient = pubClient.duplicate();

// Inicializar Express
const app = express();

// Configurar CORS para Express
app.use(cors({
    origin: 'http://localhost:3000', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST'],
    credentials: true
}));

// Crear servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.io con configuración de CORS
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Permitir solicitudes desde este origen
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// Función asincrónica para conectar Redis y configurar Socket.io
async function startServer() {
    try {
        // Conectar pubClient
        await pubClient.connect();
        pubClient.on('error', (err) => console.error('Redis Pub Client Error', err));

        // Conectar subClient
        await subClient.connect();
        subClient.on('error', (err) => console.error('Redis Sub Client Error', err));

        // Usar el adaptador de Redis para Socket.io
        io.adapter(createAdapter(pubClient, subClient));

        // Manejar la conexión de Socket.io
        io.on('connection', (socket) => {
            console.log(`Nuevo usuario, conectando`);

            // Unirse a una sala
            socket.on('joinRoom', ({ username, room }) => {
                console.log(`${username} se ha unido a la sala ${room}`);
                socket.join(room);
                socket.username = username;
                socket.room = room;

                // Notificar al usuario
                socket.emit('message', { username: 'Sistema', msg: `Bienvenido a la sala ${room}, ${username}!` });

                // Notificar a otros usuarios en la sala
                socket.to(room).emit('message', { username: 'Sistema', msg: `${username} se ha unido a la sala.` });
            });

            // Escuchar eventos de chat
            socket.on('chatMessage', ({ username, msg, room }) => {
                // Sanitizar el mensaje
                const sanitizedMsg = sanitizeHtml(msg, {
                    allowedTags: [],
                    allowedAttributes: {}
                });

                const message = { username, msg: sanitizedMsg };
                // Emitir el mensaje a todos en la sala
                io.to(room).emit('message', message);
            });

            // Dejar una sala
            socket.on('leaveRoom', ({ username, room }) => {
                socket.leave(room);
                socket.to(room).emit('message', { username: 'Sistema', msg: `${username} ha dejado la sala.` });
            });

            // Manejar la desconexión
            socket.on('disconnect', () => {
                if (socket.username && socket.room) {
                    io.to(socket.room).emit('message', { username: 'Sistema', msg: `${socket.username} se ha desconectado.` });
                }
                console.log('Usuario desconectado');
            });
        });

        // Definir el puerto
        const PORT = process.env.PORT || 5000;

        // Iniciar el servidor
        server.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (err) {
        console.error('Error al iniciar el servidor:', err);
        process.exit(1);
    }
}

startServer();
