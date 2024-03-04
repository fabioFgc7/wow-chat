import { useAuth } from "../context/AuthContext";

export const AlertSesion = () => {
  const { openAlert, handleConfirm, handleCancel } = useAuth();

  return (
    <div
      className={`w-full flex flex-col items-center gap-1 ${
        openAlert ? "block" : "hidden"
      }`}>
      <span className='text-center text-[10px]'>Do you want log out?</span>
      <div className={` flex items-center gap-4   text-xs   `}>
        <button
          className='p-1 rounded-xl bg-blue-500 '
          onClick={handleConfirm}>
          Confirm
        </button>
        <button
          className='p-1 rounded-xl bg-red-500'
          onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
