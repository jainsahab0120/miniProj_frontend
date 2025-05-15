import axios from "axios";

const API = axios.create({
  baseURL: "https://miniproj-backend.onrender.com/api/",
  headers: {
    'Content-Type': 'application/json'
  }
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Network Error:", error);
      throw new Error("Unable to connect to server. Please check your connection.");
    }
    throw error;
  }
);

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) => {
  try {
    const response = await API.get(`/user/workout${date}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addWorkout = async (token, workoutData) => {
  try {
    const response = await API.post("/user/workout", workoutData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkout = async (token, id) =>
  await API.delete(`/user/workout/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const submitContactForm = async (token, data) => 
  await API.post("/user/contact", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
