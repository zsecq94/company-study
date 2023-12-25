import React, { useState, useEffect, useRef } from "react";
import "./Main.scss";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";

const Main = ({
  items,
  setSendData,
  send,
  sendData,
  removeData,
  setCheck,
  check,
  dataValid,
}) => {
  return (
    <div className="slide-wrapper">
      <div>
        <Slide1 />
      </div>
      <div>
        <Slide2
          items={items}
          setSendData={setSendData}
          send={send}
          sendData={sendData}
          removeData={removeData}
          setCheck={setCheck}
          check={check}
          dataValid={dataValid}
        />
      </div>
    </div>
  );
};

export default Main;
