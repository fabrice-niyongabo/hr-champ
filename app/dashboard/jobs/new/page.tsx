"use client";

import PageHeader from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import BasicInfo from "./basic-info";
import Description from "./description";
import RequiredFields from "./required-fields";
import StepHeader from "@/components/step-header";

export interface IState {
  title: string;
  description: string;
  location: string;
  salary: string;
  jobType: string; // Full-time, Part-time, Contract, Internship
  companyName: string;
}

export interface IStepProps {
  state: IState;
  setState: any;
  setActiveState: any;
}

export type ActiveState = "Basic Info" | "Description" | "Required Fields";

const renderActiveState = (
  activeState: ActiveState,
  state: IState,
  setState: any,
  setActiveState: any
) => {
  switch (activeState) {
    case "Basic Info":
      return (
        <BasicInfo
          state={state}
          setState={setState}
          setActiveState={setActiveState}
        />
      );
    case "Description":
      return (
        <Description
          state={state}
          setState={setState}
          setActiveState={setActiveState}
        />
      );
    case "Required Fields":
      return (
        <RequiredFields
          state={state}
          setState={setState}
          setActiveState={setActiveState}
        />
      );
  }
};

const initialState: IState = {
  title: "",
  description: "",
  location: "",
  salary: "",
  jobType: "",
  companyName: "",
};

function NewJob() {
  const [activeState, setActiveState] = useState<ActiveState>("Basic Info");
  const [state, setState] = useState<IState>(initialState);

  const isBasicInfoCOmpleted = () =>
    state.title && state.location && state.companyName ? true : false;
  return (
    <div>
      <PageHeader title="Create Job Offer" />
      <Card className="mt-5">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between gap-2 mb-5 border-b pb-2">
            <StepHeader
              title="Basic Info"
              isCompleted={isBasicInfoCOmpleted()}
            />
            <StepHeader
              title="Description"
              isCompleted={state.description.length > 0}
            />
            <StepHeader title="Required Form Data" isCompleted={false} />
          </div>
          {renderActiveState(activeState, state, setState, setActiveState)}
        </CardContent>
      </Card>
    </div>
  );
}

export default NewJob;
