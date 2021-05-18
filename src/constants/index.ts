import Axios from "axios";

const baseURL: string =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5001/portalbens-nextjs-hefesto/us-central1/api"
    : "https://us-central1-portalbens-nextjs-hefesto.cloudfunctions.net/api";

export const axiosInstance = Axios.create({
  ...Axios.defaults,
  baseURL: baseURL,
});
