import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VirtualDivingJudge: React.FC = () => {
  const [score, setScore] = useState<number>(5);

  const dummyData = [
    { name: 'Dive 1', userScore: 7.5, judgeScore: 8.0 },
    { name: 'Dive 2', userScore: 6.5, judgeScore: 7.0 },
    { name: 'Dive 3', userScore: 8.0, judgeScore: 7.5 },
    { name: 'Dive 4', userScore: 7.0, judgeScore: 7.5 },
    { name: 'Dive 5', userScore: 8.5, judgeScore: 8.0 },
  ];

  return (
    <div className="virtual-diving-judge">
      <div className="main-content">
        <div className="inner-padding">
          <h1 className="title">Virtual Diving Judge</h1>
          
          <div className="grid">
            {/* Video Player */}
            <div>
              <div className="video-container">
                <img src="/api/placeholder/640/360" alt="Diving video placeholder" className="video-placeholder" />
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
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={score}
                  onChange={(e) => setScore(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="score-display">{score.toFixed(1)}</span>
              </div>
              <button className="submit-button">Submit Score</button>
            </div>
          </div>
          
          {/* Data Visualization */}
          <div className="chart-container">
            <h2 className="chart-title">Score Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dummyData}>
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="userScore" fill="#FCD34D" name="Your Score" />
                <Bar dataKey="judgeScore" fill="#4ADE80" name="Judge's Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualDivingJudge;