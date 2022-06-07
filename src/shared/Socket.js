import io from "socket.io-client";

let socket;

const baseurl = process.env.REACT_APP_BASE_URL;

export const initiateSocket = (newsocket, groupId, userId) => {
  socket = io.connect(baseurl);
  socket && newsocket(socket);
  socket.emit("chatRoom", groupId, userId);
  console.log("🤝🏻소켓연결!");
  console.log(socket);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🔪연결끝");
  }
};

export const getMessages = (newsocket) => {
  if (!socket) return;
  socket.on("chatList", (message) => {
    console.log(message);
    return newsocket(message);
  });
};

export const subscribeToChat = (newsocket) => {
  if (!socket) return;
  socket.on("chatMessage", (data) => {
    console.log(data);
    return newsocket(data);
  });
};

export const sendMessage = (groupId, userId, message) => {
  if (socket) {
    socket.emit("reqMessage", groupId, message, userId);
  }
};
