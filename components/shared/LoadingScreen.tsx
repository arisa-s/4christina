"use client";
import { Bars } from "react-loader-spinner";

export const LoadingScreen = () => {
  return (
    <div className="m-auto">
      <div className="flex space-x-6">
        <Bars
          height="20"
          width="20"
          color="#44403c"
          ariaLabel="audio-loading"
          visible={true}
        />
        <h1 className="text-primary">Loading</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
