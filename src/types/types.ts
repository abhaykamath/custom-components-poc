export type TTodo = {
  id: string;
  content: string;
};

export type SortableItemProps = {
  id: string;
  todo: TTodo;
  index: number
};

export type DraggableProps = {
  id: string;
  children?: React.ReactNode;
};
