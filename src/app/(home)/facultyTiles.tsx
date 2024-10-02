import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
import Faculty1 from "@/assets/images/Fac1.jpeg";
import Faculty2 from "@/assets/images/Fac2.jpeg";

interface Testimonial {
  name: string;
  role: string;
  department: string;
  quote: string;
  avatarUrl: string | StaticImageData;
  facultyId: string;
  departmentSlug: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Radhakrishnan Subramanian",
    role: "Professor",
    department: "School of Polymer Engineering",
    quote:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    avatarUrl: Faculty1,
    facultyId: "radhakrishnan-subramanian",
    departmentSlug: "school-of-polymer-engineering",
  },
  {
    name: "Bharat Sambhu Chaudhari",
    role: "Dean",
    department: "School of Electronics & Communication Engineering",
    quote:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    avatarUrl: Faculty2,
    facultyId: "bharat-sambhu-chaudhari",
    departmentSlug: "school-of-electronics-and-communication-engineering",
  },
  {
    name: "Swati Changdeo Jagdale",
    role: "Professor",
    department: "School of Pharmacy",
    quote:
      "Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat",
    avatarUrl: Faculty1,
    facultyId: "swati-changdeo-jagdale",
    departmentSlug: "school-of-pharmacy",
  },
];

const TestimonialCard: React.FC<Testimonial> = ({
  name,
  role,
  department,
  quote,
  avatarUrl,
  facultyId,
}) => (
  <div className="overflow-hidden bg-white rounded-md shadow-lg">
    <div className="px-8 py-12">
      <div className="relative w-24 h-24 mx-auto">
        <Image
          className="relative object-cover w-24 h-24 mx-auto rounded-full"
          src={avatarUrl}
          alt={`Avatar of ${name}`}
          width={96}
          height={96}
        />
        <div className="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
          </svg>
        </div>
      </div>
      <blockquote className="mt-7">
        <p className="h6-m text-matte-black">{quote}</p>
      </blockquote>
      <Link href={`/faculty/${facultyId}`} className="block mt-9 ">
        <p className="h6-s  text-matte-black hover:underline hover:text-navy-blue">{name}</p>
      </Link>
      <p className="mt-1 h6-m  text-stone-gray ">
        {role} at {department}
        {/* <Link
          href={`/department/${departmentSlug}`}
          className="hover:underline hover:text-matte-black"
        >
          {department}
        </Link> */}
      </p>
    </div>
  </div>
);

const FacultyTiles = () => {
  return (
    <div className="w-full px-10 py-14 flex flex-col gap-y-24 items-center justify-center max-w-full">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h2 className="h2-b w-4/5 text-center">
          Explore Research with{" "}
          <span className="text-crimson-red">MIT-WPU</span> Renowned Faculty
        </h2>
        <hr className="border-2 border-red-500 w-1/6 rounded-full" />
      </div>

      <section>
        <div className="grid max-w-6xl grid-cols-1 mx-auto text-center lg:max-w-full lg:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FacultyTiles;
