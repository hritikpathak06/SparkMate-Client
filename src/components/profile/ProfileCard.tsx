import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.userData);
  return (
    <>
      <div className=" h-screen w-full ">
        <div className=" grid grid-cols-3 w-full h-3/5 ">
          <div className=" w-7/20">
            <div className=" w-full h-full flex flex-col items-start p-4">
              <h1 className=" text-6xl font-extrabold p-3">{user.name}</h1>
              <p className=" p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                eligendi sequi maiores earum, sunt vel officia omnis possimus
                reprehenderit dolorem delectus voluptatem pariatur, modi ea
                eveniet vero odio laboriosam itaque fugit, voluptates vitae
                perspiciatis amet blanditiis? Optio praesentium exercitationem,
                repellendus omnis ex minima? Quidem odio porro voluptates
                molestiae vero ullam.
              </p>
              <button className=" p-3 bg-black text-white rounded-md mx-auto"
              onClick={() => navigate("/update-profile")}
              >
                Update Your Profile
              </button>
            </div>
          </div>
          <div className="  w-full flex items-center justify-center">
            <div className="  p-3 profile_image_container">
              <img src="/login.png" alt="" className=" profile_image" />
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center gap-5  ">
            <div>
              <h1 className=" text-center pt-2 text-6xl font-extrabold">
                {user.likes.length}
              </h1>
            </div>
            <div className=" flex items-center gap-5">
              <h1 className="text-center pt-2 text-6xl font-extrabold">Age:</h1>
              <h1 className="text-center pt-2 text-6xl font-extrabold">
                {user.age}
              </h1>
            </div>
            <div className=" flex items-center gap-5">
              <h1 className="text-center pt-2 text-6xl font-extrabold">
                Dislikes:
              </h1>
              <h1 className="text-center pt-2 text-6xl font-extrabold">
                {user.dislikes.length}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
