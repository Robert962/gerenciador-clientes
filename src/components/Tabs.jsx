import { useState } from "react";

function Tabs({ tabs, children, setActiveTab }) {
  const [active, setActive] = useState(0);
  const handleTab = (idx) => {
    setActive(idx);
    if (setActiveTab) setActiveTab(idx);
  };
  return (
    <div className="mb-6">
      <div className="flex gap-2 justify-center mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => handleTab(idx)}
            className={`px-4 py-2 rounded-t-lg font-bold transition border-b-2 ${
              active === idx
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-blue-100 text-blue-700 border-transparent hover:bg-blue-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  );
}
export default Tabs;
