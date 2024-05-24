import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import "../AddBook/index.css";

const UpdateBook = () => {
  const navigate = useNavigate();

  const data = {
    title: "",
    author: "",
    publishedYear: "",
    language: "",
    price: "",
  };

  const [book, setBook] = useState(data);
  const { id } = useParams();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/api/singleBook/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBook(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBook();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3002/api/update/${id}`,
        book,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update book</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Book Title</label>
          <input
            value={book.title}
            onChange={inputChangeHandler}
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="author">Author</label>
          <input
            value={book.author}
            onChange={inputChangeHandler}
            type="text"
            name="author"
            id="author"
            placeholder="Enter Author"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="publishedYear">Published Year</label>
          <input
            value={book.publishedYear}
            onChange={inputChangeHandler}
            type="text"
            name="publishedYear"
            id="publishedYear"
            placeholder="Enter publishedYear"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="language">Language</label>
          <input
            value={book.language}
            onChange={inputChangeHandler}
            type="text"
            name="language"
            id="language"
            placeholder="Enter Language"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="price">Price</label>
          <input
            value={book.price}
            onChange={inputChangeHandler}
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE BOOK</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
