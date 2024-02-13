import React, { useState } from "react";
import { IStepProps } from "../page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Send } from "lucide-react";

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

  return (
    <div>
      <div>here</div>

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
        <Button size={"sm"} onClick={() => handleGenerate()} disabled={loading}>
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <Send size={24} />
        </Button>
      </div>
    </div>
  );
}

export default Description;
