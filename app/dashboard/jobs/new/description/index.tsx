import React, { useState } from "react";
import { IStepProps } from "../page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

function Description({ setActiveState, setState, state }: IStepProps) {
  const { toast } = useToast();
  const [description, setDescription] = useState(state.description);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const handleGenerate = () => {
    if (description === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill the description field",
      });
      return;
    }

    // Call the AI to generate the description
    setLoading(true);
    axios
      .post("/api/chat", {
        message: `I want you to create a job announcement template for ${state.title} role/job, based on the follwing description: ${description}`,
      })
      .then((res) => {
        setLoading(false);
        setResponses((prev) => [...prev, ...res.data.response]);
        console.log(res.data);
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

  const handleNext = () => {};
  return (
    <div>
      <div>
        <label className="text-xs" htmlFor="">
          Description<sup className="text-red-500">*</sup>
        </label>
        <Textarea
          disabled={loading}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Try to describe the offer our AI will generate a full job description."
        />
      </div>
      <div className="text-center mt-3">
        <Button
          size={"sm"}
          className="bg-gray-800 inline-flex gap-2"
          onClick={() => handleGenerate()}
          disabled={loading}
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>
            {loading ? "Generating..." : "Generate Description with AI"}
          </span>
        </Button>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3">
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => setActiveState("Basic Info")}
        >
          Back
        </Button>
        <Button size={"sm"} onClick={() => handleNext()}>
          Next Step
        </Button>
      </div>
    </div>
  );
}

export default Description;
