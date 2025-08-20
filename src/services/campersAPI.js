import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const getCampers = (params) =>
  api.get("/campers", { params }).then((r) => r.data);

export const getCamperById = (id) =>
  api.get(`/campers/${id}`).then((r) => r.data);
