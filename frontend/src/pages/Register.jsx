/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export const Register = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, error, authAutenticated, signup } = useAuth();
  const handleOnChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (authAutenticated) navigate("/chat");
  }, [authAutenticated]);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "XXXXXXXX is required";
    } else if (values.password.length < 8) {
      errors.password = "XXXXXXXX must be at least 8 characters";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "XXXXXXX password is required";
    } else if (values.confirm_password !== values.password) {
      errors.confirm_password = "XXXXXXXXX do not match";
    }
    return errors;
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errors = validate(inputValues);
    setErrors(errors);

    signup(inputValues);
    console.log(inputValues);

    console.log(errors);
    console.log(user);
  };

  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        className='w-[500px] max-w-full mx-auto bg-slate-950 border-2 rounded-lg border-slate-600 flex flex-col items-start justify-center gap-5 relative mt-10 p-5 text-slate-100'>
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

        <label
          htmlFor=''
          className='flex flex-col items-start w-full'>
          Username
          <input
            type='text'
            name='username'
            onChange={handleOnChange}
            value={inputValues.username}
            id='username'
            placeholder='Username'
            className='w-full p-2 text-white bg-slate-800 rounded-md outline-none border-none'
          />
          {errors.username && <p className='error'>Username is required</p>}
        </label>
        <label
          htmlFor=''
          className='flex flex-col items-start w-full'>
          Email
          <input
            type='email'
            name='email'
            id='email'
            onChange={handleOnChange}
            value={inputValues.email}
            placeholder='Email'
            className='w-full p-2 text-white bg-slate-800 rounded-md outline-none border-none'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
        </label>
        <label
          htmlFor=''
          className='flex flex-col items-start w-full'>
          {" "}
          Password
          <input
            type='password'
            onChange={handleOnChange}
            value={inputValues.password}
            name='password'
            placeholder='Password'
            className='w-full p-2 text-white bg-slate-800 rounded-md outline-none border-none'
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
        </label>
        <label className='flex flex-col items-start w-full'>
          Confirm Password
          <input
            type='password'
            onChange={handleOnChange}
            name='confirm_password'
            value={inputValues.confirm_password}
            placeholder='Confirm Password'
            className='w-full p-2 text-white bg-slate-800 rounded-md outline-none border-none'
          />
          {errors.confirm_password && (
            <p className='text-red-500'>Confirm your password</p>
          )}
        </label>
        <button
          type='submit'
          className='w-full rounded-lg bg-sky-700 hover:bg-sky-500 p-2'>
          Create user
        </button>
        <div className='w-full flex items-center justify-center gap-4 mt-4'>
          <span className=''>Already have an account?</span>{" "}
          <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  );
};
