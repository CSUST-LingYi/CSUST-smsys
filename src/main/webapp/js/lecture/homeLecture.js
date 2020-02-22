
   

$(function(){
	$('.close,.closeModal').click(function(){
		$('.modal').hide('fast');
	})
	//查询最新的4个讲座
	listLecture();
	
	getLectureByPriority();
			
	$("#btn_login").click(function(){
		$("#loginModal").show('fast');
	})
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
		                  case 'b':alert("登录成功");$("#loginModal").hide();break;
						  }

						},
				 error:function(){
					 alert("登录出错");
				 }
					
				})
			}
		})
		$("#aboutus").click(function () {
			$("#aboutus_model").show();
        })
		$('#sure-popup').click(function () {
            $("#aboutus_model").hide();
        })
})


function compileStr(code){ //对字符串进行加密
  var c=String.fromCharCode(code.charCodeAt(0)+code.length);
 for(var i=1;i<code.length;i++)
  {      
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
 }   
 return escape(c);  
 }

//查询最新的4个讲座
function listLecture(){
	$.ajax({
		type: "get",
		url: "./lecture/listLecture",
		contentType:"text/html; charset=utf-8",
		dataType: "json",
		data: {
			"start": "0",
			"end": "3"
		},
		success: function(data) {
          
			if(data == '' || data == null) {
				alert('暂无讲座信息');
				return;
			}
			var div = $('#lectureDiv').empty();
			for(var i in data) {
				
				if(data[i].imagePath==null){
				var	imagePath = "lecture/lecture.jpg";	
				}else{
				var	imagePath = data[i].imagePath;
				}
				
              var Tdiv = $('<div class="talk" style="margin-top: 10px;"></div>');
                  var pdiv = $('<div class="pic"style="margin-top: 10px;"></div>');
			          pdiv.append("<a href='lectureDetails?"+compileStr((data[i].id*99+56).toString())+"'><img src='"+imagePath+"' width='290' height='100'/></a>")
			      var idiv = $('<div class="info"></div>');
			          var itdiv = $('<div class="info-title" style="margin-left: 70px;"></div>');
			              itdiv.append("<h4 style='font-weight: bold;'><a href='lectureDetails?"+compileStr((data[i].id*99+56).toString())+"'>"+data[i].title+"</a></h4>");
			          var iddiv =$("<div class='info-detail' style='margin-left: 70px;'></div>");
			              iddiv.append("<p>时间："+data[i].holdTime+"</p>");
			              iddiv.append("<p>地点："+data[i].location+"</p>");
			          var icdiv = $('<div class="info-count"style="margin-left: 85px;border-bottom:1px solid darkblue;">');
			              icdiv.append("<span>"+data[i].number+"人报名</span> | ");
			              icdiv.append("<span>可报名"+(data[i].limitNumber-data[i].number)+"人</span>");
			         idiv.append(itdiv);
			         idiv.append(iddiv);
			         idiv.append(icdiv);
			      Tdiv.append(pdiv);
			      Tdiv.append(idiv);
			  div.append(Tdiv);
			}
			
		},
		error: function() {
			alert("获取失败");

		}
	});
}

//查询精品讲座
function getLectureByPriority(){
	$.ajax({
		type: "get",
		url: "./lecture/getLectureByPriority",
        contentType:"text/html; charset=utf-8",
		dataType: "json",
		success:function(data){
			if(data == '' || data == null) {
				alert('暂无讲座信息');
				return;
			}
			var div = $("#topPriority");
			    div.empty();
			    
			for(var i in data){
				
				if(data[i].imagePath==null){
					var imagePath = "lecture/lecture.jpg";	
				}else{
					var imagePath = data[i].imagePath;
				}
				
				var adiv = $("<div></div>")
				    var h5 = $("<h5></h5>");
				        h5.append('<span class="recommended-icon">精</span>');
				        h5.append('<a href="lectureDetails?'+compileStr((data[i].id*99+56).toString())+'" style="margin-left: 8px;">'+data[i].title+'</a>');
				    adiv.append(h5);
				    adiv.append("<a href='lectureDetails?"+compileStr((data[i].id*99+56).toString())+"'><img src='"+imagePath+"' width='300' height='100'/></a>");
				    adiv.append('<p>'+data[i].introduction+'</p>');
				    
			    div.append(adiv);
			}
			
		},
		error:function(){
			alert("服务器出错，请联系管理员!");
		}
	})
}

