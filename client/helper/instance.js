import axios from "axios";
import { API_BASE_URL } from "../config/api";

// Create a new instance of Axios with custom configurations
const userRequest = axios.create({
  baseURL: API_BASE_URL, // Replace this with your backend base URL
  timeout: 5000, // Set a timeout of 5 seconds for requests
  headers: {
    "Content-Type": "application/json", // Set the default content type for requests
    // You can add any other default headers here if needed
  },
});

export default userRequest;
