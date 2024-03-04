import { CallIcon, CircleIcon, ConfigIcon } from "../icons/Icons";

export const FooterChat = () => {
  return (
    <div className='flex justify-between items-center bg-slate-300 p-4 w-full sticky top-full '>
      <button className=''>
        <CircleIcon />
      </button>
      <button className=''>
        <CallIcon />
      </button>
      <button className=''>
        <ConfigIcon />
      </button>
      <button className=''>
        <CallIcon />
      </button>
    </div>
  );
};
