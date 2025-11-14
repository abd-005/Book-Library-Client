import React from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

import Loading from "../../components/Loading";

const AddBook = () => {
  const { user } = useAuth();

  console.log(user);

  const handleSubmit = (e) => {
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

    fetch("http://localhost:3000/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('After Submit: ',data.insertedId);
        // if(data.insertedId){
          toast("Successfully Added Book!")
          e.target.reset();
        // }
      })
      .catch((err) => {
        console.log(err);
      })
      
  };

  return (
    <div className="pt-42 pb-12">
      <div className="card border border-gray-200 bg-base-100/50 w-full max-w-2xl mx-auto shadow-2xl rounded-2xl">
        <div className="card-body p-6 relative">
          <div className="mx-auto">
            <h2 className="font-secondary text-4xl font-semibold text-base-100 mb-6">
              Add New Book to Library
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label font-medium">Title</label>
              <input
                type="text"
                name="title"
                required
                className="input input-bordered w-full rounded-full focus:outline-primary/50"
                placeholder="e.g., The Hitchhiker's Guide to the Galaxy"
              />
            </div>

            <div>
              <label className="label font-medium">Author</label>
              <input
                type="text"
                name="author"
                required
                className="input input-bordered w-full rounded-full focus:outline-primary/50"
                placeholder="e.g., Douglas Adams"
              />
            </div>

            <div>
              <label className="label font-medium">Genre</label>
              <select
                defaultValue={""}
                name="genre"
                required
                className="select select-bordered w-full rounded-full focus:outline-primary/50"
              >
                <option value="" disabled>
                  Select genre
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Biography">Biography</option>
              </select>
            </div>

            <div>
              <label className="label font-medium">Rating (0.0 - 5.0)</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                required
                className="input input-bordered w-full rounded-full focus:outline-primary/50 pr-6"
                placeholder="e.g., 4.5"
              />
            </div>

            <div>
              <label className="label font-medium">Summary</label>
              <textarea
                name="summary"
                required
                rows="5"
                className="textarea textarea-bordered w-full rounded-2xl focus:outline-primary/50"
                placeholder="Provide a brief summary of the book..."
              ></textarea>
            </div>

            <div>
              <label className="label font-medium">Cover Image URL</label>
              <input
                type="url"
                name="coverImage"
                required
                className="input input-bordered w-full rounded-full focus:outline-primary/50"
                placeholder="https://example.com/book-cover.jpg"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="label font-medium">Added By (Name)</label>
                <input
                  type="text"
                  value={user.displayName}
                  disabled
                  className="input input-bordered w-full rounded-full bg-gray-100"
                />
              </div>
              <div className="flex-1">
                <label className="label font-medium">Added By (Email)</label>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="input input-bordered w-full rounded-full bg-gray-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-6 rounded-full text-lg"
            >
              Submit Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
