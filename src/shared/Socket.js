import io from "socket.io-client";

let socket;

const baseurl = process.env.REACT_APP_BASE_URL;

export const initiateSocket = (newsocket, groupId, userId) => {
  socket = io.connect(baseurl);
  socket && newsocket(socket);
  socket.emit("chatRoom", groupId, userId);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getMessages = (newsocket) => {
  if (!socket) return;
  socket.on("chatList", (message) => {
    return newsocket(message);
  });
};

//채팅 구독
export const subscribeToChat = (newsocket) => {
  if (!socket) return;
  socket.on("chatMessage", (data) => {
    return newsocket(data);
  });
};

//메시지 보내기
export const sendMessage = (groupId, userId, message) => {
  if (socket) {
    socket.emit("reqMessage", groupId, userId, message);
  }
};
