import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MyContainer from "../../components/MyContainer";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Login - Book Heaven";
  }, []);

  const handleEmailLogin = async (e) => {
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
      const result = await signInWithEmailAndPassword(auth, email, password);
      login(result.user);
      toast.success("Login successful!");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check your email.");
      } else if (error.code === "auth/user-disabled") {
        toast.error("This user account has been disabled.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again later.");
      } else if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      login(result.user);
      toast.success("Google login successful!");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-animated min-h-screen py-[10vh]">
      <MyContainer>
        <div className="max-w-md mx-auto bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-center text-slate-700 mb-8">
            Login to The Book Heaven
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-1 border-cyan-200 rounded-md focus:outline-none focus:ring-2 focus:ring-border-secondary bg-yellow-50 placeholder:text-slate-400"
                placeholder="Enter your email"
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
                className="w-full px-4 py-3 border-1 border-cyan-200 rounded-md focus:outline-none focus:ring-2 focus:ring-border-secondary bg-yellow-50 placeholder:text-slate-400"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-[8px] top-[40px] cursor-pointer z-50"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
            <div className="text-right">
              <Link
                to="/forgot-password"
                state={{ email }}
                className="text-cyan-200 hover:text-primary font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn-secondary w-full disabled:opacity-50  flex items-center justify-center"
            >
              <div>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-6"
                />
              </div>
              {loading ? "Logging in..." : "Login with Google"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-cyan-200 hover:text-primary font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Login;
