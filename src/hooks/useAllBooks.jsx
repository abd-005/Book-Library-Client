import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import toast from "react-hot-toast";

const useAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();

   useEffect(() => {
  
      const controller = new AbortController();
  
      async function fetchUsers() {
        try {
          setLoading(true);
          setError(null);
  
          axiosInstance.get(
            "/all-books").then(books=>(
              setBooks(books.data)
              // console.log(books.data)
            ));
  
        } catch (err) {
          if (err.name !== "CanceledError" && !err.signal?.aborted) {
            const msg = err.response?.data?.message || err.message || "Failed to load book";
            setError(msg);
            toast.error(msg);
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
      return () => controller.abort();
    }, [axiosInstance]);

  return { books, loading, error };
};
export default useAllBooks;