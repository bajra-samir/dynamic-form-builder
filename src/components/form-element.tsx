import { useDraggable } from "@dnd-kit/core";

import { fieldTypes } from "./data/input-type";
import { FieldTypeOption } from "../types/form";

const FormElement = () => {
  return (
    <div className="card form-element">
      <h3>Form Element</h3>
      {fieldTypes.map((fieldType) => {
        return <DraggableElement key={fieldType.type} field={fieldType} />;
      })}
    </div>
  );
};

export const DraggableElement = ({ field }: { field: FieldTypeOption }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: field.type + new Date().toDateString(),
    data: {
      type: field.type,
      label: field.label,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, marginBottom: "8px" }}
      className="draggable-element"
    >
      {field.label}
    </div>
  );
};

export default FormElement;
