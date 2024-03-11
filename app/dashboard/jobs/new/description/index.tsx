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
import Confirmation from "@/components/confirmation";

interface IProps extends IStepProps {
  responses: IChat[];
  setResponses: any;
  editedDescription: string;
  setEditedDescription: any;
}

function Description({
  setActiveState,
  setState,
  state,
  responses,
  setResponses,
  editedDescription,
  setEditedDescription,
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
            ? `I want you to create a professional job advert for ${state.title} role/job for the company ${state.companyName}, based on the following description: ${description}. Location is ${state.location}. Candidates can also apply through this platform by clicking on 'apply now' button.`
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

  return (
    <div>
      <div className="py-3">
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
        {editedDescription.trim().length > 5 && (
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
        title="Do you still want to continue with this operation?"
        callBack={() => {
          setEditedDescription(selectedDescription);
        }}
      />
    </div>
  );
}

export default Description;
