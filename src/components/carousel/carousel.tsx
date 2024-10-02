"use client"
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Author {
  name: string;
  _id: string | number;
}

interface CarouselItem {
  _id?: string;
  title: string;
  authors: Author[];
  tags?: string[];
  quartile?: string;
  quartileProvider?: string;
  citationCount?: number;
  impactFactor?: number;
  publicationType?: string;
  appliedCountry?: string;
  patentNumber?: string;
  patentCategory?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  type: "publication" | "patent";
  bgColor: string;
  title: string;
  description: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ items, type, bgColor, title, description }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 2, align: "start" },
    [Autoplay()]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <div className={`flex flex-col justify-center px-5 md:px-10 py-12 gap-y-10 w-full ${bgColor}`}>
      <header className="flex flex-col items-center justify-center gap-y-3 select-none">
        <h2 className="text-navy-blue h2-b text-center">{title}</h2>
        <hr className="border-2 border-blue-700 max-w-32 sm:max-w-40 w-full rounded-full" />
      </header>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item, index) => (
            <div key={item._id || index} className="embla__slide">
              <div className="grid grid-rows-3 gap-3 h-full select-none bg-white drop-shadow-md w-full rounded-md p-5 relative">
                <div className="flex flex-col gap-y-3">
                  <div className="flex justify-between">
                    <span className="text-m text-crimson-red">
                      {type === "publication" ? item.tags?.join(", ") : item.patentCategory}
                    </span>
                    <Link href={`/${type}s/${type === "publication" ? "journal" : ""}/${item._id || item.patentNumber}`}></Link>
                  </div>
                  <Link
                    href={`/${type}s/${type === "publication" ? "journals" : ""}/${item._id || item.patentNumber}`}
                    className="h6-s tracking-wide  hover:text-zinc-500 hover:cursor-pointer line-clamp-2"
                  >
                    {item.title}
                  </Link>
                </div>
                <div className="line-clamp-2 h-full">
                  {item.authors.map((author, idx) => (
                    <span key={author._id} className="text-r">
                      <Link
                        href={`/faculty/${author._id}`}
                        className="hover:underline hover:cursor-pointer hover:text-navy-blue"
                      >
                        {author.name}
                      </Link>
                      {idx !== item.authors.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-y-3 h-full">
                  {type === "publication" ? (
                    <>
                      <div className="flex flex-col gap-3 sm:flex-row sm:gap-x-3">
                        <p className="text-r bg-warm-yellow w-fit py-2 px-3 rounded-md">
                          Citation Count: {item.citationCount}
                        </p>
                        <p className="text-r bg-warm-yellow w-fit py-2 px-3 rounded-md">
                          Impact Factor: {item.impactFactor}
                        </p>
                      </div>
                      <div className="flex gap-x-3">
                        <p className="text-r bg-blush-pink py-2 px-3 rounded-md">
                          {item.quartile}
                        </p>
                        {item.quartileProvider && (
                          <p className="text-r bg-blush-pink py-2 px-3 rounded-md">
                            {item.quartileProvider}
                          </p>
                        )}
                        {item.publicationType && (
                          <p className="absolute bottom-0 right-0 text-m bg-zinc-100 py-2 px-3 rounded-sm">
                            {item.publicationType}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 h-full">
                      <p className="text-r bg-warm-yellow py-2 px-3 rounded-md">
                        {item.patentNumber}
                      </p>
                      {item.appliedCountry && (
                        <p className="text-r bg-warm-yellow w-fit py-2 px-3 rounded-md">
                          {item.appliedCountry}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? "bg-blue-700" : "bg-gray-300"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>

      <div className="hidden sm:flex">
        <p className="max-w-5xl border-l-4 text-stone-gray border-[#0f172a] pl-5">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Carousel;