import React, { useState, useEffect } from "react";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import "./AudioPlayer.scss";

const AudioPlayer = ({ src }) => {
  const audioUrl = `http://127.0.0.1:8080/${src}`;
  const [audio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.volume = 1;
    audio.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-wrapper">
      <button className="audio-playbtn" onClick={togglePlay}>
        <div className="audio-playdiv">
          {isPlaying ? (
            <BsStopFill fontSize={"1.5rem"} />
          ) : (
            <BsFillPlayFill fontSize={"1.5rem"} color="red" />
          )}
        </div>
      </button>
    </div>
  );
};
export default AudioPlayer;
