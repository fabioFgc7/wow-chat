/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { ContactIcon, EditIcon } from "../icons/Icons";
import { AlertSesion } from "./AlertSesion";
import { Link } from "react-router-dom";

export const Options = ({ active, stopPropagation }) => {
  const { logout } = useAuth();
  const { currentUserImage, currentUserName } = useChat();

  return (
    <div
      className={``}
      onClick={stopPropagation}>
      <div
        className={`w-32 overflow-hidden   absolute -left-24  ${
          active ? "-translate-x-6" : "translate-x-[150%]"
        } flex flex-col gap-2 items-center bg-slate-600 p-2 rounded-xl rounded-tr-none `}>
        <div className='w-full flex  gap-1 items-center overflow-hidden group'>
          <div className='avatar'>
            {currentUserImage ? (
              <img
                width={32}
                height={32}
                src={currentUserImage}
                alt='Perfil'
              />
            ) : (
              <ContactIcon />
            )}
          </div>
          <h2 className='text-xs w-full font-bold truncate'>
            {currentUserName}
          </h2>{" "}
          <Link
            to={`/avatar`}
            className='group-hover:translate-x-0 transition-all duration-200 ease-linear translate-x-full'>
            <EditIcon />
          </Link>
        </div>

        <button
          onClick={logout}
          className='p-2 hover:bg-slate-700 rounded-lg text-sm'>
          Cerrar sesion
        </button>

        <AlertSesion />
      </div>
    </div>
  );
};
