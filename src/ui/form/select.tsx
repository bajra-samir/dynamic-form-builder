import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

import "../../assets/css/inputs.css";

interface SelectFieldProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn<string>;
  error:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    | undefined;
  options?: string[];
}

export const Select: React.FC<SelectFieldProps> = ({
  label,
  options,
  register,
  error,
}) => {
  return (
    <div className="input-group select-field">
      <label>{label}</label>
      <select className={`form-control ${error ? "error" : ""}`} {...register}>
        <option value="">Select...</option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
