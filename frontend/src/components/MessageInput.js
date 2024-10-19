// frontend/src/components/MessageInput.js
import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const MessageInput = ({ sendMessage }) => {
    const [msg, setMsg] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (msg.trim()) {
            sendMessage(msg);
            setMsg('');
        }
    };

    return (
        <Form onSubmit={onSubmit} className="p-3 bg-light">
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                    autoComplete="off"
                />
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </InputGroup>
        </Form>
    );
};

export default MessageInput;
