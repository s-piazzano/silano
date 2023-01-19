import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function Collapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col py-4 cursor-pointer">
      <div
        className="w-full flex justify-between items-center text-stone-600 font-normal capitalize"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="">{title}</h2>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6" />
        ) : (
          <ChevronDownIcon className="w-6 h-6" />
        )}
      </div>
      {isOpen && <div className="w-full mt-2">{children}</div>}
    </div>
  );
}
