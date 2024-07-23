import React from 'react';

const VideoPlayer: React.FC = () => {
  return (
    <div className="video-player">
      <video controls width="100%">
        <source src="/src/assets/diving-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;