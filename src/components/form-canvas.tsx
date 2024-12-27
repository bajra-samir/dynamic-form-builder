import { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import FormFieldList from "./form-field-list";
import { FormFieldType } from "../types/form";
import { EditFieldDialog } from "./edit-field-dialog";

interface FormCanvasProps {
  fields: FormFieldType[];
  onSetData: (
    value: React.SetStateAction<{
      fields: FormFieldType[];
    }>
  ) => void;
}

const FormCanvas = ({ fields, onSetData }: FormCanvasProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "form-canvas",
  });

  const [selectedField, setSelectedField] = useState<FormFieldType | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const style = {
    outline: isOver ? "2px solid rgba(60, 165, 244, 0.4)" : undefined,
  };

  const onDeleteField = (id: string) => {
    const newFields = fields.filter((field) => field.id !== id);

    onSetData((prev) => ({ ...prev, fields: newFields }));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (over.id !== "form-canvas") {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onSetData((prev) => ({
          ...prev,
          fields: arrayMove(prev.fields, oldIndex, newIndex),
        }));
      }
    }
  };

  const openEditDialog = (field: FormFieldType) => {
    setSelectedField(field);
    setIsDialogOpen(true);
  };

  const updateFormField = (updates: Partial<FormFieldType>) => {
    const updatedFields = fields.map((field) => {
      if (field.id === selectedField?.id) {
        return { ...field, ...updates };
      }
      return field;
    });
    onSetData((prev) => ({ ...prev, fields: updatedFields }));
  };

  const handleSaveField = (updatedField: FormFieldType) => {
    if (selectedField) {
      updateFormField(updatedField);
    }
    setIsDialogOpen(false);
  };

  return (
    <div ref={setNodeRef} className="card form-canvas" style={style}>
      <h3>Form Canvas</h3>

      <DndContext
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
      >
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => {
            return (
              <FormFieldList
                key={index}
                field={field}
                onDeleteField={onDeleteField}
                openEditDialog={openEditDialog}
              />
            );
          })}
        </SortableContext>
      </DndContext>

      <EditFieldDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        field={selectedField}
        onSave={handleSaveField}
      />
    </div>
  );
};

export default FormCanvas;
