# Chat en Tiempo Real con Node.js, React, Redis y Socket.io 🚀

Aplicación de chat en tiempo real que utiliza Node.js, Express, React, Redis, Socket.io y Bootstrap. Permite a los usuarios unirse a diferentes salas de chat, enviar mensajes en tiempo real y disfrutar de una interfaz moderna y responsiva.

## ✨ Características

- Comunicación en tiempo real utilizando Socket.io
- Soporte para múltiples salas de chat
- Interfaz de usuario moderna y responsiva con React y Bootstrap
- Escalabilidad mejorada utilizando Redis como adaptador para Socket.io
- Sanitización de mensajes para prevenir ataques XSS
- Configuración sencilla y modular

## 🚀 Prerrequisitos

- [Node.js y npm](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started) (para Redis)
- Un editor de código como Visual Studio Code
- Conocimientos básicos de la línea de comandos

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu_usuario/chat-app.git
cd chat-app
```

### 2. Configurar el Backend

```bash
cd backend
npm install

# Crear archivo .env con:
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=5000
```

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install
```

### 4. Iniciar Redis con Docker

```bash
# Iniciar Redis
docker run --name redis -p 6379:6379 -d redis redis-server --appendonly yes

# Verificar que Redis está corriendo
docker ps
```

## 🚀 Ejecución

### Iniciar el Backend

```bash
cd backend
npm run dev    # Modo desarrollo
# o
npm start     # Modo producción
```

### Iniciar el Frontend

```bash
cd frontend
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📝 Uso

1. Abre múltiples pestañas del navegador en `http://localhost:3000`
2. Ingresa un nombre de usuario
3. Selecciona una sala de chat
4. ¡Comienza a chatear en tiempo real!

## 📁 Estructura del Proyecto

```
chat-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ChatContainer.js
    │   │   ├── ChatRoomSelector.js
    │   │   ├── MessageInput.js
    │   │   └── MessageList.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── package-lock.json
```

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- Socket.io
- Redis
- dotenv
- sanitize-html
- cors

### Frontend
- React
- Socket.io-client
- Bootstrap
- React-Bootstrap

## 🔜 Mejoras Futuras

- [ ] Implementar autenticación y registro de usuarios
- [ ] Añadir persistencia de mensajes con MongoDB
- [ ] Permitir mensajes privados entre usuarios
- [ ] Mejorar la interfaz con más estilos y animaciones
- [ ] Implementar notificaciones en tiempo real
- [ ] Añadir soporte para emojis y envío de archivos

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz un fork del repositorio
2. Crea una nueva rama para tus cambios
3. Envía un pull request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.