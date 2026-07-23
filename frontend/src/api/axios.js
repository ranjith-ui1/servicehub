import axios from "axios";

// Change the port here if your Express server runs on something other than 5000
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
