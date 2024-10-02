"use client";
import React, { FC, useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format, setYear, setMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

interface DatePickerProps {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  fromDate?: Date;
  placeholder?: string;
  toDate?: Date;
}

const DatePicker: FC<DatePickerProps> = ({
  onChange,
  value = undefined,
  fromDate = undefined,
  placeholder = "Select date range",
  toDate = undefined,
}) => {
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState<Date>(new Date());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<DateRange | undefined>(
    value
  );

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleYearChange = (newYear: string, type: "start" | "end") => {
    const yearValue = parseInt(newYear, 10);
    if (type === "start") {
      setStartYear(yearValue);
      setStartMonth(setYear(startMonth, yearValue));
    } else {
      setEndYear(yearValue);
      setEndMonth(setYear(endMonth, yearValue));
    }
  };

  const handleMonthChange = (newMonth: string, type: "start" | "end") => {
    const monthValue = parseInt(newMonth, 10);
    if (type === "start") {
      setStartMonth(setMonth(startMonth, monthValue));
    } else {
      setEndMonth(setMonth(endMonth, monthValue));
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      const newValue = { from: date, to: internalValue?.to };
      setInternalValue(newValue);
      onChange(newValue);
      console.log("Start Date:", format(date, "yyyy-MM-dd"));
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && internalValue?.from) {
      const newValue = { from: internalValue.from, to: date };
      setInternalValue(newValue);
      onChange(newValue);
      console.log("End Date:", format(date, "yyyy-MM-dd"));
      setOpen(false);
    }
  };

  const formatDateValue = (val: DateRange | undefined): string => {
    if (!val) return "";
    const { from, to } = val;
    if (from && to) {
      return `${format(from, "PPP")} - ${format(to, "PPP")}`;
    }
    return from ? format(from, "PPP") : "";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal py-2 h-[38px]",
            !value && "text-muted-foreground"
          )}
          onClick={() => setOpen(!open)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            formatDateValue(value)
          ) : (
            <p className="text-[13px]">{placeholder}</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-4" align="start">
        <div className="flex gap-4">
          {/* Start Calendar */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 mb-2">
              <Select
                onValueChange={(val) => handleYearChange(val, "start")}
                value={startYear.toString()}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select start year" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {Array.from({ length: 200 }, (_, i) => 2099 - i).map(
                      (y) => (
                        <SelectItem
                          key={y}
                          value={y.toString()}
                          className="py-1"
                        >
                          {y}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => handleMonthChange(val, "start")}
                value={startMonth.getMonth().toString()}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select start month" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()} className="py-1">
                        {format(new Date(2000, i, 1), "MMM")}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Calendar
              fromDate={fromDate}
              toDate={toDate}
              mode="single"
              month={startMonth}
              onMonthChange={setStartMonth}
              selected={internalValue?.from}
              onSelect={handleStartDateSelect}
              initialFocus
            />
          </div>

          {/* End Calendar */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 mb-2">
              <Select
                onValueChange={(val) => handleYearChange(val, "end")}
                value={endYear.toString()}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select end year" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {Array.from({ length: 200 }, (_, i) => 2099 - i).map(
                      (y) => (
                        <SelectItem
                          key={y}
                          value={y.toString()}
                          className="py-1"
                        >
                          {y}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => handleMonthChange(val, "end")}
                value={endMonth.getMonth().toString()}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select end month" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectGroup>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()} className="py-1">
                        {format(new Date(2000, i, 1), "MMM")}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Calendar
              fromDate={internalValue?.from || fromDate}
              toDate={toDate}
              mode="single"
              month={endMonth}
              onMonthChange={setEndMonth}
              selected={internalValue?.to}
              onSelect={handleEndDateSelect}
              initialFocus
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
