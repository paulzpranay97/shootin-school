import { useRef, useState } from "react";
import HmImg from "../../../Assets/Images/mission-statement.png";
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
            <h1>Mission Statement</h1>
            <p>
              Because We Can is dedicated to providing all players with a
              supportive and judgment-free environment where they can learn and
              master the fundamentals of sports. Our mission is to foster a
              positive and inclusive atmosphere that encourages growth,
              teamwork, and a lifelong passion for athletics.
            </p>
          </div>
          <div className="hm-img">
            <img src={HmImg} alt="background" />
          </div>
        </div>
        <div className="home-mission-right">
          <div className="video-container">
            <video ref={videoRef} src="https://videos.pexels.com/video-files/30822229/13182339_640_360_25fps.mp4" className="w-full"  onEnded={handleVideoEnd}/>
            <div className="video-controls">
            <button
              onClick={togglePlay}
              className="video-play-btn"
            >
              {isPlaying ? <BsFillPauseCircleFill size={40} /> : <BsFillPlayCircleFill size={40} />}
            </button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;
