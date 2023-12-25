import React, { useEffect, useRef } from "react";
import { BsFillMouseFill } from "react-icons/bs";
import "./Slide1.scss";
import { Hill } from "./components/Hill.js";
import { RuemiController } from "./components/ruemi_controller.js";
import { Sun } from "./components/sun.js";

const Slide1 = ({ activeIndex }) => {
  const canvasRef = useRef();
  const sunRef = useRef(new Sun());
  const hills = [
    new Hill("#FFD3B5", 0.2, 12),
    new Hill("#FFAAA6", 0.5, 8),
    new Hill("#FF8C94", 1.4, 6),
  ];
  const ruemiControllerRef = useRef(new RuemiController());
  const stageWidth = window.innerWidth;
  const stageHeight =
    activeIndex === 0 ? window.innerHeight + 20 : window.innerHeight * 0.3;

  const resizeCanvas = () => {
    canvasRef.current.style.transition = "height 1s ease-out";
    canvasRef.current.style.height = `${stageHeight}px`;
    canvasRef.current.width = stageWidth * 2.5;
    canvasRef.current.height = stageHeight * 2.5;
    const ctx = canvasRef.current.getContext("2d");
    const scale = activeIndex === 0 ? 1 : 0.3;
    ctx.scale(2.5, 2.5 * scale);

    sunRef.current.resize(stageWidth, stageHeight, activeIndex);
    ruemiControllerRef.current.resize(stageWidth, stageHeight);
    hills.forEach((hill) => hill.resize(stageWidth, stageHeight));
  };

  const animate = (t, ctx, lastDots) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    sunRef.current.draw(ctx, t);
    let dots;
    hills.forEach((hill) => {
      dots = hill.draw(ctx);
    });
    ruemiControllerRef.current.draw(ctx, t, lastDots || dots);
    requestAnimationFrame(() => animate(t + 10, ctx, dots));
  };

  useEffect(() => {
    if (canvasRef.current && canvasRef.current.offsetHeight > 0) {
      resizeCanvas();
    }
  }, [stageWidth, stageHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      animate(0, ctx);
    }
    resizeCanvas();
  }, []);

  return (
    <div className="slide1-wrapper">
      <canvas ref={canvasRef} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          marginBottom: activeIndex === 0 ? 25 : 10,
          fontSize: "3rem",
          animation: "icon-shake 1s ease-in-out infinite",
          color: "white",
          flexDirection: "column",
        }}
      >
        <BsFillMouseFill color="white" />
      </div>
    </div>
  );
};

export default Slide1;
