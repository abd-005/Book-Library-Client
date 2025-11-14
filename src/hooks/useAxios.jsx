import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
//  Authorization: `<Your Auth Token>`,
    "content-type" :"application/json",
  }, 
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;