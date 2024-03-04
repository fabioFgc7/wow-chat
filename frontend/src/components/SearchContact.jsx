import { SearchIcon } from "../icons/Icons";

/* eslint-disable react/prop-types */
export const SearchContact = ({ filterContact, handleFilterContact }) => {
  return (
    <div className='relative w-[90%]'>
      <input
        type='text'
        value={filterContact}
        onChange={handleFilterContact}
        className={`w-full px-8 bg-slate-900 py-1 -z-10 focus-visible:bg-slate-500 focus-visible:text-slate-200  outline-none rounded-lg text-slate-100 border-slate-900 border-[2px] ${
          filterContact.length > 0 ? "  border-solid border-[#e84d31]" : ""
        }`}
      />
      <SearchIcon className='absolute top-2 left-1  ' />
    </div>
  );
};
