/*
  Reference: The following code snippet have been taken from Chat-GPT, and used directly without modification (re-usable code). 
  Official NPM Axios documentation: https://www.npmjs.com/package/axios
  Note - This class is the re-usable instance of axios api for api calls.
*/

import axios from "axios";
import { API_BASE_URL } from "./baseURL";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
