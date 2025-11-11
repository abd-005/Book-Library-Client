import React, { use } from "react";
import LatestCard from "./LatestCard";
import MyContainer from "../MyContainer";
import Marquee from "react-fast-marquee";

const LatestBooks = ({ LatestBooksPromise }) => {
  const books = use(LatestBooksPromise);
  console.log(books);

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
