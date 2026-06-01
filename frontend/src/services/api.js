import axios from "axios";

const API_BASE_URL =
  "https://querysense-production-613a.up.railway.app";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const analyzeQuery = async (data) => {
  try {
    const response = await API.post("/api/analyze", data);
    return response.data;
  } catch (error) {
    console.error("Analysis failed:", error);

    throw new Error(
      error.response?.data?.message ||
      (error.request ? `Backend is not reachable at ${API_BASE_URL}` : null) ||
      "Failed to analyze query"
    );
  }
};
