import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EInputType,
  FieldConfig,
  RenderFormProps,
} from "@/types/formbuilder.types";
import { useEffect, useRef } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

const RenderForm: React.FC<RenderFormProps> = ({
  fieldsMasterConfig,
  lastRemoved,
  resetLastRemoved,
}) => {
  const methods = useForm();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  useEffect(() => {
    if (lastRemoved && lastRemoved !== "") {
      methods.unregister(lastRemoved);
      resetLastRemoved();
    }
  }, [lastRemoved]);

  return (
    <div className="w-full">
      <h3 className="text-center text-2xl font-extrabold p-4">
        Your Custom Form - Preview
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-3/4 m-auto"
        >
          <div className="flex flex-col gap-4">
            {fieldsMasterConfig.map((fieldObject) => (
              <div className="mb-2" key={`rendered-${fieldObject.id}`}>
                <FormComponentsFactory fieldObject={fieldObject} />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

interface FormComponentsFactoryProps {
  fieldObject: FieldConfig;
}

const FormComponentsFactory = ({ fieldObject }: FormComponentsFactoryProps) => {
  const inputProps = {
    ...useRegisterFieldName(fieldObject.name),
    id: `preview-id-${fieldObject.name}`,
    placeholder: fieldObject.placeholder || "your-custom-placeholder",
  };

  switch (fieldObject.type) {
    case EInputType.Text:
      return (
        <div className="grid w-full items-center gap-1.5">
          <Label className="ml-1">
            {fieldObject.label || "your-custom-label"}
          </Label>
          <Input type={EInputType.Text} {...inputProps} />
        </div>
      );
    case EInputType.Email:
      return (
        <div className="grid w-full items-center gap-1.5">
          <Label className="ml-1">
            {fieldObject.label || "your-custom-label"}
          </Label>
          <Input type={EInputType.Email} {...inputProps} />
        </div>
      );
    case EInputType.Password:
      return (
        <div className="grid w-full items-center gap-1.5">
          <Label className="ml-1">
            {fieldObject.label || "your-custom-label"}
          </Label>
          <Input type={EInputType.Password} {...inputProps} />
        </div>
      );
  }
};

function useRegisterFieldName(name: string) {
  const { register, unregister } = useFormContext();
  const prevNameRef = useRef<string | null>(null);

  useEffect(() => {
    const prevName = prevNameRef.current;

    if (prevName && prevName !== name) {
      unregister(prevName);
    }

    if (name && name.trim() !== "") {
      prevNameRef.current = name;
    } else {
      // if name is empty, reset ref so it doesn't try to unregister later
      prevNameRef.current = null;
    }
  }, [name, unregister]);

  // fallback: don't register if name is empty
  if (!name || name.trim() === "") {
    return { name: "", onChange: () => {}, onBlur: () => {}, ref: () => {} };
  }

  return register(name);
}

export default RenderForm;
