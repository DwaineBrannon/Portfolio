'use client';
import { useState } from 'react';

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 text-left font-medium"
      >
        <span>{title}</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}

export default function ProjectAccordion({ projects }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-gray-200">
      {projects.map((project, index) => (
        <AccordionItem
          key={project.name}
          title={project.name}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          {/* Your readme/screenshots/carousel content goes here */}
          <p>{project.description}</p>
        </AccordionItem>
      ))}
    </div>
  );
}