import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import MyContainer from "../../components/MyContainer";
import BookTable from "./BookTable";
import Loading from "../../components/Loading";

const AllBooks = () => {
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
     <div className="pt-42 pb-12">
      <MyContainer>
        <div className="text-center">
          <h2 className="font-secondary text-4xl font-semibold text-base-100">All Books</h2>
          <h2 className="font-secondary-sans text-base-200">Explore The Book Heaven</h2>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg my-6">
      <table className="table w-full text-base">
        {/* Table Header*/}
        <thead>
          <tr className="bg-base-200/80 text-lg">
            <th>Book Name</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Actions</th>
            <th>Created By</th>
          </tr>
        </thead>
        
        {/* Table Body*/}
        <tbody>
          {books.map((book) => (
            <BookTable key={book._id} book={book} />
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-base-300/80 rounded-b-lg">
        <span className="text-sm text-base-200">
          Total Books: {books.length}
        </span>
      </div>
    </div>
      </MyContainer>
    </div>
  );
};

export default AllBooks;
