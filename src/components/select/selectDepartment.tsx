"use client";
import { useState } from "react";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multi-select";

interface Faculty {
  designation: string;
  department: string;
}

const faculties: Faculty[] = [
  {
    designation: "Professor Emiritus",
    department: "Department of Computer Science & Engineering Technology",
  },
  {
    designation: "Professor ",
    department: "Department of Electrical Engineering Technology",
  },
  {
    designation: "Assistant",
    department: "Department of Mechanical Engineering Technology",
  },
  {
    designation: "Dean",
    department: "School of Polymer Engineering",
  },
  {
    designation: "Professor Emiritus",
    department: "School of Polymer Engineering",
  },
  {
    designation: "Professor Emiritus",
    department: "School of Polymer Engineering",
  },
];

interface SelectDepartmentProps {
  onDepartmentChange: (department: string[]) => void;
}

const SelectDepartment = ({ onDepartmentChange }: SelectDepartmentProps) => {
  const [value, setValue] = useState<string[]>([]);
  
  const uniqueDepartments = Array.from(
    new Set(faculties.map((faculty) => faculty.department))
  );

  const handleValuesChange = (newValues: string[]) => {
    setValue(newValues);
    onDepartmentChange(newValues);
  };

  return (
    <MultiSelector values={value} onValuesChange={handleValuesChange} loop={false}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select Department" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {uniqueDepartments.map((department, index) => (
            <MultiSelectorItem key={index} value={department}>
              {department}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default SelectDepartment;