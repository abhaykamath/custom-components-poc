import { useState } from "react";
import RenderForm from "./RenderForm";
import { EInputType, FieldConfig } from "@/types/formbuilder.types";
import InputSelectorTab from "./InputSelectorTab";
import { produce } from "immer";
import InputConfiguratorFactory from "./Configurator/InputConfiguratorFactory";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { v4 as uuidv4 } from "uuid";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const initialMasterConfig: FieldConfig[] = [
  {
    id: uuidv4(),
    type: EInputType.Text,
    label: "",
    name: "random-name-1",
    placeholder: "",
    required: false,
  },
  {
    id: uuidv4(),
    type: EInputType.Text,
    label: "",
    name: "random-name-2",
    placeholder: "",
    required: false,
  },
];

const Component_DynaForm = () => {
  const [fieldsMasterConfig, setFieldsMasterConfig] =
    useState<FieldConfig[]>(initialMasterConfig);
  const [parent, enableAnimations] = useAutoAnimate();
  const [lastRemoved, setLastRemoved] = useState<string>("");

  const addFieldObject = (newFieldObject: FieldConfig) => {
    setFieldsMasterConfig((fieldsMasterConfig) => [
      ...fieldsMasterConfig,
      newFieldObject,
    ]);
  };

  const removeFieldObject = (id: string) => {
    setFieldsMasterConfig((fieldsMasterConfig) => {
      const removedFieldName = fieldsMasterConfig.find(
        (fieldObject) => fieldObject.id === id
      )?.name;

      if (removedFieldName) setLastRemoved(removedFieldName);
      return fieldsMasterConfig.filter((fieldObject) => fieldObject.id !== id);
    });
  };

  const resetLastRemoved = () => {
    setLastRemoved("");
  };

  const updateMasterConfig = (updatedFieldObject: FieldConfig) => {
    setFieldsMasterConfig(
      produce(fieldsMasterConfig, (draft) => {
        const index = draft.findIndex(
          (item) => item.id === updatedFieldObject.id
        );
        if (index !== -1) {
          draft[index] = updatedFieldObject;
        }
      })
    );
  };

  return (
    <div className="w-full h-dvh flex flex-col">
      <header className="">
        <h2 className="p-6 border-b text-center text-3xl font-extrabold">
          FormForge - A Dynamic Form Builder
        </h2>
      </header>
      <main className="w-full flex-1 flex">
        <section className="border-r w-[55%]">
          <InputSelectorTab
            addFieldObject={addFieldObject}
            fieldCount={fieldsMasterConfig.length + 1}
          />
          <DndContext
            collisionDetection={closestCenter}
            // onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <div ref={parent} className="w-full p-2 flex flex-col gap-2">
              {fieldsMasterConfig.map((fieldObject) => (
                <InputConfiguratorFactory
                  key={fieldObject.id}
                  fieldObject={fieldObject}
                  inputType={fieldObject.type}
                  removeFieldObject={removeFieldObject}
                  updateMasterConfig={updateMasterConfig}
                />
              ))}
            </div>
          </DndContext>
        </section>
        <section className="flex-1">
          <RenderForm
            fieldsMasterConfig={fieldsMasterConfig}
            lastRemoved={lastRemoved}
            resetLastRemoved={resetLastRemoved}
          />
        </section>
      </main>
    </div>
  );
};

export default Component_DynaForm;
