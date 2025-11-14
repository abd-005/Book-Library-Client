import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBookTable = ({ book }) => {
  const { _id, title, author, genre, rating } = book;
  console.log(_id);
  const handleDelete = () => {
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
        fetch(`https://book-library-server-xi.vercel.app/delete-book/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // navigate("/all-books");

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
    <tr key={_id} className="hover:bg-base-100/50 bg-base-100/70">
      {/* Book Name (Title) */}
      <td className="font-bold text-primary font-secondary">{title}</td>

      {/* Author */}
      <td>{author}</td>

      {/* Genre */}
      <td>
        <span className="badge badge-outline badge-sm">{genre}</span>
      </td>

      {/* Rating */}
      <td>
        <div className="flex items-center space-x-2">
          <span className="text-warning">★</span>
          <span>{rating}</span>
        </div>
      </td>

      {/* Actions Column */}
      <td>
        <Link
          className="btn btn-ghost btn-outline btn-md tex-info rounded-2xl"
          to={`/details-book/${_id}`}
        >
          View Details
        </Link>
      </td>
      <td>
        <Link
          className="btn btn-primary tex-info rounded-2xl"
          to={`/update-book/${book._id}`}
        >
          Update
        </Link>
      </td>
      <td>
        <button
          onClick={handleDelete}
          className="btn btn-outline rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        >
          Delete Book
        </button>
      </td>
      {/* Created By */}
      {/* <td>
        <span className="badge badge-outline badge-sm">{email}</span>
      </td> */}
    </tr>
  );
};

export default MyBookTable;
