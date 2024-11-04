import { io, Socket } from "socket.io-client";
import { SERVER_BASE_API } from "../config/server_url";

const SOCKET_URL = SERVER_BASE_API;

let socket: Socket | null = null;

export const initializeSocket = (userId: any) => {
  if (
    socket &&
    (socket.auth as { userId: string | undefined })?.userId === userId
  ) {
    // If socket is already initialized with the same userId, do nothing
    return;
  }

  if (socket) {
    // If socket is already initialized, disconnect it before re-initializing
    socket.disconnect();
  }

  // Initialize the socket connection
  socket = io(SOCKET_URL, {
    auth: { userId },
    withCredentials: true,
    autoConnect: true,
  });

  //   socket.on("connect", () => {
  //     console.log(`Connected to server with ID: ${socket?.id}`);
  //   });

  //   // Handle disconnection
  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //   });
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
