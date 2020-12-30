const aux = (socket) => {
  socket.on("connect", () => {
    alert("connectido");
  });
};

module.exports = aux;
