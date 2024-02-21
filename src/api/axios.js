import axios from "axios";

export default axios.create({
  baseURL: "https://intern-backend-fzuq.onrender.com/",
  withCredentials: true,
});
