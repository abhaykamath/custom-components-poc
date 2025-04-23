import { InputConfiguratorFactoryProps } from "@/types/formbuilder.types";
import { Text__InputConfigurator } from "./Text__InputConfigurator";
import { Email__InputConfigurator } from "./Email__InputConfigurator";
import { Password__InputConfigurator } from "./Password_InputConfigurator";

const InputConfiguratorFactory = ({
  fieldObject,
  inputType,
  removeFieldObject,
  updateMasterConfig,
}: InputConfiguratorFactoryProps) => {
  switch (inputType) {
    case "text":
      return (
        <Text__InputConfigurator
          fieldObject={fieldObject}
          removeFieldObject={removeFieldObject}
          updateMasterConfig={updateMasterConfig}
        />
      );
    case "email":
      return (
        <Email__InputConfigurator
          fieldObject={fieldObject}
          removeFieldObject={removeFieldObject}
          updateMasterConfig={updateMasterConfig}
        />
      );
    case "password":
      return (
        <Password__InputConfigurator
          fieldObject={fieldObject}
          removeFieldObject={removeFieldObject}
          updateMasterConfig={updateMasterConfig}
        />
      );
  }
};

export default InputConfiguratorFactory;
