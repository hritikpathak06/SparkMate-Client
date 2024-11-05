import axios from "axios";
import { useState } from "react";
import { SERVER_BASE_API } from "../../config/server_url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
// import { initializeSocket } from "../../socket/socket";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${SERVER_BASE_API}/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(data.msg);
      dispatch(setUser(data.user));
      setLoading(false);
      // initializeSocket(data.user._id)
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" h-full w-full  flex flex-col items-center justify-center">
        <div className=" w-7/10  mx-auto">
          <h1 className=" text-3xl font-extrabold mb-5">
            Welcome Back, Login Here👋
          </h1>
          <form onSubmit={handleLogin}>
            <div className=" flex flex-col w-full gap-3 mb-4">
              <label htmlFor="email" className=" text-1xl">
                Enter Your Email
              </label>
              <input
                type="email"
                className=" p-2 bg-slate-50 text-black "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" flex flex-col w-full gap-3 mb-4">
              <label htmlFor="email" className=" text-1xl">
                Enter Your Password
              </label>
              <input
                type="password"
                className=" p-2 bg-gray-50 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p>
              Don't have an account ?{" "}
              <span>
                <a href="/register" className=" text-blue-500">
                  Register
                </a>
              </span>
            </p>

            <div className=" mt-5">
              <button
                className=" p-2 bg-black hover:bg-slate-800 text-white w-full flex items-center justify-center gap-4"
                type="submit"
                disabled={loading}
              >
                {loading ? "Please wait...." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
