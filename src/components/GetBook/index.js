import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./index.css";

const GetBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      const res = await axios.get("http://localhost:3002/api/user-books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBooks(res.data.books);
    };
    fetchedData();
  }, []);

  const deleteBook = async (bookId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3002/api/delete/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBooks((prevBook) => prevBook.filter((book) => book._id !== bookId));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bookTable">
      <div className="container">
        <Link to={"/add"} className="addButton">
          <i className="fa-solid fa-plus"></i> Add Book
        </Link>
        <button type="button" className="logOutButton" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>

      {books.length === 0 ? (
        <h1>No Books Found...</h1>
      ) : (
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Language</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishedYear}</td>
                  <td>{book.language}</td>
                  <td>{book.price}</td>
                  <td className="actionButtons">
                    <button onClick={() => deleteBook(book._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/edit/${book._id}`} className="editButton">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetBook;
