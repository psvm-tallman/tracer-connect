'use client';
import React from 'react';
import CountUp from "react-countup";
import LottieAnimation from "@/components/ui/lottieAnimation";

interface LottieCounterProps {
  animationData: any;
  count: number;
  label: string;
}

const LottieCounter: React.FC<LottieCounterProps> = ({ animationData, count, label }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LottieAnimation animationData={animationData} />
      
      <h2 className="h2-b">
        <CountUp start={0} end={count} duration={5} />
      </h2>

      <span className="h5-s">{label}</span>
    </div>
  );
};

export default LottieCounter;