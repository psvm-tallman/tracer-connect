"use client";
import React, { ReactElement, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Search } from "lucide-react";
import Fac1 from "@/assets/images/Fac1.jpeg";
import Fac2 from "@/assets/images/Fac2.jpeg";
import SelectDesignation from "@/components/select/selectDesignation";
import SelectDepartment from "@/components/select/selectDepartment";

interface Publication {
  title: string;
  journal: string;
  year: number;
}

interface Patent {
  _id: string;
  type: string;
  patentNumber: string;
  title: string;
  appliedCountry: string;
  patentStatus: string;
  filedDate: string;
  publishedDate: string;
  grantedDate: string;
}

interface Faculty {
  _id: number;
  name: string;
  designation: string;
  department: string;
  description: string;
  email: string;
  contact: number;
  image: string | StaticImageData;
  joinDate: string;
  leaveDate: string;
  citationCount: number;
  impactFactor: number;
  publications: Publication[];
  patents: Patent[];
}

const Faculties = (): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [departments, setDepartments] = useState<string[]>([]);
  const [designations, setDesignations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleDepartmentChange = (newDepartments: string[]) => {
    setDepartments(newDepartments);
  };

  const handleDesignationChange = (newDesignations: string[]) => {
    setDesignations(newDesignations);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (departments.length > 0) {
      params.set("departments", departments.join(","));
    } else {
      params.delete("departments");
    }

    if (designations.length > 0) {
      params.set("designations", designations.join(","));
    } else {
      params.delete("designations");
    }

    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  }, [departments, designations, searchTerm, router, searchParams]);

  const faculties: Faculty[] = [
    {
      _id: 1,
      name: "Radhakrishnan Subramanian",
      designation: "Professor Emiritus",
      department: "School of Polymer Engineering",
      description:
        "Radhakrishnan Subramanian is a Professor Emiritus in the School of Polymer Engineering at MIT-WPU. He specializes in polymer chemistry and has published numerous papers in international journals.",
      email: "radhakrishnan.subramanian@gmail.com",
      contact: 6457291823,
      image: Fac1,
      joinDate: "01-02-2000",
      leaveDate: "01-02-2000",
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
      patents: [
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
        },
      ],
    },
    {
      _id: 2,
      name: "Bhanudas Shankarao Kuchekar",
      designation: "Professor",
      department: "School of Pharmacy",
      description:
        "Bhanudas Shankarao Kuchekar is a Professor Emiritus in the School of Polymer Engineering at MIT-WPU. He specializes in polymer chemistry and has published numerous papers in international journals.",
      email: "radhakrishnan.subramanian@gmail.com",
      contact: 6457291823,
      image: Fac2,
      joinDate: "01-02-2000",
      leaveDate: "01-02-2000",
      citationCount: 4,
      impactFactor: 8,
      publications: [
        {
          title:
            "Novel Treatment Strategies for Triple-Negative Breast Cancers: A Comprehensive Review",
          journal: "Hacettepe University, Faculty of Pharmacy",
          year: 2023,
        },
        {
          title:
            "Influence of Process Variables on Budesonide Nanoparticles Using Factorial Design",
          journal: "",
          year: 2021,
        },
        {
          title:
            "Design, synthesis, characterization and antioxidant activity of novel benzothiazole and coumarin based 6-(3, 5-dimethylpyrazol-1-yl) pyridazin-3-one derivatives",
          journal: "Research Journal of Pharmacy and Technology",
          year: 2020,
        },
      ],
      patents: [
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
        },
      ],
    },
    {
      _id: 3,
      name: "Swati Changdeo Jagdale",
      designation: "Professor",
      department: "School of Pharmacy",
      description:
        "Swati Changdeo Jagdale is a Professor Emiritus in the School of Polymer Engineering at MIT-WPU. He specializes in polymer chemistry and has published numerous papers in international journals.",
      email: "radhakrishnan.subramanian@gmail.com",
      contact: 6457291823,
      image: Fac1,
      joinDate: "01-02-2000",
      leaveDate: "01-02-2000",
      citationCount: 4,
      impactFactor: 8,
      publications: [
        {
          title:
            "Novel Treatment Strategies for Triple-Negative Breast Cancers: A Comprehensive Review",
          journal: "Hacettepe University, Faculty of Pharmacy",
          year: 2023,
        },
        {
          title:
            "Influence of Process Variables on Budesonide Nanoparticles Using Factorial Design",
          journal: "",
          year: 2021,
        },
        {
          title:
            "Design, synthesis, characterization and antioxidant activity of novel benzothiazole and coumarin based 6-(3, 5-dimethylpyrazol-1-yl) pyridazin-3-one derivatives",
          journal: "Research Journal of Pharmacy and Technology",
          year: 2020,
        },
      ],
      patents: [
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
        },
      ],
    },
    {
      _id: 4,
      name: "Bharat Sambhu Chaudhari",
      designation: "Dean",
      department: "School of Electronics & Communication Engineering",
      description:
        "Bharat Sambhu Chaudhari is a Professor Emiritus in the School of Polymer Engineering at MIT-WPU. He specializes in polymer chemistry and has published numerous papers in international journals.",
      email: "radhakrishnan.subramanian@gmail.com",
      contact: 6457291823,
      image: Fac2,
      joinDate: "01-02-2000",
      leaveDate: "01-02-2000",
      citationCount: 4,
      impactFactor: 8,
      publications: [
        {
          title:
            "Novel Treatment Strategies for Triple-Negative Breast Cancers: A Comprehensive Review",
          journal: "Hacettepe University, Faculty of Pharmacy",
          year: 2023,
        },
        {
          title:
            "Influence of Process Variables on Budesonide Nanoparticles Using Factorial Design",
          journal: "",
          year: 2021,
        },
        {
          title:
            "Design, synthesis, characterization and antioxidant activity of novel benzothiazole and coumarin based 6-(3, 5-dimethylpyrazol-1-yl) pyridazin-3-one derivatives",
          journal: "Research Journal of Pharmacy and Technology",
          year: 2020,
        },
      ],
      patents: [
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
        },
      ],
    },
  ];

  const filteredFaculties = faculties.filter((faculty) => {
    const departmentMatch =
      departments.length === 0 || departments.includes(faculty.department);
    const designationMatch =
      designations.length === 0 || designations.includes(faculty.designation);
    const searchMatch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return departmentMatch && designationMatch && searchMatch;
  });

  return (
    <div className="flex flex-col gap-y-5 w-full px-5 md:px-10 py-12 bg-slate-100">
      <div className="flex flex-col gap-y-5 bg-white p-3 rounded-md">
        <div className="grid grid-cols-2 gap-x-5 drop-shadow-sm">
          <div className="col-span-1 flex items-center gap-x-3">
            <SelectDepartment onDepartmentChange={handleDepartmentChange} />
          </div>

          <div className="col-span-1 flex items-center gap-x-3">
            <SelectDesignation onDesignationChange={handleDesignationChange} />
          </div>
        </div>
      </div>

      <div className="flex items-center h-14 gap-x-2 bg-white px-2 sm:px-3 rounded-mg w-full">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          className="flex w-full items-center justify-center font-sans font-medium text-matte-black"
          style={{ outline: "none", padding: "2px", fontSize: "15px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        id="profiles"
        className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-6 mt-5"
      >
        {filteredFaculties.map((faculty) => (
          <div
            key={faculty._id}
            className="col-span-1 h-full bg-white flex items-center justify-start rounded-md p-6 gap-x-6"
          >
            <Image
              className="w-28 h-28 rounded-full p-1 border-4 border-blue-400"
              src={faculty.image}
              alt="faculty-image"
            />
            <div className="flex flex-col gap-y-2">
              <div>
                <Link href={`/faculties/facultyDashboard/`}>
                  <h2 className="text-lg font-semibold text-navy-blue cursor-pointer hover:underline">
                    {faculty.name}
                  </h2>
                </Link>
                <p className="text-s ">{faculty.designation}</p>
              </div>
              <div>
                <p className=" text-m text-light-purple">
                  {faculty.department}
                </p>
                <p className="text-r">
                  {faculty.publications.length} Publications |{" "}
                  {faculty.patents.length} Patents
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculties;
