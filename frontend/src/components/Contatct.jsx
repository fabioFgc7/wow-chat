/* eslint-disable react/prop-types */

import { useChat } from "../context/ChatContext";
import { Options } from "./Options";
import { useEffect, useRef, useState } from "react";
import { ConfigurationIcon, ContactIcon } from "../icons/Icons";
import { SearchContact } from "./SearchContact";
// eslint-disable-next-line react/prop-types
export const Contatct = ({ contacts, currentUser }) => {
  const {
    changeCurrentChat,
    currentSelected,
    currentUserImage,
    currentUserName,
    hiddenStyle,
  } = useChat();
  const [active, setActive] = useState(false);
  const [filterContact, setFilterContact] = useState("");
  const filterContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(filterContact.toLowerCase())
  );
  const moveRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moveRef.current && !moveRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActive]);
  const toggleElement = () => {
    setActive(!active);
  };
  const handleFilterContact = (e) => {
    setFilterContact(e.target.value);
  };
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      className={` bg-slate-900 md:w-1/3 w-full h-full overflow-hidden  ${
        hiddenStyle ? "hidden md:block" : ""
      }`}>
      {currentUserImage && currentUserName && (
        <div className='h-full'>
          <div className='flex justify-between p-4 items-center'>
            <SearchContact
              filterContact={filterContact}
              handleFilterContact={handleFilterContact}
            />
            <div
              className='relative '
              ref={moveRef}>
              <div className=''>
                {" "}
                <ConfigurationIcon
                  onClick={toggleElement}
                  className='hover:cursor-pointer'
                />
              </div>

              <Options
                active={active}
                stopPropagation={stopPropagation}
                currentUser={currentUser}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 overflow-y-auto overflow-x-hidden h-full w-full'>
            {filterContacts.length === 0 ? (
              <>
                <div className=' bg-slate-900 '>
                  <h1 className='text-center text-white'>
                    No found user &#34;{filterContact}&#34;
                  </h1>
                </div>
              </>
            ) : (
              filterContacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`hover:cursor-pointer flex items-center gap-2 p-1 hover:bg-[#334756] rounded-xl ${
                      index === currentSelected ? "bg-[#334756]" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}>
                    <div className='avatar avatar p-2 border-2 border-[#2C394B]  rounded-full '>
                      {contact.avatarImage ? (
                        <img
                          width={24}
                          height={24}
                          src={contact.avatarImage}
                          alt='Perfil'
                        />
                      ) : (
                        <ContactIcon />
                      )}
                    </div>
                    <div className='username'>
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
      {/* <FooterChat /> */}
    </div>
  );
};
