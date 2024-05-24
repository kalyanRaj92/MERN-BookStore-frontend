import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./index.css";
import toast from "react-hot-toast";

const AddBook = () => {
  const navigate = useNavigate();

  const data = {
    title: "",
    author: "",
    publishedYear: "",
    language: "",
    price: "",
  };

  const [book, setBook] = useState(data);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/api/create", book,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(res);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="addBook">
      <Link to={""}>Back</Link>
      <h3>Add New Book</h3>
      <form className="addBookForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Book Title</label>
          <input
            value={book.title}
            onChange={inputHandler}
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
            onChange={inputHandler}
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
            onChange={inputHandler}
            type="number"
            name="publishedYear"
            id="publishedYear"
            placeholder="Enter Published Year"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="language">Language</label>
          <input
            value={book.language}
            onChange={inputHandler}
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
            onChange={inputHandler}
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD BOOK</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
