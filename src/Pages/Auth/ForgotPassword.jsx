import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { toast } from "react-toastify";
import MyContainer from "../../components/MyContainer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Forgot Password - Book Heaven";
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your email.");
      window.open("https://gmail.com", "_blank");
      navigate("/auth/login");
    } catch (error) {
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
            Reset Password
          </h2>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-border-secondary bg-transparent text-base-100 placeholder:text-base-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/auth/login")}
              className="text-cyan-200 hover:text-cyan-800 font-semibold"
            >
              Back to Login
            </button>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ForgotPassword;
