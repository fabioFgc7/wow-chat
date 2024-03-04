/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Contatct } from "../components/Contatct";
import { ChatContainer } from "../components/ChatContainer";
import { getAllsChatUsers } from "../api/auth";
import { useChat } from "../context/ChatContext";

export const Chat = () => {
  const {
    currentChat,
    setCurrentChat,
    selectAvatar,
    currentUser,
    setCurrentUser,
    socket,
  } = useChat();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5173");
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function avatarChat() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await getAllsChatUsers(currentUser.id);
          setContacts(data.data);
          console.log(data.data);
        } else {
          navigate("/avatar");
        }
      }
    }
    avatarChat();
  }, [currentUser]);
  // console.log(currentUser.isAvatarImageSet);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className='w-full h-full'>
      <div className='flex-none md:flex w-auto h-full'>
        <Contatct
          currentUser={currentUser}
          contacts={contacts}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <div className='flex justify-center items-center w-full gap-2 flex-col'>
            <h1 className='text-sky-600 w-full text-center text-2xl font-serif p-2  '>
              Welcome
            </h1>
            <p>Init a chat with your contact!</p>
          </div>
        ) : (
          <div className='h-full w-full '>
            <ChatContainer />
          </div>
        )}
      </div>
    </div>
  );
};
