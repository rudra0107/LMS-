"use client";

import React from "react";
import { useState } from "react";

interface ReadMoreProps {
  text: string;
}

const ReadmoreReadless: React.FC<ReadMoreProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const maxLength = 10;
  return (
    <div>
      {isExpanded ? (
        <span>{text}</span>
      ) : (
        <span>
          {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
          <button onClick={toggleExpand}>
            Read {isExpanded ? "Less" : "More"}
          </button>
        </span>
      )}
    </div>
  );
};

export default ReadmoreReadless;
