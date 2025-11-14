import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBookTable = ({ book, books, setBooks }) => {
  const { _id, title, author, genre, rating } = book;

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
            setBooks(books.filter((item) => item._id !== _id));
            Swal.fire({
              title: "Deleted!",
              text: "Your book has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <tr key={_id} className="hover:bg-base-100/50 bg-base-100/70">
      <td className="font-bold text-primary font-secondary">{title}</td>
      <td>{author}</td>
      <td>
        <span className="badge badge-outline p-6 badge-sm">{genre}</span>
      </td>
      <td>
        <div className="flex items-center space-x-2">
          <span className="text-warning">★</span>
          <span>{rating}</span>
        </div>
      </td>
      <td>
        <Link
          className="btn btn-ghost btn-outline btn-md tex-info p-6 rounded-2xl"
          to={`/details-book/${_id}`}
        >
          View Details
        </Link>
      </td>
      <td>
        <Link
          className="btn btn-primary tex-info p-6 rounded-2xl"
          to={`/update-book/${book._id}`}
        >
          Update
        </Link>
      </td>
      <td>
        <button
          onClick={handleDelete}
          className="btn btn-error text-base-100 rounded-full py-6 md:py-3"
        >
          Delete Book
        </button>
      </td>
    </tr>
  );
};

export default MyBookTable;
