import React from "react";

const LatestCard = ({ book }) => {
  const { title, image, rating, genre} = book;
  return (
    <div className="mx-3 my-7">
      
        <div className="card glass max-w-96 shadow-lg h-[30vh] text-secondary-sans">
          <figure className="w-66 h-36 m-3 bg-base-300 mx-auto ">
            <img
              src={image}
              alt={title}
              className=""
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {title}
              <div className="badge badge-accent">NEW</div>
            </h2>
            <div className="card-actions justify-end">
              <div className="badge badge-outline bg-info text-info-content">Rating: {rating}</div>
              <div className="badge badge-outline">{genre}</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LatestCard;
