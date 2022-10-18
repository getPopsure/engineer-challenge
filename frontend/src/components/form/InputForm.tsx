import { Input } from "@popsure/dirty-swan";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

const InputForm = <T extends FieldValues>({
  label,
  withWrapper,
  placeholder,
  ...controllerProps
}: UseControllerProps<T> & {
  label: string;
  placeholder?: string;
  withWrapper?: boolean;
}) => {
  const { field, fieldState } = useController(controllerProps);

  const isErrored =
    fieldState.isTouched && fieldState.isDirty && fieldState.invalid;

  return (
    <div className={withWrapper ? "flex justify-start py-6" : "flex"}>
      <Input
        className="wmx5 mt8"
        placeholder={placeholder}
        defaultValue={field.value}
        error={isErrored ? "This field is required" : undefined}
        {...field}
      />
    </div>
  );
};

export { InputForm };
