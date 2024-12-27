export interface FieldTypeOption {
  type: string;
  label: string;
}

export interface FormFieldType {
  id: string;
  type: string;
  label: string;
  name: string;

  options?: string[];
  placeholder?: string;
  value?: string;
  required?: boolean;
  validation?: Record<string, unknown>;
  colIndex?: number;
}
