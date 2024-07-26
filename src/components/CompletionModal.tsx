import React from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  score: string; // Assuming score is passed as a prop
}

const modalContents = {
  title: "Your Score",
  description: `<p>Your final score is <strong><score_placeholder>%</strong>!</p>
  <h3>Scoring Feedback </h3>
  <ul>
    <li><strong>90% - 100%:</strong> Dive-tastic! You've got an eagle eye for detail—are you sure you're not secretly an Olympic judge?</li>
    <li><strong>70% - 89%:</strong> Splashy! You really know your dives. Keep it up, future judge extraordinaire!</li>
    <li><strong>50% - 69%:</strong> Just Keep Swimming! You're on the right track, but there's still some water to cover.</li>
    <li><strong>Below 50%:</strong> Dive Novice! Maybe just stick to watching and enjoying the dives...</li>
  </ul>

  
  
  
  `
};

function createMarkup(description: string, score: string) {
  const scoreNum = parseFloat(score);
  let styledDescription = description.replace('<score_placeholder>', score);
  
  if (scoreNum >= 90) {
    styledDescription = styledDescription.replace('90% - 100%:', '<span style="color: blue;">90% - 100%:</span>');
  } else if (scoreNum >= 70) {
    styledDescription = styledDescription.replace('70% - 89%:', '<span style="color: blue;">70% - 89%:</span>');
  } else if (scoreNum >= 50) {
    styledDescription = styledDescription.replace('50% - 69%:', '<span style="color: blue;">50% - 69%:</span>');
  } else {
    styledDescription = styledDescription.replace('Below 50%:', '<span style="color: blue;">Below 50%:</span>');
  }

  return { __html: styledDescription };
}

const InstructionModal: React.FC<Props> = ({ isOpen, onRequestClose, score }) => {
  const handleRestart = () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Completion Modal"
    >
      <h2>{modalContents.title}</h2>
      <p dangerouslySetInnerHTML={createMarkup(modalContents.description, score)}></p>
      <button onClick={handleRestart}>Try Again</button>
    </Modal>
  );
};

export default InstructionModal;