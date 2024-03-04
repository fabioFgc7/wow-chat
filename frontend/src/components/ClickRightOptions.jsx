import { useChat } from "../context/ChatContext";

/* eslint-disable react/prop-types */
export const ClickRightOptions = ({ id }) => {
  const { deleteMessage } = useChat();
  console.log(id);
  return (
    <>
      <div className='p-2  flex flex-col gap-2 w-full justify-center'>
        <button className='bg-blue-400 p-1 '>Copy</button>
        <button
          onClick={() => deleteMessage(id)}
          className='bg-red-500 p-1 '>
          Delete
        </button>
        <button className='bg-blue-500 p-1'>Share</button>
      </div>
    </>
  );
};
