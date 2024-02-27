import React, { useState } from "react";
const AccordionItem = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <div className="accordion-title" onClick={toggleAccordion}>
        <span>{title}</span>
        <span className="icon">{isOpen ? "^C" : "~$"}</span>
      </div>
      <div className="accordion-description">{description}</div>
    </div>
  );
};

export default AccordionItem;
