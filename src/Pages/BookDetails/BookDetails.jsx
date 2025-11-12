import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BookDetails = () => {
  const navigate = useNavigate();
  const data  = useLoaderData();
  const { user } = useAuth();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
    
    const { _id, title, author, genre, rating ,summary, coverImage, added_by_name } = data.result;


  const handleDlete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00d084",
      cancelButtonColor: "#cf2e2e",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/delete-book/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate("/all-books");

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };


  return (
    <div className="max-w-6xl mx-auto p-42 pb-12 space-y-10">
      <div className="card bg-base-100/50 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full lg:w-1/2">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-96 md:h-full object-cover rounded-xl shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {title}
            </h1>

            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {genre}
              </div>
              <div className="badge badge-lg badge-outline text-yellow-600 border-yellow-600 font-medium">
                Rating: {rating} stars
              </div>
              <div className="badge badge-lg badge-outline text-green-600 border-green-600 font-medium">
                Added by: {added_by_name}
              </div>
            </div>

            <p className="text-base-content leading-relaxed text-base md:text-lg">
              {summary}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link className="btn btn-primary btn-md tex-info rounded-2xl" to={`/update-book/${_id}`}>Update</Link>
                
              <button
                onClick={handleDlete}
                className="btn btn-outline rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Delete Book
              </button>
            
        
              
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;