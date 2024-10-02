"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import DatePicker from "@/components/datePicker/datePicker";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import patentImage from "@/assets/images/TechPatent.png";
import { Search } from "lucide-react";

export const patentInfo = [
  {
    _id: "fgvrd235676433",
    type: "Artificial Intelligence",
    patentNumber: "US987654321A",
    title: "Advanced Quantum Encryption Technique",
    appliedCountry: "India",
    patentStatus: "Granted",
    filedDate: "2022-05-20",
    publishedDate: "2023-11-15",
    grantedDate: "2024-07-10",
    applicants: [
      {
        _id: "kj7664g79n87",
        name: "Bob Williams",
        school: "Quantum Computing Lab",
        designation: "Lead Researcher",
        emailId: "bob.williams@example.com",
        phoneNumber: "+1 (234) 567-8901",
      },
    ],
    inventors: [
      {
        _id: "hgy5567b9tbe33",
        name: "Alice Johnson",
        avatarSrc: "/avatar.png",
        school: "Cybersecurity Institute",
        designation: "Security Analyst",
        emailId: "alice.johnson@example.com",
        phoneNumber: "+1 (123) 456-7890",
      },
    ],
  },
  {
    _id: "hgfs347659654f",
    type: "Machine Learning",
    patentNumber: "US987654322A",
    title: "Adaptive Neural Network for Real-time Financial Analysis",
    appliedCountry: "India",
    patentStatus: "Granted",
    filedDate: "2022-03-10",
    publishedDate: "2023-09-05",
    grantedDate: "2024-04-01",
    applicants: [
      {
        _id: "ygt6479yb6543v",
        name: "Emily Davis",
        school: "Finance Analytics Inc.",
        designation: "Chief Data Scientist",
        emailId: "emily.davis@example.com",
        phoneNumber: "+1 (345) 678-9012",
      },
    ],
    inventors: [
      {
        _id: "jhu654vb79h7n",
        name: "John Smith",
        avatarSrc: "/avatar.png",
        school: "Data Science Academy",
        designation: "Professor",
        emailId: "john.smith@example.com",
        phoneNumber: "+1 (456) 789-0123",
      },
    ],
  },
  {
    _id: "jnbgr556899765r",
    type: "Machine Learning",
    patentNumber: "US987654323A",
    title: "Next-generation Solar Panel Efficiency Improvement Method",
    appliedCountry: "India",
    patentStatus: "Granted",
    filedDate: "2022-07-25",
    publishedDate: "2023-12-20",
    grantedDate: "2024-08-15",
    applicants: [
      {
        _id: "jhyt544386t78h",
        name: "Michael Johnson",
        school: "Renewable Energy Research Institute",
        designation: "Senior Scientist",
        emailId: "michael.johnson@example.com",
        phoneNumber: "+1 (567) 890-1234",
      },
    ],
    inventors: [
      {
        _id: "jhyt5437t6v8ht5",
        name: "Sarah Lee",
        avatarSrc: "/avatar.png",
        school: "GreenTech Innovations",
        designation: "Engineering Lead",
        emailId: "sarah.lee@example.com",
        phoneNumber: "+1 (678) 901-2345",
      },
    ],
  },
  {
    _id: "jftrde4676f443",
    type: "Artificial Intelligence",
    patentNumber: "US98897889A",
    title: "Panel Efficiency Improvement Method",
    appliedCountry: "India",
    patentStatus: "Granted",
    filedDate: "2022-07-25",
    publishedDate: "2023-12-20",
    grantedDate: "2024-08-15",
    applicants: [
      {
        _id: "gfre47764387bv",
        name: "Michael Johnson",
        school: "Renewable Energy Research Institute",
        designation: "Senior Scientist",
        emailId: "michael.johnson@example.com",
        phoneNumber: "+1 (567) 890-1234",
      },
    ],
    inventors: [
      {
        _id: "hgvrde4767br6rt",
        name: "Sarah Lee",
        avatarSrc: "/avatar.png",
        school: "GreenTech Innovations",
        designation: "Engineering Lead",
        emailId: "sarah.lee@example.com",
        phoneNumber: "+1 (678) 901-2345",
      },
    ],
  },
];

const Patent = () => {
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
  const tabs = [
    { name: "Journal Papers", link: "/" },
    { name: "Patents", link: "/" },
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
                " text-matte-black hover:bg-cloud-blue",
                "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                "dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-y-0 sm:gap-x-3">
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
          className="flex-1 h6-m text-matte-black bg-cloud-blue"
          style={{ outline: "none", padding: "2px" }}
        />
      </div>

      <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-5">
        {patentInfo.map((patent, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:gap-x-5 p-4 sm:p-6 bg-white rounded-lg shadow-sm"
          >
            <div className="flex w-full sm:w-40 h-40 sm:h-auto">
              <Image
                src={patentImage}
                alt="placeholder"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex flex-col gap-y-2 flex-1">
              <div className="flex flex-col gap-y-1">
                <p className="text-m text-crimson-red">{patent.type}</p>
                <Link
                  href="/patents/patentDetails"
                  className="h6-s line-clamp-2 hover:text-zinc-400"
                >
                  {patent.title}
                </Link>
              </div>

              <div className="line-clamp-1">
                {patent.inventors.map((inventor, index) => (
                  <span key={inventor._id} className="text-xs sm:text-sm">
                    <Link
                      href={`/faculty/${inventor._id}`}
                      className="hover:underline hover:cursor-pointer"
                    >
                      {inventor.name}
                    </Link>
                    {index !== patent.inventors.length - 1 && ", "}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-y-1 pt-2">
                <p className="text-m text-crimson-red">{patent.patentNumber}</p>
                <p className="text-m">
                  {patent.patentStatus} | {patent.grantedDate}
                </p>
                <p className="text-m">{patent.appliedCountry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patent;
