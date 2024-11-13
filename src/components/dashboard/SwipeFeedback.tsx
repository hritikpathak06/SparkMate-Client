const getFeedbackStyle = (swipeFeedback: any) => {
  if (swipeFeedback === "liked") return "text-green-500";
  if (swipeFeedback === "passed") return "text-blue-500";
  if (swipeFeedback === "matched") return "text-pink-500";
  return "";
};

const getFeedbackText = (swipeFeedback: any) => {
  if (swipeFeedback === "liked") return "Liked!😊";
  if (swipeFeedback === "passed") return "Passed😒";
  if (swipeFeedback === "matched") return "It's a Match!😎";
  return "";
};

const SwipeFeedback = ({ swipeFeedback }: any) => (
  <div
    className={`absolute top-0 left-0 right-0 text-center text-2xl font-bold z-50 ${getFeedbackStyle(
      swipeFeedback
    )}`}
  >
    {getFeedbackText(swipeFeedback)}
  </div>
);

export default SwipeFeedback;
