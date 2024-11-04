import axios from "axios";
import { useState } from "react";
import { SERVER_BASE_API } from "../../config/server_url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string>("");
  const [genderPreference, setGenderPreference] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          age,
          gender,
          genderPreference,
          bio,
        }
      );
      toast.success(data.msg);
      navigate("/login");
      console.log({ name, email, password, age, gender, genderPreference });
    } catch (error: any) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className=" h-full w-full  flex flex-col items-center justify-center">
        <div className=" w-full  mx-auto p-6">
          <h1 className=" text-3xl font-extrabold mb-5">
            Welcome Back, Register Here👋
          </h1>
          <form onSubmit={handleRegister}>
            <div className=" w-full gap-3 mb-4 flex items-center">
              <div className=" flex flex-col w-full gap-3 mb-4">
                <label htmlFor="name" className=" text-1xl">
                  Enter Your Name
                </label>
                <input
                  type="text"
                  className=" p-2 bg-gray-50 text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
            </div>

            <div className=" w-full gap-3 mb-4 flex items-center">
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
              <div className=" flex flex-col w-full gap-3 mb-4">
                <label htmlFor="email" className=" text-1xl">
                  Gender Preference
                </label>
                <select
                  name=""
                  id=""
                  className=" p-2 bg-gray-50 text-black cursor-pointer"
                  onChange={(e) => setGenderPreference(e.target.value)}
                >
                  <option value="#">Select Gender Preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div className=" flex flex-col w-full gap-3 mb-4">
              <label htmlFor="email" className=" text-1xl">
                Write Your Bio
              </label>
              <textarea
                rows={6}
                className=" p-2 bg-gray-50 text-black"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className=" w-full gap-3 mb-4 flex items-center">
              <div className=" flex flex-col w-full gap-3 mb-4">
                <label htmlFor="email" className=" text-1xl">
                  Enter Your Age
                </label>
                <input
                  type="number"
                  className=" p-2 bg-gray-50 text-black"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
              <div className=" flex flex-col w-full gap-3 mb-4">
                <label htmlFor="email" className=" text-1xl">
                  Select Your Gender
                </label>
                <select
                  name=""
                  id=""
                  className=" p-2 bg-gray-50 text-black cursor-pointer"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="#">Select Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <p>
              Already have an account ?{" "}
              <span>
                <a href="/login" className=" text-blue-500">
                  Login
                </a>
              </span>
            </p>

            <div className=" mt-5">
              <button
                className=" p-2 bg-black hover:bg-slate-800 text-white w-full flex items-center justify-center gap-4"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
