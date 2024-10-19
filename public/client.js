// public/client.js

const socket = io();

// Obtener elementos del DOM
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const msgInput = document.getElementById('msg');

// Prompt para el nombre de usuario
let username = '';

while (!username) {
    username = prompt('Por favor, ingresa tu nombre de usuario:');
}

// Escuchar el envío del formulario
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener el mensaje del input
    let msg = msgInput.value.trim();

    if (!msg) {
        return false;
    }

    // Emitir el mensaje al servidor
    socket.emit('chatMessage', { username, msg });

    // Limpiar el input
    msgInput.value = '';
    msgInput.focus();
});

// Escuchar los mensajes del servidor
socket.on('message', (data) => {
    displayMessage(data);
    // Scroll hacia abajo
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Función para mostrar mensajes en el DOM
function displayMessage(data) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p><strong>${data.username}:</strong> ${data.msg}</p>`;
    chatMessages.appendChild(div);
}
