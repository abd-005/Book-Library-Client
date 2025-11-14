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
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (!sortBy) return;

    setLoading(true);

    const url =
      sortBy === "low_to_high"
        ? "https://book-library-server-xi.vercel.app/books-desync"
        : "https://book-library-server-xi.vercel.app/books-aync";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sorted books:", error);
        setLoading(false);
      });
  }, [sortBy]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        axiosInstance.get("/all-books").then(
          (books) => setBooks(books.data)
          // console.log(books.data)
        );

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

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="pt-42 pb-12">
      <MyContainer>
        <div className="text-center">
          <h2 className="font-secondary text-4xl font-semibold text-base-100">
            All Books
          </h2>
        </div>

        {/* table  */}

        <div className="bg-base-100/50 p-5 rounded-xl mt-12">
          <div className="grid lg:grid-cols-7 mt-3 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-secondary-sans text-base-200 text-4xl text-center">
                Explore All The Books of Heaven
              </h2>
            </div>
            <div className="lg:col-span-2 flex items-center justify-around text-left bg-base-100/50 p-3 rounded-full mt-5">
              <p className="text-xl">Sort by Rating : </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-cyan-200 bg-base-300/50 rounded-full focus:outline-none focus:ring-2 focus:cyan-200"
              >
                <option>Select Options</option>
                <option value="high_to_low">High to Low</option>
                <option value="low_to_high">Low to High</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto shadow-lg rounded-lg my-6">
            <table className="table w-full text-base text-center">
              {/* Table Header*/}
              <thead>
                <tr className="bg-base-200/80 text-lg">
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Rating</th>
                  <th>Actions</th>
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
        </div>
      </MyContainer>
    </div>
  );
};

export default AllBooks;
