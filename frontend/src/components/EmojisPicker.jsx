/* eslint-disable react/prop-types */
import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export const EmojisPicker = ({ setMsg, msg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='w-auto h-8  px-3'>
      <div
        className=' relative'
        ref={inputRef}>
        <button
          onClick={handleEmojiPickerHideShow}
          className='md:text-3xl text-xl'>
          😀
        </button>{" "}
        {showEmojiPicker && (
          <div
            onClick={stopPropagation}
            className=' z-10 absolute bottom-full'>
            <Picker
              width={260}
              height={300}
              autoFocusSearch
              lazyLoadEmojis
              onEmojiClick={handleEmojiClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
