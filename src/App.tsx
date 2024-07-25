import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';

const App: React.FC = () => {
  // Initialize state for all dives
  const [dives, setDives] = useState([
    { name: 'Dive 1', video: 'dive1.mp4', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false},
    { name: 'Dive 2', video: 'dive2.mp4', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false},
    { name: 'Dive 3', video: 'dive3.mp4', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false},
    { name: 'Dive 4', video: 'dive4.mp4', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false},
  ]);

  const [actualDives, setActualDives] = useState([
    { name: 'Dive 1', video: 'dive1.mp4', userInputScore: 0, userInputDifficulty: 0, actualScore: 6.5, actualDifficulty: 3.2, barChartVisibility: true},
    { name: 'Dive 2', video: 'dive2.mp4',userInputScore: 0, userInputDifficulty: 0, actualScore: 9.5, actualDifficulty: 3.4, barChartVisibility: true },
    { name: 'Dive 3', video: 'dive3.mp4',userInputScore: 0, userInputDifficulty: 0, actualScore: 10, actualDifficulty: 3.2, barChartVisibility: true },
    { name: 'Dive 4', video: 'dive4.mp4', userInputScore: 0, userInputDifficulty: 0, actualScore: 7.5, actualDifficulty: 3.3, barChartVisibility: true }
  ])

  const [currentDiveIndex, setCurrentDiveIndex] = useState(0)

  console.log(dives)

  const handleSubmit = () => {
    const updatedDives = dives.map((dive, index) => 
      index === currentDiveIndex ? actualDives[currentDiveIndex] : dive
    );
    setDives(updatedDives);
    if (currentDiveIndex < dives.length - 1) {
      setCurrentDiveIndex(currentDiveIndex + 1);
      
    } else {
      console.log('All dives scored!')
    }
  }

  // Function to update dive scores
  const updateDive = (index: number, attribute: keyof Dive, value: number | boolean) => {
    const updatedDives = actualDives.map((dive, i) => {
      if (i === index) {
        return { ...dive, [attribute]: value };
      }
      return dive;
    });
    setActualDives(updatedDives); // Assuming setActualDives is the setter from useState
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
                <video controls width="100%" key={currentDiveIndex}>
                  <source src={`/src/assets/${dives[currentDiveIndex].video}`} type="video/mp4" />
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
                  value= {actualDives[currentDiveIndex].userInputDifficulty}
                  onChange={(e) => updateDive(currentDiveIndex, 'userInputDifficulty', parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="score-display">{actualDives[currentDiveIndex].userInputDifficulty.toFixed(1)}</span>
              </div>
              <div className="slider-container">
                <label className="slider-label">Judge's Score</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={actualDives[currentDiveIndex].userInputScore}
                  onChange={(e) => updateDive(currentDiveIndex, 'userInputScore', parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="score-display">{actualDives[currentDiveIndex].userInputScore.toFixed(1)}</span>
              </div>
              <button className="submit-button" onClick={handleSubmit}>Submit Score</button>
            </div>
            
            {/* Data Visualization */}
            <div className="chart-container" >
              <h2 className="chart-title" >Score Comparison</h2>
              <ResponsiveContainer width="100%" height={300} key={currentDiveIndex}>
                <BarChart data={dives} >
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} />
                  <Legend />
                      <Bar dataKey="userInputDifficulty" fill="#8884d8" name="User Difficulty"  />
                      <Bar dataKey="actualDifficulty" fill="#82ca9d" name="Actual Difficulty" />
                      <Bar dataKey="userInputScore" fill="#FCD34D" name="User Score"  />
                      <Bar dataKey="actualScore" fill="#4ADE80" name="Actual Score"  />
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