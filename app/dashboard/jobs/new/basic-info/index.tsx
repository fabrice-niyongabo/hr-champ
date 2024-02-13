import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IStepProps } from "../page";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";

function BasicInfo({ setActiveState, setState, state }: IStepProps) {
  const { toast } = useToast();
  const [stepState, setStepState] = useState<{
    title: string;
    location: string;
    salary: string;
    jobType: string;
    companyName: string;
  }>({
    title: state.title,
    location: state.location,
    salary: state.salary,
    jobType: state.jobType,
    companyName: state.companyName,
  });

  const handleNext = () => {
    if (
      stepState.title === "" ||
      stepState.location === "" ||
      stepState.jobType === "" ||
      stepState.companyName === ""
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all the required fields",
      });
      return;
    }

    setState((prev: any) => ({ ...prev, ...stepState }));
    setActiveState("Description");
  };
  return (
    <div className="flex flex-col gap-3 mb-5">
      <div>
        <label className="text-xs" htmlFor="">
          Job Title<sup className="text-red-500">*</sup>
        </label>
        <Input
          placeholder="Job title"
          value={stepState.title}
          onChange={(e: any) => {
            setState((prev: any) => ({ ...prev, title: e.target.value }));
            setStepState((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>
      <div>
        <label className="text-xs" htmlFor="">
          Job Location<sup className="text-red-500">*</sup>
        </label>
        <Input
          placeholder="Job location"
          value={stepState.location}
          onChange={(e: any) =>
            setStepState((prev) => ({ ...prev, location: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="text-xs" htmlFor="">
          Job Type<sup className="text-red-500">*</sup>
        </label>
        <Select
          value={stepState.jobType}
          onValueChange={(e: any) =>
            setStepState((prev) => ({ ...prev, jobType: e }))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose Job Type" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-xs" htmlFor="">
          Company Name<sup className="text-red-500">*</sup>
        </label>
        <Input
          placeholder="Company Name"
          value={stepState.companyName}
          onChange={(e: any) =>
            setStepState((prev) => ({ ...prev, companyName: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="text-xs" htmlFor="">
          Company Name (Optional)
        </label>
        <Input
          placeholder="ex: 500 USD"
          value={stepState.salary}
          onChange={(e: any) =>
            setStepState((prev) => ({ ...prev, salary: e.target.value }))
          }
        />
      </div>

      <div className="flex items-center justify-end gap-2 mt-3">
        <Button size={"sm"} variant={"outline"} disabled>
          Back
        </Button>
        <Button size={"sm"} onClick={() => handleNext()}>
          Next Step
        </Button>
      </div>
    </div>
  );
}

export default BasicInfo;
