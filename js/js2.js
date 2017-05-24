/*
ACIT2520 Midterm Project
Author: Fan Zhang
Set: 2A
File: js2.js
*/

$(document).ready(function(){
    document.getElementById("save").addEventListener("click",function(){
        var gender= "unknown";
        if(document.getElementById("g").checked){
            gender = "female"
        }else
            gender ="male"
        
        $.ajax({
            url:"/createprofile",
            type:"post",
            data:{
                user:document.getElementById("name").value,
                avatar:document.getElementById("avatar").value,
                gender:gender,
                type:"create1"
            },
            success:function(resp){
                console.log(resp);
              var ndiv = document.createElement("div");  
              var ndiv3 = document.createElement("div");
                ndiv3.innerHTML="Profile edited!"
                var ndiv1 = document.createElement("div");
                ndiv1.innerHTML="Welcome "+resp.userName;
                ndiv1.style.display="inline-block";
                var ndiv2 = document.createElement("img");
                ndiv2.src=resp.avatar;
                ndiv2.style.display="inline-block";
                ndiv.appendChild(ndiv3);
                ndiv.appendChild(ndiv1);
                ndiv.appendChild(ndiv2);
                
                document.getElementById("saveinfo").appendChild(ndiv);
                 
                
                
            }
            
        })
    });
})