import { useState } from "react";
import RenderForm from "./RenderForm";
import { EInputType, FieldConfig } from "@/types/formbuilder.types";
import InputSelectorTab from "./InputSelectorTab";
import { produce } from "immer";
import InputConfiguratorFactory from "./Configurator/InputConfiguratorFactory";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const initialMasterConfig: FieldConfig[] = [
  {
    id: "random-id-1",
    type: EInputType.Text,
    label: "",
    name: "random-name-1",
    placeholder: "",
    required: false,
  },
  {
    id: "random-id-2",
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

  const addFieldObject = (newFieldObject: FieldConfig) => {
    setFieldsMasterConfig((fieldsMasterConfig) => [
      ...fieldsMasterConfig,
      newFieldObject,
    ]);
  };

  const removeFieldObject = (id: string) => {
    setFieldsMasterConfig((fieldsMasterConfig) =>
      fieldsMasterConfig.filter((fieldObject) => fieldObject.id !== id)
    );
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
    <div className="w-full max-w-3xl m-auto">
      <header className="mb-2">
        <h2 className="text-center text-3xl font-extrabold">
          Dynamic Form Builder
        </h2>
      </header>
      <div>
        <InputSelectorTab
          addFieldObject={addFieldObject}
          fieldCount={fieldsMasterConfig.length + 1}
        />
        <div ref={parent} className="flex flex-col">
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
        <RenderForm fieldsMasterConfig={fieldsMasterConfig} />
      </div>
    </div>
  );
};

export default Component_DynaForm;
