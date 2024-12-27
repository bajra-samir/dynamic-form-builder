import { useForm } from "react-hook-form";
import { FormFieldType } from "../types/form";

interface RenderFormElementProps {
  field: FormFieldType;
  register: ReturnType<typeof useForm>["register"];
  errors: ReturnType<typeof useForm>["formState"]["errors"];
}

import { Input, Select, TextArea } from "../ui/form";

export const renderFormElement = ({
  field,
  register,
  errors,
}: RenderFormElementProps) => {
  const { type, label, name, placeholder } = field;

  switch (field.type) {
    case "textarea":
      return (
        <TextArea
          label={label}
          placeholder={placeholder}
          register={register(name, { required: "required" })}
          error={errors[name]}
        />
      );

    case "select":
      return (
        <Select label={label} register={register(name)} error={errors[name]} />
      );

    default:
      return (
        <Input
          type={type}
          label={label}
          placeholder={placeholder}
          register={register(name)}
          error={errors?.[name]}
        />
      );
  }
};
