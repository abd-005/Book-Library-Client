import React from "react";
import Banner from "../../components/Banner";
import LatestBooks from "../../components/LatestProducts/LatestBooks";
import Featured from "../../components/Featured/Featured";
import About from "../../components/About/About";

const LatestBooksPromise = fetch("http://localhost:3000/latest-books").then(
  (res) => res.json()
);
const AllBooksPromise = fetch(
  "http://localhost:3000/all-books"
).then((res) => res.json());

const Home = () => {
  return (
    <div className="gradient-animated">
      <div>
        <section className="">
          <Banner />
        </section>
      </div>
      <section className="">
        <LatestBooks LatestBooksPromise={LatestBooksPromise} />
      </section>
      <section>
        <Featured/>
      </section>
      <section>
        <About/>
      </section>
    </div>
  );
};

export default Home;
