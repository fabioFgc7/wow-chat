/* eslint-disable react/prop-types */
import { useState } from "react";
import { SendIcon } from "../icons/Icons";
import { EmojisPicker } from "./EmojisPicker";
export const InputChat = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");

  const sendMsg = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className=' w-full flex gap-2 items-center top-full sticky p-2 '>
      <EmojisPicker
        msg={msg}
        setMsg={setMsg}
      />
      <form
        className='flex w-full  gap-2   items-center'
        onSubmit={(e) => sendMsg(e)}>
        <div className='flex w-full items-center'>
          {" "}
          <textarea
            name='msg'
            id='msg'
            className='w-full  resize-none p-2 rounded-lg outline-none text-black'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}></textarea>
          <button
            type='submit'
            className='p-2 group '>
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};
