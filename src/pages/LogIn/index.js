import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import "../SignIn/index.css";

const LogIn = () => {
  const navigate = useNavigate();
  const data = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(data);

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3002/api/login", user);
      console.log(res);

      // Store the token in local storage
      localStorage.setItem("token", res.data.jwt_token);

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="addUser">
      <h3>Login</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            value={user.email}
            onChange={inputHandler}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            onChange={inputHandler}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit">LOGIN</button>
        </div>
      </form>
      <div className="member">
        Don't have an account?{" "}
        <Link to="/signup" className="link">
          Signin
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
