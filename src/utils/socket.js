const socketHandler = io => {
    io.on("connection", socket => {
        console.log(`[SOCKET] ${socket.id} Connected`);
        
        socket.on("disconnect", () => {
            console.log(`[SOCKET] ${socket.id} Disconnected`);
        });

        socket.on("joinRoom", roomId => {
            socket.join(roomId);
            console.log(`[SOCKET] ${socket.id} joined ${roomId}`);
        });

        socket.on("leaveRoom", roomId => {
            socket.leave(roomId);
            console.log(`[SERVER] ${socket.id} left ${roomId}`);
        });

        socket.on("newAdvert", advert => {
            socket.broadcast.to("advert").emit("newAdvert", advert);
            console.log(`[SOCKET] ${socket.id} published advertisement with id: ${advert._id}`);
        });

        socket.on("newTx", (roomId, msg) => {
            socket.broadcast.to(roomId).emit("newTx", msg);
            console.log(`[SOCKET] ${socket.id} transfered amount to ${roomId}`);
        });

        socket.on("notify", (roomId, msg) => {
            socket.broadcast.to(roomId).emit("notify", msg);
            console.log(`[SOCKET] ${socket.id} notified ${roomId}`);
        });

        socket.on("follow", (roomId, userId) => {
            socket.broadcast.to(roomId).emit("follow", userId);
            console.log(`[SOCKET] ${socket.id} followed ${roomId}`);
        });

        socket.on("unfollow", (roomId, userId) => {
            socket.broadcast.to(roomId).emit("unfollow", userId);
            console.log(`[SOCKET] ${socket.id} unfollowed ${roomId}`);
        });
    });
};

module.exports = socketHandler;
