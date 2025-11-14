import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import MyContainer from "../../components/MyContainer";
import Comment from "./Comment";

const BookDetails = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  // const data  = useLoaderData();
  const { user } = useAuth();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState();
  const [comments, setComments] = useState();
  // const {cout, setCount} = useState()

  ///////////////////////////////// Book Details

  useEffect(() => {
    fetch(`http://localhost:3000/details-book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setBook(data.result);
      });
  }, [id]);
  console.log(book._id)
  /////////////////////////////////// Comments

  useEffect(() => {
    fetch(`http://localhost:3000/my-comments/${book._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setComments(data);
      });
  }, []);

  ///////////////////////////////////// handleComment

  const handleComment = (e) => {
    e.preventDefault();
    // setCount((count) => count + 1)
    const formData = {
      comment: e.target.comment.value,
    };
    const finalData = {
      title: book.title,
      commented_by: user.email,
      comment: formData.comment,
      summery: book.summery,
      created_at: new Date(),
      user_image: user.photoURL,
      user_name: user.displayName,
      book_id: book._id,
    };
    
   

    fetch(`http://localhost:3000/comments/${book._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then((data) => {
        // setNewData(data.data.finalData);
        setLoading(false);
        toast.success("Commented!");
        console.log("After Post:: ",data);
        e.target.reset();
      });
  };

  // console.log(book, "user: ", user);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-6xl mx-auto p-42 pb-12 space-y-10">
      <div className="card bg-base-100/50 shadow-xl border border-gray-200 rounded-2xl overflow-hidden ">
        <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full lg:w-1/2">
            <img
              src={book?.image}
              alt={book?.title}
              className="w-full h-96 md:h-full object-cover rounded-xl shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {book?.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {book?.genre}
              </div>
              <div className="badge badge-lg badge-outline text-yellow-600 border-yellow-600 font-medium">
                Rating: {book?.rating} stars
              </div>
              <div className="badge badge-lg badge-outline text-green-600 border-green-600 font-medium">
                Added by: {book?.user_name}
              </div>
            </div>
            <p className="text-base-content leading-relaxed text-base md:text-lg">
              {book?.summary}
            </p>
          </div>
        </div>
        <hr className="text-cyan-800" />
        <div className="pt-6 pb-6">
          <div className="text-center flex items-center justify-center">
            <h2 className="font-secondary text-4xl font-semibold">Comments</h2>
          </div>
          <MyContainer>
            <div className="overflow-x-auto w-10/11 rounded-lg mx-auto">
              {/* Comment Section  */}

              {/* <div className="p-4 bg-base-100/50 mb-6 rounded-b-lg shadow-md">
                <div className="bg-transparent max-w-full">
                  <div className="flex items-center justify-left gap-3">
                    <figure className="w-12 h-12 bg-base-300 rounded-full">
                      <img
                        src={newData.user_image}
                        alt={"user"}
                        className=" "
                      />
                    </figure>
                    <h2 className="card-title text-xl font-semibold m-1">
                      {newData.user_name}
                    </h2>
                  </div>

                  <p className="bg-base-300 w-full mt-3 p-5 rounded-full flex items-center justify-between">
                    {newData.comment} <span> {newData.created_at}</span>
                  </p>
                </div>
              </div> */}

              {/* {comments.map((comment) => {
                <Comment key={comment._id} comment={comment}></Comment>;
              })} */}
              <Comment/>

              {/* Form Section */}

              <form
                onSubmit={handleComment}
                className="mx-3 my-6 gap-3 grid grid-cols-3 items-center justify-center"
              >
                <input
                  type="text"
                  name="comment"
                  required
                  className="col-span-2   px-4 py-3 border bg-base-200/80 border-cyan-200 rounded-full focus:outline-none focus:ring-2 focus:ring-border-secondary text-cyan-800 placeholder:text-base-300"
                  placeholder="Comment here"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-outline rounded-full border-secondary"
                >
                  Comment
                </button>
              </form>
            </div>
          </MyContainer>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
