import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-library-server-xi.vercel.app",
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "content-type": "application/json",
  },
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
