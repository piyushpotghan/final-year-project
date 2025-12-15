import React, { useState } from "react";

const VideoCall = () => {
  const [room, setRoom] = useState("");
  const [showCall, setShowCall] = useState(false);

  const startCall = () => {
    if (!room) {
      alert("Enter a room name!");
      return;
    }
    setShowCall(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!showCall && (
        <div>
          <input
            placeholder="Enter Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button
            onClick={startCall}
            style={{ padding: "5px 10px", background: "green", color: "white", border: "none", borderRadius: "5px" }}
          >
            Join Call
          </button>
        </div>
      )}

      {showCall && (
        <div style={{ marginTop: "20px", width: "800px", height: "600px" }}>
          <iframe
            src={`https://meet.jit.si/${room}`}
            style={{ width: "100%", height: "100%" }}
            allow="camera; microphone; fullscreen; display-capture"
            title="Video Call"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
