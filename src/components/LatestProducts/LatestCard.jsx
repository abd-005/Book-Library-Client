import React from "react";
import { Link } from "react-router";

const LatestCard = ({ book }) => {
  const { _id, title, image, rating, genre} = book;
  return (
    <div className="mx-3 my-7">
      
        <div className="card glass max-w-96 shadow-lg h-96 text-secondary-sans">
          <figure className="w-full h-96 bg-base-300/25 mx-auto ">
            <img
              src={image}
              alt={title}
              className="w-fit h-full scale-90"
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
            <Link className="btn btn-primary mt-2" to={`/details-book/${_id}`}>View Details</Link>
          </div>
        </div>
    </div>
  );
};

export default LatestCard;
