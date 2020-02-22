
function myFunction(classno){		
	var xuenian = document.getElementById("xuenian").value;
	var nianji = document.getElementById("nianji").value;
	var major = document.getElementById("major").value;
	$.ajax({
   type:"post",
   url: "../studyDept/getClassCheckSummary",
   data:{"xuenian":xuenian,
		      "major":major,
		      "nianji":nianji
		},

   dataType:"json",
   success: function(data){
      
      for(var i=0;i<data.length;i++){ 
      	var cName = data[i].className;	
      	if(cName == classno){       	
      	var num = data[i].count;
      	var check = data[i].isCheckcount; 
      	var notcheck = num-check;     		
      	var string = " 本班共"+num+"人  已审核"+check+"人   未审核"+notcheck+"人 "+"  点击图片可查看具体情况";
        confirm(string);
       
      }
      }
   },
   error :function(){
   	alert("error");
   }
   
});
}

function  search(){	
	var xuenian = document.getElementById("xuenian").value;
	var nianji = document.getElementById("nianji").value;
	var major = document.getElementById("major").value;
	$.ajax({
   type:"post",
   url: "../studyDept/getClassCheckSummary",
   data:{"xuenian":xuenian,
		      "major":major,
		      "nianji":nianji
		},

   dataType:"json",
   success: function(data){    
      console.log(data);
      var div = $("#content");
      div.html(" ");
      	var rsdiv = $("<div class='responsive'></div>");
      for(var i=0;i<data.length;i++){   
      
      	var cName = data[i].className;
      	var num = data[i].count;
      	var check = data[i].isCheckcount;
        var href = "individual-review.html?xuenian="+xuenian+"&nianji="+nianji+"&major="+major+"&classno="+cName;
      	var proportion = check/num;
      	proportion = Number(proportion).toFixed(2);
      	proportion = Number(proportion*100).toFixed(0);
      	//proportion显示审核进度条
      	//console.log(num);console.log(check);console.log(proportion);
      	if(cName!=0){
		var imgdiv = $("<div class='img'></div>");
        imgdiv.append('<a href="'+href+'"><img src="../img/12.jpg" alt="Mountains" width="600" height="400"></a>');
      	var bdiv = $("<div class='desc'></div>");
      	
      	if(cName==10){
      		bdiv.append('<button id="classname" onclick="myFunction('+cName+')">'+"会计金融双学位班"+'</button>');     	
      	}
      	else if(cName==11){
      		bdiv.append('<button id="classname" onclick="myFunction('+cName+')">'+"卓越会计师班"+'</button>');
      	}
      	else if(cName==12){
      		bdiv.append('<button id="classname" onclick="myFunction('+cName+')">'+"中法班"+'</button>');
      	
      	}
      	else
      	bdiv.append('<button id="classname" onclick="myFunction('+cName+')">'+major+cName+"班"+'</button>');
      	
      	if(proportion<30){
        var pdiv = $("<div class='progress'></div>");
        var pbdiv = $("<div class='progress-bar' role='progressbar' aria-valuenow='60'aria-valuemin='0' aria-valuemax='100' style='width:"+proportion+"%;' ></div>");     
        pbdiv.append('<p style=" color: coral;">'+proportion+'%</p>');
        pdiv.append(pbdiv);
       }
      	else{
        var pdiv = $("<div class='progress'></div>");
        var pbdiv = $("<div class='progress-bar' role='progressbar' aria-valuenow='60'aria-valuemin='0' aria-valuemax='100' style='width:"+proportion+"%;' ></div>");     
        pbdiv.append('<p style=" color: coral;">审核进度'+proportion+'%</p>');
        pdiv.append(pbdiv);
      	}
        imgdiv.append(bdiv);
        imgdiv.append(pdiv);       
        rsdiv.append(imgdiv);       
       }
      }
      div.append(rsdiv);
   },
   error :function(){
   	alert("error");
   }
});	 
}

