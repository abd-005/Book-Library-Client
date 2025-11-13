import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { toast } from "react-toastify";
import MyContainer from "../../components/MyContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const PASSWORD_VALID_REGEX = new RegExp(
  "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:',.<>/?|~`\"\\\\]+$"
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Login - The Book Heaven";
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

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
            Login to The Book Heaven
          </h2>

          <form onSubmit={handleEmailLogin} className="space-y-6">
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-cyan-200 rounded-full focus:outline-none focus:ring-2 focus:ring-border-secondary bg-transparent text-base-100 placeholder:text-base-300"
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-3.5cursor-pointer text-gray-400 hover:text-gray-800 text-xl z-50"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="text-right">
              <Link
                to="/forgot-password"
                state={{ email }}
                className="text-cyan-200 hover:text-cyan-800 font-semibold"
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
              className="w-full btn-secondary disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6"
              />
              {loading ? "Logging in..." : "Login with Google"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-cyan-200 hover:text-cyan-800 font-semibold"
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