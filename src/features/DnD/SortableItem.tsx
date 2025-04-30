import { useSortable } from "@dnd-kit/sortable";
import { SortableItemProps } from "../../types/types";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, todo, index }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
    willChange: "transform",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 bg-background border rounded shadow-sm"
    >
      {index + 1 + ". " + todo.content}
    </div>
  );
};

export default SortableItem;
