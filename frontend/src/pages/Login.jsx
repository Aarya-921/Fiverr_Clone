import React, { useState } from "react";
import newRequest from "../utils/newRequest.js";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =await newRequest.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
      setUsername("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[20px] w-[360px] py-[10opx] px-0" 
      >
        <h1 className="text-[24px] font-bold text-gray-400 mb-[20px]">
          Sign In
        </h1>
        <label className="text-gray-500 text-[18px]" htmlFor=" username">
          Username
        </label>
        <input
          className="p-[20px] border border-[rgb(216, 214, 214)]"
          id="username"
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="text-gray-500 text-[18px]" htmlFor="password">
          Password
        </label>
        <input
          className="p-[20px] border border-[rgb(216, 214, 214)]"
          id="password"
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="p-[20px] bg-[#1dbf73] text-white border-none text-[18px] font-medium cursor-pointer"
          type="submit"
        >
          Login
        </button>
        {error && <span className="text-red-500">{error.message}</span>}
      </form>
    </div>
  );
};

export default Login;
