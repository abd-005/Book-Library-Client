import React, { useEffect, useState } from "react";
import LatestCard from "./LatestCard";
import MyContainer from "../MyContainer";
import Marquee from "react-fast-marquee";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading";

const LatestBooks = () => {
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
          "/latest-books").then(books=>(
            setBooks(books.data),
            console.log(books.data)
          ));

        // setBooks(response.data);
      } catch (err) {
        if (axiosInstance.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else if (err.name !== "CanceledError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <Loading/>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="my-12">
      <MyContainer>
        <div className="text-center">
          <h2 className="font-secondary text-4xl font-semibold text-base-100">Latest Books</h2>
        </div>

      <Marquee className="flex " pauseOnHover={true} speed={50}>
        {books?.map((book) => (
        <LatestCard key={book._id} book={book} />
      ))}
      </Marquee>
      </MyContainer>
    </div>
  );
};

export default LatestBooks;
