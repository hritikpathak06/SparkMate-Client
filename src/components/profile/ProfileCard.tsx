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
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:h-3/5 gap-4">
        {/* Profile Info Section */}
        <div className="w-full lg:h-[45%]  flex flex-col items-start p-4">
          <h1 className="text-4xl lg:text-6xl font-extrabold p-3">
            {user?.name}
          </h1>

          <p className="w-full h-32 lg:h-[20vh]  p-2 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words">
            {user?.bio || ""}
          </p>
          <button
            className="p-3 bg-black text-white rounded-md mt-4 lg:mt-auto mx-auto"
            onClick={() => navigate("/update-profile")}
          >
            Update Your Profile
          </button>
        </div>

        {/* Profile Image Section */}
        <div className="h-48 lg:h-[45%]  flex items-center justify-center">
          <div className="p-3 w-full h-full  flex items-center justify-center">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="max-h-full w-full h-full object-cover rounded-md"
              />
            ) : (
              <Avatar className="profile_image w-24 h-24" />
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className=" flex flex-col items-center justify-center gap-5 py-4 lg:h-[45%]">
          <div>
            <h1 className="text-center text-4xl lg:text-6xl font-extrabold">
              {user?.likes.length}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-4xl font-bold">Age:</h1>
            <h1 className="text-2xl lg:text-4xl font-bold">{user?.age}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-4xl font-bold">Dislikes:</h1>
            <h1 className="text-2xl lg:text-4xl font-bold">
              {user?.dislikes.length}
            </h1>
          </div>
        </div>
      </div>

      <div className=" bg-gradient-to-t from-pink-100 to-pink-400 h-[35vh] w-full">
        <h1 className=" text-black text-3xl font-bold text-center">
          Your Recent Matches
        </h1>
        <div className=" flex gap-4 w-full h-[30vh] p-2">
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
    <>
      <div className=" bg-black shadow-lg rounded-md w-[25%] flex flex-col items-center gap-6 justify-center">
        {data.image ? (
          <img src={data.image} alt="" className="w-[80px]" />
        ) : (
          <Avatar className="!w-[60px] !h-[60px] mt-2" />
        )}
        <h1 className="text-white">{data.name}</h1>
        <button className=" bg-white text-black p-1 rounded-md">Remove</button>
      </div>
    </>
  );
};
