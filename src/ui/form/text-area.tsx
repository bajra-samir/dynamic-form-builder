import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

import "../../assets/css/inputs.css";

interface TextAreaProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn<string>;
  error:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    | undefined;
}

export const TextArea = (props: TextAreaProps) => {
  const { label, register, error, ...rest } = props;

  return (
    <div className="input-group">
      <label>{label}</label>
      <textarea
        {...register}
        className={`form-control ${error ? "error" : ""}`}
        {...rest}
      />
      {error && <p className="error-message">{error.message as string}</p>}
    </div>
  );
};
