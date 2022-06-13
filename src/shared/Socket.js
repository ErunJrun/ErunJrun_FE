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
    console.log("메시지 불러오기", message);
    return newsocket(message);
  });
};

//채팅 구독
export const subscribeToChat = (newsocket) => {
  if (!socket) return;
  socket.on("chatMessage", (data) => {
    console.log("채팅 구독", data);
    return newsocket(data);
  });
};

//메시지 보내기
export const sendMessage = (groupId, userId, message) => {
  if (socket) {
    console.log("메시지 보내기", groupId, userId, message);
    socket.emit("reqMessage", groupId, userId, message);
  }
};
