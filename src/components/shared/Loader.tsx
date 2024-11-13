import { Loader } from "lucide-react";

const LoaderComponent = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Loader className="text-blue-500 mb-4 animate-spin" size={88} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading</h3>
          <p className="text-black font-extrabold text-2xl max-w-xs">
            This might take a moment...
          </p>
      </div>
    </div>
  );
};

export default LoaderComponent;
