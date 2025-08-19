import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCampers = (params) =>
  api.get("/campers", { params }).then((r) => r.data);

export const getCamperById = (id) =>
  api.get(`/campers/${id}`).then((r) => r.data);
