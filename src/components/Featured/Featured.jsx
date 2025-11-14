import React from "react";
import useAllBooks from "../../hooks/useAllBooks";
import Loading from "../Loading";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import MyContainer from "../MyContainer";

const Featured = () => {
  const { books, loading } = useAllBooks();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="my-12">
        <MyContainer>
          <div className="text-center my-12">
            <h2 className="font-secondary text-4xl font-semibold text-base-100">
              Featured Book
            </h2>
            <p className="font-secondary text-base-100">
              Discover our most lovely books of the week
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center">
            {books.slice(0, 12).map((book) => (
              <div key={book._id}>
                <div className="mx-3 my-7">
                  <div className="card glass max-w-96 shadow-lg h-96 text-base-100">
                    <figure className="w-full h-96 bg-base-300/25 mx-auto ">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-fit h-full scale-90"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {book.title}
                        <div className="badge badge-accent">NEW</div>
                      </h2>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline bg-info text-info-content">
                          Rating: {book.rating}
                        </div>
                        <div className="badge badge-outline">{book.genre}</div>
                      </div>
                      <Link
                        className="btn btn-primary mt-2"
                        to={`/details-book/${book._id}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MyContainer>
      </div>
    </>
  );
};

export default Featured;
