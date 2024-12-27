import Modal from "react-modal";
import React, { useState, useEffect } from "react";

import { FormFieldType } from "../types/form";

interface EditFieldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  field: FormFieldType | null;
  onSave: (updatedField: FormFieldType) => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80vh",
    width: "40%",
    borderRadius: "10px",
  },
  overlay: { backgroundColor: "rgb(0 0 0 / 70%)" },
};

export const EditFieldDialog: React.FC<EditFieldDialogProps> = ({
  isOpen,
  onClose,
  field,
  onSave,
}) => {
  const [editedField, setEditedField] = useState<FormFieldType | null>(null);

  useEffect(() => {
    setEditedField(field);
  }, [field]);

  const handleSave = () => {
    if (editedField) {
      onSave(editedField);
      onClose();
    }
  };

  if (!editedField) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Field Modal"
      ariaHideApp={false}
    >
      <div>
        <h3>Edit {editedField.label} Field</h3>
        <div>
          <div className="input-group">
            <label htmlFor="label">Label</label>
            <input
              name="label"
              value={editedField.label}
              className="form-control"
              onChange={(e) =>
                setEditedField({ ...editedField, label: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="placeholder">Placeholder</label>
            <input
              name="placeholder"
              value={editedField.placeholder}
              className="form-control"
              onChange={(e) =>
                setEditedField({ ...editedField, placeholder: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="label">Name</label>
            <input
              name="name"
              type={field?.name}
              value={editedField.name}
              className="form-control"
              onChange={(e) =>
                setEditedField({ ...editedField, name: e.target.value })
              }
            />
          </div>

          <button className="btn " onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
};
