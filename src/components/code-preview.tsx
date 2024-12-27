import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

import { FormFieldType } from "../types/form";

interface PreviewProps {
  fields: FormFieldType[];
}

const CodePreview: React.FC<PreviewProps> = ({ fields }) => {
  const generateForm = () => {
    const imports = `import React from "react";
import { useForm } from "react-hook-form";
`;

    const component = `const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-preview">
      ${fields
        .map((field) => {
          return generateCodeSnippet(field);
        })
        .join("\n\n      ")}
      <input type="submit" />
    </form>
  );
};

export default Form;`;

    return `${imports}\n${component}`;
  };

  return (
    <>
      <SyntaxHighlighter language="typescript" showLineNumbers>
        {generateForm()}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language="css"
        showLineNumbers
        customStyle={{ marginTop: "14px" }}
      >
        {css}
      </SyntaxHighlighter>
    </>
  );
};

export default CodePreview;

const generateCodeSnippet = (field: FormFieldType) => {
  const { type, label, name, placeholder } = field;

  switch (field.type) {
    case "textarea":
      return `<div className="input-group">
        <label>${label}</label>
        <textarea
          {...register("${field.name}")}
          className="form-control"
          placeholder="${placeholder || ""}"
        />
        {errors.${name} && <p className="error-message">{errors.${name}.message}</p>}
      </div>`;

    case "select":
      return `<div className="input-group select-field">
        <label>${label}</label>
        <select className="form-control" {...register("${field.name}")}>
         <option value="">Select...</option>
          ${
            field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            )) || ""
          }
        </select>
    </div>`;

    default:
      return `<div className="input-group">
        <label>${label}</label>
        <input
          type="${type}"
          {...register("${field.name}")}
          className="form-control"
          placeholder="${placeholder || ""}"
        />
        {errors.${name} && <p className="error-message">{errors.${name}.message}</p>}
      </div>`;
  }
};

const css = `.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.input-group .form-control {
  outline: none;
  border: 1px solid #d4d4d4;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 16px;
}

.input-group .form-control:focus {
  border: 1px solid gray;
}

.input-group .error {
  border: 1px solid rgb(226, 25, 25);
}

.error-message {
  color: rgb(226, 25, 25);
  font-size: 14px;
}

.form-preview input[type="submit"] {
  padding: 8px 12px;
  border: none;
  float: right;
  background-color: #2563eb;
  color: white;
  border-radius: 5px;
  margin-top: 16px;
  cursor: pointer;
}

.form-preview input[type="submit"]:hover {
  background-color: #0849d6;
}
`;
