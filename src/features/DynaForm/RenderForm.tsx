import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EInputType,
  FieldConfig,
  RenderFormProps,
} from "@/types/formbuilder.types";
import { SubmitHandler, useForm } from "react-hook-form";

const RenderForm: React.FC<RenderFormProps> = ({ fieldsMasterConfig }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  return (
    <div className="w-full border rounded-md p-2">
      <h3 className="text-center text-2xl font-extrabold p-2">
        Your Custom Form - Preview
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto w-full max-w-sm"
      >
        <div className="flex flex-col">
          {fieldsMasterConfig.map((fieldObject) => (  
            <div className="mb-2" key={`rendered-${fieldObject.name}`}>
              <FormComponentsFactory fieldObject={fieldObject} />
            </div>
          ))}
        </div>
        <Button type="submit" className="w-full max-w-sm">
          Submit
        </Button>
      </form>
    </div>
  );
};

interface FormComponentsFactoryProps {
  fieldObject: FieldConfig;
}

const FormComponentsFactory = ({ fieldObject }: FormComponentsFactoryProps) => {
  switch (fieldObject.type) {
    case EInputType.Text:
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="ml-1">
            {fieldObject.label || "your-custom-label"}
          </Label>
          <Input
            type={EInputType.Text}
            id={`preview-id-${fieldObject.name}`}
            name={`preview-name-${fieldObject.name}`}
            placeholder={fieldObject.placeholder || "your-custom-placeholder"}
          />
        </div>
      );
    case EInputType.Email:
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="ml-1">
            {fieldObject.label || "your-custom-label"}
          </Label>
          <Input
            type={EInputType.Email}
            id={`preview-id-${fieldObject.name}`}
            name={`preview-name-${fieldObject.name}`}
            placeholder={fieldObject.placeholder || "your-custom-placeholder"}
          />
        </div>
      );
    case EInputType.Password:
      return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="ml-1">
            {fieldObject.label || "your-custom-label"}
          </Label>
          <Input
            type={EInputType.Password}
            id={`preview-id-${fieldObject.name}`}
            name={`preview-name-${fieldObject.name}`}
            placeholder={fieldObject.placeholder || "your-custom-placeholder"}
          />
        </div>
      );
  }
};

export default RenderForm;
