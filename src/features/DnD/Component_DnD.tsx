import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { TTodo } from "../../types/types";
import SortableItem from "./SortableItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialTodos = [
  { id: "todo-1", content: "Clean the shoes" },
  { id: "todo-2", content: "Buy milk" },
  { id: "todo-3", content: "Cook dinner" },
  { id: "todo-4", content: "Read the paper" },
  { id: "todo-5", content: "Charge the phone" },
];

const Component_DnD = () => {
  const [todos, setTodos] = useState<TTodo[]>(initialTodos);
  const [input, setInput] = useState("");

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setTodos((prev) => arrayMove(prev, oldIndex, newIndex));
      }
    },
    [todos]
  );

  const handleAddTodo = () => {
    if (!input.trim()) return;

    setTodos((todos) => [
      ...todos,
      { id: `todo-${todos.length + 1}`, content: input },
    ]);
    setInput("");
  };

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse todos from localStorage", err);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h3 className="text-xl p-2">Todos</h3>
      <div className="p-2 flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleAddTodo}>Add Todo</Button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={todos.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="p-2 flex flex-col gap-2">
            {todos.map((todo, index) => (
              <SortableItem
                key={todo.id}
                id={todo.id}
                todo={todo}
                index={index}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Component_DnD;
