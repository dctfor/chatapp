// frontend/src/components/ChatContainer.js

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatRoomSelector from './ChatRoomSelector';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
    withCredentials: true
});

const ChatContainer = () => {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('General');
    const hasAskedUsername = useRef(false);

    useEffect(() => {
        if (!hasAskedUsername.current) {
            let name = '';
            while (!name) {
                name = prompt('Por favor, ingresa tu nombre de usuario:');
            }
            setUsername(name);
            hasAskedUsername.current = true;
        }
    }, []);

    useEffect(() => {
        if (username) {
            socket.emit('joinRoom', { username, room });
        }

        return () => {
            if (username) {
                socket.emit('leaveRoom', { username, room });
            }
        };
    }, [username, room]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = (msg) => {
        socket.emit('chatMessage', { username, msg, room });
    };

    const changeRoom = (newRoom) => {
        socket.emit('leaveRoom', { username, room });
        setRoom(newRoom);
        setMessages([]);
    };

    return (
        <Container fluid className="vh-100 d-flex flex-column">
            <Row>
                <Col>
                    <ChatRoomSelector currentRoom={room} changeRoom={changeRoom} />
                </Col>
            </Row>
            <Row className="flex-grow-1">
                <Col>
                    <MessageList messages={messages} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <MessageInput sendMessage={sendMessage} />
                </Col>
            </Row>
        </Container>
    );
};

export default ChatContainer;
