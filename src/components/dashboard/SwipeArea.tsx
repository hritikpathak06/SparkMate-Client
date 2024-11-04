import TinderCard from "react-tinder-card";
import LOGO from "../../../public/logo.png";
import { swipeLeft, swipeRight } from "../../config/api";
import SwipeFeedback from "./SwipeFeedback";
import { useState } from "react";

const SwipeArea = ({ data }: any) => {
  const [swipeFeedback, setSwipeFeedback] = useState("");

  const handleSwipe = async (dir: any, user: any) => {
    let feedback = "";

    if (dir === "right") {
      feedback = await swipeRight(user);
      setSwipeFeedback(feedback === "match" ? "matched" : "liked");

      // Reload the page if there's a match
      // if (feedback === "match") {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 2000); // Optional delay before reload
      // }
    } else if (dir === "left") {
      feedback = await swipeLeft(user);
      setSwipeFeedback("passed");
    }

    // Clear feedback after a short delay (if no match)
    if (feedback !== "match") {
      setTimeout(() => setSwipeFeedback(""), 2000);
    }
  };

  console.log("Swiped feedback ==>> ", swipeFeedback);

  return (
    <>
      <SwipeFeedback swipeFeedback={swipeFeedback} />
      <div className="relative w-full max-w-sm h-[28rem]">
        {/* Swipe feedback component positioned above cards */}
        {data.map((user: any) => (
          <TinderCard
            className="absolute shadow-none"
            key={user._id}
            onSwipe={(dir) => handleSwipe(dir, user)}
            swipeRequirementType="position"
            swipeThreshold={100}
            preventSwipe={["up", "down"]}
          >
            <div className="card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border border-gray-200 cursor-pointer">
              <figure className="px-4 pt-4 h-3/4">
                <img
                  src={LOGO}
                  alt={user.name}
                  className="rounded-lg object-cover h-full pointer-events-none"
                />
              </figure>
              <div className="card-body bg-gradient-to-b from-white to-pink-50">
                <h2 className="card-title text-2xl text-gray-800 text-center">
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
