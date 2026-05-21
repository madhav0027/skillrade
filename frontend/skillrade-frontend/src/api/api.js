import axios from "axios";

const API = axios.create({
  //  baseURL:'https://skillrade-4a5p.vercel.app/api'
  baseURL: "http://localhost:5000/",
  withCredentials:true
});

export default API;
