import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import MyContainer from '../../components/MyContainer';
import useAxios from '../../hooks/useAxios';

const Comment = () => {
    const { user } = useAuth();
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
     const axiosInstance = useAxios();

      const  = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      author: e.target.author.value,
      genre: e.target.genre.value,
      rating: parseFloat(e.target.rating.value),
      summary: e.target.summary.value,
      coverImage: e.target.coverImage.value,
      image: e.target.coverImage.value,
      email: user.email,
      user_name: user.displayName,
      created_at: new Date(),
    };
    console.log(formData);

    if (formData.rating < 0 || formData.rating > 5) {
      toast.error("Rating must be between 0 and 5.");
      return;
    }
    
    axiosInstance.post('/my-comments?email=${user.email}', formData)
      .then(data => {
        toast.success("You Commented!");
        console.log("Comment added response:", data);
        e.target.reset();
      })
      .catch(err => {
        console.error("Error adding book:", err);
        toast.error("Failed to add book. Please check console.");
      });
  };

//       useEffect(() => {
//         fetch(`http://localhost:3000/`, {
//           headers: {
//             authorization: `Bearer ${user.accessToken}`,
//           },
//         })
//         .then((res) => res.json())
//           .then((data) => {
//             setLoading(false);
//             setBook(data);
//           });
//       }, [user]);
//      if(loading){
//     return <Loading/>
//   }

  return <div className="pt-6 pb-6">
    <MyContainer>
            <div className="text-center">
              <h2 className="font-secondary text-4xl font-semibold">Comments</h2>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg my-6">
            <div className="p-4 bg-base-300/80 rounded-b-lg">
            <span className="text-sm text-base-200">
              Total Books: {book.length}
            </span>
          </div>
           
              {book.map((book) => (
                {}
              ))}
            
          
          
        </div>
          </MyContainer>
  </div>;

};

export default Comment;