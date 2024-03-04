/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import {
  loginRequired,
  registerRequired,
  setProfilePicture,
  verifyTokenRequired,
} from "../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const Context = createContext();
const useAuth = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
const AuthContext = ({ children }) => {
  const [authAutenticated, setAuthAutenticated] = useState(false);
  const [error, setError] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [selectAvatar, setSelectAvatar] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const signup = async (user) => {
    try {
      const res = await registerRequired(user);
      console.log(res.data);
      setUser(res.data);
      setAuthAutenticated(true);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.error("Errores del servidor:", error.response.data.errors);
        setError(error.response.data.errors);
      } else {
        console.error("Error:", error.message);
        setError([error.response.data]);
      }
    }
  };

  const logout = () => {
    setOpenAlert(true);
  };
  const handleConfirm = () => {
    Cookies.remove("token");
    setAuthAutenticated(false);
    setUser(null);
  };
  const handleCancel = () => {
    setOpenAlert(false);
  };

  const signin = async (user) => {
    try {
      const res = await loginRequired(user);
      console.log(res.data);
      setUser(res.data);
      setAuthAutenticated(true);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log("Yes");
        console.log(res.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.error("Errores del servidor:", error.response.data.errors);
        setError(error.response.data.errors);
      } else {
        console.error("Error:", error.message);
        setError([error.response.data]);
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
  }, [navigate]);
  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  useEffect(() => {
    async function checkLogin() {
      const cookie = Cookies.get();
      if (!cookie.token) {
        setAuthAutenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequired(cookie.token);
        console.log(res);
        if (!res.data) {
          setAuthAutenticated(false);
          setLoading(false);
          return;
        }
        setUser(res.data);
        setAuthAutenticated(true);
        setLoading(false);
      } catch (error) {
        setAuthAutenticated(false);
        setLoading(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);
  const setProfile = async () => {
    try {
      if (selectAvatar === undefined) {
        alert("Please select an avatar");
      } else {
        const users = await JSON.parse(localStorage.getItem("user"));
        console.log(users);
        const { data } = await setProfilePicture(users.id, {
          image: avatar[selectAvatar],
        });
        console.log(data.image);
        if (data.isSet) {
          (users.isAvatarImageSet = true), (users.avatarImage = data.image);
          localStorage.setItem("user", JSON.stringify(users));

          navigate("/chat");
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profilePicture = [
    "./public/avatar/hombre.png",
    "./public/avatar/mujer.png",
    "./public/avatar/mujer (1).png",
    "./public/avatar/hombre (1).png",
  ];

  useEffect(() => {
    async function setPicture() {
      const data = [];
      for (let i = 0; i < profilePicture.length; i++) {
        try {
          const res = await fetch(profilePicture[i]);
          const blob = await res.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            data.push(reader.result);
            if (data.length === profilePicture.length) {
              setAvatar(data);
            }
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
    setPicture();
  }, []);
  return (
    <Context.Provider
      value={{
        signup,
        logout,
        signin,
        error,
        loading,
        user,
        authAutenticated,
        avatar,
        selectAvatar,
        setSelectAvatar,
        openAlert,
        handleConfirm,
        handleCancel,
        setOpenAlert,
        setProfile,
      }}>
      {children}
    </Context.Provider>
  );
};

export { AuthContext, useAuth };
