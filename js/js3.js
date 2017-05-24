/*
ACIT2520 Midterm Project
Author: Fan Zhang
Set: 2A
File: js3.js
*/

$(document).ready(function(){
  //ajax to get the existing room list
    $.ajax({
        url:"/createtopic",
        type:"post",
        data:{
            type:"read"
        },
        success:function(resp){
            console.log(resp);
            for(var i=0; i<resp.arr.length-1;i++){
                for(var j=0; j<resp.arr[i].length;j++){
                 var  table1=document.createElement('table');
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                
                var icon=document.createElement("img");
             var title=document.createTextNode(resp.arr[i][j].topicTitle);
             var desc=document.createTextNode(resp.arr[i][j].topicDescription);
                var ndiv1=document.createElement("div");
                var ndiv2=document.createElement("div");
                var ndiv=document.createElement("div");
                icon.src="/img/"+(i+1)+".jpg";
                ndiv1.style.fontWeight="bold";
                ndiv1.style.fontSize="2em";
                ndiv2.style.fontSize="1em";
                ndiv1.appendChild(title);
                ndiv.appendChild(ndiv1);
                ndiv2.appendChild(desc);
                ndiv.appendChild(ndiv2);
                //fill the table1 with icon and title, description
                td1.appendChild(icon);
                 tr.appendChild(td1);
                td2.appendChild(ndiv);
               tr.appendChild(td2);
                table1.appendChild(tr);
                document.getElementById("content").appendChild(table1);
             //save number to ndiv property 
             table1.roomtype=i+1;
              table1.roomindex=j+1;
                
                //ndiv.roomindex=i; 
                table1.addEventListener("click",function(){
                location.href="/createtopic/"+this.roomtype+"/"+this.roomindex;
                });
                }
            }
            for(var i=0;i<resp.arr[3].length;i++){
                var ndiv=document.createElement("div");
                var ndiv1=document.createElement("img");
                ndiv1.src=resp.arr[3][i].imgurl;
                ndiv.appendChild(ndiv1);
               var ndiv2=document.createElement("div");
                ndiv2.style.display="inline-block";
                var ndiv3=document.createElement("div");
                ndiv3.innerHTML=resp.arr[3][i].topicTitle;
                ndiv2.appendChild(ndiv3);
                var ndiv4=document.createElement("div");
                 ndiv4.innerHTML=resp.arr[3][i].topicDescription;
                ndiv2.appendChild(ndiv4);
                ndiv.appendChild(ndiv2);
                document.getElementById("content").appendChild(ndiv);
                ndiv.roomindex=i+1;
            ndiv.addEventListener("click",function(){
                location.href="/createtopic/"+"4/"+ndiv.roomindex;
                });
            }
        }
    })
    
    

    document.getElementById("submit").addEventListener("click",function(){
       var e = document.getElementById("category");
        if(e.value!=4){
        $.ajax({
            url:"/createtopic",
            type:"post",
            data:{
            roomtype: e.value,
      
        title:document.getElementById("title").value,
             description:document.getElementById("description").value ,
             type:"create"
            
        },
            success:function(resp){
               /** var opinions=resp.arr1;
                var questions=resp.arr2;
                var help=resp.arr3;
                for(var i=0;i<opinions.length;i++){**/
                console.log(resp);
                var table1=document.createElement('table');
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                
                var icon=document.createElement("img");
                var title=document.createTextNode(resp.title);
                var desc=document.createTextNode(resp.descrip);
                var ndiv1=document.createElement("div");
                var ndiv2=document.createElement("div");
                var ndiv=document.createElement("div");
                icon.src=resp.imgurl;
                ndiv1.style.fontWeight="bold";
                ndiv1.style.fontSize="2em";
                ndiv2.style.fontSize="1em";
                ndiv1.appendChild(title);
                ndiv.appendChild(ndiv1);
                ndiv2.appendChild(desc);
                ndiv.appendChild(ndiv2);
                //fill the table1 with icon and title, description
                td1.appendChild(icon);
                 tr.appendChild(td1);
                td2.appendChild(ndiv);
               tr.appendChild(td2);
                table1.appendChild(tr);
                document.getElementById("content").appendChild(table1);
           
                
                //ndiv.roomindex=i;
                table1.addEventListener("click",function(){
                location.href="/createtopic/"+resp.roomtype+"/"+resp.roomindex;
                });
                }
            })
          }
        else{
            
            $.ajax({
            url:"/createtopic",
            type:"post",
            data:{
            roomtype: e.value,
      
           title:document.getElementById("title").value,
             description:document.getElementById("description").value ,
            imgurl:document.getElementById("url_link").value,
            
             type:"create"
            
        },
            success:function(resp){
               /** var opinions=resp.arr1;
                var questions=resp.arr2;
                var help=resp.arr3;
                for(var i=0;i<opinions.length;i++){**/
                console.log(resp);
                var table1=document.createElement('table');
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                
                var icon=document.createElement("img");
                var title=document.createTextNode(resp.title);
                var desc=document.createTextNode(resp.descrip);
                var ndiv1=document.createElement("div");
                var ndiv2=document.createElement("div");
                var ndiv=document.createElement("div");
                icon.src=resp.imgurl;
                ndiv1.style.fontWeight="bold";
                ndiv1.style.fontSize="2em";
                ndiv2.style.fontSize="1em";
                ndiv1.appendChild(title);
                ndiv.appendChild(ndiv1);
                ndiv2.appendChild(desc);
                ndiv.appendChild(ndiv2);
                //fill the table1 with icon and title, description
                td1.appendChild(icon);
                 tr.appendChild(td1);
                td2.appendChild(ndiv);
               tr.appendChild(td2);
                table1.appendChild(tr);
                document.getElementById("content").appendChild(table1);
           
                
                //ndiv.roomindex=i;
                table1.addEventListener("click",function(){
                location.href="/createtopic/"+"4/"+resp.roomindex;
                });
                }
            })
         }
        });
    });
    
    
    
    
