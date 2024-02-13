import { cn } from "@/lib/utils";
import { CheckCircle, CircleDashed } from "lucide-react";
import React from "react";
interface Props {
  title: string;
  isCompleted: boolean;
}
function StepHeader({ title, isCompleted }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 font-semibold",
        isCompleted && "text-blue-600"
      )}
    >
      <div>
        {isCompleted ? <CheckCircle size={20} /> : <CircleDashed size={20} />}
      </div>
      <p>{title}</p>
    </div>
  );
}

export default StepHeader;
