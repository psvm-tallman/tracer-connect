import Header from "./Header";
import LottieCount from "./lottieCount";
import PublicationsCarousel from "./PublicationsCarousel";
import FacultyTiles from "./facultyTiles";
import CounterTiles from "./counterTiles";
import PatentCarousel from "./PatentCarousel";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {/* <Header /> */}
      <LottieCount />
      {/* <PublicationsCarousel />
      <CounterTiles />
      <PatentCarousel />
      <FacultyTiles /> */}
    </div>
  );
};

export default Page;
