import TinderCard from "react-tinder-card";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { swipeLeft, swipeRight } from "../../config/api";
import SwipeFeedback from "./SwipeFeedback";

interface User {
  _id: string;
  name: string;
  age: number;
  bio: string;
  image?: string;
}

interface SwipeAreaProps {
  data: User[];
}

const SwipeArea = ({ data }: SwipeAreaProps) => {
  const [swipeFeedback, setSwipeFeedback] = useState<string>("");

  const handleSwipe = async (dir: string, user: User) => {
    let feedback = "";

    if (dir === "right") {
      feedback = await swipeRight(user);
      setSwipeFeedback(feedback === "match" ? "matched" : "liked");

      if (feedback === "match") {
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Optional delay before reload
      }
    } else if (dir === "left") {
      feedback = await swipeLeft(user);
      setSwipeFeedback("passed");
    }

    // Clear feedback after a short delay if not a match
    if (feedback !== "match") {
      setTimeout(() => setSwipeFeedback(""), 2000);
    }
  };

  console.log("Swiped feedback ==>> ", swipeFeedback);

  return (
    <>
      <SwipeFeedback swipeFeedback={swipeFeedback} />
      <div className="relative w-full max-w-sm h-[28rem]">
        {data.map((user) => (
          <TinderCard
            className="absolute shadow-none"
            key={user._id}
            onSwipe={(dir) => handleSwipe(dir, user)}
            swipeRequirementType="position"
            swipeThreshold={100}
            preventSwipe={["up", "down"]}
          >
            <div className="card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border border-gray-200 cursor-pointer">
              {user.image ? (
                <figure className="px-4 pt-4 h-4/4 rounded-full">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="rounded-full object-cover h-full pointer-events-none"
                  />
                </figure>
              ) : (
                <div className="flex justify-center items-center px-4 pt-4 h-4/4">
                  <Avatar className="!h-40 !w-40" />
                </div>
              )}
              <div className="card-body bg-gradient-to-b from-white to-pink-50">
                <h2 className="card-title text-3xl text-center text-gray-800 mx-auto">
                  {user.name}, {user.age}
                </h2>
                <p className="text-gray-600 text-center">
                  {user.bio.substring(0, 30)}...
                </p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </>
  );
};

export default SwipeArea;
