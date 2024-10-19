// frontend/src/components/MessageList.js
import React, { useEffect, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';

const MessageList = ({ messages }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <ListGroup variant="flush" className="chat-messages p-3" style={{ height: '70vh', overflowY: 'auto' }}>
            {messages.map((message, index) => (
                <ListGroup.Item key={index}>
                    <strong>{message.username}:</strong> {message.msg}
                </ListGroup.Item>
            ))}
            <div ref={messagesEndRef} />
        </ListGroup>
    );
};

export default MessageList;
