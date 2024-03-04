/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { reciveMessage, removeMessage, sendMessage } from "../api/chat";

const Context = createContext();
const useChat = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
const ChatContext = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [hiddenStyle, setHiddenStyle] = useState(false);
  const [messages, setMessages] = useState([]);
  const [indexChat, setIndexChat] = useState(null);
  const [rightClickActive, setRightClickActive] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [messageStates, setMessageStates] = useState([]);
  const socket = useRef();

  const [chatId, setChatId] = useState("");
  useEffect(() => {
    async function dataParse() {
      const data = await JSON.parse(localStorage.getItem("user"));
      setCurrentUserName(data.username);
      setCurrentUserImage(
        data.avatarImage !== undefined ? data.avatarImage : "./vite.svg"
      );
    }
    dataParse();
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
    setHiddenStyle(true);
  };
  const scrollRef = useRef(null);
  useEffect(() => {
    const messageChat = async () => {
      const data = await JSON.parse(localStorage.getItem("user"));
      const response = await reciveMessage({
        from: data.id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    messageChat();
  }, [currentChat]);
  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("user")).id;
      }
    };
    getCurrentChat();
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("user"));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data.id,
      msg,
    });
    const res = await sendMessage({
      from: data.id,
      to: currentChat._id,
      message: msg,
    });
    console.log(res);
    const msgs = [...messages];
    msgs.push({ id: res.data.id, fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recived", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setIndexChat(index);
    if (index === indexChat) {
      setRightClickActive(!rightClickActive);
    }
  };
  const deleteMessage = async (id) => {
    try {
      const res = await removeMessage(id);

      if (res.status === 200) {
        setMessages(messages.filter((message) => message.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Context.Provider
      value={{
        deleteMessage,
        currentSelected,
        currentUserImage,
        currentUserName,
        currentChat,
        changeCurrentChat,
        hiddenStyle,
        setHiddenStyle,
        handleRightClick,
        currentUser,
        setCurrentUser,
        setRightClickActive,
        socket,
        messages,
        rightClickActive,
        indexChat,
        scrollRef,
        setChatId,
        chatId,
        handleSendMsg,
        setMessageStates,
        messageStates,
      }}>
      {children}
    </Context.Provider>
  );
};

export { ChatContext, useChat };
