// frontend/src/components/ChatRoomSelector.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const ChatRoomSelector = ({ currentRoom, changeRoom }) => {
    const rooms = ['General', 'Tecnología', 'Deportes', 'Entretenimiento'];

    return (
        <Dropdown className="m-3">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Sala Actual: {currentRoom}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {rooms.map((room) => (
                    <Dropdown.Item key={room} onClick={() => changeRoom(room)}>
                        {room}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ChatRoomSelector;
