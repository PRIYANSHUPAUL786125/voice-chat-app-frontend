import React, { useState } from "react";
import { useSocket } from "../Context/Socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const socket = useSocket();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !roomId.trim()) {
            alert("Please enter both your name and a Room ID.");
            return;
        }

        console.log(`Connecting User: ${name} to Room: ${roomId}`);
        socket.emit("join-room", { roomId, name });
        socket.on("peer-joined", (name) => {
            console.log(`${name} joined in ${roomId}`);
        });
        navigate(`/room/${roomId}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 px-4">
            <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        WebRTC Video Chat
                    </h1>
                    <p className="text-sm text-slate-400 mt-2">
                        Enter a room ID to start signaling and connect with a
                        peer.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-300 mb-1"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Alice"
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-slate-100 placeholder-slate-500"
                            required
                        />
                    </div>

                    {/* Room ID Input */}
                    <div>
                        <label
                            htmlFor="roomId"
                            className="block text-sm font-medium text-slate-300 mb-1"
                        >
                            Room ID
                        </label>
                        <input
                            type="text"
                            id="roomId"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            placeholder="e.g., room-xyz"
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-slate-100 placeholder-slate-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                    >
                        Join Room
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;
