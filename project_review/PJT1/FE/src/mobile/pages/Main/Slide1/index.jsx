import React, { useState, useRef, useEffect } from "react";
import { RuemiController } from "./components/ruemi_controller.js";
import { Sun } from "./components/sun.js";
import { BsFillMouseFill } from "react-icons/bs";
import { Hill } from "./components/Hill.js";
import "./Slide1.scss";

const Slide1 = ({ activeIndex }) => {
  const canvasRef = useRef();
  const [sun] = useState(new Sun());
  const [ruemiController] = useState(new RuemiController());
  const [hills] = useState([
    new Hill("#FFD3B5", 0.2, 16),
    new Hill("#FFAAA6", 0.5, 12),
    new Hill("#FF8C94", 0.8, 6),
  ]);
  const [stageWidth, setStageWidth] = useState(document.body.clientWidth);
  const [stageHeight, setStageHeight] = useState(
    document.body.clientHeight * 0.33
  );

  const resizeCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    canvasRef.current.width = stageWidth * 2;
    canvasRef.current.height = stageHeight * 2;
    const ctx = canvasRef.current.getContext("2d");
    ctx.scale(2, 2);
    setStageHeight(stageHeight);
  };

  const resizeComponents = () => {
    sun.resize(stageWidth, stageHeight, activeIndex);
    ruemiController.resize(stageWidth, stageHeight, activeIndex);
    hills.forEach((hill) => hill.resize(stageWidth, stageHeight));
  };

  useEffect(() => {
    if (canvasRef.current && canvasRef.current.offsetHeight > 0) {
      resizeCanvas();
      resizeComponents();
    }
  }, [activeIndex, stageWidth, stageHeight]);

  const animate = (t, ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    sun.draw(ctx, t);
    let dots;
    hills.forEach((hill) => {
      dots = hill.draw(ctx);
    });
    ruemiController.draw(ctx, t, dots, activeIndex);
    requestAnimationFrame(() => animate(10, ctx));
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setStageWidth(document.body.clientWidth);
      setStageHeight(document.body.clientHeight * 0.33);
    });
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      // Add check for canvas
      ctx.scale(2, 2);
      animate(0, ctx);
    }
    resizeCanvas();
  }, []);

  return (
    <div className="slide1-wrapper">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Slide1;
