import { LayoutDashboardIcon, PlusIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const user = useSelector((state: any) => state.auth.userData);
  const naviagte = useNavigate();

  return (
    <>
      <div className="md:h-[90vh] h-max bg-red-50 w-full relative flex items-center justify-center">
        <div
          className="bg-red-500 w-full h-full absolute  left-0 "
          style={{
            backgroundImage: "url('/app-logo.webp')", // Ensure this path is correct
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 1,
            backgroundColor: "transparent",
          }}
        ></div>
        {/* Other content can go here */}
        <div className=" mt-40 relative z-10 p-5 md:w-[80%] w-full mx-auto flex flex-col items-start gap-2">
          <h1 className="font-extrabold md:text-6xl text-4xl text-center bg-gradient-to-r from-pink-300 to-pink-600 bg-clip-text text-transparent p-4">
            Ignite Your Connections
          </h1>
          <div className=" md:w-1/2 w-full">
            <p className="md:text-2xl text-xl font-semibold bg-gradient-to-r from-pink-300 to-pink-600 bg-clip-text text-transparent p-4">
              Join SparkMate, where finding your ideal partner becomes an
              exciting adventure filled with genuine conversations, shared
              interests, and the potential for lasting love.
            </p>
          </div>

          <button
            className=" p-4 md:pr-5 pr-0 bg-black text-white md:ml-4 ml-0 mt-5 flex items-center  justify-center gap-3 md:w-[15%] w-full rounded-md"
            onClick={() => naviagte(`${user ? "/dashboard" : "/login"}`)}
          >
            {user ? (
              <LayoutDashboardIcon className="h-6 w-6" />
            ) : (
              <PlusIcon className="h-6 w-6" />
            )}
            {user ? "Dashboard" : "Get Started"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
