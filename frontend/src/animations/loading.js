import React from "react";
import Lottie from "react-lottie";
import * as loading from "../assets/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-100 z-50">
      <div style={{ width: '300px', height: '300px' }}> 
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default Loading;
