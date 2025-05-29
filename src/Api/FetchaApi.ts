import axios from "axios";

const fetchApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default fetchApi;
