const socketIo = require("socket.io");

module.exports = (server) => {
  const io = socketIo(server, {
    origin: "https://k8c208.p.ssafy.io:5000",
    credentials: true,
    path: "/socket.io",
    transport: ["websocket"],
  });

  // 주문 대기열
  let queue = [];

  // 클라이언트의 주문 데이터를 queue에 추가하는 함수
  const addOrderToQueue = (socketId, orderData) => {
    const order = {
      socketId,
      name: orderData.name,
      from: orderData.from,
      to: orderData.to,
    };
    queue.push(order);
  };

  // 주문 대기열의 데이터가 변동될 때마다 이를 모든 클라이언트들에게 전송하는 함수
  const updateQueue = () => {
    io.emit("update", queue);
  };

  io.on("connection", (socket) => {
    console.log("클라이언트가 접속했습니다.");

    // 주문 요청 처리
    socket.on("order", (orderData) => {
      addOrderToQueue(socket.id, orderData);
      console.log("order!!!");
      const waitingNumber = queue.length;
      socket.emit("waiting", waitingNumber);
      updateQueue(); // 주문 대기열 데이터가 변동됐으므로 모든 클라이언트들에게 전송
    });

    // 주문 취소 처리
    socket.on("cancel", () => {
      const order = queue.find((order) => order.socketId === socket.id);
      if (order) {
        const index = queue.indexOf(order);
        queue.splice(index, 1);
        console.log("cancel");

        // 취소한 클라이언트의 대기순번 업데이트
        socket.emit("waiting", 0);

        // 취소한 클라이언트 뒤의 대기순번 감소
        for (let i = index; i < queue.length; i++) {
          io.to(queue[i].socketId).emit("waiting", i + 1);
        }

        updateQueue(); // 주문 대기열 데이터가 변동됐으므로 모든 클라이언트들에게 전송
      }
    });

    // 클라이언트 접속 종료 처리
    socket.on("disconnect", () => {
      const order = queue.find((order) => order.socketId === socket.id);
      if (order) {
        const index = queue.indexOf(order);
        queue.splice(index, 1);
        updateQueue(); // 주문 대기열 데이터가 변동됐으므로 모든 클라이언트들에게 전송
      }
      console.log("클라이언트가 접속을 종료했습니다.");
    });

    socket.interval = setInterval(() => {
      socket.emit("news", "Hello Socket.IO");
    }, 3000);
  });
};
