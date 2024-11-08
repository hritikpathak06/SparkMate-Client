import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserByID, getUserMatches, swipeRight } from "../../config/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UserProfileCard = () => {
  const [matches, setMatches] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const { id } = useParams();
  const current_user = useSelector((state: any) => state.auth.userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userById = await getUserByID(id);
        if (userById) {
          setUser(userById);
          const matchesData = await getUserMatches(userById._id);
          setMatches(matchesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleLikeUser = async (userId: any) => {
    console.log("User Id ==>>> ", userId);
    try {
      const response = await swipeRight(user);
      toast.success(response);
    } catch (error) {
      toast.error("Oops Something went wrong");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="md:h-[90vh] h-max w-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:h-3/5 gap-4">
        {/* Profile Info Section */}
        <div className="w-full lg:h-[45%] flex flex-col items-start p-4">
          <h1 className="text-4xl lg:text-6xl font-extrabold p-3">
            {user?.name}
          </h1>
          <p className="w-full h-32 lg:h-[20vh]  p-6 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words ">
            {user?.bio || ""}
          </p>
          <button
            className={
              "p-3 rounded-md mt-4 lg:mt-auto mx-auto bg-black text-white"
            }
            onClick={() => handleLikeUser(user._id)}
            disabled={
              current_user.likes.includes(user._id) ||
              current_user.matches.includes(user._id)
              // cur
            }
          >
            {current_user.matches.includes(user._id)
              ? "Already Matched"
              : current_user.likes.includes(user._id)
              ? "Already Liked"
              : current_user.dislikes.includes(user._id)
              ? "Disliked"
              : "Like A User"}
          </button>
        </div>

        {/* Profile Image Section */}
        <div className="h-48 lg:h-[45%] flex items-center justify-center">
          <div className="p-3 w-full h-full flex items-center justify-center">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-36 h-36 object-cover rounded-full"
              />
            ) : (
              <Avatar className="!w-36 !h-36 object-cover" />
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col items-center justify-center gap-5 py-4 lg:h-[45%]">
          <div>
            <h1 className="text-center text-4xl lg:text-6xl font-extrabold">
              {user?.likes?.length}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-4xl font-bold">Age:</h1>
            <h1 className="text-2xl lg:text-4xl font-bold">{user?.age}</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-4xl font-bold">Dislikes:</h1>
            <h1 className="text-2xl lg:text-4xl font-bold">
              {user?.dislikes?.length}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-t from-pink-100 to-pink-400 md:h-[35vh] h-max w-full">
        <h1 className="text-black text-3xl font-bold text-center">
          Your Recent Matches
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 w-full md:h-[30vh] h-max p-2">
          {matches
            .slice(0, 4)
            .reverse()
            .map((data: any) => (
              <MyMatchesCard
                data={data}
                key={data._id}
                currentUserId={current_user._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;

export const MyMatchesCard = ({ data, currentUserId }: any) => {
  return (
    <>
      <div className="bg-black shadow-lg rounded-md lg:w-[25%] w-full lg:p-0 p-4 flex flex-col items-center gap-4 justify-center">
        <Link
          to={
            currentUserId !== data._id
              ? `/user-profile/${data._id}`
              : "/profile"
          }
        >
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
        </Link>
      </div>
    </>
  );
};
