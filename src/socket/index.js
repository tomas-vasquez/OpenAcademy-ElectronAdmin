const aux = (socket) => {
  socket.on("connect", (socket) => {
    console.log("connected!!!");
  });

  socket.on("action", (data) => {
    // console.log("data =>>", data);
  });
};

module.exports = aux;
