"use client"
import CountUp from "react-countup";

const counterWrapper = ({start=0,end=0,duration=5}:{start?:number,end:number,duration?:number}) => {
  return  <CountUp start={start} end={end} duration={duration} />;
};

export default counterWrapper;
