import React from "react";
import { useState } from "react";
import upload from "../utils/upload";
import newRequest from "./../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login");
      //empty the form
      setUser({
        username: "",
        email: "",
        password: "",
        img: "",
        country: "",
        isSeller: false,
        phone: "",
        desc: "",
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[960px] py-[100px] px-0 flex gap-[120px]"
      >
        <div className="flex-1 flex flex-col gap-[10px] justify-between">
          <h1 className="text-[24px] text-gray-400 mb-[20px]">
            Create a new account
          </h1>
          <label className="text-gray-500 text-[18px]" htmlFor="">
            Username
          </label>
          <input
            className="p-[20px] border border-[rgb(216, 214, 214)]"
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />
          <label className="text-gray-500 text-[18px]" htmlFor="">
            Email
          </label>
          <input
            className="p-[20px] border border-[rgb(216, 214, 214)]"
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label className="text-gray-500 text-[18px]" htmlFor="">
            Password
          </label>
          <input
            className="p-[20px] border border-[rgb(216, 214, 214)]"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <label className="text-gray-500 text-[18px]" htmlFor="">
            Profile Picture
          </label>
          <input
            className="p-[20px] border border-[rgb(216, 214, 214)]"
            type="file"
            name="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="text-gray-500 text-[18px]" htmlFor="">
            Country
          </label>
          <input
            className="p-[20px] border border-[rgb(216, 214, 214)]"
            name="country"
            type="text"
            placeholder="country"
            onChange={handleChange}
          />
          <button
            className="p-[20px] bg-[#1dbf73] text-white border-none text-[18px] font-medium cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-[10px] justify-between">
          <h1 className="text-[24px] text-gray-400 mb-[20px]">
            I want to become a seller
          </h1>
          <div className="flex items-center gap-[10px]">
            <label className="text-gray-500 text-[18px]">
              Activate the seller account
            </label>
            <label className="relative inline-block w-[50px] h-[24px]">
              <input
                type="checkbox"
                className="opacity-0 w-0 h-0 peer"
                onChange={handleSeller}
              />
              <span
                className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-[24px] transition duration-400 peer-checked:bg-blue-500 
      after:content-[''] after:absolute after:h-[16px] after:w-[16px] after:left-[4px] after:bottom-[4px] after:bg-white after:rounded-full after:transition after:duration-400 peer-checked:after:translate-x-[26px]"
              ></span>
            </label>
          </div>
          <label className="text-gray-500 text-[18px]" htmlFor="">
            Phone Number
          </label>
          <input
            className="p-[20px] border border-[rgb(216, 214, 214)]"
            type="text"
            name="phone"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label className="text-gray-500 text-[18px]" htmlFor="">
            Description
          </label>
          <textarea
            className="p-[20px] border border-[rgb(216, 214, 214)] resize-none"
            name="desc"
            cols="30"
            rows="10"
            placeholder="A short description of yourself"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
