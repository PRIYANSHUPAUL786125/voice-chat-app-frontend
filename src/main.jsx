import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SocketProvider } from "./Context/Socket.jsx";
import { PeerProvider } from "./Context/Peer.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <PeerProvider>
                {" "}
                <SocketProvider>
                    <App />
                </SocketProvider>
            </PeerProvider>
        </BrowserRouter>
    </StrictMode>,
);
