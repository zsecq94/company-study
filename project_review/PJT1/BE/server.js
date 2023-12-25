const express = require("express");
const WebSocket = require("ws");
const pool = require("./utility/db");
const app = express();
const logger = require("./utility/winston.js");
const http = require("http");
// const credentials = require("./utility/credentials.js");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

//initialize a simple http server
//const server = https.createServer(app);
const server = http.createServer(app);

//start our server
server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});

// initialize the WebSocket server instance
const ws = new WebSocket.Server({ server });

app.post("/api/signup", async (req, res) => {
  var state = false;
  var msg = "signUp >> ID Or Name duplicated";
  var status = 400;
  logger.info(JSON.stringify(req.body));

  const name = await pool.query(
    "SELECT * FROM Broomi.USER WHERE NAME = ? OR ID = ?",
    [req.body.NAME, req.body.ID]
  );

  if (name[0].length == 0) {
    try {
      const data = await pool.query(
        "INSERT INTO Broomi.USER (ID, NAME, PASS) VALUES (?, ?, ?)",
        [req.body.ID, req.body.NAME, req.body.PASS]
      );
      state = true;
      msg = "signUp >> okisbacon";
      status = 200;
    } catch (error) {
      msg = "signUp >> ID Or Name duplicated";
    }
  }

  logger.info(msg);

  return res.json({
    success: state,
    message: msg,
    status: status,
    name: req.body.NAME,
  });
});

app.post("/api/login", async (req, res) => {
  let state = false;
  let index = 4;
  let msg = "login >> ID does not exist";
  let status = 400;
  let name = "";
  logger.info(JSON.stringify(req.body));
  const user = await pool.query(
    "SELECT * FROM Broomi.USER WHERE ID = ?",
    req.body.ID
  );

  if (user[0].length > 0) {
    if (user[0][0].PASS == req.body.PASS) {
      state = true;
      msg = "login >> okisbacon";
      name = user[0][0].NAME;
      status = 200;
    } else {
      msg = "login >> PW incorrect";
    }
  }

  logger.info(msg);

  return res.json({
    success: state,
    index: index,
    message: msg,
    status: status,
    name: name,
  });
});

let orderList = [];
let TurtleBot;

// TurtleBot1:ready
// TurtleBot1:running
// TurtleBot1:done
ws.on("connection", async (wss, req) => {
  wss.on("message", (msg) => {
    const data = msg.toString();

    // turtle bot 구간
    if (data.split(":")[0] === "TurtleBot1") {
      TurtleBot = wss;
      let data2 = data.split(":")[1];
      console.log(data);
      if (data2 === "Connection") {
        // 연결 완료
        TurtleBot.send(JSON.stringify(orderList));
      } else if (data2 === "Ready") {
        // 주문 접수 완료, 배달 시작
        TurtleBot.send(JSON.stringify(orderList));
      } else if (data2 === "Done") {
        // 배달 완료, 앞 주문 빼고, 다음 주문 접수
        orderList.pop(0);
        ws.clients.forEach((client) => {
          client.send(JSON.stringify(orderList), {
            "Content-Type": "application/json",
          });
        });
      } else {
        // 지금 터틀봇 바쁨
        console.log("Turtlebot is Running!");
      }
      return;
    }

    // 음성파일 저장
    if (Buffer.byteLength(msg) > 100) {
      const lengthCheck = orderList.length - 1;
      // 음성파일 저장 경로
      const filePath = "./public/audio/" + orderList[lengthCheck].name + ".wav";
      const fileName = filePath.substring(8);
      fs.writeFile(filePath, msg, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
      orderList[lengthCheck].record = fileName;
      wss.send(JSON.stringify(orderList));
      return;
    }
    // 클라이언트에서 getOrderList를 요청하면 orderList를 보낸다
    if (data === "getOrderList") {
      wss.send(JSON.stringify(orderList));
      return;
    }

    const objData = JSON.parse(data);
    // 무르기 버튼 클릭 시 아이템 제거
    if (objData.action === "removeData") {
      const name = objData.name;

      // orderList의 name이 objData.name과 다른 데이터만 새롭게 만듬
      const updatedList = orderList.filter((order) => order.name !== name);

      // 음성파일을 제거하기위해 내 데이터 가져오기
      const myData = orderList.filter((order) => order.name === name);
      orderList = updatedList;
      // 액션이 removeData일때 음성파일이 있으면
      if (myData[0].record) {
        const fileName = myData[0].record.slice(7);
        const filePath = path.join(__dirname, "public", "audio", fileName);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    } else {
      // 음성데이터 없을때 추가 로직
      const data = {
        name: objData.name,
        from: objData.from,
        to: objData.to,
        record: "",
      };
      orderList.push(data);
    }

    // orderList가 업데이트 되면 연결된 모든 클라이언트에게 업데이트 된 orderList 뿌려주기
    ws.clients.forEach((client) => {
      client.send(JSON.stringify(orderList), {
        "Content-Type": "application/json",
      });
    });
  });

  // 연결 끊기
  wss.on("close", () => {
    // console.log("WebSocket disconnected");
  });
});
