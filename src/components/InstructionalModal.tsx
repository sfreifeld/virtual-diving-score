import React, { useState } from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

const modalContents = [
  { title: "Welcome to Dive Ranker!", description: "Think you have what it takes to accurately judge some of the best dives on the planet?  Now's your chance to find out! <br /><br /> Compare your scores with actual judges' scores and see how you stack up! DiveRanker is all about having fun and learning about the art of diving. <br/><br/> Happy judging, and may the best score win! 🌟" },
  { title: "How Olympic Dives Are Scored: The Inside Splash", description: `
  <p>
      In Olympic diving, each dive is a combination of grace, precision, and a splash of flair! Judges score dives based on two main criteria:
    </p>
    <h3>1. Difficulty (Degree of Difficulty - DD)</h3>
    <p>
      The difficulty of a dive is determined by its complexity. This includes the number and type of twists and somersaults, the position of the diver (tuck, pike, or straight), and the height from which they dive.
    </p>
    <p> The scale goes from <strong> 1.2 to 4.8 </strong> and increments by <strong> 0.1 </strong> </p>
    <h3>2. Execution</h3>
    <p>
      This is where the artistry comes in! Judges rate the execution of the dive on a scale of 0 to 10, considering:
      <ul>
        <li><strong>Takeoff:</strong> Was the takeoff smooth and powerful?</li>
        <li><strong>Flight:</strong> How well did the diver perform the maneuvers? Were they controlled and precise?</li>
        <li><strong>Entry:</strong> The goal is to enter the water with minimal splash, creating what's known as a "rip entry."</li>
      </ul>
    </p>
    <p>
      Your answers will be compared to the actual difficulty score of the dive and the median of the judge's execution score —happy scoring! 🌊🏅
    </p>
  </div>
</div>`
  }
];

function createMarkup(description: string) {
  return { __html: description };
}

const InstructionModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < modalContents.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onRequestClose(); // Close the modal when the last step is completed
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Instruction Modal"
    >
      <h2>{modalContents[currentStep - 1].title}</h2>
      <p dangerouslySetInnerHTML={createMarkup(modalContents[currentStep - 1].description)}></p>
      <button onClick={handleNext}>{currentStep < modalContents.length ? 'Next' : 'Start'}</button>
    </Modal>
  );
};

export default InstructionModal;