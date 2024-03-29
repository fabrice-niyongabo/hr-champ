"use client";

import React, { useState } from "react";
import { IStepProps } from "../page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Send } from "lucide-react";
import Message from "./message";
import { IChat } from "@/types";
import AILoader from "./ai-loader";
import { Editor } from "react-draft-wysiwyg";
import Confirmation from "@/components/confirmation";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

interface IProps extends IStepProps {
  responses: IChat[];
  setResponses: any;
  editedDescription: string;
  setEditedDescription: any;
  editorState: EditorState;
  setEditorState: any;
}

function Description({
  setActiveState,
  setState,
  state,
  responses,
  setResponses,
  editedDescription,
  setEditedDescription,
  editorState,
  setEditorState,
}: IProps) {
  const { toast } = useToast();
  const [description, setDescription] = useState(state.description);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleGenerate = () => {
    if (description.trim().length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill the description field",
      });
      return;
    }

    // Call the AI to generate the description
    setLoading(true);
    //save user message
    setResponses((prev: any) => [
      ...prev,
      { role: "user", content: description },
    ]);
    axios
      .post("/api/chat", {
        message:
          responses.length === 0
            ? `I want you to create a professional job advert for ${state.title} role/job for the company ${state.companyName}, based on the following description: ${description}. Location is ${state.location}, job type is ${state.jobType}. Candidates can also apply through this platform by clicking on 'apply now' button.`
            : description,
      })
      .then((res) => {
        setLoading(false);
        setResponses((prev: any) => [...prev, res.data.response]);
        setDescription("");
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            err.message || "Something went wrong, please try again later",
        });
      });
  };

  const handleNext = () => {
    setActiveState("Required Fields");
  };

  const selectCallBack = () => {
    setEditedDescription(selectedDescription);

    const blocksFromHtml = htmlToDraft(selectedDescription);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  };

  return (
    <div>
      <div className="py-3">
        {editedDescription.trim().length === 0 ? (
          <>
            <Message
              type="assistant"
              message={"Let me know more details about " + state.title}
              index={0}
            />
            {responses.map((response, index) => (
              <Message
                key={index}
                index={index}
                type={response.role}
                message={response.content}
                setShowAlert={setShowAlert}
                setSelectedDescription={setSelectedDescription}
              />
            ))}
            {loading && <AILoader />}
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-3">Edit Job template</h3>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(editorState) => setEditorState(editorState)}
              editorStyle={{
                border: "1px solid #CCC",
                padding: "10px",
                fontSize: 12,
              }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  // "fontFamily",
                  "list",
                  "textAlign",
                  // "colorPicker",
                  "link",
                  // "embedded",
                  // "emoji",
                  "image",
                  // "remove",
                  "history",
                ],
              }}
            />
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mt-3 border-t pt-3">
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => setActiveState("Basic Info")}
          disabled={loading}
        >
          Back
        </Button>
        {editedDescription.trim().length === 0 && (
          <Textarea
            disabled={loading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Try to describe the offer, our AI will generate a full job description."
          />
        )}
        {editedDescription.trim().length > 5 ? (
          <Button size={"sm"} onClick={() => handleNext()}>
            Next Step
          </Button>
        ) : (
          <Button
            size={"sm"}
            onClick={() => handleGenerate()}
            disabled={loading}
            className="rounded-full"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Send size={24} />
            )}
          </Button>
        )}
      </div>
      <Confirmation
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        title="Do you still want to continue with this job template?"
        callBack={selectCallBack}
      />
    </div>
  );
}

export default Description;
