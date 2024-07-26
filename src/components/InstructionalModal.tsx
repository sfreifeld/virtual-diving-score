import React from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onNext: () => void;
  currentStep: number;
}

const modalContents = [
  { title: "Welcome to Dive Ranker!", description: "This app allows you to score Olympic dives." },
  { title: "Scoring Instructions", description: "Use the sliders to set the difficulty and judge's score for each dive." }
];

const InstructionModal: React.FC<Props> = ({ isOpen, onRequestClose, onNext, currentStep }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Instruction Modal"
    >
      <h2>{modalContents[currentStep - 1].title}</h2>
      <p>{modalContents[currentStep - 1].description}</p>
      <button onClick={onNext}>{currentStep < modalContents.length ? 'Next' : 'Start'}</button>
    </Modal>
  );
};

export default InstructionModal;