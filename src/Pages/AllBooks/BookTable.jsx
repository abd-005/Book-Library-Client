import React from 'react';
import { Link } from 'react-router';

const BookTable = ({book}) => {
    return (
        <tr key={book._id} className="hover:bg-base-100/50 bg-base-100/70">
              {/* Book Name (Title) */}
              <td className="font-bold text-cyan-800 font-secondary">
                {book.title}
              </td>
              
              {/* Author */}
              <td>{book.author}</td>
              
              {/* Genre */}
              <td>
                <span className="badge badge-outline badge-sm">
                  {book.genre}
                </span>
              </td>
              
              {/* Rating */}
              <td>
                <div className="flex items-center space-x-2">
                  <span className="text-warning">★</span>
                  <span>{book.rating}</span>
                </div>
              </td>

              {/* Actions Column */}
              <td>
                <Link to={'/book-details'} className="btn btn-ghost btn-md tex-info rounded-2xl">
                  View Details
                </Link >
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