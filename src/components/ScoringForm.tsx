import React, { useState } from 'react';
import Tooltip from './Tooltip';

interface Score {
  difficulty: number;
  execution: number;
}

interface Props {
  onSubmit: (score: Score) => void;
}

const ScoringForm: React.FC<Props> = ({ onSubmit }) => {
  const [difficulty, setDifficulty] = useState(0);
  const [execution, setExecution] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ difficulty, execution });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="difficulty" className="form-label">
          Difficulty
          <Tooltip content="Rate the complexity of the dive from 0 to 10." />
        </label>
        <input
          type="number"
          className="form-control"
          id="difficulty"
          min="0"
          max="10"
          step="0.5"
          value={difficulty}
          onChange={(e) => setDifficulty(parseFloat(e.target.value))}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="execution" className="form-label">
          Execution
          <Tooltip content="Rate the quality of the dive's execution from 0 to 10." />
        </label>
        <input
          type="number"
          className="form-control"
          id="execution"
          min="0"
          max="10"
          step="0.5"
          value={execution}
          onChange={(e) => setExecution(parseFloat(e.target.value))}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit Score</button>
    </form>
  );
};

export default ScoringForm;