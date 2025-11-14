import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import MyContainer from "../../components/MyContainer";
import MyBookTable from "./MyBookTable";

const MyBooks = () => {
  const [loading, setLoading] = useState();
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  console.log(user.email);

  useEffect(() => {
    fetch(
      `https://book-library-server-xi.vercel.app/myBooks?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setBooks(data);
      });
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pt-42 pb-12">
      <MyContainer>
        <div className="text-center">
          <h2 className="font-secondary text-4xl font-semibold text-base-100">
            My Books
          </h2>
          <h2 className="font-secondary-sans text-base-200">
            Books that's you added
          </h2>
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            {/* Table Body*/}
            <tbody>
              {books.map((book) => (
                <MyBookTable key={book._id} book={book} />
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

export default MyBooks;
