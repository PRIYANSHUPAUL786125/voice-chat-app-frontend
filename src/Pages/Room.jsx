import React, { useEffect, useRef } from 'react';

const Room = () => {
  const localVideoRef = useRef(null);

  useEffect(() => {
    // Ask the browser for the camera and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Feed the live camera stream into our video tag
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera access denied:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-xl p-4">
        
        {/* Your Video Box */}
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted // Keeps you from hearing your own echo
          className="w-full rounded-xl border-2 border-indigo-500 scale-x-[-1]" // scale-x flips it like a mirror
        />
        
      </div>
    </div>
  );
};

export default Room;