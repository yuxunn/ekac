import React from "react";
import Lottie from "react-lottie";
import * as signin from "../assets/signin.json";

const Loading2 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signin.default,
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

export default Loading2;
