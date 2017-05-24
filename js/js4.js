/*
ACIT2520 Midterm Project
Author: Fan Zhang
Set: 2A
File: js4.js
*/

$(document).ready(function(){
             $.ajax({
        url:"/createtopic/:type/:roomnumber",
        type:"post",
        data:{
            type:"read"
        },
        success: function(resp){
           
             console.log(resp);
             var icon=document.createElement("img");
             icon.src="/img/"+resp.arr1.roomtype+".jpg";
    document.getElementById("category").appendChild(icon);
            var ndiv =document.createElement("div");
            ndiv.style.display="inline-block";
            var ndiv1= document.createElement("div");
            ndiv1.innerHTML=resp.arr1.topic;
            ndiv1.style.fontWeight="bold";
            ndiv.appendChild(ndiv1);
           var ndiv2= document.createElement("div");
            ndiv2.innerHTML=resp.arr1.descrip;
            ndiv1.style.fontSize="2em";
            
            ndiv2.style.fontSize="1em";
           ndiv.appendChild(ndiv2);  document.getElementById("category").appendChild(ndiv);
           var showinfo= document.createElement("div");
            if(resp.arr1.roomtype=="1")
           {
               showinfo.innerHTML="You are in forum which is about: OPINIONS." + " You are in room: "+resp.arr1.roomnumber +".";
           } else if(resp.arr1.roomtype=="2"){
                showinfo.innerHTML="You are in forum which is about: QUESTIONS." + " You are in room: "+resp.arr1.roomnumber +".";
           } else if(resp.arr1.roomtype=="3"){
                showinfo.innerHTML="You are in forum which is about: HELP." + " You are in room: "+resp.arr1.roomnumber +".";
           }
            document.getElementById("category").appendChild(showinfo);
            //display all the previous chatcontents
            for(var i=0; i< resp.arr2.length;i++){
               var ndiv= document.createElement("div");
              var ndiv1= document.createElement("div");
                ndiv1.style.display="inline-block";
                ndiv1.innerHTML=resp.arr2[i].who;
                ndiv.appendChild(ndiv1);
                if(resp.arr2[i].icon!="unknown"){
             var ndiv2= document.createElement("img");
                ndiv2.style.display="inline-block";
                
                ndiv2.src=resp.arr2[i].icon;
                ndiv.appendChild(ndiv2);
                }
                var ndiv3= document.createElement("div");
                ndiv3.innerHTML=": "+resp.arr2[i].what;
                 ndiv3.style.display="inline-block";
           
              ndiv.appendChild(ndiv3);
                 document.getElementById("display").appendChild(ndiv);
            
            }
            
            
            
            var socket=io();
            var obj1= resp.arr1;
            socket.emit("join room",obj1);
            cosole.log("join room");
        document.getElementById("send").addEventListener("click",function(){
         })        
     }
 });
    
 });   
