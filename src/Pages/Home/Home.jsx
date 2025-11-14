import React from "react";
import Banner from "../../components/Banner";
import LatestBooks from "../../components/LatestProducts/LatestBooks";
import Featured from "../../components/Featured/Featured";
import About from "../../components/About/About";

const Home = () => {
  return (
    <div className="gradient-animated">
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
