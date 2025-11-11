import React from "react";
import Banner from "../../components/Banner";
import LatestBooks from "../../components/LatestProducts/LatestBooks";

const LatestBooksPromise = fetch("http://localhost:3000/latest-books").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div className="gradient-animated">
      <div>
        <section className=""><Banner /></section>
      </div>
      <section className=""><LatestBooks LatestBooksPromise={LatestBooksPromise} /></section>
    </div>
  );
};

export default Home;
