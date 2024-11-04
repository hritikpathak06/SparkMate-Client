import { useEffect, useState } from "react";
import { FireExtinguisherIcon, Heart, Loader, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { matchUser } from "../../config/api";
import { getSocket } from "../../socket/socket";
import toast from "react-hot-toast";


const Sidebar = ({url}:any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {id} = useParams();
  console.log("Id==>>> ",id)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Listen for real-time new matches
  const listenForNewMatches = () => {
    const socket = getSocket();
    if (!socket) {
      console.error("Socket connection failed");
      return;
    }
  
    socket.on("connect", () => console.log("Socket connected"));
    socket.on("disconnect", () => console.log("Socket disconnected"));
  
    socket.on("newMatch", (newMatchData: any) => {
      console.log("Received new match:", newMatchData);
      setMatches((prevMatches) => [...prevMatches, newMatchData]);
      toast.success("WOOOOHHH! You Got The New Match🥳")
    });
  };
  

  useEffect(() => {
    // Fetch initial matches when component mounts
    const fetchMatches = async () => {
      setLoading(true);
      const data = await matchUser();
      setMatches(data);
      setLoading(false);
    };

    fetchMatches();
    listenForNewMatches();
    // Cleanup
    return () => {
      const socket = getSocket();
      socket?.off("newMatch");
    };
  }, []);

  return (
    <>
      <div
        className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-150 ease-in-out lg:translate-x-0 lg:static lg:w-1/4
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 pb-6 border-b border-pink-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-pink-500">Your Matches</h2>
            <button
              className="lg:hidden p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={toggleSidebar}
            >
              <X className="h-10" />
            </button>
          </div>

          {/* Matches List */}
          <div className="flex-grow overflow-y-auto p-4 z-10 relative">
            {loading ? (
              <LoadingState />
            ) : matches.length === 0 ? (
              <NoMatchesFound />
            ) : (
              matches.map((match: any) => (
                <Link
                  key={match?._id}
                  to={`${url}/${match?._id}`}
                  className={`block p-2 mb-2 text-gray-700 hover:bg-pink-100 rounded ${id === match._id ? "bg-purple-500 hover:bg-purple-500" : ""} `}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={match?.image || "/logo.png"}
                      alt=""
                      className="h-12 w-12 border-2 border-black rounded-full object-cover"
                    />
                    <p className="text-gray-600 text-xl font-medium">
                      {match?.name}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button for Sidebar */}
      <button
        className="lg:hidden fixed top-4 left-4 p-2 bg-pink-400 text-white rounded-md"
        onClick={toggleSidebar}
      >
        <FireExtinguisherIcon className="h-8 w-8" />
      </button>
    </>
  );
};

export default Sidebar;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Heart className="text-pink-400 mb-4" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Matches Yet</h3>
    <p className="text-gray-500 max-w-xs">
      Don&apos;t worry! Your perfect match is just around the corner. Keep
      swiping!
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-pink-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Matches</h3>
    <p className="text-gray-500 max-w-xs">
      We&apos;re finding your perfect matches. This might take a moment...
    </p>
  </div>
);
