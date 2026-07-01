import  { createContext, useMemo, useContext } from "react";

const PeerContext = createContext(null);

export const PeerProvider = ({ children }) => {
    // 1. Fixed iceServers syntax (Must be an array of objects)
    const peer = useMemo(
        () =>
            new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun1.l.google.com:19302",
                            "stun:stun2.l.google.com:19302",
                        ],
                    },
                ],
            }),
        []
    );

    const createOffer = async () => {
        try {
            // 2. Added await here so we get the actual offer data, not a Promise
            const offer = await peer.createOffer();
            console.log("Created Offer:", offer);
            
            await peer.setLocalDescription(offer);
            return offer; // Return it so your component can emit it via Socket.io
        } catch (error) {
            console.error("Failed to create SDP offer:", error);
        }
    };

    return (
        <PeerContext.Provider value={{ peer, createOffer }}>
            {children}
        </PeerContext.Provider>
    );
};

export const usePeer = () => useContext(PeerContext);
