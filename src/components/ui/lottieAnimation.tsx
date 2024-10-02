"use client"
import React from "react";
import Lottie from "react-lottie";

const LottieAnimation: React.FC<{ animationData: any }> = ({
  animationData,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={240} width={240} />;
};

export default LottieAnimation;
