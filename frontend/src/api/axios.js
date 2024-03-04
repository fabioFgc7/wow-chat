import axios from "axios";
const instances = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
export default instances;
