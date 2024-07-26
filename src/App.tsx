import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InstructionalModal from './components/InstructionalModal';
import CompletionModal from './components/CompletionModal';

const App: React.FC = () => {
  const initialDives = [
    { name: 'Dive 1', video: 'dive1.mp4', diver:'Kawan Figuerdo Pereira', country:'Brazil 🇧🇷', olympics:'Tokyo 2020', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false},
    { name: 'Dive 2', video: 'dive2.mp4', diver:'Chen Aisen', country:'China 🇨🇳', olympics:'Rio 2016', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false},
    { name: 'Dive 3', video: 'dive3.mp4', diver:'Quan Hongchan', country:'China 🇨🇳 ', olympics:'Tokyo 2020', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false},
    { name: 'Dive 4', video: 'dive4.mp4', diver:'Cassiel Rousseau', country:'Austrailia 🇦🇺', olympics:'Tokyo 2020', userInputScore: 0, userInputDifficulty: 0, actualScore: 0, actualDifficulty: 0, barChartVisibility: false}
  ];

  const [dives, setDives] = useState(initialDives);

  const [actualDives, setActualDives] = useState([
    { name: 'Dive 1', video: 'dive1.mp4', diver:'Kawan Figuerdo Pereira', country:'Brazil 🇧🇷', olympics:'Tokyo 2020', userInputScore: 0, userInputDifficulty: 0, actualScore: 6.5, actualDifficulty: 3.2, barChartVisibility: true},
    { name: 'Dive 2', video: 'dive2.mp4', diver:'Chen Aisen', country:'China 🇨🇳', olympics:'Rio 2016', userInputScore: 0, userInputDifficulty: 0, actualScore: 9.5, actualDifficulty: 3.4, barChartVisibility: true },
    { name: 'Dive 3', video: 'dive3.mp4', diver:'Quan Hongchan', country:'China 🇨🇳 ', olympics:'Tokyo 2020', userInputScore: 0, userInputDifficulty: 0, actualScore: 10, actualDifficulty: 3.2, barChartVisibility: true },
    { name: 'Dive 4', video: 'dive4.mp4', diver:'Cassiel Rousseau', country:'Austrailia 🇦🇺', olympics:'Tokyo 2020', userInputScore: 0, userInputDifficulty: 0, actualScore: 7.5, actualDifficulty: 3.3, barChartVisibility: true }
  ])

  const [currentDiveIndex, setCurrentDiveIndex] = useState(0)

  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const resetDives = () => {
    const resetDives = initialDives.map(dive => ({
      ...dive,
      userInputScore: 0,
      userInputDifficulty: 0
    }));
    setDives(resetDives);
  
    // Reset actualDives to initial values but with userInput scores and difficulties reset to 0
    const resetActualDives = actualDives.map(dive => ({
      ...dive,
      userInputScore: 0,
      userInputDifficulty: 0
    }));
    setActualDives(resetActualDives);
  
    setCurrentDiveIndex(0);
    setIsCompletionModalOpen(false);
  };

  const handleSubmit = () => {
    const updatedDives = dives.map((dive, index) => 
      index === currentDiveIndex ? actualDives[currentDiveIndex] : dive
    );
    setDives(updatedDives);
    if (currentDiveIndex < dives.length - 1) {
      setCurrentDiveIndex(currentDiveIndex + 1);
    } else {
      console.log('All dives scored!');
      setIsCompletionModalOpen(true);
    }
  }

  // Function to update dive scores
  const updateDive = (index: number, attribute: string, value: number | boolean) => {
    const updatedDives = actualDives.map((dive, i) => {
      if (i === index) {
        return { ...dive, [attribute]: value };
      }
      return dive;
    });
    setActualDives(updatedDives); // Assuming setActualDives is the setter from useState
  };

  function calculateTotal(scores: { difficulty: number; execution: number }[]) {
    return scores.reduce((total, dive) => total + dive.difficulty * dive.execution, 0);
  }

  const userScores = actualDives.map(dive => ({
    difficulty: dive.userInputDifficulty,
    execution: dive.userInputScore
  }));

  const userTotalScore = calculateTotal(userScores);
  const accuracy = (100 - Math.abs((userTotalScore - 109.85) / 109.85) * 100).toFixed(2);



  

  return (
    <div className="virtual-diving-judge">
      <InstructionalModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onRequestClose={resetDives}
        score = {accuracy}
      />
      <div className="main-content">
        <div className="inner-padding">
          <div style={{ fontWeight: 900 }} className='title'>
            <h1> DIVE RANKER</h1>
            <h1> DIVE RANKER</h1>
          </div>
          
          <div className="grid">
            {/* Video Player */}
            <div>
              <div className="video-container">
                <video controls width="100%" key={currentDiveIndex}>
                  <source src={`/src/assets/${dives[currentDiveIndex].video}`} type="video/mp4" />
                </video>
              </div>
              <div className="details-container">
                <p className="detail"><strong>{dives[currentDiveIndex].diver}</strong></p>
                <p className="detail">{dives[currentDiveIndex].country}</p>
                <p className="detail">{dives[currentDiveIndex].olympics}</p>
              </div>
            </div>
            
            {/* Scoring Interface */}
            <div className="scoring-container">
              <h2 className="scoring-title">Score This Dive</h2>
              <div className="slider-container">
                <label className="slider-label">Difficulty</label>
                <input
                  type="range"
                  min="1.2"
                  max="4.8"
                  step="0.1"
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
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} wrapperStyle={{ fontWeight: 'bold' }} />
                  <Legend formatter={(value) => <strong>{value}</strong>} />
                      <Bar dataKey="userInputDifficulty" fill="#DDB8F4" name="User Difficulty"  />
                      <Bar dataKey="actualDifficulty" fill="#A666CD" name="Actual Difficulty" />
                      <Bar dataKey="userInputScore" fill="#4FDE94" name="User Score"  />
                      <Bar dataKey="actualScore" fill="#15864B" name="Actual Score"  />
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