import React from "react";
import Logo from "../images/logo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../images/mobile_menu.svg";
import backbutton from "../images/back_icon.png";

const Navbar = () => {
  const [userType, setUserType] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function fetchUserType() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserType(user.user_type);
    }
  }

  useEffect(() => {
    fetchUserType();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <div className="flex justify-between content-between bg-[#6B0000] py-[1rem] mx-auto">
        <div className="flex content-center justify-center">
          <div className="h-3 w-5"></div>
          <img
            src={Logo}
            className="lg:min-w-[3.5rem] lg:max-w-[3.5rem] min-w-[2.8rem] max-w-[3rem] ps-[0.6rem]"
            alt="logo"
          />
          <h1 className="font-mono font-[500] lg:text-[1.2rem] text-[1rem] text-white self-center ml-2">
            CineSphere
          </h1>
          <ul className="hidden lg:flex font-mono text-white no-underline text-[1.1rem] gap-7 self-center ms-8">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            {userType === 1 && (
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex content-center justify-center">
          <ul className="hidden lg:flex font-mono text-white no-underline text-[1.1rem] gap-7 self-center me-8">
            <li>
              <Link to="/mybookings">My Bookings</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center px-3 me-4"
            onClick={toggleMobileMenu}
          >
            <img
              src={MobileMenu}
              alt="Mobile Menu"
              className="lg:hidden h-8 w-8 me-4"
              onClick={toggleMobileMenu}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-[#6B0000] shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-red-800">
          <h2 className="text-white font-mono text-xl">Menu</h2>
          <button onClick={toggleMobileMenu} className="text-white">
            <img
              src={backbutton}
              alt="Back"
              className="h-6 w-6 text-white me-8 "
            />
          </button>
        </div>

        <nav className="px-4 pt-4">
          <ul className="font-mono text-white space-y-4">
            <li className="py-2 border-b border-red-800">
              <Link to="/home" onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li className="py-2 border-b border-red-800">
              <Link to="/about" onClick={toggleMobileMenu}>
                About
              </Link>
            </li>
            <li className="py-2 border-b border-red-800">
              <Link to="/support" onClick={toggleMobileMenu}>
                Support
              </Link>
            </li>
            <li className="py-2 border-b border-red-800">
              <Link to="/mybookings" onClick={toggleMobileMenu}>
                My Bookings
              </Link>
            </li>
            <li className="py-2 border-b border-red-800">
              <Link to="/profile" onClick={toggleMobileMenu}>
                Profile
              </Link>
            </li>
            {userType === 1 && (
              <li className="py-2 border-b border-red-800">
                <Link to="/admin" onClick={toggleMobileMenu}>
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-75 z-30"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
