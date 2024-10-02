"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "@/components/datePicker/datePicker";
import { DateRange } from "react-day-picker";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import publicationImage from "@/assets/images/publicationImage.png";
import { Search } from "lucide-react";

const Publications = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [department, setDepartment] = useState<string>("");

  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (dateRange?.from) {
      params.set("startDate", dateRange.from.toISOString().split("T")[0]);
    } else {
      params.delete("startDate");
    }

    if (dateRange?.to) {
      params.set("endDate", dateRange.to.toISOString().split("T")[0]);
    } else {
      params.delete("endDate");
    }

    if (department) {
      params.set("department", department);
    } else {
      params.delete("department");
    }

    router.push(`?${params.toString()}`);
  }, [dateRange, department, router, searchParams]);

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
      title:
        "Deep Learning Applications in Healthcare: A Comprehensive SurveyDeep Learning Applications in Healthcare: A Comprehensive SurveyDeep Learning Applications in Healthcare: A Comprehensive SurveyDeep Learning Applications in Healthcare: A Comprehensive SurveyDeep Learning Applications in Healthcare: A Comprehensive SurveyDeep Learning Applications in Healthcare: A Comprehensive SurveyDeep Learning Applications in Healthcare: A Comprehensive Survey",
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
      title: " Messages and URLs",
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

  const tabs = [
    { name: "Journal Papers", link: "/journal-papers" },
    { name: "Book Chapters", link: "/book-chapters" },
    { name: "Conference Papers", link: "/conference-papers" },
    { name: "Books", link: "/books" },
  ];
  return (
    <div className="flex flex-col gap-y-6 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 bg-white">
      <div className="flex flex-col sm:flex-row justify-between rounded-lg gap-y-4 sm:gap-y-0 sm:gap-x-5">
        <div className="w-full sm:w-auto overflow-x-auto flex gap-x-1 sm:gap-x-2 min-w-max">
          {tabs.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                " text-slate-900 hover:bg-cloud-blue",
                "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                "dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-y-0 sm:gap-x-3">
          {/* <SelectDepartment onDepartmentChange={handleDepartmentChange} /> */}
          <DatePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder="Select start date - end date"
          />
        </div>
      </div>

      <div className="flex items-center h-14 gap-x-2 bg-cloud-blue px-3 rounded-lg w-full">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1 font-sans font-medium text-matte-black bg-cloud-blue text-sm sm:text-base"
          style={{ outline: "none", padding: "2px" }}
        />
      </div>

      <div className="w-full grid sm:grid-cols-1 lg:grid-cols-2 gap-5">
        {publicationInfos.map((publication, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:gap-x-5 p-4 sm:p-6 bg-white rounded-lg shadow-sm"
          >
            <div className="flex w-full sm:w-40 h-40 sm:h-auto">
              <Image
                src={publicationImage}
                alt="placeholder"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex flex-col gap-y-2 flex-1">
              <div className="flex flex-col gap-y-1">
                <p className="text-r text-crimson-red">
                  {publication?.tags?.join(", ")}
                </p>
                <Link
                  href={`/publications/${publication?.type}/${publication?._id}`}
                  className="h6-s line-clamp-2 hover:text-zinc-400"
                >
                  {publication.title}
                </Link>
              </div>

              <div className="line-clamp-2">
                {publication.authors.map((author, index) => (
                  <span key={author._id} className="text-xs sm:text-sm">
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

              <div className="flex flex-col gap-y-1 pt-2">
                <p className="text-xs sm:text-sm">
                  Citation Count: {publication.citationCount} | Impact Factor:{" "}
                  {publication.impactFactor}
                </p>
                <p className="text-xs sm:text-sm">
                  Quartile: {publication.quartile}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
