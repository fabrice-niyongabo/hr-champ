import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { IApplicationFormInputField } from "@/types";
import { DraggableItem } from "../draggable-item";

export const DraggableColumns = ({
  items,
}: {
  items: IApplicationFormInputField[];
}) => {
  return (
    <div className="bg-[#f2f2f3] flex flex-col gap-3 p-5">
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </div>
  );
};
