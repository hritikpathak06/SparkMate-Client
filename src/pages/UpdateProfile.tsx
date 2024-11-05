import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { SERVER_BASE_API } from "../config/server_url";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const UpdateProfile = () => {
  const user = useSelector((state: any) => state.auth.userData);
  const [name, setName] = useState<string>(user?.name);
  const [email, setEmail] = useState<string>(user?.email);
  const [age, setAge] = useState<number>(user?.age);
  const [gender, setGender] = useState<string>(user?.gender);
  const [image, setImage] = useState<any>(user?.image);
  const [genderPreference, setGenderPreference] = useState<string>(
    user?.genderPreference
  );
  const [bio, setBio] = useState<string>(user?.bio);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        setImage(e.target.result); // Set the preview URL
      };

      fileReader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  console.log("iamge url==>> ", image);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    const profileData = {
      name,
      email,
      age,
      gender,
      genderPreference,
      bio,
      image, // Ensure this has the base64 string
    };

    console.log("Profile Data:", profileData);
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${SERVER_BASE_API}/api/v1/user/update-profile`,
        profileData,
        {
          withCredentials: true,
        }
      );
      toast.success(data.msg);
      setLoading(false);
      // navigate("/profile");
      window.location.href = "/dashboard";
      console.log({ name, email, age, gender, genderPreference });
    } catch (error: any) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" bg-slate-200 h-screen w-full flex">
        <div className="bg-red-400 w-1/2 h-full flex items-center justify-center">
          {image ? (
            <img
              src={image || "/logo.png"}
              alt=""
              className=" w-[70%] h-[70%] rounded-full border-5 "
            />
          ) : (
            <Avatar />
          )}
        </div>
        <div className="w-1/2 h-full">
          <div className=" h-full w-full  flex flex-col items-center justify-center">
            <div className=" w-full  mx-auto p-6">
              <h1 className=" text-3xl font-extrabold mb-5">
                Update Your Profile😊
              </h1>
              <form onSubmit={handleUpdateProfile}>
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

                <div className=" flex flex-col w-full gap-3 mb-4">
                  <label htmlFor="email" className=" text-1xl">
                    Your Bio
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
                      Your Age
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
                      value={gender}
                    >
                      <option value="#">Select Your Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className=" w-full gap-3 mb-4 flex items-center">
                  <div className=" flex flex-col w-full gap-3 mb-4">
                    <label htmlFor="email" className=" text-1xl">
                      Your Gender Preference
                    </label>
                    <select
                      name=""
                      id=""
                      className=" p-2 bg-gray-50 text-black cursor-pointer"
                      onChange={(e) => setGenderPreference(e.target.value)}
                      value={genderPreference}
                    >
                      <option value="#">Select Gender Preference</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div className=" flex flex-col w-full gap-3 mb-4">
                    <label htmlFor="email" className=" text-1xl">
                      Upload Your Profile Pic
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
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
                    disabled={loading}
                  >
                    {loading ? "Updating....." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
