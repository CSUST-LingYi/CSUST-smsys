/**
 * 
 */

function lectureDiv(list){
	if(list == '' || list == null) {
		alert('暂无讲座信息');
		return;
	}
	var div = $('#lectureDiv').empty();
	
	for(var i in list){
		if(list[i].imagePath==null){
			var imagePath = "lecture/lecture.jpg";	
		}else{
			var imagePath = list[i].imagePath;
		}
		var Tdiv = $('<div class="talk" style="margin-top: 10px;"></div>');
		    var pdiv = $('<div class="pic"style="margin-top: 10px;"></div>');
		        pdiv.append("<a href='lectureDetails?"+compileStr((list[i].id*99+56).toString())+"'><img src='"+imagePath+"' width='290' height='125'/></a>")
	       
		    var idiv = $('<div class="info"></div>');
		        var itdiv = $('<div class="info-title" style="margin-left: 30px;"></div>');
		            itdiv.append("<h4 style='font-weight: bold;'><a href='lectureDetails?"+compileStr((list[i].id*99+56).toString())+"'>"+list[i].title+"</a></h4>");
		        var iddiv = $('<div style="margin-left: 30px;"></div>');
		            iddiv.append("<p>时间："+list[i].holdTime+"</p>");
		            iddiv.append("<p class='introduce'>简介："+list[i].introduction+"</p>");
		        idiv.append(itdiv);
		        idiv.append(iddiv);
		    Tdiv.append(pdiv);
		    Tdiv.append(idiv);
		 div.append(Tdiv);
	}
}


function getLectureByPage(page,num){
	$.ajax({
		type: "get",
		url: "./lecture/getLectureByPage",
		dataType: "json",
		data: {
			"start": page,
			"end": num
		},
		success: function(data) {
		//	console.log(data);

			lectureDiv(data.list);
			
			var ul = $("#turnpage ul");
			    ul.html(" ");
			    ul.addClass("pagination");
			    var firstPage  = $("<li></li>").append($("<a>首</a>"));
			    var prePage = $("<li></li>").append($("<a><</a>"));
			    if(data.hasPreviousPage == false){
 	              	firstPage.addClass("disabled");
 	              	prePage.addClass("disabled");
 	               }else{
 	                firstPage.click(function(){
 	                	getLectureByPage(1,num);
 	                })
 	                prePage.click(function(){
 	                	getLectureByPage(data.pageNum-1,num);
 	                })
 	               }
			    ul.append(firstPage);
			    ul.append(prePage);
			    
			    var nextPage = $("<li></li>").append($("<a>></a>"));
			    var lastPage = $("<li></li>").append($("<a>尾</a>"));
			    if(data.hasNextPage == false){
	               	  nextPage.addClass("disabled");
	               	  lastPage.addClass("disabled");
	               }else{
	            	   nextPage.click(function(){
	            		   getLectureByPage(data.pageNum+1,num);
	            	   })
	            	   lastPage.click(function(){
	            		   getLectureByPage(data.pages,num);
	            	   })
	               }
			  $.each(data.navigatepageNums,function(index,item){
				  var li = $("<li></li>");
				      li.append("<a>"+item+"</a>");
				  if(data.pageNum ==item ){
					li.addClass("active");
				 }
				    li.click(function(){
					 getLectureByPage(item,num);
				   })
				ul.append(li);
			})
			ul.append(nextPage);
			ul.append(lastPage);
			
		},
		error: function() {
			alert("获取失败");
		}
	});
}
//关键字查询讲座
function searchByKeyWord() {
	var keyword = document.getElementById('InputKeyword').value;
	if(keyword == null || keyword == '')
		alert("请输入要查询的讲座");
	else {

		$.ajax({
			type: "post",
			url: "./lecture/getLectureByKeyWord",
			async: true,
			data: {
				"keyWord": keyword
			},
			success: function(data) {
				console.log(data);
				var div = $('#lectureDiv').empty();
				$("#turnpage").hide();
				if(data == null || data == '') {
					alert("搜索不到相关讲座，请修改关键词后重试");
					return;
				}
				lectureDiv(data);

			},
			error: function() {
				alert("服务器故障，查询失败");
			}
		});
	}
}

$(function(){
		
	  getLectureByPage(1,10);
	
		  $("#btn_login").click(function(){
				$("#loginModal").modal('show');
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
				                  case 'b':alert("登录成功");$("#loginModal").modal('hide');break;
								  }

								},
						 error:function(){
							 alert("登录出错");
						 }
							
						})
					}
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