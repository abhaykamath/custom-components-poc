import { Button } from "@/components/ui/button";
import { EInputType, FieldConfig } from "@/types/formbuilder.types";
import { v4 as uuidv4 } from "uuid";

interface InputSelectorTabProps {
  addFieldObject: (newFieldObject: FieldConfig) => void;
  fieldCount: number;
}

const InputSelectorTab = ({
  addFieldObject,
  fieldCount,
}: InputSelectorTabProps) => {
  const onAddTextClickHandler = () => {
    addFieldObject({
      id: uuidv4(),
      type: EInputType.Text,
      label: "",
      name: `form-field-${fieldCount}-text`,
      placeholder: "",
      required: false,
    });
  };

  const onAddEmailClickHandler = () => {
    addFieldObject({
      id: uuidv4(),
      type: EInputType.Email,
      label: "",
      name: `form-field-${fieldCount}-email`,
      placeholder: "",
      required: false,
    });
  };

  const onAddPasswordClickHandler = () => {
    addFieldObject({
      id: uuidv4(),
      type: EInputType.Password,
      label: "",
      name: `form-field-${fieldCount}-password`,
      placeholder: "",
      required: false,
    });
  };

  return (
    <div className="p-2 flex gap-2 border-b">
      <Button
        variant={"outline"}
        className="hover:cursor-pointer"
        onClick={onAddTextClickHandler}
      >
        Text Input
      </Button>
      <Button
        variant={"outline"}
        className="hover:cursor-pointer"
        onClick={onAddEmailClickHandler}
      >
        Email Input
      </Button>
      <Button
        variant={"outline"}
        className="hover:cursor-pointer"
        onClick={onAddPasswordClickHandler}
      >
        Password Input
      </Button>
    </div>
  );
};

export default InputSelectorTab;
