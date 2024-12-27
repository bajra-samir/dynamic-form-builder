import React from "react";
import { useForm } from "react-hook-form";

import { FormFieldType } from "../types/form";
import { renderFormElement } from "../helper/form";

interface PreviewProps {
  fields: FormFieldType[];
}

const Preview: React.FC<PreviewProps> = ({ fields }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Record<string, unknown>) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-preview">
      {fields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            {renderFormElement({ field, register, errors })}
          </React.Fragment>
        );
      })}
      <input type="submit" className="btn" />
    </form>
  );
};

export default Preview;
