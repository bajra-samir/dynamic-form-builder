import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import {
  faGear,
  faGripVertical,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FormFieldType } from "../types/form";

interface FormFieldListProps {
  field: FormFieldType;
  onDeleteField: (id: string) => void;
  openEditDialog: (field: FormFieldType) => void;
}

const FormFieldList = ({
  field,
  onDeleteField,
  openEditDialog,
}: FormFieldListProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    backgroundColor: isDragging ? "#d4d4d4" : "transparent",
  };

  const handleDelete = (id: string) => {
    onDeleteField(id);
  };

  return (
    <div className="form-canvas-wrapper">
      <div
        className="move-element"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      <div className="box" style={style}>
        {field.label}
        <div className="action-btn">
          <button onClick={() => openEditDialog(field)}>
            <FontAwesomeIcon icon={faGear} height={14} width={14} />
          </button>
          <button onClick={() => handleDelete(field.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormFieldList;
