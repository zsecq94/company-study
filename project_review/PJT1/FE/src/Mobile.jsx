import "./Mobile.scss";
import Main from "./mobile/pages/Main";
import Header from "./mobile/layout/Header";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Mobile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [items, setItems] = useState();
  const [check, setCheck] = useState(false);
  const [sendData, setSendData] = useState({
    name: "",
    from: "",
    to: "",
    record: null,
  });

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const webSocketUrl = `ws://127.0.0.1:8080/`;
  const ws = new WebSocket(webSocketUrl);

  const dataValid = sendData.to.length > 0 && sendData.from.length > 0;
  useEffect(() => {
    if (user?.name) {
      setSendData({
        ...sendData,
        name: user.name,
      });
    }

    // 첫 연결시 orderList 요청
    ws.onopen = () => {
      console.log("CONNECT");
      ws.send("getOrderList");
    };

    // 받아온 orderList items에 저장
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (Array.isArray(data)) {
        data.map((V) => {
          if (user?.name === V.name) {
            setCheck(true);
          }
        });
        setItems(data);
      }
    };

    return () => {
      // 브라우저가 종료될 때 WebSocket 연결 해제
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setItems(data);
  };

  const send = () => {
    if (sendData.from === sendData.to) {
      toast.error("서로 다른 위치를 선택해주세요!", toastOptions);
      return;
    } else if (sendData.record === null) {
      ws.send(JSON.stringify(sendData));
    } else {
      ws.send(JSON.stringify(sendData));
      ws.send(sendData.record);
    }
  };

  const removeData = () => {
    ws.send(JSON.stringify({ action: "removeData", name: user.name }));
  };

  return (
    <div className="Mobile">
      <Header />
      <Routes>
        <React.Fragment>
          <Route
            path="/"
            element={
              <Main
                items={items}
                setSendData={setSendData}
                send={send}
                sendData={sendData}
                removeData={removeData}
                setCheck={setCheck}
                check={check}
                dataValid={dataValid}
              />
            }
          ></Route>
        </React.Fragment>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default Mobile;
