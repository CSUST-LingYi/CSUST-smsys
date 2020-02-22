/**
 * 
 */
$(function(){


	
   $("#submit_btn").click(function(){
	var student = $("#username").val();
	var password =  $("#password").val();
	var upway =  $("#upway").val();
	if(student.lenght<1 | password.length<1){
		alert("请输入账号或密码");
	}else{
		$.ajax({
			url:"login",
			type:"post",
			dataType:"text",
			scriptCharset:"utf-8",
			data:{"username":student,
				"password":password,
				"upway":upway},				
			success:function(data){				
				switch(data){
				  case 'l':alert("账号密码不正确");break;
				  case 'a':window.location.href="a";break;
				  case 's':window.location.href="studyDept/study-home";break;
				  case 'b':window.location.href="b";break;
				  case 'm':window.location.href="monitor/monitorIndex";break;
				  }

				},
		 error:function(){
			 alert("登录出错");
		 }
			
		})
	}

   })

})


$(function(){
	$("#teacherTable").click(function(){
		 $("#teacherInfo").modal({
		       backdrop:"static",
	         })
	         
	         $.ajax({
	        	 url:"listTeacherInfo",
	        	 type:"get",
	        	 dataType:"json",
	        	 scriptCharset:"utf-8",
	        	 success:function(data){
	        		 var table = $("#teacher_Table");
	        		     table.html("");
	        		 for(var i = 0;i<data.length;i++){
	        			 var tr = $("<tr></tr>");
	        			     tr.html("<td>"+data[i].teacherName+"</td><td>"+data[i].position+"</td><td>"+data[i].officeSpace+"</td><td>"+data[i].responsibility+"</td><td>"+data[i].phone+"</td>");
	        		     table.append(tr);
	        		 }
	        	 }
	        		 
	         })
	})
})