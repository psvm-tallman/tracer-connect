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

interface SelectDesignationProps {
  onDesignationChange: (department: string[]) => void;
}

const SelectDesignation = ({ onDesignationChange }: SelectDesignationProps) => {
  const [value, setValue] = useState<string[]>([]);
  
  const uniqueDesignations = Array.from(
    new Set(faculties.map((faculty) => faculty.designation))
  );

  const handleValuesChange = (newValues: string[]) => {
    setValue(newValues);
    onDesignationChange(newValues);
  };

  return (
    <MultiSelector values={value} onValuesChange={handleValuesChange} loop={false}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select Designation" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {uniqueDesignations.map((designation, index) => (
            <MultiSelectorItem key={index} value={designation}>
              {designation}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default SelectDesignation;