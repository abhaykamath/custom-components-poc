import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldConfig } from "@/types/formbuilder.types";

import { Grip, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Password__InputConfiguratorProps {
  fieldObject: FieldConfig;
  removeFieldObject: (id: string) => void;
  updateMasterConfig: (updateFieldObject: FieldConfig) => void;
}

export const Password__InputConfigurator = ({
  fieldObject,
  removeFieldObject,
  updateMasterConfig,
}: Password__InputConfiguratorProps) => {
  const [config, setConfig] = useState({
    label: fieldObject.label || "",
    name: fieldObject.name || "",
    placeholder: fieldObject.placeholder || "",
    required: fieldObject.required || false,
  });

  useEffect(() => {
    updateMasterConfig({
      ...config,
      id: fieldObject.id,
      type: fieldObject.type,
    });
  }, [config]);

  return (
    <div className="flex border rounded-md">
      <div className="p-2 border-r flex flex-col justify-center hover:cursor-grab">
        <Grip />
      </div>
      <div>
        <div className="p-2 border-b text-sm bg-gray-100 flex justify-between items-start">
          <div className="text-md">Password Input - {config.name}</div>
          <Trash
            stroke="red"
            onClick={() => {
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
