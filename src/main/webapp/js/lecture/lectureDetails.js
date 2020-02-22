//字符串进行解密 
function uncompileStr(code){      
 code=unescape(code);      
 var c=String.fromCharCode(code.charCodeAt(0)-code.length);      
 for(var i=1;i<code.length;i++)
 {      
  c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));      
 }      
 return c; 
 
}

//查看单个讲座的详情
function showDetail(id) {

	$.ajax({
		type: "get",
		url: "./lecture/getLecture",
		async: false,
		data: {
			"id": id
		},
		dataType: "json",
		success: function(data) {
		//  console.log(data);
		  $("#title").html(data.title);
		  $("#title_top").html(data.title);
		  $("#speaker").html(data.speaker);
		  $("#speakerIntroduction").html(data.speakerIntroduction);
		  $("#introduction").html(data.introduction);
		  
		  var date = new Date(data.deadlineTime);
		  d=date.format('yyyy-MM-dd hh:mm');
		  $("#deadlineTime").append(d);
		  $("#deadline_Time").val(data.deadlineTime);
		  $("#holdTime").append(data.holdTime);
		  $("#location").append(data.location);
		  if(data.imagePath==null){
			  var	imagePath = "lecture/lecture.jpg";	
			}else{
			  var	imagePath = data.imagePath;
			}
		  $("#lectureImg").attr("src",imagePath);
		  
		  getLectureBySpeaker(data.speaker);
		}
	});
}

//报名讲座
function signUp() {
		        	
	var lid = $("#lid").val();
	var status = "已报名";
	if(lid == null || lid == '') {
		return;
	}
	
	var ddate = $("#deadline_Time").val();
	var nowTime = new Date();
	    
	    if(ddate<nowTime.getTime()){
		   alert("已过报名期限");
		 return false;
	  }
	
	$.ajax({
		type: "post",
		url: "./lecture/addRegistration",
		async: true,
		data: {
			"lid": lid,
			"status": status
		},
		dataType:"text",
		success: function(data) {
               if(data == "请勿重复报名" | data == "success" |data == "已过报名期限"){
                	alert(data);
               }else{
                	alert("请先登录");
                	$("#loginModal").modal('show');
               }
				
		},
		error: function() {
			alert("报名失败，请检查网络是否故障或是否已报名");
		}
	});
}

//主讲人往期讲座查询
function getLectureBySpeaker(speaker){
	$.ajax({
		type: "post",
		url: "./lecture/getLectureBySpeaker",
		dataType: "json",
		data:{
			"speaker":speaker,
		},
		success:function(data){
			var div = $("#speakerLecture");
			    div.empty();
			if(data == '' || data == null) {
				div.append("暂无讲座信息");
					return;
				}
			    
			for(var i in data){
				
				if(data[i].imagePath==null){
					var imagePath = "lecture/lecture.jpg";	
				}else{
					var imagePath = data[i].imagePath;
				}
				var mdiv = $('<div style="margin-top: 15px;">');
				    mdiv.append('<a href="lectureDetails?'+compileStr((data[i].id*99+56).toString())+'" style="margin-left: 8px;">'+data[i].title+'</a>');
				    mdiv.append("<a href='lectureDetails?"+compileStr((data[i].id*99+56).toString())+"'><img src='"+imagePath+"' width='300' height='100'/></a>");
				    mdiv.append('<p>'+data[i].introduction+'</p>');
				    
				div.append(mdiv);

			}
			
		},
		error:function(){
			alert("服务器出错，请联系管理员!");
		}
	})
}

$(function(){
	 var url= location.search;
	 var id = url.substr(1);
	     id = (parseInt(uncompileStr(id))-56)/99;
	     
	  if(isNaN(id)){
	  	alert("该讲座信息不存在");
	  //	window.location.href="indexpage.html";
	  }else{
	  	showDetail(id);
	  	$("#lid").val(id);
	  }
	  
	 $("#login").click(function(){
	 	var userName = $("#userName").val();
	    var password =  $("#password").val();

	    if(userName.lenght<1 | password.length<1){
		      alert("请输入账号或密码");
	      }else{
		    $.ajax({
			   url:"./login",
			   type:"post",
			   dataType:"text",
			   scriptCharset:"utf-8",
			   data:{"username":userName,
				     "password":password,
			 },
			success:function(data){				
				switch(data){
				  case 'l':alert("账号密码不正确");break;
                  case 'b':alert("登录成功");$("#loginModal").modal('hide');break;
				  }

				},
		 error:function(){
			 alert("登录出错");
		 }
			
		})
	}
	 })
	  var registrationTime = $("#deadline_Time").val();
	  var nowTime = new Date();
	  	if(registrationTime<nowTime.getTime()){
			$('#registrationBtn').prop("disabled",true).text("报名已截止").css("backgroundColor","orange");

		}
})

function compileStr(code){ //对字符串进行加密
  var c=String.fromCharCode(code.charCodeAt(0)+code.length);
 for(var i=1;i<code.length;i++)
  {      
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
 }   
 return escape(c);  
 }
//处理json的时间
Date.prototype.format =function(format)
{
var o = {
"M+" : this.getMonth()+1, //month
"d+" : this.getDate(), //day
"h+" : this.getHours(), //hour
"m+" : this.getMinutes(), //minute
"s+" : this.getSeconds(), //second
"q+" : Math.floor((this.getMonth()+3)/3), //quarter
"S" : this.getMilliseconds() //millisecond
}
if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
(this.getFullYear()+"").substr(4- RegExp.$1.length));
for(var k in o)if(new RegExp("("+ k +")").test(format))
format = format.replace(RegExp.$1,
RegExp.$1.length==1? o[k] :
("00"+ o[k]).substr((""+ o[k]).length));
return format;
}