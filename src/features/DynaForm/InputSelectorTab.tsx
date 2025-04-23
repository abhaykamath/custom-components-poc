// import { Button } from "@/components/ui/button";
// import { EInputType } from "@/types/formbuilder.types";

// const inputTypes = Object.values(EInputType);

// const InputSelectorTab = ({ fields, updateFields }: any) => {
//   return (
//     <div className="p-2 flex justify-center gap-2">
//       {inputTypes.map((type) => (
//         <Button
//           disabled={["radio", "checkbox"].includes(type)}
//           key={`field-button-${type}`}
//           variant={"outline"}
//           className="hover:cursor-pointer"
//           onClick={() => {
//             if (type === "text") {
//               updateFields({
//                 type: "text",
//                 label: "your-custom-label",
//                 name: `text-input-field-${fields.length + 1}`,
//                 placeholder: "your-custom-placeholder",
//                 defaultValue: "",
//                 required: false,
//                 maxLength: 20,
//                 minLength: 4,
//               });
//             } else
//               updateFields({
//                 type: type,
//                 name: `form-field-${fields.length + 1}`,
//               });
//           }}
//         >
//           {type}
//         </Button>
//       ))}
//     </div>
//   );
// };

// export default InputSelectorTab;

import { Button } from "@/components/ui/button";
import { EInputType, FieldConfig } from "@/types/formbuilder.types";

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
      id: `form-field-configurator-${fieldCount}-text`,
      type: EInputType.Text,
      label: "",
      name: `form-field-${fieldCount}-text`,
      placeholder: "",
      required: false,
    });
  };

  const onAddEmailClickHandler = () => {
    addFieldObject({
      id: `form-field-configurator-${fieldCount}-email`,
      type: EInputType.Email,
      label: "",
      name: `form-field-${fieldCount}-email`,
      placeholder: "",
      required: false,
    });
  };
  const onAddPasswordClickHandler = () => {
    addFieldObject({
      id: `form-field-configurator-${fieldCount}-password`,
      type: EInputType.Password,
      label: "",
      name: `form-field-${fieldCount}-password`,
      placeholder: "",
      required: false,
    });
  };

  return (
    <div className="flex justify-end">
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
