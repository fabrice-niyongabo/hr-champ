import { useState } from "react";
import { IStepProps } from "../page";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddInputField from "./add-input-field";
import { IApplicationFormInputField } from "@/types";
import { DraggableColumns } from "@/components/drap-and-drop/draggable-columns";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

interface Iprops extends IStepProps {
  applicationFormInputs: IApplicationFormInputField[];
  setApplicationFormInputs: any;
}

function RequiredFields({
  applicationFormInputs,
  setApplicationFormInputs,
}: Iprops) {
  const [showDialog, setShowDialog] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setApplicationFormInputs((inputs: IApplicationFormInputField[]) => {
      const originalPos = getInputPos(active.id);
      const newPos = getInputPos(over.id);

      return arrayMove(inputs, originalPos, newPos);
    });
  };

  const getInputPos = (id: string) =>
    applicationFormInputs.findIndex((input) => input.id === id);

  console.log({ applicationFormInputs });

  return (
    <div>
      <div className="border p-5 rounded-md">
        <h3 className="font-semibold text-lg">Applicantion form fields</h3>
        <div className="mt-2">
          <div className="border p-2 mb-2">
            <p className="text-xs">Applicant's Name</p>
          </div>
          <div className="border p-2 mb-2">
            <p className="text-xs">Applicant's email address</p>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <DraggableColumns items={applicationFormInputs} />
          </DndContext>
        </div>
      </div>
      <Button size={"sm"} className="mt-2" onClick={() => setShowDialog(true)}>
        <Plus /> Add Input Field
      </Button>

      <AddInputField
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        setApplicationFormInputs={setApplicationFormInputs}
        applicationFormInputs={applicationFormInputs}
      />
    </div>
  );
}

export default RequiredFields;
