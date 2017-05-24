/*
ACIT2520 Midterm Project
Author: Fan Zhang
Set: 2A
File: index.js
*/


const express = require("express");
const port = process.env.PORT||10000;
const path = require("path");
const bodyParser = require("body-parser");
const session =require("express-session");


var pF =path.resolve(__dirname,"public");
//var imgF=path.resolve(__dirname,"img");
var app = express();
/*var opinionsRooms=[];
/var questionsRooms=[];
var helpRooms=[];*/
var allrooms= new Array(4);
 allrooms[0]=[];
 allrooms[1]=[];
allrooms[2]=[];
allrooms[3]=[];
var info={userName:"unknown",
         avatar:"unknown",
         gender:"unknown",
         password:""}; //session info array
var users=[];
var roominfo={};
var existflag = 0;

 var chatcontents=new Array();
 chatcontents[0]=[];
 chatcontents[1]=[];
chatcontents[2]=[];


//create a new server for socket combine with express
const server=require("http").createServer(app);
//create socket server with the new server
var io = require("socket.io")(server);
app.use("/scripts",express.static("build"));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(session({
    secret:"1",
    resave:true,
    saveUninitialized:true
}));
app.use("/img",express.static("img"));
app.use("/css",express.static("css"));
app.use("/public",express.static("public"));

app.get("/",function(req,resp){
    resp.sendFile(pF+"/main.html");
});
app.post("/",function(req,resp){
    console.log("fantesting---2" + users);
    for(var i=0; i<users.length;i++){
        if(req.body.name==users[i].name&&req.body.password==users[i].password){
            console.log(users[i]);
            info={userName:users[i].name,
                 avatar:users[i].avatar,
                 gender:users[i].gender,
                 password:users[i].password};
            existflag = 1;
            break;
        }
        else{
            existflag = 0;
        }
    }
    
    if(existflag==1){
        resp.send({
            exist:"true",
            arr:users[i]
        });
    }else{
        resp.send({
            exist:"false"
        })
    }
    
});
app.get("/createprofile",function(req,resp){
    resp.sendFile(pF+"/editProfile.html");
   
});
app.post("/createprofile",function(req,resp){
    if(req.body.type=="create1"){
        req.session.username=req.body.user;
        req.session.avatarlink=req.body.avatar;
        req.session.gender=req.body.gender;

        info ={
            userName:req.session.username,
            avatar:req.session.avatarlink,
            gender:req.session.gender
       }
        console.log(info);
        resp.send(info);
    }else if(req.body.type=="create2"){
        req.session.password= req.body.password;
        info.password=req.session.password;
        users.push({
            name: info.userName,
            avatar: info.avatar,
            gender: info.gender,
            password: info.password
        });
        console.log(info);
        console.log(users);
        resp.send(info);
            
    }
});
app.get("/createtopic",function(req,resp){
    resp.sendFile(pF+"/createTopic.html");
})
app.post("/createtopic",function(req,resp){
    if(req.body.type=="create"){
      if(req.body.roomtype!=4)
       { 
        var index= req.body.roomtype-1;
        allrooms[index].push({
            topicTitle: req.body.title,
            topicDescription:req.body.description,
            chatcontents:[]
        });
       
        resp.send({
            title: req.body.title,
            descrip: req.body.description,
            //imgurl:"/img/1.jpg"
            imgurl:"/img/"+req.body.roomtype+".jpg",
            roomindex:allrooms[index].length,
            roomtype:index+1
        });
       }
         else{
            allrooms[3].push({
                topicTitle: req.body.title,
             topicDescription:req.body.description,
            chatcontents:[],
                imgurl:req.body.imgurl
            });
              resp.send({
            title: req.body.title,
            descrip: req.body.description,
            //imgurl:"/img/1.jpg"
            imgurl:req.body.imgurl,
            roomindex:allrooms[3].length,
            roomtype:index+1
        });
        }
    }else if(req.body.type=="read"){
        resp.send({
            arr:allrooms
        });
    }

});
app.get("/createtopic/:type/:roomnumber", function(req,resp){
    var i = req.params.type-1;
    var j= req.params.roomnumber-1;
     roominfo ={
        roomtype: req.params.type,
        roomnumber: req.params.roomnumber, 
        topic: allrooms[i][j].topicTitle,
        descrip:allrooms[i][j].topicDescription
    };
   // console.log(roominfo);
   // console.log(allrooms);
    resp.sendFile(pF+"/chat.html");
    
});
app.post("/createtopic/:type/:roomnumber", function(req,resp){
  
   // console.log(info);
    if(req.body.type=="read"){
        if(roominfo.roomtype!=4){
      resp.send({
          arr1 : roominfo,
          arr2 :  allrooms[roominfo.roomtype-1][roominfo.roomnumber-1].chatcontents
      });
    }else{
        resp.send({
          arr1 : roominfo,
          arr2 :  allrooms[roominfo.roomtype-1][roominfo.roomnumber-1].chatcontents,
          url : allrooms[3][roominfo.roomnumber-1].imgurl
      });
    }
    }
    else if(req.body.type=="create"){
     allrooms[roominfo.roomtype-1][roominfo.roomnumber-1].
        chatcontents.push({
           who:info.userName,
            icon:info.avatar,
            what: req.body.contents,
         gender: info.gender
        });
  console.log(allrooms[roominfo.roomtype-1][roominfo.roomnumber-1]. chatcontents);
        resp.send({
            arr1: roominfo,
            arr2: allrooms[roominfo.roomtype-1][roominfo.roomnumber-1].chatcontents
        });
    }
});
io.on("connection",function(socket){
    socket.on("joinroom",function(roomtype,roomnumber){
        socket.roomId="room"+roomtype+roomnumber;
        socket.join(socket.roomId);
    });
    socket.on("send message",function(obj){
        io.to(socket.roomId).emit("create message",obj);
        
    });
    socket.on("disconnect", function(){
        
    });
});
server.listen(port,function(err){
    if(err){
        console.log(err);
        return false;
    }
        console.log("port is open"+port);
});