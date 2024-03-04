import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LeftArrowIcon } from "../icons/Icons";

export const Avatar = () => {
  const { selectAvatar, setSelectAvatar, avatar, setProfile } = useAuth();
  console.log(avatar);
  return (
    <div className='w-full flex flex-col items-center gap-4 relative'>
      <Link
        to={`/chat`}
        className='absolute left-2 top-2'>
        <LeftArrowIcon />
      </Link>
      <div className='title-container'>
        <h1 className='md:text-lg text-sm font-serif font-semibold'>
          Pick an Avatar as your profile picture
        </h1>
      </div>
      <div className='flex gap-2 items-center justify-center'>
        {avatar.map((av, index) => (
          <div
            key={index}
            className={`avatar p-2 border-2   rounded-full hover:cursor-pointer ${
              selectAvatar === index ? " border-green-600" : "border-[#2C394B]"
            }`}
            onClick={() => setSelectAvatar(index)}>
            <img
              className='rounded-full'
              width={32}
              height={32}
              src={av}
              alt='avatar'
            />
          </div>
        ))}
      </div>
      <button
        onClick={setProfile}
        className='submit-btn bg-sky-600 p-2 rounded-full'>
        Set as profile picture
      </button>
    </div>
  );
};
