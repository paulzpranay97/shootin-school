import { useRef, useState } from "react";
import videoFile from "../../../Assets/Images/home/home-video.mp4";
import PlayIcon from "../../../Assets/Images/home/play-icon.png";
import { BsFillPlayCircleFill, BsFillPauseCircleFill  } from "react-icons/bs";
import "./missionstatement.css"

const MissionStatement = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="home-mission-container">
      <div className="home-mission-card">
        <div className="home-mission-left">
          <div className="home-mission-content">
            <h2>Mission</h2>
            <div className="title">“Don’t just read about it — see how we take players to the next level.”</div>
          </div>
        </div>
        <div className="home-mission-right">
          <div className="video-container">
            <video
              ref={videoRef}
              src={videoFile}
              className="w-full"
              controls
              onEnded={handleVideoEnd}
            />
            <div className="video-controls">
              {!isPlaying && (
                <button onClick={togglePlay} className="video-play-btn">
                  <img src={PlayIcon} alt="play" width={80} />
                </button>
              )}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;
