import axios from "./axios";
export const sendMessage = (message) => axios.post("/messages/addmsg", message);
export const reciveMessage = (message) =>
  axios.post("/messages/getmsg", message);
export const removeMessage = (id) => axios.delete(`/messages/message/${id}`);
