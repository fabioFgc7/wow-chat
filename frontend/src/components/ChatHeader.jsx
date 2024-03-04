/* eslint-disable react/prop-types */
import { useChat } from "../context/ChatContext";
import { LeftArrowIcon } from "../icons/Icons";
export const ChatHeader = ({ currentChat }) => {
  const { setHiddenStyle } = useChat();
  return (
    <div className='p-1 bg-[#082032] '>
      <div className='flex justify-between items-center '>
        <div className='flex md:h-12 h-8 items-center md:gap-2  gap-5'>
          <button
            onClick={() => setHiddenStyle(false)}
            className='md:hidden block'>
            <LeftArrowIcon />
          </button>
          <div className=' flex items-center gap-3'>
            <img
              className='md:w-10 md:h-10 w-6 h-6 rounded-full'
              src={
                currentChat.avatarImage
                  ? currentChat.avatarImage
                  : "./contact.svg"
              }
              alt='Avatar'
            />
          </div>
          <div className=''>
            <h2 className=''>{currentChat.username}</h2>
          </div>
        </div>
        <img
          width={60}
          className=' mr-1'
          src='./wowchat.png'
          alt=''
        />
      </div>
    </div>
  );
};
