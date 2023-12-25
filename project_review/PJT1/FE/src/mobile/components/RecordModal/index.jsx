import React, { useState, useEffect } from "react";
import "./RecordModal.scss";
import { MdKeyboardVoice } from "react-icons/md";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const RecordModal = ({
  setSendData,
  sendData,
  setOpenModal,
  sound,
  setSound,
}) => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressBar, setProgressbar] = useState(false);

  const onRecAudio = () => {
    setProgressbar(true);
    setSound(undefined);
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      const stopRecording = () => {
        setProgressbar(false);
        setProgress(0);

        stream.getAudioTracks().forEach(function (track) {
          track.stop();
        });
        mediaRecorder.stop();
        analyser.disconnect();
        audioCtx.createMediaStreamSource(stream).disconnect();

        mediaRecorder.ondataavailable = function (e) {
          setAudioUrl(e.data);
          setOnRec(true);
          setSound(new Audio(URL.createObjectURL(e.data)));
        };
      };

      setTimeout(stopRecording, 30000);

      analyser.onaudioprocess = function (e) {
        setProgress(e.playbackTime * 5);
        if (e.playbackTime > 20) {
          stopRecording();
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    setProgressbar(false);
    setProgress(0);
    if (media) {
      // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);
        setOnRec(true);
        setSound(new Audio(URL.createObjectURL(e.data))); // 출력된 링크에서 녹음된 오디오 확인 가능
      };

      // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
      stream.getAudioTracks().forEach(function (track) {
        track.stop();
      });

      // 미디어 캡처 중지
      media.stop();
      // 메서드가 호출 된 노드 연결 해제
      analyser.disconnect();
      source.disconnect();
    }
  };

  useEffect(() => {
    if (sound) {
      sound.volume = 1;
      sound.addEventListener("ended", () => setIsPlaying(false));
      return () => {
        sound.removeEventListener("ended", () => setIsPlaying(false));
      };
    }
  }, [sound]);

  const play = () => {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };

  const saveRecord = () => {
    setOpenModal(false);

    const soundV = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });
    // const soundV2 = new Blob([soundV], { type: "audio/wav" });
    setSendData({
      ...sendData,
      record: soundV,
    });
  };

  const removeRecord = () => {
    setSendData({
      ...sendData,
      record: null,
    });
    setSound();
    setOpenModal(false);
  };

  return (
    <div className="recordmodal-main">
      <h4 style={{ fontSize: "1rem" }}>
        받는 사람에게 음성을 같이 전달하고 싶나요?
      </h4>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={progressBar ? progress : 0}
        />
      </Box>
      <div className="recordmodal-main-icons">
        <div
          className="Mrecordbutton"
          onClick={onRec ? onRecAudio : offRecAudio}
        >
          {onRec ? (
            <MdKeyboardVoice fontSize={"2rem"} color={"gray"} />
          ) : (
            <BsStopFill fontSize={"2rem"} color={"red"} />
          )}
        </div>
        <div
          className="Mplaybutton"
          onClick={sound && play}
          style={{ cursor: sound ? "pointer" : "default" }}
        >
          {sound && isPlaying ? (
            <BsStopFill fontSize={"2rem"} color="red" />
          ) : (
            <BsFillPlayFill fontSize={"2rem"} color={sound ? "red" : "gray"} />
          )}
        </div>
      </div>
      <h4>음성녹음 시간 최대 20초</h4>
      <div style={{ display: "flex", gap: "2rem" }}>
        {sound !== undefined ? (
          <button className="saverecord" onClick={saveRecord}>
            음성 담기
          </button>
        ) : (
          <button className="saverecordV" disabled>
            음성 담기
          </button>
        )}
        {sendData.record !== null || sound !== undefined ? (
          <button className="removerecord" onClick={removeRecord}>
            음성 제거
          </button>
        ) : (
          <button className="removerecordV" disabled>
            음성 제거
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordModal;
