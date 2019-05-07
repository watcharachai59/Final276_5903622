var io = require('socket.io')(process.env.port || 3000);
console.log("server started");
var Random = 0;
io.on("connection",function(socket){
    console.log("Client connected");
    Random = Math.floor(Math.random()*5);
    socket.on("send",function(num){
        if(num.textin == Random)
        {
            socket.emit("win");
            socket.broadcast.emit('Over');
            Random = Math.floor(Math.random()*5);
        }else if (num.textin > Random)
        {
            data = {
                Textout:"มากไป"
            }
            socket.emit("miss",data);
        }else if (num.textin < Random)
        {
            data2 = {
                Textout:"น้อยไป"
            }
            socket.emit("miss",data2);
        }
        


    });
    socket.on("win",function()
    {
        console.log("miss");
    });
    socket.on("disconnect",function()
    {
        console.log("mclient disconnectiss");
    });
})