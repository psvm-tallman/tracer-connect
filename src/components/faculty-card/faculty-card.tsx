import React from "react";
import Image from "next/image";
import Link from "next/link";
import Fac1 from "@/assets/images/Fac1.jpeg";
import {
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Mail,
} from "lucide-react";

export default function FacultyCard() {
  const faculties = {
    _id: 1,
    name: "Radhakrishnan Subramanian",
    designation: "Professor Emiritus",
    department: "School of Polymer Engineering",
    description:
      "Radhakrishnan Subramanian is a Professor Emiritus in the School of Polymer Engineering at MIT-WPU. He specializes in polymer chemistry and has published numerous papers in international journals.",
    email: "radhakrishnan.subramanian@gmail.com",
    contact: "+91 98381 29319",
    image: Fac1,
    joinDate: "2024-01-15T00:00:00.000Z",
    leaveDate: "",
    citationCount: 4,
    impactFactor: 8,
    publications: [
      {
        title:
          "Review on conversion of jackfruit (Artocarpus heterophyllus) waste for making value added polymers",
        journal: "Springer Science and Business Media Deutschland GmbH",
        year: 2023,
      },
      {
        title: "Review on biomass sheep wool-based polymer composites",
        journal: "Apple Academic Press",
        year: 2022,
      },
    ],
  };

  const socialIcons = [
    { Icon: Linkedin, link: "#" },
    { Icon: Twitter, link: "#" },
    { Icon: Facebook, link: "#" },
    { Icon: Instagram, link: "#" },
    { Icon: Youtube, link: "#" },
    { Icon: Globe, link: "#" },
  ];

  return (
    <div className="max-w-full">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-y-6 md:gap-y-0 md:gap-x-8">
          <div className="flex-shrink-0">
            <Image
              className="h-32 w-32 md:h-48 md:w-48 rounded-sm"
              src={faculties.image}
              alt={faculties.name}
              width={192}
              height={192}
            />
          </div>
          <div className="flex flex-col gap-y-[22px] text-center md:text-left">
            <div>
              <h3 className="h1-s text-matte-black">{faculties.name}</h3>
              <p className="h6-m text-stone-gray">
                <span className="h6-s">{faculties.designation}</span> |{" "}
                <span className="text-light-purple">
                  {faculties.department}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Link
                href="/"
                className="flex items-center justify-center md:justify-start h6-m text-matte-black hover:text-navy-blue hover:underline"
              >
                <Phone className="mr-2 h-5 w-5 text-navy-blue" />{" "}
                {faculties.contact}
              </Link>
              <Link
                href={`mailto:${faculties.email}`}
                className="flex items-center justify-center md:justify-start h6-m text-matte-black hover:text-navy-blue hover:underline"
              >
                <Mail className="mr-2 h-5 w-5 text-navy-blue" />{" "}
                {faculties.email}
              </Link>
            </div>
            <div className="flex justify-center md:justify-start gap-x-4">
              {socialIcons.map(({ Icon, link }, index) => (
                <Link
                  key={index}
                  href={link}
                  className="text-stone-gray hover:text-blue-500 transition-colors duration-300"
                >
                  <Icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 sm:p-6 md:p-8">
          <h4 className="h5-s text-matte-black mb-2">About</h4>
          <p className="text-r tracking-wider text-stone-gray">
            {faculties.description}
          </p>
        </div>
        <div className="p-4 sm:p-6 md:p-8 bg-white">
          <h4 className="h5-s text-matte-black mb-4">Recent Publications</h4>
          <ul className="gap-y-4">
            {faculties.publications.map((pub, index) => (
              <li key={index} className="border-b pb-2">
                <p className="h6-m text-matte-black">{pub.title}</p>
                <p className="text-r text-stone-gray">
                  {pub.journal}, {pub.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
