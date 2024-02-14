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

interface IProps extends IStepProps {
  responses: IChat[];
  setResponses: any;
}

function Description({
  setActiveState,
  setState,
  state,
  responses,
  setResponses,
}: IProps) {
  const { toast } = useToast();
  const [description, setDescription] = useState(state.description);
  const [loading, setLoading] = useState(false);
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
            ? `I want you to create a professional job advert for ${state.title} role/job, based on the following description: ${description}`
            : description,
      })
      .then((res) => {
        setLoading(false);
        setResponses((prev: any) => [...prev, res.data.response]);
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

  return (
    <div>
      <div className="py-3">
        <Message
          type="assistant"
          message={"Let me know more details about " + state.title}
        />
        {responses.map((response, index) => (
          <Message
            key={index}
            type={response.role}
            message={response.content}
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
        <Textarea
          disabled={loading}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Try to describe the offer, our AI will generate a full job description."
        />
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
      </div>
    </div>
  );
}

export default Description;
