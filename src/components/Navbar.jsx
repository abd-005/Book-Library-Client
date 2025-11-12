import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import useAuth from "../hooks/useAuth";


const NavBar = () => {
  const { user, signOutUser } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-books"}>All Books</NavLink>
      </li>
      <li>
        <NavLink to={"/add-book"}>Add Book</NavLink>
      </li>
      <li>
        <NavLink to={"/my-books"}>My Book</NavLink>
      </li>
    </>
  );

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className={`fade-load navbar min-h-0 z-50 shadow-sm mx-auto fixed top-0 left-0 right-0 duration-300 ${scrolled ? 'bg-neutral/70 glass' : 'bg-black/60 glass'}`}>
      <MyContainer>
        <div className="navbar py-7 px-5 min-h-0 z-1">
          <div className="navbar-start">
            <div className="dropdown ">
              <div tabIndex={0} role="button" className=" md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100/50 z-1 mt-3 w-52 p-2"
              >
                {links}
              </ul>
            </div>
            <Link
              to={"/"}
              className="flex items-center gap-1 text-2xl pl-2 md:text-4xl text-base-100 font-secondary"
            >
              <span className="font-semibold text-base-100">The Book</span>
              <span className="gradient-text font-semibold"> Heaven</span>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className={`menu-horizontal px-1 gap-10 text-base-100 *:hover:border-white *:hover:text-primary`}>
              {links}
            </ul>
          </div>
          <div className="navbar-end gap-1 md:gap-3">
            {user ? (
              <div className="dropdown dropdown-end z-50 gradient-bg rounded-full">
                <div tabIndex={0} role="button" className="">
                  <div className="w-10 border-2 border-gray-300 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      referrerPolicy="no-referrer"
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      className="rounded-full"
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content z-50 mt-3 w-52 p-3 shadow rounded-2xl gradient-bg text-base-100"
                >
                  <div className=" pb-3 border-b border-b-gray-200">
                    <li className="text-sm font-bold">{user.displayName}</li>
                    <li className="text-xs">{user.email}</li>
                  </div>
                  <li className="mt-3">
                    <Link to={"/profile"}>Profile</Link>
                  </li>

                  <li>
                    <Link to={"/add-books"}>Add Books</Link>
                  </li>

                  <li>
                    <Link to={"/my-books"}>My books</Link>
                  </li>

                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={localStorage.getItem("theme") === "dark"}
                    className="toggle"
                  />

                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={signOutUser} className="btn-secondary">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to={"/auth/login"} className="btn btn-primary">
                  Login
                </Link>
                <Link to={"/auth/register"} className="btn btn-secondary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default NavBar;
