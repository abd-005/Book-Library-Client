import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[url(https://i.pinimg.com/736x/99/42/6d/99426d2cbb96a059dad3fc8e773fd77b.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center shadow-2xl py-10">
      <div className="w-[360px] h-[350px] glass mx-auto max-w-sm shadow-2xl border border-gray-200 rounded-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogIn}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input rounded-full focus:border-0 focus:outline-gray-200 bg-transparent"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input rounded-full focus:border-0 focus:outline-gray-200 bg-transparent"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary">
                Login
              </button>
            </fieldset>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white rounded-full text-black border-[#e5e5e5]"
          >
            <FaGoogle />
            Login with Google
          </button>
          <p className="text-center">
            New to our website? Please{" "}
            <Link
              className="text-blue-500 hover:text-blue-800"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
