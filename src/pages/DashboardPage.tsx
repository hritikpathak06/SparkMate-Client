import { useEffect, useState } from "react";
import Sidebar from "../components/shared/Sidebar";
import { getUserProfiles } from "../config/api";
import Navbar from "../components/shared/Navbar";
import SwipeArea from "../components/dashboard/SwipeArea";
import { Heart } from "lucide-react";
import LoaderComponent from "../components/shared/Loader";

const DashboardPage = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getUserProfiles();
      setUserProfiles(data);
      setLoading(false);
    })();
  }, []);

  console.log("User  profiles==>> ", userProfiles);

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 overflow-hidden">
        <Sidebar url={"/dashboard/chat"} />
        <div className=" flex-grow flex flex-col overflow-hidden">
          <Navbar />
          {loading ? (
            <>
              <div className=" w-full items-center justify-center flex h-[70%]">
                <LoaderComponent />
              </div>
            </>
          ) : (
            <>
              <main className=" flex-grow flex flex-col justify-center items-center p-4 relative overflow-hidden">
                {userProfiles.length > 0 ? (
                  <>
                    {/* <SwipeLeft />
                <SwipeRight /> */}
                    <SwipeArea data={userProfiles} />
                    {/* <SwipeFeedback/> */}
                  </>
                ) : (
                  <>
                    <NoMatchesFound />
                  </>
                )}
              </main>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Heart className="text-black mb-4" size={48} />
    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
      No Users Found
    </h3>
  </div>
);
