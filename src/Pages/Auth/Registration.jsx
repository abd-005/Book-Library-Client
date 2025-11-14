import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MyContainer from "../../components/MyContainer";
// import MyContainer from "../";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Registration = () => {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [user_image, setUser_image] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register - ToyTopia";
  }, []);

  const handleEmailRegister = async (e) => {
    e.preventDefault();

    const PASSWORD_VALID_REGEX = new RegExp(
      "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:',.<>/?|~`\"\\\\]+$"
    );

    if (!PASSWORD_VALID_REGEX.test(password)) {
      toast.error(
        "Password contains invalid characters. Only alphanumeric and specific special characters are allowed."
      );
      return;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};:',.<>/?|~`"\\]/.test(
      password
    );
    const hasMinLength = password.length >= 6;

    if (!hasUpperCase) {
      toast.error("Password must have at least one uppercase letter");
      return;
    }
    if (!hasLowerCase) {
      toast.error("Password must have at least one lowercase letter");
      return;
    }
    if (!hasNumeric) {
      toast.error("Password must have at least one numeric character");
      return;
    }
    if (!hasSpecialChar) {
      toast.error("Password must have at least one special character");
      return;
    }
    if (!hasMinLength) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, {
        displayName: user_name,
        photoURL: user_image,
      });

      login(result.user);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("User already exists in the database.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check your email.");
      } else if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      login(result.user);
      toast.success("Google registration successful!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-animated min-h-screen pt-42 pb-12">
      <MyContainer>
        <div className="max-w-md mx-auto bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-center text-slate-700 mb-8">
            Register for The Book Heaven
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleEmailRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-200 rounded-full focus:outline-none focus:ring-2 focus:ring-border-secondary bg-transparent text-base-100 placeholder:text-base-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-200 rounded-full focus:outline-none focus:ring-2 focus:ring-border-secondary bg-transparent text-base-100 placeholder:text-base-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Photo URL
              </label>
              <input
                type="url"
                value={user_image}
                onChange={(e) => setUser_image(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-200 rounded-full focus:outline-none focus:ring-2 focus:ring-border-secondary bg-transparent text-base-100 placeholder:text-base-300"
                placeholder="Enter your photo URL"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-200 rounded-full focus:outline-none focus:ring-2 focus:ring-border-secondary bg-transparent text-base-100 placeholder:text-base-300"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-5 top-11 cursor-pointer  text-gray-400 hover:text-gray-800 text-xl z-50"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-full btn-secondary disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6"
              />
              {loading ? "Registering..." : "Register with Google"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-cyan-200 hover:text-cyan-800 font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Registration;
