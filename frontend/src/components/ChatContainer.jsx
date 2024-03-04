/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { v4 as uuidv4 } from "uuid";
import { InputChat } from "./InputChat";
import { CopyIcon, DeleteIcon } from "../icons/Icons";
import { useChat } from "../context/ChatContext";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatHeader } from "./ChatHeader";

export const ChatContainer = () => {
  const {
    hiddenStyle,
    currentChat,
    messages,
    handleRightClick,
    rightClickActive,
    indexChat,
    scrollRef,
    deleteMessage,
    setRightClickActive,
    handleSendMsg,
  } = useChat();
  const chatRef = useRef(null);
  console.log(messages);

  const handleCopyText = (msg) => {
    navigator.clipboard.writeText(msg);
    toast.success("Text copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div
      id='#chat-container'
      className={` w-full flex flex-col overflow-auto h-full  bg-[#2C394B] ${
        hiddenStyle ? "" : "hidden md:block"
      }`}>
      <ChatHeader currentChat={currentChat} />
      <div className='p-5  overflow-auto h-full'>
        {messages.length === 0 ? (
          <p className='text-xl font-serif font-bold text-center '>
            Send a message to {currentChat.username}!
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              ref={scrollRef}
              key={uuidv4()}
              className='w-full'
              onClick={() => setRightClickActive(false)}>
              <div
                className={`relative  flex gap-2   ${
                  message.fromSelf ? " justify-end  " : " justify-start "
                }`}>
                <p
                  onContextMenu={(e) => handleRightClick(e, index)}
                  className={`mt-2 w-auto  max-w-[80%] h-full relative rounded-3xl text-justify   ${
                    message.fromSelf ? "bg-blue-500  p-2" : "bg-green-500  p-3"
                  }`}>
                  {message.message}
                </p>
                <div
                  className={`   absolute top-[80%] -mx-5 right-10 z-40 ${
                    rightClickActive && index === indexChat ? "block" : "hidden"
                  } w-32 h-auto p-2 flex justify-center`}>
                  {" "}
                  <div
                    ref={chatRef}
                    className='p-2  flex flex-col gap-2 w-full justify-center bg-[#31507c]   rounded-xl'>
                    <button
                      onClick={() => handleCopyText(message.message)}
                      className='text-slate-200 pb-2 border-b-[1px] p-1 flex justify-between items-center '>
                      Copy
                      <CopyIcon />
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className='text-red-500 p-1  flex justify-between items-center'>
                      Delete
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
      <InputChat handleSendMsg={handleSendMsg} />
    </div>
  );
};
