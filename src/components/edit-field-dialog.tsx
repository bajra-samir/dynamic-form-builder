import Modal from "react-modal";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

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

          {renderSettingsField({ editedField, setEditedField })}

          <button className="btn " onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

interface RenderSettingsFieldProps {
  editedField: FormFieldType;
  setEditedField: React.Dispatch<React.SetStateAction<FormFieldType | null>>;
}

const renderSettingsField: React.FC<RenderSettingsFieldProps> = ({
  editedField,
  setEditedField,
}) => {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(editedField.options || [])];
    updatedOptions[index] = value;
    setEditedField({ ...editedField, options: updatedOptions });
  };

  const handleAddOption = () => {
    setEditedField({
      ...editedField,
      options: [...(editedField.options || []), ""],
    });
  };

  const handleRemoveOption = (index: number) => {
    if (editedField.options === undefined) return;

    const updatedOptions = editedField.options.filter((_, i) => i !== index);
    setEditedField({ ...editedField, options: updatedOptions });
  };

  switch (editedField.type) {
    case "select": {
      const options = editedField.options || [""];

      return (
        <div className="input-group">
          <label htmlFor="options">Options</label>
          <div>
            {options.map((option, index) => (
              <div key={index} className="input-group edit-options">
                <input
                  id={`option-${index}`}
                  type="text"
                  name={`option-${index}`}
                  value={option}
                  className="form-control"
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="minus-btn"
                  onClick={() => handleRemoveOption(index)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="plus-btn"
              onClick={handleAddOption}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
