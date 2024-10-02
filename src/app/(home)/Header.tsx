import campusImage from "@/assets/images/campus.png";
import Image from "next/image";
import Link from "next/link";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { COLLEGE_OFFICIAL_WEBSITE, TRACER_OFFICIAL_WEBSITE } from "@/env";
import { Button } from "@/components/ui/button";

const Header = () => {
  const words = [
    { text: "Research", className: "text-white title" },
    { text: "Redefined.", className: "text-white title" },
  ];

  return (
    <div className="relative w-full min-h-[80svh] flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 pt-40 sm:pt-48 md:pt-52 pb-8 sm:pb-10 md:pb-12 gap-4 sm:gap-5 text-white">
      <Image
        src={campusImage}
        alt="Campus"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-40" />

      <header className="flex flex-col gap-3 z-10">
        <TypewriterEffect words={words} />
        <p className="h6-s text-zinc-300">
          Discover research fueled by hope, where breakthroughs translate into
          meaningful impact for the greater good.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 z-10 mt-4 sm:mt-6">
        <Link
          href={COLLEGE_OFFICIAL_WEBSITE}
          className="flex flex-row h5-s mt-1"
        >
          Explore{" "}
          <p className="hover:text-crimson-red transition-all ease duration-300 ml-1">
            MIT-WPU
          </p>
        </Link>

        <Link href={TRACER_OFFICIAL_WEBSITE} className="w-full sm:w-auto">
          <button className="w-full sm:w-80 h-10 rounded-md h6-s bg-opacity-20 hover:bg-opacity-30 text-white border border-white transition-colors">
            TRACER Powered by NextParallel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
