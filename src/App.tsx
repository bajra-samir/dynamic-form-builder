import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import TabSection from "./components/tab";
import FormCanvas from "./components/form-canvas";
import FormElement from "./components/form-element";

import { FormFieldType } from "./types/form";

import "./App.css";

function App() {
  const [data, setData] = useState<{ fields: FormFieldType[] }>({
    fields: [],
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    if (active.data.current && over.id === "form-canvas") {
      const type = active.data.current.type;
      const label = active.data.current.label;

      const newField: FormFieldType = {
        id: `${type}-${Date.now()}`,
        type,
        label,
        name: `${type}_${Date.now()}`,
      };

      setData((prev) => ({ ...prev, fields: [...prev.fields, newField] }));

      return;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <h1 className="title">Form Builder</h1>
        <div className="wrapper">
          <FormElement />
          <FormCanvas fields={data.fields} onSetData={setData} />
          <TabSection fields={data.fields} />
        </div>
      </div>
    </DndContext>
  );
}

export default App;
