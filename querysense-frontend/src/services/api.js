import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
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
      (error.request ? "Backend is not running on http://localhost:8080" : null) ||
      "Failed to analyze query"
    );
  }
};
