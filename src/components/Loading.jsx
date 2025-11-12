import React from "react";
import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <DotLoader color="#fbbf24" size={30} />
    </div>
  );
};

export default Loading;