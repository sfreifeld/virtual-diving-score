import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  // Initialize state for all dives
  const [dives, setDives] = useState([
    { name: 'Dive 1', userInputScore: 5, userInputDifficulty: 5, actualScore: 6.5, actualDifficulty: 3.2 },
    { name: 'Dive 2', userInputScore: 5, userInputDifficulty: 5, actualScore: 6.5, actualDifficulty: 3.2 },
    { name: 'Dive 3', userInputScore: 5, userInputDifficulty: 5, actualScore: 6.5, actualDifficulty: 3.2 },
    { name: 'Dive 4', userInputScore: 5, userInputDifficulty: 5, actualScore: 6.5, actualDifficulty: 3.2 }
  ]);

  // Function to update dive scores
  const updateDive = (index: number, scoreType: string, value: number) => {
    const updatedDives = dives.map((dive, i) => {
      if (i === index) {
        return { ...dive, [scoreType]: value };
      }
      return dive;
    });
    setDives(updatedDives);
  };

  return (
    <div className="virtual-diving-judge">
      <div className="main-content">
        <div className="inner-padding">
          <h1 className="title">VIRTUAL DIVING JUDGE</h1>
          
          <div className="grid">
            {/* Video Player */}
            <div>
              <div className="video-container">
                <video controls width="100%">
                  <source src="/src/assets/dive1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="controls-container">
                <button className="control-button">⏪</button>
                <button className="control-button">▶️</button>
                <button className="control-button">⏩</button>
              </div>
            </div>
            
            {/* Scoring Interface */}
            <div className="scoring-container">
              <h2 className="scoring-title">Score This Dive</h2>
              <div className="slider-container">
                <label className="slider-label">Difficulty</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value= {dives[0].userInputDifficulty}
                  onChange={(e) => updateDive(0, 'userInputDifficulty', parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="score-display">{dives[0].userInputScore.toFixed(1)}</span>
              </div>
              <div className="slider-container">
                <label className="slider-label">Judge's Score</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={dives[0].userInputScore}
                  onChange={(e) => updateDive(0, 'userInputScore', parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="score-display">{dives[0].userInputScore.toFixed(1)}</span>
              </div>
              <button className="submit-button">Submit Score</button>
            </div>
            
            {/* Data Visualization */}
            <div className="chart-container">
              <h2 className="chart-title">Score Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dives}>
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="userInputDifficulty" fill="#8884d8" name="User Difficulty" />
                  <Bar dataKey="userScoreDifficulty" fill="#82ca9d" name="Actual Difficulty" />
                  <Bar dataKey="userInputScore" fill="#FCD34D" name="User Score" />
                  <Bar dataKey="judgeScore" fill="#4ADE80" name="Judge's Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;