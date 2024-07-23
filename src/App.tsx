import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import ScoringForm from './components/ScoringForm';
import ScoreComparison from './components/ScoreComparison';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface Score {
  difficulty: number;
  execution: number;
}

const App: React.FC = () => {
  const [userScore, setUserScore] = useState<Score>({ difficulty: 0, execution: 0 });
  const [judgeScore] = useState<Score>({ difficulty: 8.5, execution: 9.0 }); // Example judge score

  const handleScoreSubmit = (score: Score) => {
    setUserScore(score);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Virtual Diving Judge</h1>
      <div className="row">
        <div className="col-md-6">
          <VideoPlayer />
        </div>
        <div className="col-md-6">
          <ScoringForm onSubmit={handleScoreSubmit} />
          <ScoreComparison userScore={userScore} judgeScore={judgeScore} />
        </div>
      </div>
    </div>
  );
};

export default App;