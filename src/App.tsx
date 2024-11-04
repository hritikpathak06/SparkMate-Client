import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_BASE_API } from "./config/server_url";
import { setUser } from "./store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket } from "./socket/socket";
import LoaderComponent from "./components/shared/Loader";

// Lazy Loading
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const UpdateProfilePage = lazy(() => import("./pages/UpdateProfile"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const App = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.auth.userData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${SERVER_BASE_API}/api/v1/auth/me`, {
          withCredentials: true,
        });
        dispatch(setUser(data.user));
        initializeSocket(data.user._id);
        console.log("UserId==>> ", data.user._id);
      } catch (error) {
        console.log(error);
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    setIsAuth(!!user);
  }, [user]);

  if (loading)
    return (
      <div className=" h-screen w-full flex items-center justify-center bg-white">
        <LoaderComponent />
      </div>
    );
  return (
    <>
      {/* <SwipeCard/> */}
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-white">
            <LoaderComponent />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/profile" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/profile" /> : <RegisterPage />}
          />
          <Route
            path="/profile"
            element={!isAuth ? <Navigate to="/login" /> : <ProfilePage />}
          />
          <Route
            path="/dashboard/chat/:id"
            element={!isAuth ? <Navigate to="/login" /> : <ChatPage />}
          />
          <Route
            path="/update-profile"
            element={!isAuth ? <Navigate to="/login" /> : <UpdateProfilePage />}
          />
          <Route
            path="/dashboard"
            element={!isAuth ? <Navigate to="/login" /> : <DashboardPage />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
