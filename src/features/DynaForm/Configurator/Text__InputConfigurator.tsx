import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldConfig } from "@/types/formbuilder.types";

import { Grip, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Text__InputConfiguratorProps {
  fieldObject: FieldConfig;
  removeFieldObject: (id: string) => void;
  updateMasterConfig: (updateFieldObject: FieldConfig) => void;
}

export const Text__InputConfigurator = ({
  fieldObject,
  removeFieldObject,
  updateMasterConfig,
}: Text__InputConfiguratorProps) => {
  const [config, setConfig] = useState({
    label: fieldObject.label || "",
    name: fieldObject.name || "",
    placeholder: fieldObject.placeholder || "",
    required: fieldObject.required || false,
  });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: fieldObject.id,
  });

  useEffect(() => {
    updateMasterConfig({
      ...config,
      id: fieldObject.id,
      type: fieldObject.type,
    });
  }, [config]);

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="w-full flex border rounded-md"
    >
      <div className="p-2 bg-background border-r flex flex-col justify-center hover:cursor-grab rounded-tl-md rounded-bl-md">
        <Grip />
      </div>
      <div className="flex-1 bg-background rounded-tr-md rounded-br-md">
        <div className="p-2 border-b text-sm bg-background flex justify-between items-start rounded-tr-md">
          <div className="text-md">Text Input - {config.name}</div>
          {/* Delete a configurator*/}
          <Trash
            stroke="red"
            onClick={() => {
              console.log('clicked')
              removeFieldObject(fieldObject.id);
            }}
          />
        </div>
        <div className="flex gap-2 p-2">
          {/* Input Label */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>label</Label>
            <Input
              type="text"
              placeholder="set-custom-label"
              value={config.label}
              onChange={(e) => {
                setConfig((oldConfig) => ({
                  ...oldConfig,
                  label: e.target.value,
                }));
              }}
            />
          </div>
          {/* Input Name  */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>
              name<span className="text-muted-foreground">(required)</span>
            </Label>
            <Input
              required
              type="text"
              placeholder="set-custom-name"
              value={config.name}
              onChange={(e) =>
                setConfig((oldConfig) => ({
                  ...oldConfig,
                  name: e.target.value,
                }))
              }
            />
          </div>
          {/* Input Placeholder  */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>placeholder</Label>
            <Input
              type="text"
              placeholder="set-custom-placeholder"
              value={config.placeholder}
              onChange={(e) =>
                setConfig((oldConfig) => ({
                  ...oldConfig,
                  placeholder: e.target.value,
                }))
              }
            />
          </div>
          {/* Required Check  */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={config.required}
              onCheckedChange={(e) =>
                setConfig((oldConfig) => ({
                  ...oldConfig,
                  required: e === true,
                }))
              }
            />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              set required
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
