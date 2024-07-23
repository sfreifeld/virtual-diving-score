import React, { useState } from 'react';

interface Props {
  content: string;
}

const Tooltip: React.FC<Props> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="ms-2 position-relative">
      <i
        className="bi bi-question-circle"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      ></i>
      {isVisible && (
        <div className="position-absolute top-100 start-50 translate-middle-x bg-light p-2 rounded shadow">
          {content}
        </div>
      )}
    </span>
  );
};

export default Tooltip;