import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSocket } from "../../socket/socket";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const user = useSelector((state: any) => state.auth.userData);
  const socket = getSocket();
  const { id: receiverId } = useParams();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [isCalling, setIsCalling] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [error, setError] = useState<string>("");
  console.log("is connected==>> ",isCallConnected)

  const peerConnectionConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "turn:173.194.72.127:19305?transport=udp", username: "user", credential: "password" }
    ],
    iceCandidatePoolSize: 10,
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setIsCalling(false);
    setIsCallConnected(false);
    setIncomingCall(false);
  };

  useEffect(() => {
    if (!socket || !receiverId) {
      setError("Invalid socket connection or receiver ID");
      return;
    }

    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("candidate", ({ candidate }) => handleCandidate(candidate));
    socket.on("callEnded", cleanup);
    socket.on("callFailed", ({ reason }) => setError(reason));
    socket.on("incomingCall", () => setIncomingCall(true));

    return () => {
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("candidate");
      socket.off("callEnded");
      socket.off("callFailed");
      socket.off("incomingCall");
      cleanup();
    };
  }, [socket, receiverId, user._id]);

  const handleOffer = async (data: { offer: RTCSessionDescriptionInit; senderId: string }) => {
    setIncomingCall(true);
    socket.emit("incomingCallNotification", { receiverId: user._id, senderId: data.senderId });
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    try {
      if (peerConnectionRef.current && !peerConnectionRef.current.currentRemoteDescription) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        setIsCallConnected(true);
      }
    } catch (err) {
      console.error("Error handling answer:", err);
      setError("Failed to establish connection");
    }
  };

  const handleCandidate = async (candidate: RTCIceCandidateInit) => {
    try {
      if (peerConnectionRef.current && peerConnectionRef.current.remoteDescription) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (err) {
      console.error("Error handling ICE candidate:", err);
    }
  };

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection(peerConnectionConfig);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", {
          candidate: event.candidate,
          receiverId,
          senderId: user._id,
        });
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      if (peerConnection.iceConnectionState === "disconnected") {
        cleanup();
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setIsCallConnected(true);
      }
    };

    peerConnectionRef.current = peerConnection;
    return peerConnection;
  };

  const startCall = async () => {
    try {
      setError("");
      setIsCalling(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const peerConnection = createPeerConnection();
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit("offer", {
        offer,
        receiverId,
        senderId: user._id,
      });
    } catch (err) {
      console.error("Error starting call:", err);
      setError("Failed to start call. Please check your camera and microphone permissions.");
      cleanup();
    }
  };

  const acceptCall = async () => {
    try {
      setIncomingCall(false);
      const peerConnection = createPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    } catch (err) {
      console.error("Error accepting call:", err);
      setError("Failed to accept call.");
      cleanup();
    }
  };

  const rejectCall = () => {
    socket.emit("callRejected", { receiverId, senderId: user._id });
    setIncomingCall(false);
  };

  const endCall = () => {
    socket.emit("endCall", { receiverId, senderId: user._id });
    cleanup();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}

      <div className="flex gap-4 w-full">
        <div className="w-1/2 relative">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-lg" />
          <div className="absolute bottom-2 left-2">Local Video</div>
        </div>

        <div className="w-1/2 relative">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg" />
          <div className="absolute bottom-2 left-2">Remote Video</div>
        </div>
      </div>

      <div className="flex gap-4">
        {!isCalling && !incomingCall && (
          <button onClick={startCall} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Start Call
          </button>
        )}

        {incomingCall && (
          <>
            <button onClick={acceptCall} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Accept Call
            </button>
            <button onClick={rejectCall} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Reject Call
            </button>
          </>
        )}

        {isCalling && (
          <button onClick={endCall} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
