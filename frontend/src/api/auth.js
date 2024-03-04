import axios from "./axios";
export const registerRequired = (user) => axios.post("/auth/register", user);
export const loginRequired = (user) => axios.post("/auth/login", user);
export const verifyTokenRequired = (user) => axios.get("/auth/verify", user);
export const setProfilePicture = (id, user) =>
  axios.post(`/auth/avatar/${id}`, user);
export const getAllsChatUsers = (id) => axios.get(`/auth/allUsers/${id}`);
