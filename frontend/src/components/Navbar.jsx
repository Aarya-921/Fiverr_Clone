import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";


const Navbar = ({ setCurrentUser}) => {
  const navLinks = [
    { name: "Graphic & Design", path: "/" },
    { name: "Writing & Translation", path: "/" },
    { name: "Video & Animation", path: "/" },
    { name: "Music & Audio", path: "/" },
    { name: "Programming & Tech", path: "/" },
    { name: "AI Services", path: "/" },
    { name: "Digital Marketing", path: "/" },
    { name: "Business", path: "/" },
    { name: "Lifestyle", path: "/" },
  ];

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser", null);
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center sticky top-0 z-[999] ${
        active || pathname !== "/"
          ? "bg-white text-black"
          : "bg-[#013914] text-white transition-all duration-500 ease-in-out"
      } `}
    >
      <div className="w-[1400px] flex justify-between py-5 px-0">
        <div className="text-[34px] font-bold">
          <Link to="/">
            <span className="text">fiverr</span>
            <span className="text-[#1dbf73]">.</span>
          </Link>
        </div>
        <div className="flex items-center font-medium font-montserrat">
          <div className="flex gap-6 items-center">
          <span>Fiver Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.user?.isSeller && <span>Become a Seller</span>}{" "}
          {/*Agar currentUser seller hai to become seller nahi hoga */}
          <Link to="/login">{!currentUser && <span>Sign In</span>}</Link>
          <Link to="/register">
          
            {!currentUser && (
              <button
                className={`rounded-[5px] px-[10px] py-[5px] border-[2px]  ${
                  pathname !== "/"
                    ? "bg-[white] text-[#1dbf73] border-[#1dbf73]"
                    : active
                    ? "bg-[white] text-[#1dbf73] border-[#1dbf73]"
                    : "bg-[#1dbf73] text-white border-none"
                }`}
              >
                Join
              </button>
            )}
          </Link>
          </div>
          {currentUser && (
            <div
              className="flex items-center gap-[10px] ml-4 relative"
              onClick={() => setOpen(!open)}
            >
              <img
                src={currentUser?.user?.img || "/img/noavatar.jpg"}
                alt="userImage"
                className="w-8 h-8 rounded-[50%] object-cover"
              />
              <span className="cursor-pointer select-none">
                {currentUser?.user?.username}
              </span>
              {open && (
                <div className="absolute top-[50px] right-0 p-5 bg-white border-[1px] border-gray-200 rounded-[10px] flex flex-col gap-[10px] text-gray-400 w-[200px] font-light">
                  {currentUser?.user?.isSeller && (
                    <>
                      <Link to={"/mygigs"}>Gigs</Link>
                      <Link to={"/add"}>Add New Gig</Link>
                    </>
                  )}
                  <Link to={"/orders"}>Orders</Link>
                  <Link to={"/messages"}>Messages</Link>
                  <Link to={"/"} onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr className="w-[100%] h-0 border-gray-300 border-[0.5px]" />
          <div className="w-[1400px] py-[10px] px-0 flex justify-between text-gray-500 font-light font-montserrat ">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                {link.name}
              </Link>
            ))}
          </div>
          <hr className="w-[100%] h-0 border-gray-300 border-[0.5px]" />
        </>
      )}
    </div>
  );
};

export default Navbar;
