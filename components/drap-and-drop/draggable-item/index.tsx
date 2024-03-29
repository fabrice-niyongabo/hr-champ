import { Button } from "@/components/ui/button";
import { IApplicationFormInputField } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Image from "next/image";
export const DraggableItem = ({
  item,
}: {
  item: IApplicationFormInputField;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md shadow-md py-2 px-5 flex items-center justify-between gap-3 touch-none"
    >
      <Image
        src={"/dots.png"}
        alt="move"
        width={20}
        height={30}
        className="h-[30px] w-[20px]"
      />
      <div className="flex-1 line-clamp-1" title={item.label}>
        {item.type} - {item.label}
      </div>
      <div className="flex items-center justify-between gap-2 border-l">
        <Button variant={"ghost"}>Edit</Button>
        <Button variant={"ghost"} className="text-red-500">
          Remove
        </Button>
      </div>
    </div>
  );
};
