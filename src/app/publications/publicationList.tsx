import React from "react";
import Link from "next/link";
import Image from "next/image";
import publicationImage from "@/assets/images/publicationImage.png";

function PublicationList() {
  const publicationInfos = [
    {
      _id: "61f2965c808eac3c2c22b4a1",
      title:
        "Fuzzy Classifications and Decision Tree based Estimation of Phishing Messages and URLs",
      authors: [
        { name: "Vandana Jagtap", _id: "5d645e465s455" },
        { name: "Mamta Bhamare", _id: "5d645e465s456" },
        { name: "Rajesh Patel", _id: "5d645e465s457" },
      ],
      quartile: "Q1",
      quartileProvider: "SCIamago",
      citationCount: 122,
      impactFactor: 2.341,
      tags: ["Robotics", "Machine Learning"],
      lin: "https://doi.org/10.16920/jeet/2023/v36is2/23052",
      type: "Journal",
    },
    {
      _id: "61f29668808eac3c2c22b4a2",
      title:
        "Machine Learning Techniques for Predictive Maintenance in Manufacturing: A Review",
      authors: [
        { name: "Aarav Gupta", _id: "5d645e465s458" },
        { name: "Ishaan Sharma", _id: "5d645e465s459" },
        { name: "Diya Patel", _id: "5d645e465s460" },
      ],
      quartile: "Q2",
      quartileProvider: "Other Provider",
      citationCount: 150,
      impactFactor: 3.124,
      tags: ["Manufacturing", "Predictive Maintenance"],
      lin: "https://doi.org/10.16920/jeet/2023/v36is2/23053",
      type: "Journal",
    },
    {
      _id: "61f2966f808eac3c2c22b4a3",
      title: "Deep Learning Applications in Healthcare: A Comprehensive Survey",
      authors: [
        { name: "Aditi Singh", _id: "5d645e465s461" },
        { name: "Arjun Kumar", _id: "5d645e465s462" },
        { name: "Neha Sharma", _id: "5d645e465s463" },
      ],
      quartile: "Q1",
      quartileProvider: "SCIamago",
      citationCount: 210,
      impactFactor: 4.567,
      tags: ["Healthcare", "Deep Learning"],
      lin: "https://doi.org/10.16920/jeet/2023/v36is2/23054",
      type: "Journal",
    },
    {
      _id: "61f2965c808eac3c2c22b4a1",
      title:
        "Fuzzy Classifications and Decision Tree based Estimation of Phishing Messages and URLs",
      authors: [
        { name: "Vandana Jagtap", _id: "5d645e465s455" },
        { name: "Mamta Bhamare", _id: "5d645e465s456" },
        { name: "Rajesh Patel", _id: "5d645e465s457" },
      ],
      quartile: "Q1",
      quartileProvider: "SCIamago",
      citationCount: 122,
      impactFactor: 2.341,
      tags: ["Robotics", "Machine Learning"],
      lin: "https://doi.org/10.16920/jeet/2023/v36is2/23052",
      type: "Journal",
    },
  ];

  return (
    <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-5 px-4">
      {publicationInfos.map((publication, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-y-5 w-full md:gap-y-0 md:gap-x-5 p-5 sm:p-10 md:p-5 bg-white rounded-sm drop-shadow-sm"
        >
          <div className="flex w-full md:w-auto md:min-w-fit h-full">
            <Image
              src={publicationImage}
              alt="placeholder"
              className="w-full md:w-40 md:h-20"
            />
          </div>

          <div className="flex flex-col gap-y-1 w-full">
            <div className="flex flex-col gap-y-1.5">
              <p className="text- text-xs text-crimson-red">
                {publication?.tags?.join(", ")}
              </p>
              <Link
                href={`/publications/${publication?.type}/${publication?._id}`}
                className="text-m font-semibold hover:text-zinc-400 line-clamp-2 min-h-12"
              >
                {publication.title}
              </Link>
            </div>

            <div className="line-clamp-2 min-h-12">
              {publication.authors.map((author, index) => (
                <span key={author._id} className="text-s text-sm ">
                  <Link
                    href={`/faculty/${author._id}`}
                    className="hover:underline hover:cursor-pointer"
                  >
                    {author.name}
                  </Link>
                  {index !== publication.authors.length - 1 && ", "}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-y-1  pt-3">
              <p className="text-xs text-s text-indigo-400">
                Citation Count : {publication.citationCount} | Impact Factor :{" "}
                {publication.impactFactor}
              </p>
              <p className="text-xs text-s text-indigo-400">
                Quartile : {publication.quartile}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicationList;
