import React from "react";
import Banner from "../../components/Banner";
import LatestBooks from "../../components/LatestProducts/LatestBooks";
import Featured from "../../components/Featured/Featured";
import About from "../../components/About/About";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:gradient-animated">
      <div>
        <section className="">
          <Banner />
        </section>
      </div>
      <section className="">
        <LatestBooks />
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
