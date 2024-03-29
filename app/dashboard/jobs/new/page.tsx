"use client";

import PageHeader from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import BasicInfo from "./basic-info";
import Description from "./description";
import RequiredFields from "./required-fields";
import StepHeader from "@/components/step-header";
import { IApplicationFormInputField, IChat } from "@/types";
import { EditorState } from "draft-js";

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
  setActiveState: any,
  responses: IChat[],
  setResponses: any,
  editedDescription: string,
  setEditedDescription: any,
  editorState: EditorState,
  setEditorState: any,
  applicationFormInputs: IApplicationFormInputField[],
  setApplicationFormInputs: any
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
          responses={responses}
          setResponses={setResponses}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      );
    case "Required Fields":
      return (
        <RequiredFields
          state={state}
          setState={setState}
          setActiveState={setActiveState}
          applicationFormInputs={applicationFormInputs}
          setApplicationFormInputs={setApplicationFormInputs}
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
  const [activeState, setActiveState] =
    useState<ActiveState>("Required Fields");
  const [state, setState] = useState<IState>(initialState);

  const [applicationFormInputs, setApplicationFormInputs] = useState<
    IApplicationFormInputField[]
  >([
    { id: "item-00", required: true, label: "test1", type: "checkbox" },
    { id: "item-01", required: true, label: "test2", type: "checkbox" },
    { id: "item-02", required: true, label: "test3", type: "text" },
  ]);

  const [responses, setResponses] = useState<IChat[]>([
    {
      content: `Job innovative team, then we want to hear from you! Click on the 'apply now' button to submit your application.`,
      role: "assistant",
    },
    {
      content: `Job Title: Senior Frontend Developer

  Company: Wanda
  
  Location: Kigali, Rwanda
  
  Job Type: Part-time
  
  Wanda is seeking a talented and experienced Senior Frontend Developer to join our dynamic team in Kigali, Rwanda. The ideal candidate will have at least 5 years of experience and be skilled in React, React Native, and Vue.js.
  
  Responsibilities:
  Develop frontend applications using React, React Native, and Vue.js
  Collaborate with the design and product teams to create user-friendly interfaces
  Optimize applications for maximum speed and scalability
  Stay up-to-date with the latest frontend technologies and best practices
  Requirements:
  - Minimum of 5 years of experience as a Frontend Developer
  - Proficiency in React, React Native, and Vue.js
  - Strong problem-solving skills and attention to detail
  - Excellent communication and teamwork skills
  
  If you are passionate about front-end development and want to be part of an innovative team, then we want to hear from you! Click on the 'apply now' button to submit your application.`,
      role: "assistant",
    },
  ]);
  const [editedDescription, setEditedDescription] = useState<string>("");

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const isBasicInfoCOmpleted = () =>
    state.title && state.location && state.companyName ? true : false;
  return (
    <div>
      <PageHeader
        title={`Create Job Offer ${
          state.title.trim() !== "" ? "- " + state.title : ""
        }`}
      />
      <Card className="mt-5">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between gap-2 mb-5 border-b pb-2">
            <StepHeader
              title="Basic Info"
              isCompleted={isBasicInfoCOmpleted()}
            />
            <StepHeader
              title="Description"
              isCompleted={editedDescription.length > 0}
            />
            <StepHeader title="Required Form Data" isCompleted={false} />
          </div>
          {renderActiveState(
            activeState,
            state,
            setState,
            setActiveState,
            responses,
            setResponses,
            editedDescription,
            setEditedDescription,
            editorState,
            setEditorState,
            applicationFormInputs,
            setApplicationFormInputs
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default NewJob;
