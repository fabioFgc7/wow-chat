/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const { user, error, authAutenticated, signin } = useAuth();
  const [errors, setErrors] = useState({});
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const validateForm = (values) => {
    const error = {};
    if (!values.email) {
      error.email = "Username is required";
    }
    if (!values.password) {
      error.password = "password is required";
    }
    return error;
  };
  const handleOnChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(inputValues);
    setErrors(errors);
    signin(inputValues);

    console.log(user);
    console.log(error);
    if (Object.keys(errors).length > 0) return;
  };
  useEffect(() => {
    if (authAutenticated) return navigate("/chat");
  }, [authAutenticated]);
  return (
    <div className=' w-full flex items-center h-full'>
      <form
        action=''
        onSubmit={handleOnSubmit}
        className='w-[500px] max-w-full mx-auto  bg-slate-950 border-2 rounded-lg border-slate-600 flex flex-col items-start justify-center gap-5 p-5  text-slate-100 '>
        <div className='w-full flex gap-5 justify-center items-center mb-7'>
          <img
            className='bg-cover'
            src='/wowchat.png'
            alt='img'
            width={90}
            height={90}
          />
        </div>
        {error.map((err, i) => (
          <div
            key={i}
            className='bg-red-500 text-center my-2 rounded-md'>
            {err}
          </div>
        ))}
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <label
          htmlFor=''
          className='flex flex-col items-start w-full'>
          Username or Email
          <input
            type='email'
            name='email'
            onChange={handleOnChange}
            value={inputValues.email}
            id='email'
            placeholder='Username or email'
            className='w-full p-2 text-white bg-slate-800 rounded-md outline-none border-none'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
        </label>
        <label
          htmlFor=''
          className='flex flex-col items-start w-full'>
          Password
          <input
            type='password'
            name='password'
            onChange={handleOnChange}
            value={inputValues.password}
            id='password'
            placeholder='Password'
            className='w-full p-2 text-white bg-slate-800 rounded-md outline-none border-none'
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
        </label>
        <button
          type='submit'
          className='w-full rounded-lg bg-sky-700 hover:bg-sky-500 p-2'>
          Login
        </button>
        <div className='w-full flex items-center justify-center gap-4 mt-4'>
          <span className=''>Don&#39;t have an account?</span>{" "}
          <Link to={"/register"}>Register</Link>
        </div>
      </form>
    </div>
  );
};
