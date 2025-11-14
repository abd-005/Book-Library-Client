import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const images = [
  "https://i.pinimg.com/1200x/c4/21/ff/c421ff0fa2d163b0464b91c131369d2a.jpg",
  "https://i.pinimg.com/736x/23/46/a0/2346a0ad3e5efa9bd3c55d610ca9008a.jpg",
  "https://i.pinimg.com/1200x/b9/ac/16/b9ac160cccaf2b74e93046cd8bc0adeb.jpg",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play the carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((current - 1 + 30) % 3);
  const nextSlide = () => setCurrent((current + 1) % 3);

  return (
    <div className="w-full">
      <div className="mx-auto">
        <div className="relative w-full overflow-hidden bg-black rounded-2xl shadow-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="w-full shrink-0 relative h-[500px]">
                <img
                  src={src}
                  className="w-full h-full object-cover brightness-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 md:grid flex flex-col gap-3 md:grid-rows-4 md:grid-cols-4
                lg:grid-rows-4 lg:grid-cols-4
                items-center justify-center md:gap-18 pt-18 w-9/12 mx-auto">
                  <div className="col-span-2 md:mt-[40vh]">
                    <div className="typing-container">
                      <p className="fade-load font-secondary text-base-100 text-5xl lg:text-6xl">
                        Take a tour to the Heaven!!
                      </p>
                    </div>
                    <Link
                      to={"/all-books"}
                      className="btn btn-secondary fade-load"
                    >
                      All Book
                    </Link>
                  </div>
                  <div className="flex flex-col items-end justify-end col-span-2 md:mt-[65vh]">
                    <div className="typing-container">
                      <p className="fade-load font-secondary text-base-100 text-5xl md:text-6xl text-end ">
                        Contribute to the Heaven!!
                      </p>
                    </div>
                    <Link
                      to={"/add-book"}
                      className="btn btn-primary fade-load"
                    >
                      Create Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === i ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
