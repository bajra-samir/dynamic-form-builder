import { useState } from "react";

import Preview from "./preview";
import CodePreview from "./code-preview";
import { FormFieldType } from "../types/form";

interface TabSectionProps {
  fields: FormFieldType[];
}
type TabType = "preview" | "code";

const TabSection: React.FC<TabSectionProps> = ({ fields }) => {
  const [activeTab, setActiveTab] = useState<TabType>("preview");

  return (
    <div className="card preview-card">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("preview")}
          className={activeTab === "preview" ? "active" : ""}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={activeTab === "code" ? "active" : ""}
        >
          Code
        </button>
      </div>
      <div className="content">
        {activeTab === "preview" ? (
          <Preview fields={fields} />
        ) : (
          <CodePreview fields={fields} />
        )}
      </div>
    </div>
  );
};

export default TabSection;
