import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className='w-full'>
      <div className='w-full flex flex-col items-center gap-3 '>
        <h1 className='text-4xl font-serif font-bold text-sky-700 '>
          WELCOME TO WOWCHAT!
        </h1>
        <h2 className='text-2xl font-serif font-bold text-sky-700 '>
          Create for you WowChat Account.
        </h2>

        <div className='w-full flex justify-center items-center gap-4'>
          {" "}
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
        </div>
      </div>
    </section>
  );
};
