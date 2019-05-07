var port = process.env.PORT || 3000;
var io = require('socket.io')(port);
console.log("server started"+port);
var Random = 0;
io.on("connection",function(socket){
    console.log("Client connected");
    Random = Math.floor(Math.random()*3);
    socket.on("send",function(num){
        if(num.textin == Random)
        {
            socket.emit("win");
            socket.broadcast.emit('Over');
            Random = Math.floor(Math.random()*3);
        }else if (num.textin > Random)
        {
            data = {
                Textout:" มากไป "
            }
            socket.emit("miss",data);
        }else if (num.textin < Random)
        {
            data2 = {
                Textout:" น้อยไป "
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
        console.log("client disconnectiss");
    });
})