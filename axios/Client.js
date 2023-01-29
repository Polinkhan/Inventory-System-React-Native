import axios from "axios";

export const client = axios.create({
  baseURL: "http://100.100.1.254:5000",
});
