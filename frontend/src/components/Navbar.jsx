import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { authAutenticated, user, logout } = useAuth();
  return (
    <nav className='flex justify-end  items-center w-full'>
      <ul className='flex gap-3 items-center mr-5'>
        <Link
          className='bg-slate-600 text-slate-100 rounded-lg p-2 '
          to={`${authAutenticated ? "/chat" : "/"}`}></Link>
        {authAutenticated ? (
          <>
            <li className=' '>Welcome {user.username}</li>
            <li
              onClick={logout}
              className='rounded-md py-1 px-4 bg-slate-900 text-slate-100 cursor-pointer hover:bg-slate-800 '>
              Logout
            </li>
          </>
        ) : (
          <>
            <Link
              className='bg-slate-600 text-slate-100 rounded-lg p-2 '
              to='/register'>
              Register
            </Link>
            <Link
              className='bg-slate-600 text-slate-100 rounded-lg p-2 '
              to='/login'>
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};
