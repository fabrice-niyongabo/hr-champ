import React, { useState } from "react";
import { IStepProps } from "../page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

function Description({ setActiveState, setState, state }: IStepProps) {
  const { toast } = useToast();
  const [description, setDescription] = useState(state.description);
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
  };
  const handleNext = () => {};
  return (
    <div>
      <div>
        <label className="text-xs" htmlFor="">
          Description<sup className="text-red-500">*</sup>
        </label>
        <Textarea placeholder="Try to describe the offer our AI will generate a full job description." />
      </div>
      <div className="text-center mt-3">
        <Button
          size={"sm"}
          className="bg-gray-800"
          onClick={() => handleGenerate()}
        >
          Generate Description with AI
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
