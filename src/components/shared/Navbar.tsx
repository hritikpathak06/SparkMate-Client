import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiLogIn } from "react-icons/bi";
import { FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { GiFlame } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_BASE_API } from "../../config/server_url";
import { setUser } from "../../store/slices/authSlice";
import { Avatar } from "@mui/material";
import { AiFillDashboard } from "react-icons/ai";

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.userData);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${SERVER_BASE_API}/api/v1/auth/logout`,
        { withCredentials: true }
      );
      toast.success(data.msg);
      dispatch(setUser(null));
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className="
      bg-gradient-to-t from-pink-500 to-pink-800 shadow-lg"
      >
        <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className=" flex items-center">
              <Link to={"/"} className=" flex items-center space-x-2">
                <GiFlame
                  style={{ width: "30px", height: "30px", color: "white" }}
                />
                <span className=" text-2xl font-bold text-white hidden sm:inline">
                  SparkMate
                </span>
              </Link>
            </div>

            <div className=" hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {/* //ref={dropDownRef} */}
                  <div className=" relative " ref={dropDownRef}>
                    <button
                      onClick={() => setDropDown(!dropDown)}
                      className=" flex items-center space-x-2 text-white focus:outline-none"
                    >
                      {user?.image ? (
                        <img
                          src={user?.image}
                          alt="user-image"
                          className=" h-10 w-10 object-cover border-5 border-white rounded-full"
                        />
                      ) : (
                        <>
                          <Avatar />
                        </>
                      )}
                      <span className=" text-white font-medium">
                        {user.name}
                      </span>
                    </button>

                    {dropDown && (
                      <>
                        <div
                          className=" absolute right-0 mt-2 bg-white rounded-md shadow-lg flex flex-col gap-5 p-4 items-start text-gray-500 w-48 z-10 "
                          ref={dropDownRef}
                        >
                          <Link
                            to={"/dashboard"}
                            className=" flex items-center gap-5 justify-center"
                          >
                            <AiFillDashboard
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "gray",
                              }}
                            />
                            Dashboard
                          </Link>
                          <Link
                            to={"/profile"}
                            className=" flex items-center gap-5 justify-center"
                          >
                            <FiUser
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "gray",
                              }}
                            />
                            Profile
                          </Link>
                          <button
                            className=" flex items-center gap-5 justify-center"
                            // className=" w-full text-left px-4 text-sm text-gray-700 hover:bg-gray-100 flex items-start justify-center"
                            onClick={handleLogout}
                          >
                            <FiLogOut
                              style={{
                                width: "15px",
                                height: "15px",
                                color: "gray",
                              }}
                            />
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link to={"/login"} className=" flex items-center gap-3">
                      <BiLogIn
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "white",
                        }}
                      />
                      <span className=" text-xl font-medium text-white">
                        Login
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className=" text-white focus:outline-none "
              >
                <FiMenu
                  style={{
                    width: "15px",
                    height: "15px",
                    color: "white",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className=" absolute right-0 bg-pink-600 h-full w-[250px] z-10">
            {user ? (
              <>
                <div className="   shadow-lg flex flex-col gap-5 p-4 items-start w-full text-white">
                  <Link
                    to={"/dashboard"}
                    className=" flex items-center gap-5 justify-center"
                  >
                    <AiFillDashboard
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                    Dashboard
                  </Link>
                  <Link
                    to={"/profile"}
                    className=" flex items-center gap-5 justify-center"
                  >
                    <FiUser
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                    Profile
                  </Link>
                  <button
                    className=" flex items-center gap-5 justify-center"
                    onClick={handleLogout}
                  >
                    <FiLogOut
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className=" p-4">
                  <Link to={"/login"} className=" flex items-center gap-3">
                    <BiLogIn
                      style={{
                        width: "30px",
                        height: "30px",
                        color: "white",
                      }}
                    />
                    <span className=" text-sm font-medium text-white">
                      Login
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
