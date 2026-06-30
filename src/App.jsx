import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

export default function App() {
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive-msg', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive-msg');
    };
  }, []);

  const joinRoom = () => {
    if (!room) return;
    socket.emit('join-room', room);
    setIsJoined(true);
  };

  const sendMsg = () => {
    if (!message) return;
    
    socket.emit('send-msg', {
      room: room,
      text: message,
      sender: socket.id
    });
    
    setMessage('');
  };

  if (!isJoined) {
    return (
      <div>
        <h2>Join Room</h2>
        <input 
          placeholder="Room Name" 
          value={room} 
          onChange={(e) => setRoom(e.target.value)} 
        />
        <button onClick={joinRoom}>Join</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Room: {room}</h2>
      <p>Your ID: {socket.id}</p>
      <hr />
      
      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.sender === socket.id ? 'You' : msg.sender.substring(0, 5)}:</b> {msg.text}
          </p>
        ))}
      </div>

      <hr />

      <input 
        placeholder="Type a message..." 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMsg}>Send</button>
      
      <br /><br />
      <button onClick={() => window.location.reload()}>Leave Room</button>
    </div>
  );
}
