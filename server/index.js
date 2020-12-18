const express = require("express");
const { PORT } = require('./config');
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/connectDB");
const cors = require("cors");


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: '*'
    }
});

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
io.on('connection', (socket) => {
    // socket.on('set-email', (email) => {
    //     i++;
    //     socket.email = email;
    //     console.log(socket.email);
    //     io.emit("check-online",i);  
    //     console.log("So nguoi ket noi",i);
    // })
    // socket.on("logout", (data) =>{
    //     i-=data;
    //     console.log("So nguoi con lai", i);
    // })
})

app.use('/', require('./routes/user.js'));
app.use("/admin", require("./routes/admin.js"));

server.listen(PORT,connectDB, ()=>{
    console.log(`Server run at ${PORT}`);
})