import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserMatches } from "../../config/api";

const ProfileCard = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.userData);
  const [matches, setMatches] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const matchesData = await getUserMatches(user._id);
      setMatches(matchesData);
      console.log("Matches Data==>>> ", matchesData);
    })();
  }, [user._id]);

  return (
    <div className="md:h-[90vh] h-max w-full p-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:h-3/5 gap-6 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
  {/* Profile Info Section */}
  <div className="bg-white w-full h-full flex flex-col  items-start p-6 rounded-lg shadow-md">
    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3">
      {user?.name}
    </h1>
    <p className="w-full h-32 lg:h-[20vh] p-4 text-gray-700 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words border border-gray-200 rounded-md">
      {user?.bio || "No bio available"}
    </p>
    <button
      className="mt-4 lg:mt-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out mx-auto"
      onClick={() => navigate("/update-profile")}
    >
      Update Your Profile
    </button>
  </div>

  {/* Profile Image Section */}
  <div className="flex items-center justify-center h-48 lg:h-full">
    <div className="p-4 w-full h-full flex items-center justify-center bg-white rounded-lg shadow-md">
      {user?.image ? (
        <img
          src={user.image}
          alt="Profile"
          className="w-44 h-44 object-cover rounded-full border-4 border-purple-500"
        />
      ) : (
        <Avatar className="!w-44 !h-44 object-cover border-4 border-purple-500" />
      )}
    </div>
  </div>

  {/* Stats Section */}
  <div className="flex flex-col items-center justify-around p-6 bg-white rounded-lg shadow-md">
    <div className="flex flex-col items-center">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-pink-600">{user?.likes.length}</h1>
      <span className="text-lg text-gray-600">Likes</span>
    </div>
    <div className="flex items-center gap-2 mt-4">
      <span className="text-2xl lg:text-3xl font-bold text-gray-800">Age:</span>
      <span className="text-2xl lg:text-3xl font-semibold text-pink-600">{user?.age}</span>
    </div>
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-purple-600">{user?.dislikes.length}</h1>
      <span className="text-lg text-gray-600">Dislikes</span>
    </div>
  </div>
</div>


      <div className=" bg-gradient-to-t from-pink-100 to-pink-400 md:h-[35vh]  h-max w-full">
        <h1 className=" text-black text-3xl font-bold text-center">
          Your Recent Matches
        </h1>
        <div className=" flex flex-col lg:flex-row gap-4 w-full md:h-[30vh] h-max p-2">
          {matches
            .slice(0, 4)
            .reverse()
            .map((data: any) => (
              <>
                <MyMatchesCard data={data} key={data._id} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

export const MyMatchesCard = ({ data }: any) => {
  return (
    <div className="bg-black shadow-lg rounded-md lg:w-[25%] w-full lg:p-0 p-4 flex flex-col items-center gap-4 justify-center">
      {data.image ? (
        <img
          src={data.image}
          alt={`${data.name}'s profile`}
          className="w-[60px] h-[60px] object-cover rounded-full"
        />
      ) : (
        <Avatar className="!w-[60px] !h-[60px] mt-2" />
      )}
      <h1 className="text-white text-center">{data.name}</h1>
      {/* <button className="bg-white text-black p-1 rounded-md">Remove</button> */}
    </div>
  );
};
