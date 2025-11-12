import React from 'react';
import { Link } from 'react-router';

const BookTable = ({ book }) => {
  const { _id, title, author, genre, rating } = book;
    return (
        <tr key={_id} className="hover:bg-base-100/50 bg-base-100/70">
              {/* Book Name (Title) */}
              <td className="font-bold text-cyan-800 font-secondary">
                {title}
              </td>
              
              {/* Author */}
              <td>{author}</td>
              
              {/* Genre */}
              <td>
                <span className="badge badge-outline badge-sm">
                  {genre}
                </span>
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
                <Link className="btn btn-ghost btn-md tex-info rounded-2xl" to={`/details-book/${_id}`}>View Details</Link>
                <Link to={'/edit-book'} className="btn btn-ghost btn-md text-info rounded-2xl">
                  Edit
                </Link >
                <Link to={'/delete-book'} className="btn btn-ghost btn-md text-error rounded-2xl">
                  Delete
                </Link >
              </td>
            </tr>
    );
};

export default BookTable;