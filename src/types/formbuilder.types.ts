export enum EInputType {
  Text = "text",
  Checkbox = "checkbox",
  Email = "email",
  Number = "number",
  Password = "password",
  Radio = "radio",
}

export type TFormField = {
  type: EInputType;
  name: string;
};

export type TInputFactoryProps = {
  type: EInputType;
  register: any;
  field: any;
};

export type TFormProps = {
  fields: TFormField[];
};

export type TTextInputProps = {
  type: EInputType.Text;
  register: any;
  label: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  required: boolean;
  maxLength: number;
  minLength: number;
};

export type FieldConfig = {
  id: string;
  type: EInputType;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
};
export interface RenderFormProps {
  fieldsMasterConfig: FieldConfig[];
  lastRemoved: string;
  resetLastRemoved: () => void;
}
export interface InputConfiguratorFactoryProps {
  fieldObject: FieldConfig;
  inputType: EInputType;
  removeFieldObject: (id: string) => void;
  updateMasterConfig: (updateFieldObject: FieldConfig) => void;
}
