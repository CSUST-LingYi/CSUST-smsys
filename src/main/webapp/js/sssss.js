/**
 * 
 */

//esc关闭加载框
$(document).keyup(function(event){
	 switch(event.keyCode) {
	 case 27:	
		 if($('.loadingBox').css('display')!=='none'){
			 $('.loadingBox').hide();
		 }	 
	 }
});
//更改个人密码
$(function(){
    $("#changeTeacherPwd").click(function(){
        $("#teacherPwd").modal({
            backdrop:"static",
        })

    })
});
$(function() {
    //导出excel表
    $('#ex_normal_search_btn').on('click',function(){
        exportExcel();
    });
});

function exportExcel() {
    var co =  confirm("确认把该搜索结果导出Excel表格（不含高级查询）?");
    if(co){
        var termYear = $("#nianji").val();
        var major = $("#major").val();
        var className = $("#classNo").val();
        if(termYear == "0"){
            alert("请输入年级");
            return false;

        };
        $("#ns_nianji").val(termYear);
        $("#ns_major").val(major);
        $("#ns_classNo").val(className);
        $("#ns_stuType").val("本科生");
        $("#exportNormalSearchExcel").submit();
    }


}

//重置学生的密码
$(function(){
	$("#resetStudentUser").click(function(){
  		$("#StudentUser").modal({
			    backdrop:"static",
		  })
		  $("#selectUserByNo").click(function(){
			  var sno = $("#userStudentNo").val();
			  var stuType = "本科生";
			  if(sno.length!=12){
				  alert("请输入正确的学号")
			  }else{
				  $.ajax({
					  url:"getstuByNo_name",
					  type:"post",
					  data:{"id":sno,
						  "stuType":stuType},
					  dataType:"json",
					  success:function(data){
						  if(data.length==0){
							  alert("不存在该学生")
						  }else{
							  $("#studentUserTable").show();
							  var table = $("#studentUserTable");
							  table.append("<tr><td>"+data[0].studentNo+"</td><td>"+data[0].studentName+"</td><td>"+data[0].major+"</td><td>"+data[0].className+"</td></tr>")
						  }
						  
						  $("#resetpassword").click(function(){
							  $("#resetpassword").attr("disabled", true); 
							  $.ajax({
								  url:"updateStudentPassword",
								  type:"post",
								  data:{"sno":sno},
								  dataType:"text",
								  success:function(data){
									  alert("重置成功");
									  $("#resetpassword").attr("disabled", false); 
								  }
							  })
						  })
					  }
				      
				  })
			  }
		  })
	})
})

//学生请假
$(function(){
	   
	//查询请假信息
	$("#select_leave").click(function(){
		var year = $("#leave_year").val();
		var month = $("#leave_month").val();
		var termYear = $("#leave_termYear").val();
		var time=year+month;
		var stuType = "本科生";
		$.ajax({
			url:"getLeaveByTime",
			type:"post",
			dataType:"json",
			data:{"time":time,
				 "termYear":termYear,
				"stuType":stuType},
 		    scripeCharset:'utf-8',
 		    success:function(data){
 		    	var table = $("#leave_table");
 		    	table.html("");
	   		    for(var i=0; i<data.length;i++){
	   		    	var tr = $("<tr></tr>");
	   		    	if(data[i].status==2){
	   		    		var status = "已批准";
	   		    	}else if(data[i].status==0){
	   		    		var status = "未审批";
	   		    	}else{
	   		    		var status = "未批准";
	   		    	}
	   		    	tr.html("<td>"+data[i].sno+"</td><td>"+data[i].sname+"</td><td>"+data[i].major+"</td><td>"+data[i].classno+"</td><td>"+data[i].leavebegin+"</td><td>"+data[i].leaveend+"</td><td>"+data[i].leavedate+"</td><td>"+data[i].dayofleave+"</td><td>"+data[i].reason+"</td>" +
	   		    			"<td>"+data[i].gowhere+"</td><td>"+data[i].studenttel+"</td><td>"+data[i].parenttel+"</td><td>"+data[i].dormitory+"</td><td>"+data[i].approve+"</td><td>"+status+"</td><td>"+data[i].userName+"</td>");
		   		       if(data[i].status==0){
		   		    	   tr.append("<td><button class='btn-info approve' sid="+data[i].id+">批准</button><button class='btn-danger noapprove' sid="+data[i].id+">不批准</button></td>");
		   		       }
	   		    	table.append(tr);
	   		    }
	   		 $(".noapprove").click(function(){
	      		$("#handleLeavetip").modal({
	 			    backdrop:"static",
	 		  })
	 		  
	 		    		 
	 		    	var id = $(this).attr("sid");
	 		    	var sno = $(this).parent().siblings().eq(0).html();
	 		    	var sname = $(this).parent().siblings().eq(1).html();
	 		    	var major = $(this).parent().siblings().eq(2).html();
	 		    	var classno = $(this).parent().siblings().eq(3).html();
	 		    	var leavebegin = $(this).parent().siblings().eq(4).html();
	 		    	var leaveend = $(this).parent().siblings().eq(5).html();
	 		    	var leavedate = $(this).parent().siblings().eq(6).html();
	 		    	var dayofleave = $(this).parent().siblings().eq(7).html();
	 		    	var reason = $(this).parent().siblings().eq(8).html();
	 		    	var gotowhere = $(this).parent().siblings().eq(9).html();
	 		    	var studenttel = $(this).parent().siblings().eq(10).html();
	 		    	var parenttel = $(this).parent().siblings().eq(11).html();
	 		    	var dormitory  = $(this).parent().siblings().eq(12).html();
	 		    	var status=1;
	 		    		
	 		    	$("#btn_handle").click(function(){
	 		    		var approve = $("#handlePerson").val();
	 		    		if(approve.length==0){
	 		    			alert("处理人必须填写");
	 		    		}else{
	 		    			 $("#btn_handle").attr("disabled", true); 
	 	   		     $.ajax({
	 	   		   	 	url:"handleLeave",
	 	   		   	 	type:"post",
	 	   		   	  	data:{"id":id,
	 	   		   	  		"sno":sno,
	 	   		   	  		"major":major,
	 	   		   	  	"classno":classno,
	 	   		   	    "sname":sname,
	 	   		   	    "studenttel":studenttel,
	 	   		   	    "dormitory":dormitory,
	 	   		   	 "reason":reason,
	 	   		   	    "gowhere":gotowhere,
	 	   		   	    "dayofleave":dayofleave,
	 	   		   	    "parenttel":parenttel,
	 	   		   	 "leavebegin":leavebegin,
	 	   		   	    "leaveend":leaveend,
	 	   		   	    "leavedate":leavedate,
	 	   		   	    "status":status,},
	 	   		   	 	 dataType:"text",
	 	   		   	 	 scriptCharset: 'utf-8',
	 	   		   	 	success:function(data){
	 	   		   	 		alert(data);
	 	   		   	 		//console.log(data);
	 	   		   	 		//console.log("success");
	 	   		   	 		$("#btn_handle").attr("disabled", false); 
	 	   		   	 		$("#handleLeavetip").modal('hide');
	 	   		   	 		},
	 	   	            error:function(){
	 	   	            	alert("提交失败");
	 	   	            	//console.log("fail");
	 	   	            	$("#btn_handle").attr("disabled", false); 
	 	   	            }
	 	   		   	 });	

	 		    		}
	 		    	})
	 		    })
	 		    
	 	 $(".approve").click(function(){
	   		$("#handleLeavetip").modal({
	 			    backdrop:"static",
	 		  });
	 		  
	 		 
	 	    	var id = $(this).attr("sid");
	 	    	var sno = $(this).parent().siblings().eq(0).html();
	 	    	var sname = $(this).parent().siblings().eq(1).html();
	 	    	var major = $(this).parent().siblings().eq(2).html();
	 	    	var classno = $(this).parent().siblings().eq(3).html();
	 	    	var leavebegin = $(this).parent().siblings().eq(4).html();
	 	    	var leaveend = $(this).parent().siblings().eq(5).html();
	 	    	var leavedate = $(this).parent().siblings().eq(6).html();
	 	    	var dayofleave = $(this).parent().siblings().eq(7).html();
	 	    	var reason = $(this).parent().siblings().eq(8).html();
	 	    	var gotowhere = $(this).parent().siblings().eq(9).html();
	 	    	var studenttel = $(this).parent().siblings().eq(10).html();
	 	    	var parenttel = $(this).parent().siblings().eq(11).html();
	 	    	var dormitory  = $(this).parent().siblings().eq(12).html();
	 	    	var status=2;
	 	    	
	 	    	
	 	    	$("#btn_handle").click(function(){
	 	    		var approve = $("#handlePerson").val();
	 	    		if(approve.length==0){
	 	    			alert("处理人必须填写");
	 	    		}else{
	 	    			$("#btn_handle").attr("disabled", true); 
	 	    		
	    		     $.ajax({
	  		   	 	url:"handleLeave",
	  		   	 	type:"post",
	  		   	  	data:{"id":id,
	  		   	  		"sno":sno,
	  		   	  		"major":major,
	  		   	  	"classno":classno,
	  		   	    "sname":sname,
	  		   	    "studenttel":studenttel,
	  		   	    "dormitory":dormitory,
	  		   	 "reason":reason,
	  		   	    "gowhere":gotowhere,
	  		   	    "dayofleave":dayofleave,
	  		   	    "parenttel":parenttel,
	  		   	 "leavebegin":leavebegin,
	  		   	    "leaveend":leaveend,
	  		   	    "leavedate":leavedate,
	  		   	   "approve":approve,
	  		   	    "status":status,},
	  		   	 	 dataType:"text",
	  		   	 	 scriptCharset: 'utf-8',
	  		   	 	success:function(data){
	  		   	 		//alert("ok");
	  		   	 		alert(data);
	  		   	 		//console.log(data);
	  		   	 		//console.log("succ");
	  		   	 		$("#btn_handle").attr("disabled", false); 
	  		   	 		$("#handleLeavetip").modal('hide');
	  		   	 		},
	  	            error:function(){
	  	            	alert("提交失败");
	  	            	//console.log("fail");
	  	            	$("#btn_handle").attr("disabled", false); 
	  	            }
	  		   	 });	
	    		     }   		    		
	 	    	})
	 	 })
 		    }
		})
	})
	
	$("#stu_leave,#return_leave").click(function(){
		var stuType = "本科生";
		$.ajax({
			url:"getLeaveByStatus",
			type:"post",
			data:{"stuType":stuType},
			dataType:"json",
 		    scripeCharset:'utf-8',
 		    success:function(data){
 		    	var table = $("#leave_table");
 		    	table.html("");
	   		    for(var i=0; i<data.length;i++){
	   		    	var tr = $("<tr></tr>");
	   		    	if(data[i].status==1){
	   		    		var status = "已批准";
	   		    	}else if(data[i].status==0){
	   		    		var status = "未审批";
	   		    	}else{
	   		    		var status = "未批准";
	   		    	}
	   		    	tr.html("<td>"+data[i].sno+"</td><td>"+data[i].sname+"</td><td>"+data[i].major+"</td><td>"+data[i].classno+"</td><td>"+data[i].leavebegin+"</td><td>"+data[i].leaveend+"</td><td>"+data[i].leavedate+"</td><td>"+data[i].dayofleave+"</td><td>"+data[i].reason+"</td>" +
	   		    			"<td>"+data[i].gowhere+"</td><td>"+data[i].studenttel+"</td><td>"+data[i].parenttel+"</td><td>"+data[i].dormitory+"</td><td>"+data[i].approve+"</td><td>"+status+"</td><td>"+data[i].userName+"</td>");
	   		       if(data[i].status!=2){
	   		    	   tr.append("<td><button class='btn-info approve' sid="+data[i].id+">批准</button><button class='btn-danger noapprove' sid="+data[i].id+">不批准</button></td>");
	   		       }
	   		    	table.append(tr);
	   		    }
	   		 $(".noapprove").click(function(){
	      		$("#handleLeavetip").modal({
	 			    backdrop:"static",
	 		  })
	 		  
	 		    		 
	 		    	var id = $(this).attr("sid");
	 		    	var sno = $(this).parent().siblings().eq(0).html();
	 		    	var sname = $(this).parent().siblings().eq(1).html();
	 		    	var major = $(this).parent().siblings().eq(2).html();
	 		    	var classno = $(this).parent().siblings().eq(3).html();
	 		    	var leavebegin = $(this).parent().siblings().eq(4).html();
	 		    	var leaveend = $(this).parent().siblings().eq(5).html();
	 		    	var leavedate = $(this).parent().siblings().eq(6).html();
	 		    	var dayofleave = $(this).parent().siblings().eq(7).html();
	 		    	var reason = $(this).parent().siblings().eq(8).html();
	 		    	var gotowhere = $(this).parent().siblings().eq(9).html();
	 		    	var studenttel = $(this).parent().siblings().eq(10).html();
	 		    	var parenttel = $(this).parent().siblings().eq(11).html();
	 		    	var dormitory  = $(this).parent().siblings().eq(12).html();
	 		    	var status=1;
	 		    		
	 		    	$("#btn_handle").click(function(){
	 		    		var approve = $("#handlePerson").val();
	 		    		if(approve.length==0){
	 		    			alert("处理人必须填写");
	 		    		}else{
	 		    			$("#btn_handle").attr("disabled", true); 
	 	   		     $.ajax({
	 	   		   	 	url:"handleLeave",
	 	   		   	 	type:"post",
	 	   		   	  	data:{"id":id,
	 	   		   	  		"sno":sno,
	 	   		   	  		"major":major,
	 	   		   	  	"classno":classno,
	 	   		   	    "sname":sname,
	 	   		   	    "studenttel":studenttel,
	 	   		   	    "dormitory":dormitory,
	 	   		   	 "reason":reason,
	 	   		   	    "gowhere":gotowhere,
	 	   		   	    "dayofleave":dayofleave,
	 	   		   	    "parenttel":parenttel,
	 	   		   	 "leavebegin":leavebegin,
	 	   		   	    "leaveend":leaveend,
	 	   		   	    "leavedate":leavedate,
	 	   		   	    "status":status,},
	 	   		   	 	 dataType:"text",
	 	   		   	 	 scriptCharset: 'utf-8',
	 	   		   	 	success:function(data){
	 	   		   	 		alert(data);
	 	   		   	 		//alert("处理成功");
	 	   		   	 		//console.log(data);
	 	   		   	 		//console.log("succ");
	 	   		   	 		$("#btn_handle").attr("disabled", false); 
	 	   		   	 		$("#handleLeavetip").modal('hide');
	 	   		   	 		},
	 	   	            error:function(){
	 	   	            	alert("处理失败");
	 	   	            	//console.log("fail");
	 	   	            	$("#btn_handle").attr("disabled", false); 
	 	   	            }
	 	   		   	 });	

	 		    		}
	 		    	})
	 		    })
	 		    
	 	 $(".approve").click(function(){
	   		$("#handleLeavetip").modal({
	 			    backdrop:"static",
	 		  })
	 		  
	 		 
	 	    	var id = $(this).attr("sid");
	 	    	var sno = $(this).parent().siblings().eq(0).html();
	 	    	var sname = $(this).parent().siblings().eq(1).html();
	 	    	var major = $(this).parent().siblings().eq(2).html();
	 	    	var classno = $(this).parent().siblings().eq(3).html();
	 	    	var leavebegin = $(this).parent().siblings().eq(4).html();
	 	    	var leaveend = $(this).parent().siblings().eq(5).html();
	 	    	var leavedate = $(this).parent().siblings().eq(6).html();
	 	    	var dayofleave = $(this).parent().siblings().eq(7).html();
	 	    	var reason = $(this).parent().siblings().eq(8).html();
	 	    	var gotowhere = $(this).parent().siblings().eq(9).html();
	 	    	var studenttel = $(this).parent().siblings().eq(10).html();
	 	    	var parenttel = $(this).parent().siblings().eq(11).html();
	 	    	var dormitory  = $(this).parent().siblings().eq(12).html();
	 	    	var status=2;
	 	    	
	 	    	
	 	    	$("#btn_handle").click(function(){
	 	    		var approve = $("#handlePerson").val();
	 	    		if(approve.length==0){
	 	    			alert("处理人必须填写");
	 	    		}else{
	 	    			
	 	    		
	    		     $.ajax({
	  		   	 	url:"handleLeave",
	  		   	 	type:"post",
	  		   	  	data:{"id":id,
	  		   	  		"sno":sno,
	  		   	  		"major":major,
	  		   	  	"classno":classno,
	  		   	    "sname":sname,
	  		   	    "studenttel":studenttel,
	  		   	    "dormitory":dormitory,
	  		   	 "reason":reason,
	  		   	    "gowhere":gotowhere,
	  		   	    "dayofleave":dayofleave,
	  		   	    "parenttel":parenttel,
	  		   	 "leavebegin":leavebegin,
	  		   	    "leaveend":leaveend,
	  		   	    "leavedate":leavedate,
	  		   	   "approve":approve,
	  		   	    "status":status,},
	  		   	 	 dataType:"text",
	  		   	 	 scriptCharset: 'utf-8',
	  		   	 	success:function(data){
	  		   	 		alert(data);
	  		   	 		//console.log(data);
	   		   	 		//console.log("succ");
	  		   	 		$("#handleLeavetip").modal('hide');
	  		   	 		},
	  	            error:function(){
	  	            	
 	   		   	 		//console.log("fail");
	  	            	alert("提交失败");
	  	            	
	  	            }
	  		   	 });	
	    		     }   		    		
	 	    	})
	 	 })
	   		   
	   		    	

 		    }
		})
	})
})

//列出所有的教师用户
$(function(){
	
	$("#list_user").click(function(){
		 $("#teacherUser").modal({
		       backdrop:"static",
	         })
	         
	         $.ajax({
	        	 url:"listTeacherUser",
	        	 type:"post",
	        	 dataType:"json",
	        	 data:{"userType":"teacher"},
	        	 scriptCharset:"utf-8",
	        	 success:function(data){
	        		
	        		 
	        		 var table = $("#teacher_user");
	        		     table.html(" ");	        		
	        		 for(var i=0;i<data.length;i++){
	        			 var tr = $("<tr></tr>");
	        			    tr.html("<td>"+data[i].userName+"</td><td class='deleteTuser' style='width:100px;'><input type='button' class='btn btn-danger btn-xs' value='删除'></td>");
	        			    table.append(tr);
	        		 }    
	        		 
	        		 $(".deleteTuser").click(function(){
	        			 var teacher = $(this).siblings().eq(0).html();
	        			     $.ajax({
	        			    	 url:"deleteTeacherUser",
	        		        	 type:"post",
	        		        	 dataType:"text",
	        		        	 data:{"teacher":teacher},
	        		        	 scriptCharset:"utf-8",
	        		        	 success:function(){
	        		        		 alert("删除成功");
	        		        	 }
	        			     })
	        		 })
	        	 }
	         })
	})
})
//教师信息查询，删除，增加
$(function(){
	$("#add_teacherInfo").click(function(){
		 $("#teacherInfo").modal({
		       backdrop:"static",
	         })
	         //查询教师信息
	         $.ajax({
	        	 url:"listTeacherInfo",
	        	 type:"get",
	        	 dataType:"json",
	        	 scriptCharset:"utf-8",
	        	 success:function(data){
	        		 //console.log(data);
	        		 var table = $("#teacher_Table");
	        		     table.html("");
	        		 for(var i = 0;i<data.length;i++){
	        			 var tr = $("<tr></tr>");
	        			     tr.html("<td>"+data[i].teacherName+"</td><td>"+data[i].position+"</td><td>"+data[i].officeSpace+"</td><td>"+data[i].responsibility+"</td><td>"+data[i].phone+"</td><td tid="+data[i].teacherId+" class='deleteTearcherInfo btn btn-xs btn-danger'>删除</td>");
	        		     table.append(tr);
	        		 }
	        		 //删除一条教师信息
	        		  $(".deleteTearcherInfo").click(function(){

	        		    	var teacherId = $(this).attr("tid");
	        		    	
	        		    	$.ajax({
	        		    		 url:"deleteTeacherInfo",
	        		        	 type:"get",
	        		        	 data:{"teacherId":teacherId},
	        		        	 dataType:"text",
	        		        	 scriptCharset:"utf-8",
	        		        	 success:function(data){
	        		        		 alert("操作成功");
	        		        		 $("#teacherInfo").modal('hide');
	        		        	 }
	        		    	})
	        		    })
	        	 }
	         
	         
	        		 
	         })
	      //增加一条教师信息
	         $("#btn_addteacherInfo").click(function(){
	        	 var teacherName = $("#add_teacherName").val();
	        	 var position = $("#add_position").val();
	        	 var officeSpace = $("#add_officeSpace").val();
	        	 var responsibility = $("#add_responsibility").val();
	        	 var phone = $("#add_phone").val();
	        	 if(teacherName.length>10 | position.length>40 | officeSpace.length>100  | responsibility.length>250 | phone.length>15){
	        		 alert("填写的信息过长");
	        	 }else{
	        		 
	 	 	    	$.ajax({
			    		 url:"addTeacherInfo",
			        	 type:"post",
			        	 data:{"teacherName":teacherName,
			        		 "position":position,
			        		 "officeSpace":officeSpace,
			        		 "responsibility":responsibility,
			        		 "phone":phone},
			        	 dataType:"text",
			        	 scriptCharset:"utf-8",
			        	 success:function(data){
			        		 alert('新增成功');
			        		 $("#teacherInfo").modal('hide');
			        		 $('.addTr input').val('');
			        	 }
			    	})
	        	 }
	        	 
	         })
	})
})




function personPage(){
	$(".personPage").click(function(){
		 $("#personModal").modal({
			    backdrop:"static",
		  })
		
	})
}


//通过宿舍查询
$(function(){
	$("#building_search").click(function(){
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){
	   		var buliding = $("#building_option").val();
	   		var room = $("#roomName").val();
	   	    var major = $("#major").val();      	          
	        var nianji = $("#nianji").val();
	        var className = $("#classNo").val();
	        var stuType = "本科生";
	      if(room=="请输入..." | room=="" | room==" " | room=="  "){
	    	  
	    	  $.ajax({url: "getStudentByBuilding2",
		 	         type:"post", 
		 	         dataType:"json",
		 	         data:{
		 	        	   "major":major,
		 	      	       "className":className,
		 	               "nianji":nianji,
		 	               "buliding":buliding,
		 	               "stuType":stuType
		 	              },
		 	         scriptCharset: 'utf-8',
		 	         success: function(data){
		 	        	 var list = data.list;	  	    	   
		 	            var table = $("#stutable");            
		 	            table.html(" ") ;   

		 	            for(var i=0;i<list.length;i++){
		 	         	   
		 	             switch(list[i].className){
		 	                 case  10:var cla = '会计金融双学位班';break;
		 	                 case  11:var cla = '卓越会计师班';break;
		 	                 case  12:var cla = '中法班';break;
		 	                 default: var cla=list[i].className;
		 	             }	
		 	            	
		 	          	  var tr = $("<tr role='row'></tr>");
		 	          	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
		 	          	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
		 	                       +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
		 	       	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
		 	       	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
		 	          	  table.append(tr);
		 	          	  } 
		 	            personPage();
		 	           displayT();
		 	           clicktd();
		 	           //创建分页条 
		 	            var pageNow = data.pageNum;
		 	            var pageTotal = data.pages;
		 	            var total  = data.total;
		 	            var pageInfo = $("#pageInfo");
		 	                pageInfo.html(" ");
		 	                pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

		 	           //创建分页导航条
		 	              var pa = $("#pnValue").val();
		 	              var ul =$("<ul></ul>").addClass("pagination");
		 	              var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
		 	              var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
		 	              if(data.hasPreviousPage == false){
		 	              	firstPage.addClass("disabled");
		 	              	prePage.addClass("disabled");
		 	               }else{
		 	                firstPage.click(function(){
		 	             	   to_page(1,pa);
		 	                })
		 	                prePage.click(function(){
		 	             	   to_page(pageNow-1,pa);
		 	                })
		 	               }
		 	              
		 	              var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
		 	              var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
		 	                 if(data.hasNextPage == false){
		 	               	  nextPage.addClass("disabled");
		 	               	  lastPage.addClass("disabled");
		 	                 }else{
		 	                   nextPage.click(function(){
		 	                   	to_page(pageNow+1,pa);
		 	                   })
		 	                   lastPage.click(function(){
		 	                   	to_page(pageTotal,pa);
		 	                   })
		 	                 }
		 	              
		 	                ul.append(firstPage);
		 	                ul.append(prePage);
		 	              $.each(data.navigatepageNums,function(index,item){
		 	              	var numli = $("<li></li>").append($("<a></a>").append(item)); 
		 	              	if(pageNow == item){
		 	              		numli.addClass("active");
		 	              	}
		 	              	  numli.click(function(){
		 	              		  to_page(item,pa); 
		 	              	  })
		 	                   ul.append(numli); 
		 	              })
		 	               ul.append(nextPage);
		 	               ul.append(lastPage);
		 	               var nav = $("<nav></nav>").append(ul);
		 	                var pageNav = $("#pageNav");
		 	                    pageNav.html(" ");
		 	                    pageNav.append(nav);
		 	            
		 	                  $("#pnValue").on("change",function(){
		 	         	     		var pa = $("#pnValue").val();
		 	         	     		to_page(1,pa);
		 	         	     	})
		 		   	   } ,
		 	         error: function(){
		 		   	    alert("请选择");
		 		   	 $('#gaojichaxun').show();
		 		   	      }
		 		}) 
	      }else{var stuType = "本科生";
	    	  $.ajax({url: "getStudentByBuilding",
	 	         type:"post", 
	 	         dataType:"json",
	 	         data:{
	 	        	   "major":major,
	 	      	       "className":className,
	 	               "nianji":nianji,
	 	               "buliding":buliding,
	 	               "room":room,
	 	               "stuType":stuType
	 	              },
	 	         scriptCharset: 'utf-8',
	 	         success: function(data){
	 	        	 createTableData(data);
	 		   	   } ,
	 	         error: function(){
	 		   	    alert("请选择");  
	 		   	 $('#gaojichaxun').show();
	 		   	      }
	 		}) 
	      }
	   	     	
		}
		var pa = $("#pnValue").val();
   		to_page(1,pa);
		
	   	})
})

//通过政治面貌查询学生
/*$(function(){
    $("#ZZMM_option").on("change",function(){
    	$("#gaojichaxun").toggle();
    	function to_page(pn,pa){
   		var zzmm = $("#ZZMM_option").val();
   	    var major = $("#major").val();      	          
        var nianji = $("#nianji").val();
        var className = $("#classNo").val();
        var stuType = "本科生";
   	 $.ajax({url: "getStudentByZZMM",
         type:"post", 
         dataType:"json",
         data:{"pn":pn,
        	   "pa":pa,
        	   "major":major,
      	       "className":className,
               "nianji":nianji,
               "zzmm":zzmm,
               "stuType":stuType
              },
         scriptCharset: 'utf-8',
         success: function(data){
        	 var list = data.list;	  	    	   
             var table = $("#stutable");            
             table.html(" ") ;   

             for(var i=0;i<list.length;i++){
            	 
 	             switch(list[i].className){
	                 case  10:var cla = '会计金融双学位班';break;
	                 case  11:var cla = '卓越会计师班';break;
	                 case  12:var cla = '中法班';break;
	                 default: var cla=list[i].className;
	             }	
          	   
           	  var tr = $("<tr role='row'></tr>");
           	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
           	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
                        +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
        	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none">'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
        	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
           	  table.append(tr);
           	  } 
             personPage();
            displayT();
            clicktd();
            //创建分页条 
             var pageNow = data.pageNum;
             var pageTotal = data.pages;
             var total  = data.total;
             var pageInfo = $("#pageInfo");
                 pageInfo.html(" ");
                 pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

            //创建分页导航条
               var pa = $("#pnValue").val();
               var ul =$("<ul></ul>").addClass("pagination");
               var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
               var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
               if(data.hasPreviousPage == false){
               	firstPage.addClass("disabled");
               	prePage.addClass("disabled");
                }else{
                 firstPage.click(function(){
              	   to_page(1,pa);
                 })
                 prePage.click(function(){
              	   to_page(pageNow-1,pa);
                 })
                }
               
               var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
               var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
                  if(data.hasNextPage == false){
                	  nextPage.addClass("disabled");
                	  lastPage.addClass("disabled");
                  }else{
                    nextPage.click(function(){
                    	to_page(pageNow+1,pa);
                    })
                    lastPage.click(function(){
                    	to_page(pageTotal,pa);
                    })
                  }
               
                 ul.append(firstPage);
                 ul.append(prePage);
               $.each(data.navigatepageNums,function(index,item){
               	var numli = $("<li></li>").append($("<a></a>").append(item)); 
               	if(pageNow == item){
               		numli.addClass("active");
               	}
               	  numli.click(function(){
               		  to_page(item,pa); 
               	  })
                    ul.append(numli); 
               })
                ul.append(nextPage);
                ul.append(lastPage);
                var nav = $("<nav></nav>").append(ul);
                 var pageNav = $("#pageNav");
                     pageNav.html(" ");
                     pageNav.append(nav);
             
                   $("#pnValue").on("change",function(){
          	     		var pa = $("#pnValue").val();
          	     		to_page(1,pa);
          	     	})
	   	   } ,
         error: function(){
	   	    alert("请选择");  
	   	      }
	}) 
    	}
    	var pa = $("#pnValue").val();
   		to_page(1,pa);
   	})
})

//通过民族查询学生
$(function(){
    $("#mingzu_option").on("change",function(){
    	$("#gaojichaxun").toggle();
    	function to_page(pn,pa){
   		var mz = $("#mingzu_option").val();
   	    var major = $("#major").val();      	          
        var nianji = $("#nianji").val();
        var className = $("#classNo").val();
        var stuType = "本科生";
   	 $.ajax({url: "getStudentByMZ",
         type:"post", 
         dataType:"json",
         data:{"pn":pn,
        	   "pa":pa,
        	   "major":major,
      	       "className":className,
               "nianji":nianji,
               "mz":mz,
               "stuType":stuType
              },
         scriptCharset: 'utf-8',
         success: function(data){
        	 var list = data.list;	  	    	   
             var table = $("#stutable");            
             table.html(" ") ;   

             for(var i=0;i<list.length;i++){
            	 
 	             switch(list[i].className){
	                 case  10:var cla = '会计金融双学位班';break;
	                 case  11:var cla = '卓越会计师班';break;
	                 case  12:var cla = '中法班';break;
	                 default: var cla=list[i].className;
	             }	
          	   
           	  var tr = $("<tr role='row'></tr>");
           	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
           	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
                        +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
        	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
        	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
           	  table.append(tr);
           	  } 
             personPage();
            displayT();
            clicktd();
            //创建分页条 
             var pageNow = data.pageNum;
             var pageTotal = data.pages;
             var total  = data.total;
             var pageInfo = $("#pageInfo");
                 pageInfo.html(" ");
                 pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

            //创建分页导航条
               var pa = $("#pnValue").val();
               var ul =$("<ul></ul>").addClass("pagination");
               var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
               var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
               if(data.hasPreviousPage == false){
               	firstPage.addClass("disabled");
               	prePage.addClass("disabled");
                }else{
                 firstPage.click(function(){
              	   to_page(1,pa);
                 })
                 prePage.click(function(){
              	   to_page(pageNow-1,pa);
                 })
                }
               
               var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
               var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
                  if(data.hasNextPage == false){
                	  nextPage.addClass("disabled");
                	  lastPage.addClass("disabled");
                  }else{
                    nextPage.click(function(){
                    	to_page(pageNow+1,pa);
                    })
                    lastPage.click(function(){
                    	to_page(pageTotal,pa);
                    })
                  }
               
                 ul.append(firstPage);
                 ul.append(prePage);
               $.each(data.navigatepageNums,function(index,item){
               	var numli = $("<li></li>").append($("<a></a>").append(item)); 
               	if(pageNow == item){
               		numli.addClass("active");
               	}
               	  numli.click(function(){
               		  to_page(item,pa); 
               	  })
                    ul.append(numli); 
               })
                ul.append(nextPage);
                ul.append(lastPage);
                var nav = $("<nav></nav>").append(ul);
                 var pageNav = $("#pageNav");
                     pageNav.html(" ");
                     pageNav.append(nav);
             
                   $("#pnValue").on("change",function(){
          	     		var pa = $("#pnValue").val();
          	     		to_page(1,pa);
          	     	})
	   	   } ,
         error: function(){
	   	    alert("请选择");  
	   	      }
	}) 
    	}
    	var pa = $("#pnValue").val();
   		to_page(1,pa);
   	})
})

//通过性别查询学生
$(function(){
    $("#sex_option").on("change",function(){
    	$("#gaojichaxun").toggle();
    	function to_page(pn,pa){
   		var sex = $("#sex_option").val();
   	    var major = $("#major").val();      	          
        var nianji = $("#nianji").val();
        var className = $("#classNo").val();
   	    var stuType = "本科生";
  		
   	 $.ajax({url: "getStudentBySex",
         type:"post", 
         dataType:"json",
         data:{"pn":pn,
        	   "pa":pa,
        	   "major":major,
      	       "className":className,
               "nianji":nianji,
               "sex":sex,
               "stuType":stuType
              },
         scriptCharset: 'utf-8',
         success: function(data){
        	 var list = data.list;	  	    	   
             var table = $("#stutable");            
             table.html(" ") ;   

             for(var i=0;i<list.length;i++){
 	             switch(list[i].className){
	                 case  10:var cla = '会计金融双学位班';break;
	                 case  11:var cla = '卓越会计师班';break;
	                 case  12:var cla = '中法班';break;
	                 default: var cla=list[i].className;
	             }	
            	 
           	  var tr = $("<tr role='row'></tr>");
           	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
           	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
                        +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
        	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
        	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
           	  table.append(tr);
           	  } 
             personPage();
            displayT();
            clicktd();
            //创建分页条 
             var pageNow = data.pageNum;
             var pageTotal = data.pages;
             var total  = data.total;
             var pageInfo = $("#pageInfo");
                 pageInfo.html(" ");
                 pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

            //创建分页导航条
               var pa = $("#pnValue").val();
               var ul =$("<ul></ul>").addClass("pagination");
               var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
               var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
               if(data.hasPreviousPage == false){
               	firstPage.addClass("disabled");
               	prePage.addClass("disabled");
                }else{
                 firstPage.click(function(){
              	   to_page(1,pa);
                 })
                 prePage.click(function(){
              	   to_page(pageNow-1,pa);
                 })
                }
               
               var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
               var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
                  if(data.hasNextPage == false){
                	  nextPage.addClass("disabled");
                	  lastPage.addClass("disabled");
                  }else{
                    nextPage.click(function(){
                    	to_page(pageNow+1,pa);
                    })
                    lastPage.click(function(){
                    	to_page(pageTotal,pa);
                    })
                  }
               
                 ul.append(firstPage);
                 ul.append(prePage);
               $.each(data.navigatepageNums,function(index,item){
               	var numli = $("<li></li>").append($("<a></a>").append(item)); 
               	if(pageNow == item){
               		numli.addClass("active");
               	}
               	  numli.click(function(){
               		  to_page(item,pa); 
               	  })
                    ul.append(numli); 
               })
                ul.append(nextPage);
                ul.append(lastPage);
                var nav = $("<nav></nav>").append(ul);
                 var pageNav = $("#pageNav");
                     pageNav.html(" ");
                     pageNav.append(nav);
             
                   $("#pnValue").on("change",function(){
          	     		var pa = $("#pnValue").val();
          	     		to_page(1,pa);
          	     	})
	   	   } ,
         error: function(){
	   	    alert("请选择");  
	   	      }
	}) 
    	}
    	var pa = $("#pnValue").val();
   		to_page(1,pa);
   	})
})

//创建分页导航条
function createPage(data){
	//创建分页条 
    var pageNow = data.pageNum;
    var pageTotal = data.pages;
    var total  = data.total;
    var pageInfo = $("#pageInfo");
        pageInfo.html(" ");
        pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

   //创建分页导航条
      var pa = $("#pnValue").val();
      var ul =$("<ul></ul>").addClass("pagination");
      var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
      if(data.hasPreviousPage == false){
      	firstPage.addClass("disabled");
      	prePage.addClass("disabled");
       }else{
        firstPage.click(function(){
     	   to_page(1,pa);
        })
        prePage.click(function(){
     	   to_page(pageNow-1,pa);
        })
       }
      
      var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
      var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
         if(data.hasNextPage == false){
       	  nextPage.addClass("disabled");
       	  lastPage.addClass("disabled");
         }else{
           nextPage.click(function(){
           	to_page(pageNow+1,pa);
           })
           lastPage.click(function(){
           	to_page(pageTotal,pa);
           })
         }
      
        ul.append(firstPage);
        ul.append(prePage);
      $.each(data.navigatepageNums,function(index,item){
      	var numli = $("<li></li>").append($("<a></a>").append(item)); 
      	if(pageNow == item){
      		numli.addClass("active");
      	}
      	  numli.click(function(){
      		  to_page(item,pa);
      	  })
           ul.append(numli); 
      })
       ul.append(nextPage);
       ul.append(lastPage);
       var nav = $("<nav></nav>").append(ul);
        var pageNav = $("#pageNav");
            pageNav.html(" ");
            pageNav.append(nav);
            
            $("#pnValue").on("change",function(){
  	     		var pa = $("#pnValue").val();
  	     		to_page(1,pa);
  	     	})
}
*/
//创建高级查是否注册表
function createXJZCTable(data){
	 var p0 = data.list;
     clear();
     var table=$("#displayTable");
     table.html(" ");
	 var tr = $("<tr><td></td><td >学号</td><td>姓名</td><td>专业</td><td>班级</td><td>学年</td><td>学期</td></tr>");
     table.append(tr);
 for(var i=0;i<p0.length;i++){
	 
      switch(p0[i].className){
       case  10:var cla = '会计金融双学位班';break;
       case  11:var cla = '卓越会计师班';break;
       case  12:var cla = '中法班';break;
       default: var cla=p0[i].className;
   }	
	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].zcyear+"</td><td>"+p0[i].term+"</td></tr>");
     table.append(tr);
 };
 
}

//高级是否注册查询
$(function(){
	$("#btn_zc_box").click(function(){
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){
		  var major = $("#major").val();      	          
	      var nianji = $("#nianji").val();
	      var className = $("#classNo").val();
	      var termYear = $("#termYear_select").val();
	      var term = $("#term_select").val();
	      var stuType = "本科生";
	      if(term=="null" | termYear=="null"){
	    	  alert("请选择学期或者学年");
	    	  $('#gaojichaxun').show();
	      }else{
	  	  var type = [];
		$.each($('#zc_box input:checkbox:checked'),function(){
			type.push($(this).val());
		});

			 $.ajax({url: "getZCByType",
		           type:"post", 
		           dataType:"json",
		           data:{"major":major,
		        	     "className":className,
		                 "nianji":nianji,
		                 "type":type,
		                 "termYear":termYear,
		                 "term":term,
		                 "stuType":stuType
		                },
		           scriptCharset: 'utf-8',
		           success: function(data){
		        	   var p0 = data.list;
		        	     clear();
		        	     var table=$("#displayTable");
		        	     table.html(" ");
		        		 var tr = $("<tr><td></td><td >学号</td><td>姓名</td><td>专业</td><td>班级</td><td>学年</td><td>学期</td></tr>");
		        	     table.append(tr);
		        	 for(var i=0;i<p0.length;i++){
		        		 
		 	             switch(p0[i].className){
	 	                 case  10:var cla = '会计金融双学位班';break;
	 	                 case  11:var cla = '卓越会计师班';break;
	 	                 case  12:var cla = '中法班';break;
	 	                 default: var cla=list[i].className;
	 	             }	
		        		 
		        		 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].zcyear+"</td><td>"+p0[i].term+"</td></tr>");
		        	     table.append(tr);
		        	 };
		        	 clicktd();
		        	   var pageNow = data.pageNum;
		        	    var pageTotal = data.pages;
		        	    var total  = data.total;
		        	    var pageInfo = $("#pageInfo");
		        	        pageInfo.html(" ");
		        	        pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

		        	   //创建分页导航条
		        	      var pa = $("#pnValue").val();
		        	      var ul =$("<ul></ul>").addClass("pagination");
		        	      var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
		        	      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
		        	      if(data.hasPreviousPage == false){
		        	      	firstPage.addClass("disabled");
		        	      	prePage.addClass("disabled");
		        	       }else{
		        	        firstPage.click(function(){
		        	     	   to_page(1,pa);
		        	        })
		        	        prePage.click(function(){
		        	     	   to_page(pageNow-1,pa);
		        	        })
		        	       }
		        	      
		        	      var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
		        	      var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
		        	         if(data.hasNextPage == false){
		        	       	  nextPage.addClass("disabled");
		        	       	  lastPage.addClass("disabled");
		        	         }else{
		        	           nextPage.click(function(){
		        	           	to_page(pageNow+1,pa);
		        	           })
		        	           lastPage.click(function(){
		        	           	to_page(pageTotal,pa);
		        	           })
		        	         }
		        	      
		        	        ul.append(firstPage);
		        	        ul.append(prePage);
		        	      $.each(data.navigatepageNums,function(index,item){
		        	      	var numli = $("<li></li>").append($("<a></a>").append(item)); 
		        	      	if(pageNow == item){
		        	      		numli.addClass("active");
		        	      	}
		        	      	  numli.click(function(){
		        	      		  to_page(item,pa);
		        	      	  })
		        	           ul.append(numli); 
		        	      })
		        	       ul.append(nextPage);
		        	       ul.append(lastPage);
		        	       var nav = $("<nav></nav>").append(ul);
		        	        var pageNav = $("#pageNav");
		        	            pageNav.html(" ");
		        	            pageNav.append(nav);
		        	            
		        	            $("#pnValue").on("change",function(){
		        	  	     		var pa = $("#pnValue").val();
		        	  	     		to_page(1,pa);
		        	  	     	})
		        	   	              
			   	   } ,
		           error: function(){
			   	    alert("请选择");  
			   	 $('#gaojichaxun').show();
			   	      }
			}) 
	      }
		}
		 var pa = $("#pnValue").val();
			to_page(1,pa);
	})
})

//创建高级查询表贫困生
function createPsStudentTable(data){
	 var p0 = data.list;
     clear();
     var table=$("#displayTable");
     table.html(" ");
	 var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>补助类型</td><td>资助时间</td></tr>");
     table.append(tr);
 for(var i=0;i<p0.length;i++){
	 
      switch(p0[i].className){
       case  10:var cla = '会计金融双学位班';break;
       case  11:var cla = '卓越会计师班';break;
       case  12:var cla = '中法班';break;
       default: var cla=p0[i].className;
   }	
	 
	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].pstudentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].zzname+"</td><td>"+p0[i].zztime+"</td></tr>");
     table.append(tr);
 };
}

//高级贫困生查询
$(function(){
	$("#btn_psstudent_box").click(function(){
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){
		  var major = $("#major").val();      	          
	      var nianji = $("#nianji").val();
	   //   var time = $("#PracticeYear").val();
	      var className = $("#classNo").val();
	      var stuType = "本科生";
	  	  var type = [];
		$.each($('#psstudent_box input:checkbox:checked'),function(){
			type.push($(this).val());
		});
	//	 alert(major+nianji+className+type);

			 $.ajax({url: "getPsStudentByType",
		           type:"post", 
		           dataType:"json",
		           data:{"major":major,
		        	     "className":className,
		                 "nianji":nianji,
		                 "type":type,
		                 "stuType":stuType
		                },
		           scriptCharset: 'utf-8',
		           success: function(data){
		        		 var p0 = data.list;
		        	     clear();
		        	     var table=$("#displayTable");
		        	     table.html(" ");
		        		 var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>补助类型</td><td>金额</td><td>资助时间</td></tr>");
		        	     table.append(tr);
		        	 for(var i=0;i<p0.length;i++){
		        		 
		 	             switch(p0[i].className){
	 	                 case  10:var cla = '会计金融双学位班';break;
	 	                 case  11:var cla = '卓越会计师班';break;
	 	                 case  12:var cla = '中法班';break;
	 	                 default: var cla=list[i].className;
	 	             }	
		        		 
		        		 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].pstudentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].zzname+"</td><td>"+p0[i].zzmoney+"</td><td>"+p0[i].zztime+"</td></tr>");
		        	     table.append(tr);
		        	 };clicktd();
		        	   var pageNow = data.pageNum;
		        	    var pageTotal = data.pages;
		        	    var total  = data.total;
		        	    var pageInfo = $("#pageInfo");
		        	        pageInfo.html(" ");
		        	        pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

		        	   //创建分页导航条
		        	      var pa = $("#pnValue").val();
		        	      var ul =$("<ul></ul>").addClass("pagination");
		        	      var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
		        	      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
		        	      if(data.hasPreviousPage == false){
		        	      	firstPage.addClass("disabled");
		        	      	prePage.addClass("disabled");
		        	       }else{
		        	        firstPage.click(function(){
		        	     	   to_page(1,pa);
		        	        })
		        	        prePage.click(function(){
		        	     	   to_page(pageNow-1,pa);
		        	        })
		        	       }
		        	      
		        	      var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
		        	      var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
		        	         if(data.hasNextPage == false){
		        	       	  nextPage.addClass("disabled");
		        	       	  lastPage.addClass("disabled");
		        	         }else{
		        	           nextPage.click(function(){
		        	           	to_page(pageNow+1,pa);
		        	           })
		        	           lastPage.click(function(){
		        	           	to_page(pageTotal,pa);
		        	           })
		        	         }
		        	      
		        	        ul.append(firstPage);
		        	        ul.append(prePage);
		        	      $.each(data.navigatepageNums,function(index,item){
		        	      	var numli = $("<li></li>").append($("<a></a>").append(item)); 
		        	      	if(pageNow == item){
		        	      		numli.addClass("active");
		        	      	}
		        	      	  numli.click(function(){
		        	      		  to_page(item,pa);
		        	      	  })
		        	           ul.append(numli); 
		        	      })
		        	       ul.append(nextPage);
		        	       ul.append(lastPage);
		        	       var nav = $("<nav></nav>").append(ul);
		        	        var pageNav = $("#pageNav");
		        	            pageNav.html(" ");
		        	            pageNav.append(nav);
		        	            
		        	            $("#pnValue").on("change",function(){
		        	  	     		var pa = $("#pnValue").val();
		        	  	     		to_page(1,pa);
		        	  	     	})
		        	   	              
			   	   } ,
		           error: function(){
			   	    alert("请选择"); 
			   	 $('#gaojichaxun').show();
			   	      }
			}) 
		}
		 var pa = $("#pnValue").val();
			to_page(1,pa);
	})
})
//创建高级查询过级表
function createSkillTable(data){
	 var p0 = data.list;
     clear();
     var table=$("#displayTable");
     table.html(" ");
	 var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>证书名称</td><td>类别</td><td>获得时间</td></tr>");
     table.append(tr);
 for(var i=0;i<p0.length;i++){
	 
      switch(p0[i].className){
       case  10:var cla = '会计金融双学位班';break;
       case  11:var cla = '卓越会计师班';break;
       case  12:var cla = '中法班';break;
       default: var cla=p0[i].className;
   }	
	 
	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].skillName+"</td><td>"+p0[i].skillType+"</td><td>"+p0[i].gettime+"</td></tr>");
     table.append(tr);
 };
}

//高级职业技能践查询
$(function(){
	$("#btn_skill_box").click(function(){ 
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){
		  var major = $("#major").val();      	          
	      var nianji = $("#nianji").val();
	      var time = $("#PracticeYear").val();
	      var className = $("#classNo").val();
	      var stuType = "本科生";
	  	var type = [];
		$.each($('#skill_box input:checkbox:checked'),function(){
			type.push($(this).val());
		});
		// alert(major+nianji+time+className+type);

			 $.ajax({url: "getSkillByType",
		           type:"post", 
		           dataType:"json",
		           data:{"major":major,
		        	     "className":className,
		                 "nianji":nianji,
		                 "stuType":stuType,
		                 "type":type
		                },
		           scriptCharset: 'utf-8',
		           success: function(data){		        	
		        		 var p0 = data.list;
		        	     clear();
		        	     var table=$("#displayTable");
		        	     table.html(" ");
		        		 var tr = $("<tr><td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>证书名称</td><td>类别</td><td>获得时间</td></tr>");
		        	     table.append(tr);
		        	 for(var i=0;i<p0.length;i++){
		        		 
		 	             switch(p0[i].className){
	 	                 case  10:var cla = '会计金融双学位班';break;
	 	                 case  11:var cla = '卓越会计师班';break;
	 	                 case  12:var cla = '中法班';break;
	 	                 default: var cla=p0[i].className;
	 	             }	
		        		 
		        		 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].skillName+"</td><td>"+p0[i].skillType+"</td><td>"+p0[i].gettime+"</td></tr>");
		        	     table.append(tr);
		        	 };clicktd();
		        	    var pageNow = data.pageNum;
		        	    var pageTotal = data.pages;
		        	    var total  = data.total;
		        	    var pageInfo = $("#pageInfo");
		        	        pageInfo.html(" ");
		        	        pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

		        	   //创建分页导航条
		        	      var pa = $("#pnValue").val();
		        	      var ul =$("<ul></ul>").addClass("pagination");
		        	      var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
		        	      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
		        	      if(data.hasPreviousPage == false){
		        	      	firstPage.addClass("disabled");
		        	      	prePage.addClass("disabled");
		        	       }else{
		        	        firstPage.click(function(){
		        	     	   to_page(1,pa);
		        	        })
		        	        prePage.click(function(){
		        	     	   to_page(pageNow-1,pa);
		        	        })
		        	       }
		        	      
		        	      var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
		        	      var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
		        	         if(data.hasNextPage == false){
		        	       	  nextPage.addClass("disabled");
		        	       	  lastPage.addClass("disabled");
		        	         }else{
		        	           nextPage.click(function(){
		        	           	to_page(pageNow+1,pa);
		        	           })
		        	           lastPage.click(function(){
		        	           	to_page(pageTotal,pa);
		        	           })
		        	         }
		        	      
		        	        ul.append(firstPage);
		        	        ul.append(prePage);
		        	      $.each(data.navigatepageNums,function(index,item){
		        	      	var numli = $("<li></li>").append($("<a></a>").append(item)); 
		        	      	if(pageNow == item){
		        	      		numli.addClass("active");
		        	      	}
		        	      	  numli.click(function(){
		        	      		  to_page(item,pa);
		        	      	  })
		        	           ul.append(numli); 
		        	      })
		        	       ul.append(nextPage);
		        	       ul.append(lastPage);
		        	       var nav = $("<nav></nav>").append(ul);
		        	        var pageNav = $("#pageNav");
		        	            pageNav.html(" ");
		        	            pageNav.append(nav);
		        	            
		        	            $("#pnValue").on("change",function(){
		        	  	     		var pa = $("#pnValue").val();
		        	  	     		to_page(1,pa);
		        	  	     	})
		        	   	              
			   	   } ,
		           error: function(){
			   	    alert("请选择");  
			   	 $('#gaojichaxun').show();
			   	      }
			}) 
		}
		 var pa = $("#pnValue").val();
			to_page(1,pa);
	})
})


//创建高级查询社会实践表
function createPracticeTable(data){
	 var p0 = data.list; 
     clear();
     var table=$("#displayTable");
     table.html(" ");
	 var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>经历</td><td>类型</td><td>开始时间</td><td>结束时间</td></tr>");
     table.append(tr);
 for(var i=0;i<p0.length;i++){
	 
      switch(p0[i].className){
       case  10:var cla = '会计金融双学位班';break;
       case  11:var cla = '卓越会计师班';break;
       case  12:var cla = '中法班';break;
       default: var cla=p0[i].className;
   }	
	 
	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].practiceName+"</td><td>"+p0[i].type+"</td><td>"+p0[i].startTime+"</td><td>"+p0[i].endTime+"</td></tr>");
     table.append(tr);
 };

}

//高级社会实践查询
$(function(){
	$("#btn_practice_box").click(function(){
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){ 
		 var major = $("#major").val();      	          
	      var nianji = $("#nianji").val();
	      var time = $("#PracticeYear").val();
	      var className = $("#classNo").val();
	      var stuType = "本科生";
	  	var type = [];
		$.each($('#practice_box input:checkbox:checked'),function(){
			type.push($(this).val());
		});
//		 alert(major+nianji+time+className+type);
		 if(time=="All"){
			 alert("请选择时间");
			 $('#gaojichaxun').show();
		 }else{
			 $.ajax({url: "getPracticeByType",
		           type:"post", 
		           dataType:"json",
		           data:{"major":major,
		        	     "className":className,
		                 "nianji":nianji,
		                 "time":time,
		                 "stuType":stuType,
		                 "type":type
		                },
		           scriptCharset: 'utf-8',
		           success: function(data){
		        		 var p0 = data.list; 
		        	     clear();
		        	     var table=$("#displayTable");
		        	     table.html(" ");
		        		 var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>经历</td><td>类型</td><td>开始时间</td><td>结束时间</td></tr>");
		        	     table.append(tr);
		        	 for(var i=0;i<p0.length;i++){
		        		 
		 	             switch(p0[i].className){
	 	                 case  10:var cla = '会计金融双学位班';break;
	 	                 case  11:var cla = '卓越会计师班';break;
	 	                 case  12:var cla = '中法班';break;
	 	                 default: var cla=p0[i].className;
	 	             }	
		        		 
		        		 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].practiceName+"</td><td>"+p0[i].type+"</td><td>"+p0[i].startTime+"</td><td>"+p0[i].endTime+"</td></tr>");
		        	     table.append(tr);
		        	 };clicktd();
		        	   var pageNow = data.pageNum;
		        	    var pageTotal = data.pages;
		        	    var total  = data.total;
		        	    var pageInfo = $("#pageInfo");
		        	        pageInfo.html(" ");
		        	        pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

		        	   //创建分页导航条
		        	      var pa = $("#pnValue").val();
		        	      var ul =$("<ul></ul>").addClass("pagination");
		        	      var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
		        	      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
		        	      if(data.hasPreviousPage == false){
		        	      	firstPage.addClass("disabled");
		        	      	prePage.addClass("disabled");
		        	       }else{
		        	        firstPage.click(function(){
		        	     	   to_page(1,pa);
		        	        })
		        	        prePage.click(function(){
		        	     	   to_page(pageNow-1,pa);
		        	        })
		        	       }
		        	      
		        	      var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
		        	      var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
		        	         if(data.hasNextPage == false){
		        	       	  nextPage.addClass("disabled");
		        	       	  lastPage.addClass("disabled");
		        	         }else{
		        	           nextPage.click(function(){
		        	           	to_page(pageNow+1,pa);
		        	           })
		        	           lastPage.click(function(){
		        	           	to_page(pageTotal,pa);
		        	           })
		        	         }
		        	      
		        	        ul.append(firstPage);
		        	        ul.append(prePage);
		        	      $.each(data.navigatepageNums,function(index,item){
		        	      	var numli = $("<li></li>").append($("<a></a>").append(item)); 
		        	      	if(pageNow == item){
		        	      		numli.addClass("active");
		        	      	}
		        	      	  numli.click(function(){
		        	      		  to_page(item,pa);
		        	      	  })
		        	           ul.append(numli); 
		        	      })
		        	       ul.append(nextPage);
		        	       ul.append(lastPage);
		        	       var nav = $("<nav></nav>").append(ul);
		        	        var pageNav = $("#pageNav");
		        	            pageNav.html(" ");
		        	            pageNav.append(nav);
		        	            
		        	            $("#pnValue").on("change",function(){
		        	  	     		var pa = $("#pnValue").val();
		        	  	     		to_page(1,pa);
		        	  	     	})
		        	   	              
			   	   } ,
		           error: function(){
			   	    alert("请选择"); 
			   	 $('#gaojichaxun').show();
			   	      }
			}) 
		 }
		 }
		 var pa = $("#pnValue").val();
			to_page(1,pa);
	})
})


//创建高级查询奖励表
function createJLtable(data){
	 var p0 = data.list;
     clear();
     var table=$("#displayTable");
     table.html(" ");
     var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>获奖名称</td><td>获奖级别</td><td>时间</td></tr>");
     table.append(tr);
     for(var i=0;i<p0.length;i++){
    	 
          switch(p0[i].className){
           case  10:var cla = '会计金融双学位班';break;
           case  11:var cla = '卓越会计师班';break;
           case  12:var cla = '中法班';break;
           default: var cla=p0[i].className;
       }	
    	 
    	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].jlname+"</td><td>"+p0[i].jllevel+"</td><td>"+p0[i].getTime+"</td></tr>");
         table.append(tr);
     };	 
}
//高级奖励查询
$(function(){
	$("#btn_jl_box").click(function(){
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){
		  var major = $("#major").val();      	          
	      var nianji = $("#nianji").val();
	      var time = $("#jlYear").val();
	      var className = $("#classNo").val();
	      var stuType = "本科生";
	  	  var type = [];
		$.each($('#jl_box input:checkbox:checked'),function(){
			type.push($(this).val());
		});
	//	 alert(major+nianji+time+className+type);
		 if(time=="All"){
			 alert("请选择时间");
			 $('#gaojichaxun').show();
		 }else{
			 $.ajax({url: "getJLByType",
		           type:"post", 
		           dataType:"json",
		           data:{
		        	     "pa":pa,
		        	     "pn":pn,
		        	     "major":major,
		        	     "className":className,
		                 "nianji":nianji,
		                 "time":time,
		                 "stuType":stuType,
		                 "type":type
		                },
		           scriptCharset: 'utf-8',
		           success: function(data){
		        		 var p0 = data.list;
		        	     clear();
		        	     var table=$("#displayTable");
		        	     table.html(" ");
		        	     var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>获奖名称</td><td>获奖级别</td><td>指导老师</td><td>主办方</td><td>时间</td></tr>");
		        	     table.append(tr);
		        	     for(var i=0;i<p0.length;i++){
		        	    	 
			 	             switch(p0[i].className){
		 	                 case  10:var cla = '会计金融双学位班';break;
		 	                 case  11:var cla = '卓越会计师班';break;
		 	                 case  12:var cla = '中法班';break;
		 	                 default: var cla=p0[i].className;
		 	             }	
		        	    	 
		        	    	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].jlname+"</td><td>"+p0[i].jllevel+"</td><td>"+p0[i].adviser+"</td><td>"+p0[i].sponsor+"</td><td>"+p0[i].getTime+"</td></tr>");
		        	         table.append(tr);
		        	     };	clicktd(); 
		        	   var pageNow = data.pageNum;
		        	    var pageTotal = data.pages;
		        	    var total  = data.total;
		        	    var pageInfo = $("#pageInfo");
		        	        pageInfo.html(" ");
		        	        pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

		        	   //创建分页导航条
		        	      var pa = $("#pnValue").val();
		        	      var ul =$("<ul></ul>").addClass("pagination");
		        	      var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
		        	      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
		        	      if(data.hasPreviousPage == false){
		        	      	firstPage.addClass("disabled");
		        	      	prePage.addClass("disabled");
		        	       }else{
		        	        firstPage.click(function(){
		        	     	   to_page(1,pa);
		        	        })
		        	        prePage.click(function(){
		        	     	   to_page(pageNow-1,pa);
		        	        })
		        	       }
		        	      
		        	      var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
		        	      var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
		        	         if(data.hasNextPage == false){
		        	       	  nextPage.addClass("disabled");
		        	       	  lastPage.addClass("disabled");
		        	         }else{
		        	           nextPage.click(function(){
		        	           	to_page(pageNow+1,pa);
		        	           })
		        	           lastPage.click(function(){
		        	           	to_page(pageTotal,pa);
		        	           })
		        	         }
		        	      
		        	        ul.append(firstPage);
		        	        ul.append(prePage);
		        	      $.each(data.navigatepageNums,function(index,item){
		        	      	var numli = $("<li></li>").append($("<a></a>").append(item)); 
		        	      	if(pageNow == item){
		        	      		numli.addClass("active");
		        	      	}
		        	      	  numli.click(function(){
		        	      		  to_page(item,pa);
		        	      	  })
		        	           ul.append(numli); 
		        	      })
		        	       ul.append(nextPage);
		        	       ul.append(lastPage);
		        	       var nav = $("<nav></nav>").append(ul);
		        	        var pageNav = $("#pageNav");
		        	            pageNav.html(" ");
		        	            pageNav.append(nav);
		        	            
		        	            $("#pnValue").on("change",function(){
		        	  	     		var pa = $("#pnValue").val();
		        	  	     		to_page(1,pa);
		        	  	     	})
		        	   	              
			   	   } ,
		           error: function(){
			   	    alert("请选择");  
			   	    $('#gaojichaxun').show();
			   	      }
			}) 
			}
	
		 }
		 var pa = $("#pnValue").val();
			to_page(1,pa);
	})
})
//创建高级查询的惩罚表
    function createPunishTable(data){
	
	             clear();
    	         var p0 = data.list;             	         
	             var table=$("#displayTable");
	                 table.html(" ");
	            	 var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>处分结果</td><td>处分原因</td><td>时间</td></tr>");
                     table.append(tr);
	             for(var i=0;i<p0.length;i++){
	            	 
	 	             switch(p0[i].className){
 	                 case  10:var cla = '会计金融双学位班';break;
 	                 case  11:var cla = '卓越会计师班';break;
 	                 case  12:var cla = '中法班';break;
 	                 default: var cla=p0[i].className;
 	             }	
	            	 
	            	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].punishName+"</td><td>"+p0[i].punishReason+"</td><td>"+p0[i].punishTime+"</td></tr>");
	                 table.append(tr);
	             };	        
	       }

//高级违规查询
function search_punish(){
	$("#btn_punish_box").click(function(){
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){
		  var major = $("#major").val();      	          
	      var nianji = $("#nianji").val();
	      var time = $("#punishYear").val()+"-"+$("#punishMonth").val();
	      var className = $("#classNo").val();
	      var stuType = "本科生";
	      if(time=="All-"){
	    	  alert("请选择时间");
	    	  $('#gaojichaxun').show();
	      }else{
		var punishType = [];
		$.each($('#punish_box input:checkbox:checked'),function(){
			punishType.push($(this).val());
		});

		$.ajax({url: "getPunishByType",
	           type:"post", 
	           dataType:"json",
	           data:{"pa":pa,
	        	     "pn":pn,
	        	     "major":major,
	        	     "className":className,
	                 "nianji":nianji,
	                 "time":time,
	                 "stuType":stuType,
	                 "punishType":punishType
	                },
	           scriptCharset: 'utf-8',
	           success: function(data){
		             clear();
	    	         var p0 = data.list;             	         
		             var table=$("#displayTable");
		                 table.html(" ");
		            	 var tr = $("<tr><td></td><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>处分结果</td><td>处分原因</td><td>时间</td></tr>");
	                     table.append(tr);
		             for(var i=0;i<p0.length;i++){
		            	 
		 	             switch(p0[i].className){
	 	                 case  10:var cla = '会计金融双学位班';break;
	 	                 case  11:var cla = '卓越会计师班';break;
	 	                 case  12:var cla = '中法班';break;
	 	                 default: var cla=p0[i].className;
	 	             }	
		            	 
		            	 var tr = $("<tr><td><input class='compareBox' type='checkbox' value="+p0[i].studentNo+"></td><td  class='personPage'>"+p0[i].studentNo+"</td><td>"+p0[i].studentName+"</td><td>"+p0[i].major+"</td><td>"+cla+"</td><td>"+p0[i].punishName+"</td><td>"+p0[i].punishReason+"</td><td>"+p0[i].punishTime+"</td></tr>");
		                 table.append(tr);
		             };	clicktd();
	        	   var pageNow = data.pageNum;
	        	    var pageTotal = data.pages;
	        	    var total  = data.total;
	        	    var pageInfo = $("#pageInfo");
	        	        pageInfo.html(" ");
	        	        pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	        	   //创建分页导航条
	        	      var pa = $("#pnValue").val();
	        	      var ul =$("<ul></ul>").addClass("pagination");
	        	      var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	        	      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	        	      if(data.hasPreviousPage == false){
	        	      	firstPage.addClass("disabled");
	        	      	prePage.addClass("disabled");
	        	       }else{
	        	        firstPage.click(function(){
	        	     	   to_page(1,pa);
	        	        })
	        	        prePage.click(function(){
	        	     	   to_page(pageNow-1,pa);
	        	        })
	        	       }
	        	      
	        	      var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	        	      var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	        	         if(data.hasNextPage == false){
	        	       	  nextPage.addClass("disabled");
	        	       	  lastPage.addClass("disabled");
	        	         }else{
	        	           nextPage.click(function(){
	        	           	to_page(pageNow+1,pa);
	        	           })
	        	           lastPage.click(function(){
	        	           	to_page(pageTotal,pa);
	        	           })
	        	         }
	        	      
	        	        ul.append(firstPage);
	        	        ul.append(prePage);
	        	      $.each(data.navigatepageNums,function(index,item){
	        	      	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	        	      	if(pageNow == item){
	        	      		numli.addClass("active");
	        	      	}
	        	      	  numli.click(function(){
	        	      		  to_page(item,pa);
	        	      	  })
	        	           ul.append(numli); 
	        	      })
	        	       ul.append(nextPage);
	        	       ul.append(lastPage);
	        	       var nav = $("<nav></nav>").append(ul);
	        	        var pageNav = $("#pageNav");
	        	            pageNav.html(" ");
	        	            pageNav.append(nav);
	        	            
	        	            $("#pnValue").on("change",function(){
	        	  	     		var pa = $("#pnValue").val();
	        	  	     		to_page(1,pa);
	        	  	     	})
	        	   	              
		   	   } ,
	           error: function(){
		   	    alert("请选择");  
		   	 $('#gaojichaxun').show();
		   	      }
		}) 
		}  	
	      } 
		var pa = $("#pnValue").val();
		to_page(1,pa);
	})
	
	}
$(function(){
	 search_punish();
})

//一般条件查询
$(function(){
	$("#btn_commonQuery").click(function(){
		//alert();
		$("#gaojichaxun").toggle();
		function to_page(pn,pa){
			var major= $("#major").val();
	   		var sex = $("#sex_option").val();
	   		var mingzu = $("#mingzu_option").val();
	   	    var zzmm = $("#ZZMM_option").val();      	          
	        var nianji = $("#nianji").val();
	        var className = $("#classNo").val();
	        var stuType = "本科生";
	      	 $.ajax({url: "getStudentByCommonQuery",
	             type:"post", 
	             dataType:"json",
	             data:{"pn":pn,
	            	   "pa":pa,
	            	   "nianji":nianji,
	            	   "major":major,
	            	   "className":className,	            	   
	            	   "stuType":stuType,
	            	   "mingzu":mingzu,
	                   "zzmm":zzmm,	                  
	      	 		   "sex":sex	                   
	                  },
	             scriptCharset: 'utf-8',
	             success: function(data){
	            	 var list = data.list;	  	    	   
	                 var table = $("#stutable");            
	                 table.html(" ") ;   

	                 for(var i=0;i<list.length;i++){
	                	 
	     	             switch(list[i].className){
	    	                 case  10:var cla = '会计金融双学位班';break;
	    	                 case  11:var cla = '卓越会计师班';break;
	    	                 case  12:var cla = '中法班';break;
	    	                 default: var cla=list[i].className;
	    	             }	
	              	   
	               	  var tr = $("<tr role='row'></tr>");
	               	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	               	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	                            +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	            	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none">'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	            	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	               	  table.append(tr);
	               	  } 
	                 personPage();
	                displayT();
	                clicktd();
	                //创建分页条 
	                 var pageNow = data.pageNum;
	                 var pageTotal = data.pages;
	                 var total  = data.total;
	                 var pageInfo = $("#pageInfo");
	                     pageInfo.html(" ");
	                     pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	                //创建分页导航条
	                   var pa = $("#pnValue").val();
	                   var ul =$("<ul></ul>").addClass("pagination");
	                   var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	                   var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	                   if(data.hasPreviousPage == false){
	                   	firstPage.addClass("disabled");
	                   	prePage.addClass("disabled");
	                    }else{
	                     firstPage.click(function(){
	                  	   to_page(1,pa);
	                     })
	                     prePage.click(function(){
	                  	   to_page(pageNow-1,pa);
	                     })
	                    }
	                   
	                   var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	                   var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	                      if(data.hasNextPage == false){
	                    	  nextPage.addClass("disabled");
	                    	  lastPage.addClass("disabled");
	                      }else{
	                        nextPage.click(function(){
	                        	to_page(pageNow+1,pa);
	                        })
	                        lastPage.click(function(){
	                        	to_page(pageTotal,pa);
	                        })
	                      }
	                   
	                     ul.append(firstPage);
	                     ul.append(prePage);
	                   $.each(data.navigatepageNums,function(index,item){
	                   	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	                   	if(pageNow == item){
	                   		numli.addClass("active");
	                   	}
	                   	  numli.click(function(){
	                   		  to_page(item,pa); 
	                   	  })
	                        ul.append(numli); 
	                   })
	                    ul.append(nextPage);
	                    ul.append(lastPage);
	                    var nav = $("<nav></nav>").append(ul);
	                     var pageNav = $("#pageNav");
	                         pageNav.html(" ");
	                         pageNav.append(nav);
	                 
	                       $("#pnValue").on("change",function(){
	              	     		var pa = $("#pnValue").val();
	              	     		to_page(1,pa);
	              	     	})
	    	   	   } ,
	             error: function(){
	    	   	    alert("请选择");
	    	   	    $('#gaojichaxun').show();
	    	   	      }
	    	}) 
	        	}
	        	var pa = $("#pnValue").val();
	       		to_page(1,pa);
	       	})
	    })

//模态框详细查询
function clicktd(){
	
	$(".personPage").click(function(){
			$('.loadingBox').show();
             //  $("#personModal").modal({
	          //   backdrop:"static",
             // }) ;
               var studentNo = $(this).html(); 
               $("#personNo").html(studentNo);   
               var src = "image/"+studentNo+".jpg";
               $("#imgDisplay").attr("src",src);
               
               //$.getScript('js/echarts.min.js',function(){
            	   
            	   $.ajax({
            		   url:"stuAnalyze",
            		   type:"post",
                	   data:{"id":studentNo},
                	   dataType:"json",
                	   scriptCharset: 'utf-8',
                	   success:function(result){
                		   $("#personModal").modal({
              	             backdrop:"static",
                            }) ;
          		        $('.loadingBox').hide();
                		   var dom = document.getElementById("personAnalyze");
                           var myChart = echarts.init(dom,myChart,
                                {
                                    width: 300,
                                    height: 260,
                                    lockY: true,
                                    throttle: 70
                                });

                                // 指定图表的配置项和数据
                          var app = {};
                          var data = result;
                            option = null;
                            option = {
                              tooltip: {},

                            radar: {
                                // shape: 'circle',
                                name: {
                                    textStyle: {
                                        color: '#6666FF',
                                        backgroundColor: '#F0F0F0',
                                        borderRadius: 3,
                                        padding: [3, 5]

                                   }
                                },
                                indicator: [
                                   { name: '惩罚次数', max: 10},
                                   { name: '获奖次数', max: 10},
                                   { name: '职业技能', max: 10},
                                   { name: '校外活动', max: 10},
                                   { name: '校内任职', max: 10},
                                   { name: '平均绩点', max: 4}
                                ]
                            },
                            series: [{
                                name: '学生个人分析',
                                type: 'radar',
                                // areaStyle: {normal: {}},
                                data : [
                                    {
                                        value : data,
                                        name : '学生个人分析'
                                    },
                                
                                ]
                            }]
                        };;
                        if (option && typeof option === "object") {
                            myChart.setOption(option, true);
                        }//这个函数是在new.js里面的，当点击click后运行这个函数
                    	 
                       
                	   },
            		   
            	   })
            
            
                            
               
               $.ajax({
            	   url:"getstuByNo",
            	   type:"post",
            	   data:{"id":studentNo},
            	   dataType:"json",
            	   scriptCharset: 'utf-8',
            	   success:function(data){
            		  // console.log(data);            		
            			var input = $("#personPageOne input");
        			    $.each(input, function() {
        			    	$(this).css("border","0px");
        			    });
                
            		        var StudentName = data.studentName;
            		        $("#personName").val(StudentName);
            		        var major = data.major;
            		        $("#personMajor").val(major); 
            		        var className = data.className;
            		        
   		 	             switch(data.className){
	 	                 case  10:var cla = data.className+'（会计金融双学位班）';break;
	 	                 case  11:var cla = data.className+'（卓越会计师班）';break;
	 	                 case  12:var cla = data.className+'（中法班）';break;
	 	                 default: var cla=data.className;
	 	             }	
            		        
            		        $("#personClassName").val(cla);
            		        var personTermYear = data.termYear;
            		        $('#personTermYear').val(personTermYear);
            		        var sex = data.sex;
            		        $("#personSex").val(sex); 
            		        var building = data.buildingName+"-"+data.roomNum+"-"+data.bedNum;
            		        $("#personBuilding").val(building); 
            		        var MZ = data.mz;
            		        $("#personMZ").val(MZ); 
            		        var personID = data.personID;
            		        $("#personId_").val(personID); 
            		        var sfps = data.sfps;
            		        if(sfps==0){
            		        	sfps="否";            		       
            		        	}else{
            		        	sfps="是";
            		        }
            		        $("#personSFPS").val(sfps);
            		        $("#personBirthday").val(data.birthday); 
            		        var ZZMM = data.zzmm;
            		        $("#personZZMM").val(ZZMM); 
            		        var phone = data.phone;
            		        $("#personPhone").val(phone); 
            		        var QQ = data.qq;
            		        $("#personQQ").val(QQ); 
            		        var address = data.address;
            		        $("#personaddress").val(address);
            		        var JG = data.jg;
            		        $("#personJG").val(JG); 
            		        var TC = data.tc;
            		        $("#personTC").val(TC); 
            		        var mother = data.motherName;
            		        $("#personMother").html(mother); 
            		        var motherphone = data.motherPhone;
            		        $("#personMotherPhone").html(motherphone); 
            		        var father = data.fatherName;
            		        $("#personFather").html(father); 
            		        var fatherphone = data.fatherPhone;
            		        $("#personFatherPhone").html(fatherphone); 
            		        var motherWork = data.motherWorkplace;
            		        $("#personMotherWork").html(motherWork);
            		        var fatherWork = data.fatherWorkplace;
            		        $("#personFatherWork").html(fatherWork); 
            		        var studyType = data.studyType;
            		        $("#personStudyType").val(studyType);
            		       

            	   }
               })
  
                   		        $("#updatePerson").click(function(){
            		       
            		        	var studentNo =$("#personNo").html();
            		        	var personName =$("#personName").val();
            		        	var personMajor =$("#personMajor").val();
            		        	var personClassName = parseInt($("#personClassName").val());
            		        	var personSex =$("#personSex").val();
            		        	var personBuilding =$("#personBuilding").val();
            		        	var B = personBuilding.split("-");
            		        	var buildingName=B[0];
            		        	var roomNum = B[1];
            		        	var bedNum = B[2];
            		        	var personTermYear = $("#personTermYear").val();
            		        	var personMZ =$("#personMZ").val();
            		        	var personId_ =$("#personId_").val();
            		        	var personPhone =$("#personPhone").val();
            		        	var personQQ =$("#personQQ").val();
            		        	var personZZMM =$("#personZZMM").val();
            		        	var personStudyType =$("#personStudyType").val();
            		        	var personJG =$("#personJG").val();
            		        	var address = $("#personaddress").val();
            		        	var personTC =$("#personTC").val();
            		        	
            		        	var sfps = $("#personSFPS").val();
            		        	if(sfps=="是"){
            		        		sfps=parseInt("1");
            		        	}else{
            		        		sfps=parseInt("0");
            		        	}
            		        	 $(this).attr('disabled',true);
            		        	$.ajax({
            		        		url:"updateStudent_T",
            		        		type:"post",
            		        		dataType:"text",
            		        		data:{"studentNo":studentNo,
            		    				"studentName":personName,
            		    				"termYear":personTermYear,
            		    				"major":personMajor,
            		    				"className":personClassName,
            		    				"sex":personSex,
            		    				"MZ":personMZ,
            		    				"ZZMM":personZZMM,  
            		    				"JG":personJG,
            		    				"personID":personId_,
            		    				"sfps":sfps,
            		    				"phone":personPhone,
            		    				"QQ":personQQ,
            		    				"address":address,
            		    				"buildingName":buildingName,
            		    				"roomNum":roomNum,
            		    				"bedNum":bedNum,
            		    				"TC":personTC,
            		    				"studyType":personStudyType},
            		        		success:function(){
            		        			alert("修改成功");
            		        			 $(this).attr('disabled',false);
            		        		}
            		        	})
            		        })
            		        
        $("#personSearchReward").click(function(){
        	$.ajax({url: "getJL",
 	           type:"GET", 
 	           dataType:"json",
 	           data:{"studentNo":studentNo
 	                },
 	           scriptCharset: 'utf-8',
 	          success: function(data){
 	        	  var table =$("#personReward");
 	        	  
 	        	  var tr=$("<tr><th width='100'>编号</th><th width='150'>学号</th><th width='100'>奖励名称</th><th width='100'> 奖励级别</th><th width='100'> 指导老师</th><th width='100'> 主办方</th><th width='100'>奖励获取时间</th><td>图片</td></tr>");
 	                  table.html(" ");
 	                  table.append(tr);
 	                  for(var i=0;i<data.length;i++){
 	                	  var j = i+1;
 	                	 var src = "image/"+data[i].studentNo+data[i].imageName+".jpg";
 	                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].jlname+"</td><td>"+data[i].jllevel+"</td><td>"+data[i].adviser+"</td><td>"+data[i].sponsor+"</td><td>"+data[i].getTime+"</td><td><img  src="+src+" width='300'height='200' ></tr>"); 
 	                     table.append(tr);
 	                  };
 	        	//  console.log(data);	    		  
 		   	   } ,
 	           error: function(){
 		   	    alert("查询出错");  
 		   	      }
 		})
        })
        
        $("#personSearchPunish").click(function(){
        	$.ajax({url: "getPunish",
  	           type:"post", 
  	           dataType:"json",
  	           data:{"studentNo":studentNo
  	                },
  	           scriptCharset: 'utf-8',
  	          success: function(data){
  	        	 var table =$("#personPunish");	
  	        	 var tr=$("<tr><th width='100'>编号</th><th >学号</th><th > 处分级别</th><th > 处分原因</th><th>处分时间</th></tr>")
 	                  table.html(" ");
  	        	      table.append(tr);
 	                  for(var i=0;i<data.length;i++){
 	                	  var j = i+1;
 	                	  var punishReason = $.trim(data[i].punishReason);
 	                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].punishName+"</td><td>"+punishReason+"</td><td>"+data[i].punishTime+"</td></tr>"); 
 	                     table.append(tr);
 	                  };
	    		  
  		   	   } ,
  	           error: function(){
  		   	    alert("查询出错");  
  		   	      }
  		})  
        })
      
      $("#personPracticeSearch").click(function(){
    	  $.ajax({url: "getOffice",
	           type:"post", 
	           dataType:"json",
	           data:{"studentNo":studentNo
	                },
	           scriptCharset: 'utf-8',
	          success: function(data){
	        	 var table =$("#personPractice");	      	
	        	  var tr=$("<tr><th width='110'>编号</th><th width='100'>学号</th><th width='200'>任职经历</th><th width='90'>开始时间</th><th width='90'>结束时间</th></tr>")
                table.html(" ");
	        	      table.append(tr);
                for(var i=0;i<data.length;i++){
              	  var j = i+1;
              	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].practiceName+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td></tr>"); 
                   table.append(tr);
                }; 
	            
		   	   } ,
	           error: function(){
		   	    alert("查询出错");  
		   	      }
		}) 
		$.ajax({url: "getActive",
 	           type:"post", 
 	           dataType:"json",
 	           data:{"studentNo":studentNo
 	                },
 	           scriptCharset: 'utf-8',
 	          success: function(data){
 	        	 var table =$("#personPractice");	      
                for(var i=0;i<data.length;i++){
              	  var j = i+1;//alert(data[i].type);
              	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].practiceName+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td></tr>"); 
                   table.append(tr);
                };		  
 		   	   } ,
 	           error: function(){
 		   	    alert("查询出错");  
 		   	      }
      })  
               
	})
	     $("#personSerachGrade").click(function(){
	    	 $.ajax({url: "getGrade",
		           type:"POST", 
		           dataType:"json",
		           data:{"studentNo":studentNo
		                },
		           scriptCharset: 'utf-8',
		          success: function(data){
		        	  var table =$("#personGrade");
		        	  
		        	  var tr=$("<tr><th width='100'>编号</th><th width='150'>学号</th><th width='100'>学期</th><th width='100'> 平均成绩</th><th width='100'>平均学分</th></tr>");
		                  table.html(" ");
		                  table.append(tr);
		                  for(var i=0;i<data.length;i++){
		                	  var j = i+1;
		                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].termNo+"</td><td>"+data[i].avgGrade+"</td><td>"+data[i].avgCPA+"</td></tr>"); 
		                     table.append(tr);
		                  };
		        	 		  
			   	   } ,
		           error: function(){
			   	    alert("查询出错");  
			   	      }
			}) 
	     })
	
	     $("#personSearchGJ").click(function(){
	    	 $.ajax({url: "getLevel",
		           type:"post", 
		           dataType:"json",
		           data:{"studentNo":studentNo
		                },
		           scriptCharset: 'utf-8',
		          success: function(data){
		        	  var table =$("#personGJ");	      	
		        	  var tr=$("<tr><th width='100'>编号</th><th style='width:200px'>学号</th><th style='width:200px'>技能证书名称</th><th style='width:200px'>获得时间</th></tr>")
	                  table.html(" ");
		        	      table.append(tr);
	                  for(var i=0;i<data.length;i++){
	                	  var j = i+1;
	                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].skillName+"</td><td>"+data[i].time+"</td></tr>"); 
	                     table.append(tr);
	                  };// console.log(data);	    		  
			   	   } ,
		           error: function(){
			   	    alert("查询出错");  
			   	      }
			})  
	     })
	
       //})
	})
	
	 $(".tr_grade").click(function(){
		  $("#2grade").modal({
			    backdrop:"static",
		  })
		  
   		var No = $(this).attr("sid");
   		$.ajax({url: "getGrade",
	           type:"POST", 
	           dataType:"json",
	           data:{"studentNo":No
	                },
	           scriptCharset: 'utf-8',
	          success: function(data){
	        	  var table =$("#grade_table");
	        	  
	        	  var tr=$("<tr><th width='100'>编号</th><th width='150'>学号</th><th width='100'>学期</th><th width='100'> 平均成绩</th><th width='100'>平均学分</th></tr>");
	                  table.html(" ");
	                  table.append(tr);
	                  for(var i=0;i<data.length;i++){
	                	  var j = i+1;
	                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].termNo+"</td><td>"+data[i].avgGrade+"</td><td>"+data[i].avgCPA+"</td></tr>"); 
	                     table.append(tr);
	                  };
	        	//  console.log(data);	    		  
		   	   } ,
	           error: function(){
		   	    alert("查询出错");  
		   	      }
		}) 
	 })
	
	  $(".tr_awards").click(function(){		  
		  $("#2reward").modal({
			    backdrop:"static",
		  })
		  
    		var No = $(this).attr("sid");
    		$.ajax({url: "getJL",
 	           type:"GET", 
 	           dataType:"json",
 	           data:{"studentNo":No
 	                },
 	           scriptCharset: 'utf-8',
 	          success: function(data){
 	        	  var table =$("#2reward_table");
 	        	  
 	        	  var tr=$("<tr><th width='100'>编号</th><th width='150'>学号</th><th width='100'>奖励名称</th><th width='100'> 奖励级别</th><th width='100'> 指导老师</th><th width='100'> 主办方</th><th width='100'>奖励获取时间</th></tr>");
 	                  table.html(" ");
 	                  table.append(tr);
 	                  for(var i=0;i<data.length;i++){
 	                	  var j = i+1;
 	                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].jlname+"</td><td>"+data[i].jllevel+"</td><td>"+data[i].adviser+"</td><td>"+data[i].sponsor+"</td><td>"+data[i].getTime+"</td></tr>"); 
 	                     table.append(tr);
 	                  };
 	        	 		  
 		   	   } ,
 	           error: function(){
 		   	    alert("查询出错");  
 		   	      }
 		})   	  
    		
    		
    	})
     $(".tr_punish").click(function(){
    	 
    	 $("#2punish").modal({
			    backdrop:"static",
		  })
    		var No = $(this).attr("sid");
    		$.ajax({url: "getPunish",
 	           type:"post", 
 	           dataType:"json",
 	           data:{"studentNo":No
 	                },
 	           scriptCharset: 'utf-8',
 	          success: function(data){
 	        	 var table =$("#punish_table");	
 	        	 var tr=$("<tr><th width='100'>编号</th><th >学号</th><th > 处分级别</th><th > 处分原因</th><th>处分时间</th></tr>")
	                  table.html(" ");
 	        	      table.append(tr);
	                  for(var i=0;i<data.length;i++){
	                	  var j = i+1;
	                	  var punishReason = $.trim(data[i].punishReason);
	                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].punishName+"</td><td>"+punishReason+"</td><td>"+data[i].punishTime+"</td></tr>"); 
	                     table.append(tr);
	                  };	    		  
 		   	   } ,
 	           error: function(){
 		   	    alert("查询出错");  
 		   	      }
 		})  

    	})
    	
    $(".tr_level").click(function(){
    	
    	 $("#2gj").modal({
			    backdrop:"static",
		  })
		  
    	var No = $(this).attr("sid");
		$.ajax({url: "getLevel",
	           type:"post", 
	           dataType:"json",
	           data:{"studentNo":No
	                },
	           scriptCharset: 'utf-8',
	          success: function(data){
	        	  var table =$("#gj_table");	      	
	        	  var tr=$("<tr><th width='100'>编号</th><th style='width:200px'>学号</th><th style='width:200px'>技能证书名称</th><th style='width:200px'>获得时间</th></tr>")
                  table.html(" ");
	        	      table.append(tr);
                  for(var i=0;i<data.length;i++){
                	  var j = i+1;
                	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].skillName+"</td><td>"+data[i].time+"</td></tr>"); 
                     table.append(tr);
                  };// console.log(data);	    		  
		   	   } ,
	           error: function(){
		   	    alert("查询出错");  
		   	      }
		})  

    	})
    	
     $(".tr_office").click(function(){
    	 $("#2rz").modal({
			    backdrop:"static",
		  })
    		var No = $(this).attr("sid");
    		$.ajax({url: "getOffice",
 	           type:"post", 
 	           dataType:"json",
 	           data:{"studentNo":No
 	                },
 	           scriptCharset: 'utf-8',
 	          success: function(data){
 	        	 var table =$("#rz_table");	      	
	        	  var tr=$("<tr><th width='110'>编号</th><th width='100'>学号</th><th width='200'>任职经历</th><th width='90'>开始时间</th><th width='90'>结束时间</th></tr>")
                 table.html(" ");
	        	      table.append(tr);
                 for(var i=0;i<data.length;i++){
               	  var j = i+1;
               	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].practiceName+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td></tr>"); 
                    table.append(tr);
                 };
 	            
 		   	   } ,
 	           error: function(){
 		   	    alert("查询出错");  
 		   	      }
 		})  

    	})
     $(".tr_active").click(function(){
    	 $("#2xw").modal({
			    backdrop:"static",
		  })
    		var No = $(this).attr("sid");
    		$.ajax({url: "getActive",
 	           type:"post", 
 	           dataType:"json",
 	           data:{"studentNo":No
 	                },
 	           scriptCharset: 'utf-8',
 	          success: function(data){
 	        	 var table =$("#xw_table");	      	
	        	  var tr=$("<tr><th width='110'>编号</th><th width='100'>学号</th><th width='200'>活动经历</th><th width='90'>开始时间</th><th width='90'>结束时间</th></tr>")
                table.html(" ");
	        	      table.append(tr);
                for(var i=0;i<data.length;i++){
              	  var j = i+1;
              	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].practiceName+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td></tr>"); 
                   table.append(tr);
                };// console.log(data);			  
 		   	   } ,
 	           error: function(){
 		   	    alert("查询出错");  
 		   	      }
 		})  
    		//var studentNo=$(this).attr("sid");
    	//	alert(studentNo);
    	})
    	
    	$(".tr_help").click(function(){
    		
    		$("#2bz").modal({
			    backdrop:"static",
		  })
    		var No = $(this).attr("sid");
    		$.ajax({url: "getHelp",
 	           type:"post", 
 	           dataType:"json",
 	           data:{"studentNo":No
 	                },
 	           scriptCharset: 'utf-8',
 	          success: function(data){
 	        	 var table =$("#bz_table");	      	
	        	  var tr=$("<tr><th width='110'>编号</th><th width='100'>学号</th><th width='200'>补助类型</th><th width='90'>时间</th></tr>")
               table.html(" ");
	        	      table.append(tr);
               for(var i=0;i<data.length;i++){
             	  var j = i+1;
             	 var tr = $("<tr><td>"+j+"</td><td>"+data[i].pstudentNo+"</td><td>"+data[i].zzname+"</td><td>"+data[i].zztime+"</td></tr>"); 
                  table.append(tr);
               };// console.log(data);				  
 		   	   } ,
 	           error: function(){
 		   	    alert("查询出错");  
 		   	      }
 		})  

    	})
}

//Excel上传
 $(function(){
	 
	 $("#bt1").click(function(){

		        var url="downloadFile";//下载文件url

	 		     $("#fileForm").attr('action',url);
	 		
	 		     $("#fileName").val("学生信息导入模板.xls");

	 		     $("#fileForm").submit();
		  
		})
	 
    		$("#file_btn").click(function(){ 
    	  var uploadEventFile = $("#uploadEventFile").val();

    	           if(uploadEventFile == '')
    	            {  
    	            alert("请选择excel,再上传");  
    	           
    	            }else if(uploadEventFile.lastIndexOf(".xls")<0){//可判断以.xls和.xlsx结尾的excel  
    	            alert("只能上传Excel文件");
    	        
    	            }else{
    	            	$("#dealingImage").show();
    	            	var stuType = "本科生";
    	            	var formData=new FormData();
    	            	formData.append("file",$("#uploadEventFile")[0].files[0]);
    	            	formData.append("stuType",stuType);
  
    	            	$.ajax({ url: "uploadEcxel",
    	       	           type:"post", 
    	       	           dataType:"text",
    	      	           data:formData,
    	        	         cache: false,//上传文件无需缓存 
    	                  processData: false,//用于对data参数进行序列化处理 这里必须false
    	                  contentType: false, //必须 
    	       	         scriptCharset: 'utf-8',    	        	           
    	        	        success: function(data){
    	        	        	 $("#dealingImage").hide();
    	        	        	alert(data);
    	     	    	} , 
    	       	         error:function(){
    	       	        	$("#dealingImage").hide();
    	       	        	 alert("上传错误");
    	        	         } 
    	     		});
    	            }
    		})     
 })  	 


function displayT()	{ 

		
		var box = [];
           var i=4;
		  for( i;i<30;i++){
			  var strth = "#displayTable tr th:nth-child("; 
			  var strtd = "#displayTable tr td:nth-child(";
				   $(strtd+i+")").hide();  
				   $(strth+i+")").hide();  
		  }


		$.each($('#display input:checkbox:checked'),function(){
			 box.push($(this).val());
		});

        if(box.length >=13 ){
        	alert("请注意不要同时显示超过15个字段，谨防变形");
        }
		$.each( box, function(j, n){
			
		   n = parseInt(n)+2;
		   var strth = "#displayTable tr th:nth-child(" ;  
		   var strtd = "#displayTable tr td:nth-child(" ; 
		   $(strtd+n+")").show();  
		   $(strth+n+")").show();  
			
	   })
	
}

$("#btn_display").click(function(){
	displayT();	
})
//创建data型数据表格
function createTableData(data){	  	    	   
    var table = $("#stutable");            
   clear();   
    for(var i=0;i<data.length;i++){
         switch(data[i].className){
          case  10:var cla = '会计金融双学位班';break;
          case  11:var cla = '卓越会计师班';break;
          case  12:var cla = '中法班';break;
          default: var cla=data[i].className;
      }	
    	
  	  var tr = $("<tr role='row'></tr>");
  	 var roomNum = data[i].buildingName+ "-"+data[i].roomNum+"-"+ data[i].bedNum;
  	   tr.html("<td><input class='compareBox' type='checkbox' value="+data[i].studentNo+"></td><td  class='personPage'>"+data[i].studentNo+"</td><td>"+data[i].studentName+'</td><td>'+data[i].sex+'</td><td>'+data[i].major+'</td><td>'+cla+'</td><td>'+data[i].phone+'</td><td style="display:none">'+data[i].qq+'</td>'
               +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+data[i].personID+'</td><td style="display:none">'+data[i].mz+'</td><td style="display:none">'+data[i].zzmm+'</td><td style="display:none">'+data[i].address+'</td><td style="display:none" class="tr_awards" sid='+data[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+data[i].studentNo+'>处分明细</td>'
	   			+'<td style="display:none" class="tr_level" sid='+data[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+data[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+data[i].studentNo+'>校外活动详情</td><td style="display:none" >'+data[i].tc+'</td><td style="display:none" class="tr_grade" sid='+data[i].studentNo+'>成绩详细</td><td style="display:none">'+data[i].sfps+'</td><td style="display:none" class="tr_help" sid='+data[i].studentNo+' >补助详细</td><td>'
	   			+data[i].fatherName+"</td><td>"+data[i].fatherPhone+"</td><td>"+data[i].fatherWorkplace+"</td><td>"+data[i].motherName+"</td><td>"+data[i].motherPhone+"</td><td>"+data[i].motherWorkplace+"</td><td>"+data[i].studyType+"</td>");  
  	  table.append(tr);
  	  }
    personPage();
    displayT();
    clicktd();
}


//list型数据创建表格
function createTableList(data){

	 var list = data.list;	  	    	   
     var table = $("#stutable");            
     table.html(" ") ;   

     for(var i=0;i<list.length;i++){
  	   
         switch(list[i].className){
         case  10:var cla = '会计金融双学位班';break;
         case  11:var cla = '卓越会计师班';break;
         case  12:var cla = '中法班';break;
         default: var cla=list[i].className;
     }	
    	 
   	  var tr = $("<tr role='row'></tr>");
   	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
   	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
                +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
   	  table.append(tr);
   	  } 
     personPage();
    displayT();
    clicktd();
    //创建分页条 
     var pageNow = data.pageNum;
     var pageTotal = data.pages;
     var total  = data.total;
     var pageInfo = $("#pageInfo");
         pageInfo.html(" ");
         pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

    //创建分页导航条
       var pa = $("#pnValue").val();
       var ul =$("<ul></ul>").addClass("pagination");
       var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
       var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
       if(data.hasPreviousPage == false){
       	firstPage.addClass("disabled");
       	prePage.addClass("disabled");
        }else{
         firstPage.click(function(){
      	   to_page(1,pa);
         })
         prePage.click(function(){
      	   to_page(pageNow-1,pa);
         })
        }
       
       var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
       var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
          if(data.hasNextPage == false){
        	  nextPage.addClass("disabled");
        	  lastPage.addClass("disabled");
          }else{
            nextPage.click(function(){
            	to_page(pageNow+1,pa);
            })
            lastPage.click(function(){
            	to_page(pageTotal,pa);
            })
          }
       
         ul.append(firstPage);
         ul.append(prePage);
       $.each(data.navigatepageNums,function(index,item){
       	var numli = $("<li></li>").append($("<a></a>").append(item)); 
       	if(pageNow == item){
       		numli.addClass("active");
       	}
       	  numli.click(function(){
       		  to_page(item,pa); 
       	  })
            ul.append(numli); 
       })
        ul.append(nextPage);
        ul.append(lastPage);
        var nav = $("<nav></nav>").append(ul);
         var pageNav = $("#pageNav");
             pageNav.html(" ");
             pageNav.append(nav);
     
           $("#pnValue").on("change",function(){
  	     		var pa = $("#pnValue").val();
  	     		to_page(1,pa);
  	     	})
 	     
	              
	}


 //清空页面 
function clear(){
	var table = $("#stutable");            
    table.html(" ") ;  
    var pageNav = $("#pageNav");
    var pageInfo = $("#pageInfo");
    pageNav.html(" ");
    pageInfo.html(" ");
}


//默认查询
$(function(){
	function to_page(pn,pa){	
		$.ajax({url: "getsE",
	           type:"get", 
	           dataType:"json",
	           data:{"pn":pn,
	        	     "pa":pa},
	           scriptCharset: 'utf-8',
 	       success: function(data){
 	    	//   console.log(data);	          
 	    		var list = data.list;	  	    	   
 	    	     var table = $("#stutable");            
 	    	     table.html(" ") ;   

 	    	     for(var i=0;i<list.length;i++){
 	    	  	   
 	    	         switch(list[i].className){
 	    	          case  10:var cla = '会计金融双学位班';break;
 	    	          case  11:var cla = '卓越会计师班';break;
 	    	          case  12:var cla = '中法班';break;
 	    	          default: var cla=list[i].className;
 	    	      }	
 	    	    	 
 	    	   	  var tr = $("<tr role='row'></tr>");
 	    	   	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
 	    	   	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
 	    	                +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
 	    		   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none">'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
 	    		   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td>");  
 	    	   	  table.append(tr);
 	    	   	  } 
 	    	    displayT();
 	    	    clicktd();
 	    	    //创建分页条 
 	    	     var pageNow = data.pageNum;
 	    	     var pageTotal = data.pages;
 	    	     var total  = data.total;
 	    	     var pageInfo = $("#pageInfo");
 	    	         pageInfo.html(" ");
 	    	         pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

 	    	    //创建分页导航条
 	    	       var pa = $("#pnValue").val();
 	    	       var ul =$("<ul></ul>").addClass("pagination");
 	    	       var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
 	    	       var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
 	    	       if(data.hasPreviousPage == false){
 	    	       	firstPage.addClass("disabled");
 	    	       	prePage.addClass("disabled");
 	    	        }else{
 	    	         firstPage.click(function(){
 	    	      	   to_page(1,pa);
 	    	         })
 	    	         prePage.click(function(){
 	    	      	   to_page(pageNow-1,pa);
 	    	         })
 	    	        }
 	    	       
 	    	       var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
 	    	       var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
 	    	          if(data.hasNextPage == false){
 	    	        	  nextPage.addClass("disabled");
 	    	        	  lastPage.addClass("disabled");
 	    	          }else{
 	    	            nextPage.click(function(){
 	    	            	to_page(pageNow+1,pa);
 	    	            })
 	    	            lastPage.click(function(){
 	    	            	to_page(pageTotal,pa);
 	    	            })
 	    	          }
 	    	       
 	    	         ul.append(firstPage);
 	    	         ul.append(prePage);
 	    	       $.each(data.navigatepageNums,function(index,item){
 	    	       	var numli = $("<li></li>").append($("<a></a>").append(item)); 
 	    	       	if(pageNow == item){
 	    	       		numli.addClass("active");
 	    	       	}
 	    	       	  numli.click(function(){
 	    	       		  to_page(item,pa); 
 	    	       	  })
 	    	            ul.append(numli); 
 	    	       })
 	    	        ul.append(nextPage);
 	    	        ul.append(lastPage);
 	    	        var nav = $("<nav></nav>").append(ul);
 	    	         var pageNav = $("#pageNav");
 	    	             pageNav.html(" ");
 	    	             pageNav.append(nav);
 	    	     
 	    	           $("#pnValue").on("change",function(){
 	    	  	     		var pa = $("#pnValue").val();
 	    	  	     		to_page(1,pa);
 	    	  	     	}) 	    		 
 	       }  
		});
	
	}		  	
	var pa = $("#pnValue").val();
//	to_page(1,pa);
	
	
	//搜索栏的查询
	$("#getStudent").click(function(){
		
		  $("#page1").show();
		  $("#page2").hide();
		var Id_Name = $("#searchId").val();
        var stuType = "本科生";
		
		$.ajax({ url: "getstuByNo_name",
   	           type:"post", 
   	           dataType:"json",
   	           data:{
   	        	     "id":Id_Name,
   	        	     "stuType":stuType},
   	           scriptCharset: 'utf-8',
    	       success: function(data){
    	  		 $("#page-wrapper").show();
    			 $("#getin1id").hide();
    			 $("#getin2id").hide();
    			 $("#getin3id").hide();
    			 $("#getin4id").hide();
    			 $("#getin5id").hide();
    			 $("#leavePage").hide();
    	        createTableData(data);          
    	       }
   	        	     
		});
	})

})

          

$(function(){            //专业改变，判断是不是All，如果是，查询改年级的所有专业的学生
	                     //如果不是ALL，通过年级，专业查询班级
	                     //查询完班级，如果不是ALL，通过班级查询班级里的学生
	                     //否则通过年级和专业查询该专业的所有学生
	//专业改变
	$("#major").on("change",function(){

	          var major = $("#major").val();   

	          
	          var nianji = $("#nianji").val();	          

	          var pa =$("#pnValue").val();
	          //查询所有专业的学生
	          if(major=="All"){
	        	  function to_page(pn,pa){
	        		      var stuType = "本科生";
	        			$.ajax({url: "getAll",
	        		           type:"post", 
	        		           dataType:"json",
	        		           data:{"pn":pn,
	        		        	     "pa":pa,
	        		        	     "nianji":nianji,
	        		        	     "stuType":stuType
	        		        	     },
	        		           scriptCharset: 'utf-8',
	        	 	       success: function(data){
	        	 	    	   
	        	 	    	  var list = data.list;	  	    	   
	        	 	         var table = $("#stutable");            
	        	 	         table.html(" ") ;   

	        	 	         for(var i=0;i<list.length;i++){
	        	 	      	   
	         	    	         switch(list[i].className){
	        	    	          case  10:var cla = '会计金融双学位班';break;
	        	    	          case  11:var cla = '卓越会计师班';break;
	        	    	          case  12:var cla = '中法班';break;
	        	    	          default: var cla=list[i].className;
	        	    	      }	
	        	 	        	 
	        	 	       	  var tr = $("<tr role='row'></tr>");
	        	 	       	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	        	 	       	 tr.html("<input type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	        	 	                    +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	        	 	    	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	        	 	    	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	        	 	       	  table.append(tr);
	        	 	       	  } 
	        	 	         personPage();
	        	 	        displayT();
	        	 	        clicktd();
	        	 	        //创建分页条 
	        	 	         var pageNow = data.pageNum;
	        	 	         var pageTotal = data.pages;
	        	 	         var total  = data.total;
	        	 	         var pageInfo = $("#pageInfo");
	        	 	             pageInfo.html(" ");
	        	 	             pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	        	 	        //创建分页导航条
	        	 	           var pa = $("#pnValue").val();
	        	 	           var ul =$("<ul></ul>").addClass("pagination");
	        	 	           var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	        	 	           var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	        	 	           if(data.hasPreviousPage == false){
	        	 	           	firstPage.addClass("disabled");
	        	 	           	prePage.addClass("disabled");
	        	 	            }else{
	        	 	             firstPage.click(function(){
	        	 	          	   to_page(1,pa);
	        	 	             })
	        	 	             prePage.click(function(){
	        	 	          	   to_page(pageNow-1,pa);
	        	 	             })
	        	 	            }
	        	 	           
	        	 	           var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	        	 	           var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	        	 	              if(data.hasNextPage == false){
	        	 	            	  nextPage.addClass("disabled");
	        	 	            	  lastPage.addClass("disabled");
	        	 	              }else{
	        	 	                nextPage.click(function(){
	        	 	                	to_page(pageNow+1,pa);
	        	 	                })
	        	 	                lastPage.click(function(){
	        	 	                	to_page(pageTotal,pa);
	        	 	                })
	        	 	              }
	        	 	           
	        	 	             ul.append(firstPage);
	        	 	             ul.append(prePage);
	        	 	           $.each(data.navigatepageNums,function(index,item){
	        	 	           	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	        	 	           	if(pageNow == item){
	        	 	           		numli.addClass("active");
	        	 	           	}
	        	 	           	  numli.click(function(){
	        	 	           		  to_page(item,pa); 
	        	 	           	  })
	        	 	                ul.append(numli); 
	        	 	           })
	        	 	            ul.append(nextPage);
	        	 	            ul.append(lastPage);
	        	 	            var nav = $("<nav></nav>").append(ul);
	        	 	             var pageNav = $("#pageNav");
	        	 	                 pageNav.html(" ");
	        	 	                 pageNav.append(nav);
	        	 	         
	        	 	               $("#pnValue").on("change",function(){
	        	 	      	     		var pa = $("#pnValue").val();
	        	 	      	     		to_page(1,pa);
	        	 	      	     	})
	        	 	       }
	        		        	     
	        			});
	        		}
	        	  
	        	  $("#class").hide();
	        	  to_page(1,pa);
	          }//查询班级
	          else{ 
	          var stuType = "本科生";
	          $.ajax({ 
	          		url: "getclass",
	   	            type:"post", 
	   	            dataType:"json",
	   	            data:{"nianji":nianji,
	   	        	   "major":major,
	   	        	   "stuType":stuType},
	    	       success: function(data){
	    	    	 clear();
	                 $("#class").hide();
	                 $("#class").show();
	                 if(major=="All"){
	                	 $("#class").hide(); 
	                 }else{
	                 
	                 var cl =$("#classNo");
	                   cl.html(" ");
	                   cl.append("<option value='0'>请选择班级</option>")
	                   cl.append("<option value='0'>所有班级</option>")
	                   for(var i=0;i<data.length;i++){
	                	   switch(data[i]){
	                	   case 10:cla = "会计金融双学位班";break;
	                	   case 11:cla = "卓越会计师班";break;
	                	   case 12:cla = "中法班";break;
	                	   default:cla = data[i]+"班";
	                	   }
	                	   var option= $("<option value="+data[i]+">"+cla+"</option>");
	                	   cl.append(option);
	                   }
	                   
	                	var major = $("#major").val();   
	               	          
	               	    var nianji = $("#nianji").val();	          

	               	    var pa =$("#pnValue").val();
	               	          
	               	    var stuType = "本科生";
	                		  
	                		 function to_page(pn,pa){
	         	        			$.ajax({url: "getByNianjiAndMajor",
	         	        		           type:"post", 
	         	        		           dataType:"json",
	         	        		           data:{"pn":pn,
	         	        		        	     "pa":pa,
	         	        		        	     "nianji":nianji,
	         	        		        	     "major":major,
	         	        		        	     "stuType":stuType
	         	        		        	     },
	         	        		           scriptCharset: 'utf-8',
	         	        	 	       success: function(data){	         	        	 	    	   
	         	        	 	    	 var list = data.list;	  	    	   
	         	        	 	       var table = $("#stutable");            
	         	        	 	       table.html(" ") ;   

	         	        	 	       for(var i=0;i<list.length;i++){
	         	        	 	    	   
	         	      	    	         switch(list[i].className){
	         	   	    	          case  10:var cla = '会计金融双学位班';break;
	         	   	    	          case  11:var cla = '卓越会计师班';break;
	         	   	    	          case  12:var cla = '中法班';break;
	         	   	    	          default: var cla=list[i].className;
	         	   	    	      }	
	         	        	 	    	   
	         	        	 	     	  var tr = $("<tr role='row'></tr>");
	         	        	 	     	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	         	        	 	     	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	         	        	 	                  +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	         	        	 	  	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	         	        	 	  	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	         	        	 	     	  table.append(tr);
	         	        	 	     	  } 
	         	        	 	      personPage();
	         	        	 	      displayT();
	         	        	 	      clicktd();
	         	        	 	      //创建分页条 
	         	        	 	       var pageNow = data.pageNum;
	         	        	 	       var pageTotal = data.pages;
	         	        	 	       var total  = data.total;
	         	        	 	       var pageInfo = $("#pageInfo");
	         	        	 	           pageInfo.html(" ");
	         	        	 	           pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	         	        	 	      //创建分页导航条
	         	        	 	         var pa = $("#pnValue").val();
	         	        	 	         var ul =$("<ul></ul>").addClass("pagination");
	         	        	 	         var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	         	        	 	         var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	         	        	 	         if(data.hasPreviousPage == false){
	         	        	 	         	firstPage.addClass("disabled");
	         	        	 	         	prePage.addClass("disabled");
	         	        	 	          }else{
	         	        	 	           firstPage.click(function(){
	         	        	 	        	   to_page(1,pa);
	         	        	 	           })
	         	        	 	           prePage.click(function(){
	         	        	 	        	   to_page(pageNow-1,pa);
	         	        	 	           })
	         	        	 	          }
	         	        	 	         
	         	        	 	         var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	         	        	 	         var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	         	        	 	            if(data.hasNextPage == false){
	         	        	 	          	  nextPage.addClass("disabled");
	         	        	 	          	  lastPage.addClass("disabled");
	         	        	 	            }else{
	         	        	 	              nextPage.click(function(){
	         	        	 	              	to_page(pageNow+1,pa);
	         	        	 	              })
	         	        	 	              lastPage.click(function(){
	         	        	 	              	to_page(pageTotal,pa);
	         	        	 	              })
	         	        	 	            }
	         	        	 	         
	         	        	 	           ul.append(firstPage);
	         	        	 	           ul.append(prePage);
	         	        	 	         $.each(data.navigatepageNums,function(index,item){
	         	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	         	        	 	         	if(pageNow == item){
	         	        	 	         		numli.addClass("active");
	         	        	 	         	}
	         	        	 	         	  numli.click(function(){
	         	        	 	         		  to_page(item,pa); 
	         	        	 	         	  })
	         	        	 	              ul.append(numli); 
	         	        	 	         })
	         	        	 	          ul.append(nextPage);
	         	        	 	          ul.append(lastPage);
	         	        	 	          var nav = $("<nav></nav>").append(ul);
	         	        	 	           var pageNav = $("#pageNav");
	         	        	 	               pageNav.html(" ");
	         	        	 	               pageNav.append(nav);
	         	        	 	       
	         	        	 	             $("#pnValue").on("change",function(){
	         	        	 	    	     		var pa = $("#pnValue").val();
	         	        	 	    	     		to_page(1,pa);
	         	        	 	    	     	})   	        	 	     
	         	        	 	       }              
	         	        	           	         	        		        	     
	         	        			});
	         	        		}
	                		  var pa = $("#pnValue").val();
	         	        	  to_page(1,pa);


	                 }

	                 $("#classNo").on("change",function(){
	                	 
	                	 var classNo = $("#classNo").val();
	                	 //查询一个专业的所有学生
	                	 if(classNo=="0"){
	                		 
	                		  var major = $("#major").val();   
	               	          
	               	          var nianji = $("#nianji").val();	          

	               	          var pa =$("#pnValue").val();
	               	          
	               	          var stuType = "本科生";
	                		  
	                		 function to_page(pn,pa){
	         	        			$.ajax({url: "getByNianjiAndMajor",
	         	        		           type:"post", 
	         	        		           dataType:"json",
	         	        		           data:{"pn":pn,
	         	        		        	     "pa":pa,
	         	        		        	     "nianji":nianji,
	         	        		        	     "major":major,
	         	        		        	     "stuType":stuType
	         	        		        	     },
	         	        		           scriptCharset: 'utf-8',
	         	        	 	       success: function(data){	         	        	 	    	   
	         	        	 	    	 var list = data.list;	  	    	   
	         	        	 	       var table = $("#stutable");            
	         	        	 	       table.html(" ") ;   

	         	        	 	       for(var i=0;i<list.length;i++){
	         	        	 	    	   
	         	      	    	         switch(list[i].className){
	         	   	    	          case  10:var cla = '会计金融双学位班';break;
	         	   	    	          case  11:var cla = '卓越会计师班';break;
	         	   	    	          case  12:var cla = '中法班';break;
	         	   	    	          default: var cla=list[i].className;
	         	   	    	      }	
	         	        	 	    	   
	         	        	 	     	  var tr = $("<tr role='row'></tr>");
	         	        	 	     	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	         	        	 	     	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	         	        	 	                  +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	         	        	 	  	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	         	        	 	  	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	         	        	 	     	  table.append(tr);
	         	        	 	     	  } 
	         	        	 	      personPage();
	         	        	 	      displayT();
	         	        	 	      clicktd();
	         	        	 	      //创建分页条 
	         	        	 	       var pageNow = data.pageNum;
	         	        	 	       var pageTotal = data.pages;
	         	        	 	       var total  = data.total;
	         	        	 	       var pageInfo = $("#pageInfo");
	         	        	 	           pageInfo.html(" ");
	         	        	 	           pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	         	        	 	      //创建分页导航条
	         	        	 	         var pa = $("#pnValue").val();
	         	        	 	         var ul =$("<ul></ul>").addClass("pagination");
	         	        	 	         var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	         	        	 	         var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	         	        	 	         if(data.hasPreviousPage == false){
	         	        	 	         	firstPage.addClass("disabled");
	         	        	 	         	prePage.addClass("disabled");
	         	        	 	          }else{
	         	        	 	           firstPage.click(function(){
	         	        	 	        	   to_page(1,pa);
	         	        	 	           })
	         	        	 	           prePage.click(function(){
	         	        	 	        	   to_page(pageNow-1,pa);
	         	        	 	           })
	         	        	 	          }
	         	        	 	         
	         	        	 	         var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	         	        	 	         var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	         	        	 	            if(data.hasNextPage == false){
	         	        	 	          	  nextPage.addClass("disabled");
	         	        	 	          	  lastPage.addClass("disabled");
	         	        	 	            }else{
	         	        	 	              nextPage.click(function(){
	         	        	 	              	to_page(pageNow+1,pa);
	         	        	 	              })
	         	        	 	              lastPage.click(function(){
	         	        	 	              	to_page(pageTotal,pa);
	         	        	 	              })
	         	        	 	            }
	         	        	 	         
	         	        	 	           ul.append(firstPage);
	         	        	 	           ul.append(prePage);
	         	        	 	         $.each(data.navigatepageNums,function(index,item){
	         	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	         	        	 	         	if(pageNow == item){
	         	        	 	         		numli.addClass("active");
	         	        	 	         	}
	         	        	 	         	  numli.click(function(){
	         	        	 	         		  to_page(item,pa); 
	         	        	 	         	  })
	         	        	 	              ul.append(numli); 
	         	        	 	         })
	         	        	 	          ul.append(nextPage);
	         	        	 	          ul.append(lastPage);
	         	        	 	          var nav = $("<nav></nav>").append(ul);
	         	        	 	           var pageNav = $("#pageNav");
	         	        	 	               pageNav.html(" ");
	         	        	 	               pageNav.append(nav);
	         	        	 	       
	         	        	 	             $("#pnValue").on("change",function(){
	         	        	 	    	     		var pa = $("#pnValue").val();
	         	        	 	    	     		to_page(1,pa);
	         	        	 	    	     	})   	        	 	     
	         	        	 	       }              
	         	        	           	         	        		        	     
	         	        			});
	         	        		}
	                		  var pa = $("#pnValue").val();
	         	        	  to_page(1,pa);
	                	 }else{
	                	 //通过班级查询学生
	                	 function to_page(pn,pa){
	     	        		//	var Id_Name = "aaa";
	                		 var major = $("#major").val();   
	               	          
	               	          var nianji = $("#nianji").val();	
	               	          
	               	          var stuType = "本科生";
	     	        			$.ajax({url: "getStuByClass",
	     	        		           type:"post", 
	     	        		           dataType:"json",
	     	        		           data:{"pn":pn,
	     	        		        	     "pa":pa,
	     	        		        	     "classNo":classNo,
	     	        		        	     "nianji":nianji,
	     	        		        	     "major":major,
	     	        		        	     "stuType":stuType
	     	        		        	     },
	     	        		           scriptCharset: 'utf-8',
	     	        	 	       success: function(data){	     	        	 	    	   
	     	        	 	    	 var list = data.list;	  	    	   
	     	        	 	       var table = $("#stutable");            
	     	        	 	       table.html(" ") ;   

	     	        	 	       for(var i=0;i<list.length;i++){
	     	        	 	    	   
	     	      	    	         switch(list[i].className){
	     	   	    	          case  10:var cla = '会计金融双学位班';break;
	     	   	    	          case  11:var cla = '卓越会计师班';break;
	     	   	    	          case  12:var cla = '中法班';break;
	     	   	    	          default: var cla=list[i].className;
	     	   	    	      }	
	     	        	 	    	   
	     	        	 	     	  var tr = $("<tr role='row'></tr>");
	     	        	 	     	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	     	        	 	     	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	     	        	 	                  +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	     	        	 	  	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	     	        	 	  	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	     	        	 	     	  table.append(tr);
	     	        	 	     	  } 
	     	        	 	       personPage();
	     	        	 	      displayT();
	     	        	 	      clicktd();
	     	        	 	      //创建分页条 
	     	        	 	       var pageNow = data.pageNum;
	     	        	 	       var pageTotal = data.pages;
	     	        	 	       var total  = data.total;
	     	        	 	       var pageInfo = $("#pageInfo");
	     	        	 	           pageInfo.html(" ");
	     	        	 	           pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	     	        	 	      //创建分页导航条
	     	        	 	         var pa = $("#pnValue").val();
	     	        	 	         var ul =$("<ul></ul>").addClass("pagination");
	     	        	 	         var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	     	        	 	         var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	     	        	 	         if(data.hasPreviousPage == false){
	     	        	 	         	firstPage.addClass("disabled");
	     	        	 	         	prePage.addClass("disabled");
	     	        	 	          }else{
	     	        	 	           firstPage.click(function(){
	     	        	 	        	   to_page(1,pa);
	     	        	 	           })
	     	        	 	           prePage.click(function(){
	     	        	 	        	   to_page(pageNow-1,pa);
	     	        	 	           })
	     	        	 	          }
	     	        	 	         
	     	        	 	         var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	     	        	 	         var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	     	        	 	            if(data.hasNextPage == false){
	     	        	 	          	  nextPage.addClass("disabled");
	     	        	 	          	  lastPage.addClass("disabled");
	     	        	 	            }else{
	     	        	 	              nextPage.click(function(){
	     	        	 	              	to_page(pageNow+1,pa);
	     	        	 	              })
	     	        	 	              lastPage.click(function(){
	     	        	 	              	to_page(pageTotal,pa);
	     	        	 	              })
	     	        	 	            }
	     	        	 	         
	     	        	 	           ul.append(firstPage);
	     	        	 	           ul.append(prePage);
	     	        	 	         $.each(data.navigatepageNums,function(index,item){
	     	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	     	        	 	         	if(pageNow == item){
	     	        	 	         		numli.addClass("active");
	     	        	 	         	}
	     	        	 	         	  numli.click(function(){
	     	        	 	         		  to_page(item,pa); 
	     	        	 	         	  })
	     	        	 	              ul.append(numli); 
	     	        	 	         })
	     	        	 	          ul.append(nextPage);
	     	        	 	          ul.append(lastPage);
	     	        	 	          var nav = $("<nav></nav>").append(ul);
	     	        	 	           var pageNav = $("#pageNav");
	     	        	 	               pageNav.html(" ");
	     	        	 	               pageNav.append(nav);
	     	        	 	       
	     	        	 	             $("#pnValue").on("change",function(){
	     	        	 	    	     		var pa = $("#pnValue").val();
	     	        	 	    	     		to_page(1,pa);
	     	        	 	    	     	})	     	        	 	      
	     	        	 	       }              	     	        	         	     	        		        	     
	     	        			});
	     	        		}//
	                	 var pa = $("#pnValue").val();
	                	 to_page(1,pa);
	                	 }
	                 })
	                 
	    	          },
	   	           error: function(){
	   	        	 alert("查询出错");  
	   	           }
	          })
	          }
           })
	})

 
$(function(){            //专业改变，判断是不是All，如果是，查询改年级的所有专业的学生
	                     //如果不是ALL，通过年级，专业查询班级
	                     //查询完班级，如果不是ALL，通过班级查询班级里的学生
	                     //否则通过年级和专业查询该专业的所有学生
	//年级改变
	$("#nianji").on("change",function(){
	          var major = $("#major").val();             
	          var nianji = $("#nianji").val();	          
	      //    alert(nianji);	
	          var pa =$("#pnValue").val();
	          //查询所有专业的学生
	          
	          var stuType = "本科生";
	          if(major=="All"){
	        	  function to_page(pn,pa){
	        		  var nianji = $("#nianji").val();
	        		  var stuType = "本科生";
	        			$.ajax({url: "getAll",
	        		           type:"post", 
	        		           dataType:"json",
	        		           data:{"pn":pn,
	        		        	     "pa":pa,
	        		        	     "nianji":nianji,
	        		        	     "stuType":stuType
	        		        	     },
	        		           scriptCharset: 'utf-8',
	        	 	       success: function(data){	        	 	    	   
	        	 	    	  var list = data.list;	  	    	   
	        	 	         var table = $("#stutable");            
	        	 	         table.html(" ") ;   

	        	 	         for(var i=0;i<list.length;i++){
	        	 	      	   
	         	    	         switch(list[i].className){
	        	    	          case  10:var cla = '会计金融双学位班';break;
	        	    	          case  11:var cla = '卓越会计师班';break;
	        	    	          case  12:var cla = '中法班';break;
	        	    	          default: var cla=list[i].className;
	        	    	      }	
	        	 	        	 
	        	 	       	  var tr = $("<tr role='row'></tr>");
	        	 	       	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	        	 	       	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	        	 	                    +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	        	 	    	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	        	 	    	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	        	 	       	  table.append(tr);
	        	 	       	  } 
	        	 	         personPage();
	        	 	        displayT();
	        	 	        clicktd();
	        	 	        //创建分页条 
	        	 	         var pageNow = data.pageNum;
	        	 	         var pageTotal = data.pages;
	        	 	         var total  = data.total;
	        	 	         var pageInfo = $("#pageInfo");
	        	 	             pageInfo.html(" ");
	        	 	             pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	        	 	        //创建分页导航条
	        	 	           var pa = $("#pnValue").val();
	        	 	           var ul =$("<ul></ul>").addClass("pagination");
	        	 	           var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	        	 	           var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	        	 	           if(data.hasPreviousPage == false){
	        	 	           	firstPage.addClass("disabled");
	        	 	           	prePage.addClass("disabled");
	        	 	            }else{
	        	 	             firstPage.click(function(){
	        	 	          	   to_page(1,pa);
	        	 	             })
	        	 	             prePage.click(function(){
	        	 	          	   to_page(pageNow-1,pa);
	        	 	             })
	        	 	            }
	        	 	           
	        	 	           var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	        	 	           var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	        	 	              if(data.hasNextPage == false){
	        	 	            	  nextPage.addClass("disabled");
	        	 	            	  lastPage.addClass("disabled");
	        	 	              }else{
	        	 	                nextPage.click(function(){
	        	 	                	to_page(pageNow+1,pa);
	        	 	                })
	        	 	                lastPage.click(function(){
	        	 	                	to_page(pageTotal,pa);
	        	 	                })
	        	 	              }
	        	 	           
	        	 	             ul.append(firstPage);
	        	 	             ul.append(prePage);
	        	 	           $.each(data.navigatepageNums,function(index,item){
	        	 	           	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	        	 	           	if(pageNow == item){
	        	 	           		numli.addClass("active");
	        	 	           	}
	        	 	           	  numli.click(function(){
	        	 	           		  to_page(item,pa); 
	        	 	           	  })
	        	 	                ul.append(numli); 
	        	 	           })
	        	 	            ul.append(nextPage);
	        	 	            ul.append(lastPage);
	        	 	            var nav = $("<nav></nav>").append(ul);
	        	 	             var pageNav = $("#pageNav");
	        	 	                 pageNav.html(" ");
	        	 	                 pageNav.append(nav);
	        	 	         
	        	 	               $("#pnValue").on("change",function(){
	        	 	      	     		var pa = $("#pnValue").val();
	        	 	      	     		to_page(1,pa);
	        	 	      	     	})        	 	      
	        	 	       }              	        	           	        		        	     
	        			});
	        		}
	        	  $("#class").hide();
	        	  to_page(1,pa);
	          }//查询班级
	          else{
	          var stuType = "本科生";
	          var major = $("#major").val();             
	          var nianji = $("#nianji").val();	
	          $.ajax({ url: "getclass",
	   	           type:"post", 
	   	           dataType:"json",
	   	           data:{
	   	        	   "nianji":nianji,
	   	        	   "major":major,
	   	        	   "stuType":stuType
	   	        	   },
	    	       success: function(data){
	    	    	   clear();
	                 $("#class").hide();
	                 $("#class").show();
	                 if(major=="All"){
	                	 $("#class").hide(); 
	                 }else{
	                	 
	                   var cl =$("#classNo");
	                   cl.html(" ");
	                   cl.append("<option value='0'>请选择班级</option>")
	                   cl.append("<option value='0'>所有班级</option>")
	                   for(var i=0;i<data.length;i++){
	                	   switch(data[i]){
	                	   case 10:cla = "会计金融双学位班";break;
	                	   case 11:cla = "卓越会计师班";break;
	                	   case 12:cla = "中法班";break;
	                	   default:cla = data[i]+"班";
	                	   }
	                	   var option= $("<option value="+data[i]+">"+cla+"</option>");
	                	   cl.append(option);
	                   }
	                   var major = $("#major").val();   
	               	          
            	          var nianji = $("#nianji").val();	          

            	          var pa =$("#pnValue").val();
             		  
             		 function to_page(pn,pa){
      	        		var stuType = "本科生";
	                		   var major = $("#major").val();   
	 	               	          
		               	          var nianji = $("#nianji").val();	
      	        			$.ajax({url: "getByNianjiAndMajor",
      	        		           type:"post", 
      	        		           dataType:"json",
      	        		           data:{"pn":pn,
      	        		        	     "pa":pa,
      	        		        	     "nianji":nianji,
      	        		        	     "major":major,
      	        		        	     "stuType":stuType
      	        		        	     },
      	        		           scriptCharset: 'utf-8',
      	        	 	       success: function(data){
      	        	 	    	 var list = data.list;	  	    	   
      	        	 	       var table = $("#stutable");            
      	        	 	       table.html(" ") ;   

      	        	 	       for(var i=0;i<list.length;i++){
      	        	 	    	   
      	      	    	         switch(list[i].className){
      	   	    	          case  10:var cla = '会计金融双学位班';break;
      	   	    	          case  11:var cla = '卓越会计师班';break;
      	   	    	          case  12:var cla = '中法班';break;
      	   	    	          default: var cla=list[i].className;
      	   	    	      }	
      	        	 	    	   
      	        	 	     	  var tr = $("<tr role='row'></tr>");
      	        	 	     	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
      	        	 	     	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
      	        	 	                  +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
      	        	 	  	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
      	        	 	  	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
      	        	 	     	  table.append(tr);
      	        	 	     	  } 
      	        	 	       personPage();
      	        	 	      displayT();
      	        	 	      clicktd();
      	        	 	      //创建分页条 
      	        	 	       var pageNow = data.pageNum;
      	        	 	       var pageTotal = data.pages;
      	        	 	       var total  = data.total;
      	        	 	       var pageInfo = $("#pageInfo");
      	        	 	           pageInfo.html(" ");
      	        	 	           pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

      	        	 	      //创建分页导航条
      	        	 	         var pa = $("#pnValue").val();
      	        	 	         var ul =$("<ul></ul>").addClass("pagination");
      	        	 	         var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
      	        	 	         var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
      	        	 	         if(data.hasPreviousPage == false){
      	        	 	         	firstPage.addClass("disabled");
      	        	 	         	prePage.addClass("disabled");
      	        	 	          }else{
      	        	 	           firstPage.click(function(){
      	        	 	        	   to_page(1,pa);
      	        	 	           })
      	        	 	           prePage.click(function(){
      	        	 	        	   to_page(pageNow-1,pa);
      	        	 	           })
      	        	 	          }
      	        	 	         
      	        	 	         var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
      	        	 	         var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
      	        	 	            if(data.hasNextPage == false){
      	        	 	          	  nextPage.addClass("disabled");
      	        	 	          	  lastPage.addClass("disabled");
      	        	 	            }else{
      	        	 	              nextPage.click(function(){
      	        	 	              	to_page(pageNow+1,pa);
      	        	 	              })
      	        	 	              lastPage.click(function(){
      	        	 	              	to_page(pageTotal,pa);
      	        	 	              })
      	        	 	            }
      	        	 	         
      	        	 	           ul.append(firstPage);
      	        	 	           ul.append(prePage);
      	        	 	         $.each(data.navigatepageNums,function(index,item){
      	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
      	        	 	         	if(pageNow == item){
      	        	 	         		numli.addClass("active");
      	        	 	         	}
      	        	 	         	  numli.click(function(){
      	        	 	         		  to_page(item,pa); 
      	        	 	         	  })
      	        	 	              ul.append(numli); 
      	        	 	         })
      	        	 	          ul.append(nextPage);
      	        	 	          ul.append(lastPage);
      	        	 	          var nav = $("<nav></nav>").append(ul);
      	        	 	           var pageNav = $("#pageNav");
      	        	 	               pageNav.html(" ");
      	        	 	               pageNav.append(nav);
      	        	 	       
      	        	 	             $("#pnValue").on("change",function(){
      	        	 	    	     		var pa = $("#pnValue").val();
      	        	 	    	     		to_page(1,pa);
      	        	 	    	     	})      	        	 	       
      	        	 	       }              
      	        	           

      	        		        	     
      	        			});
      	        		}

      	        	  to_page(1,pa);
	                 }	                 
	                 $("#classNo").on("change",function(){
	                	 
	                	 var classNo = $("#classNo").val();
	                	 //查询一个专业的所有学生
	                	 if(classNo=="0"){	                		 
	                		   var major = $("#major").val();   
	               	 	               	          
	               	          var nianji = $("#nianji").val();	          
	
	               	          var pa =$("#pnValue").val();
	                		  
	                		 function to_page(pn,pa){
	         	        		var stuType = "本科生";
		                		   var major = $("#major").val();   
    	 	               	          
			               	          var nianji = $("#nianji").val();	
	         	        			$.ajax({url: "getByNianjiAndMajor",
	         	        		           type:"post", 
	         	        		           dataType:"json",
	         	        		           data:{"pn":pn,
	         	        		        	     "pa":pa,
	         	        		        	     "nianji":nianji,
	         	        		        	     "major":major,
	         	        		        	     "stuType":stuType
	         	        		        	     },
	         	        		           scriptCharset: 'utf-8',
	         	        	 	       success: function(data){
	         	        	 	    	 var list = data.list;	  	    	   
	         	        	 	       var table = $("#stutable");            
	         	        	 	       table.html(" ") ;   

	         	        	 	       for(var i=0;i<list.length;i++){
	         	        	 	    	   
	         	      	    	         switch(list[i].className){
	         	   	    	          case  10:var cla = '会计金融双学位班';break;
	         	   	    	          case  11:var cla = '卓越会计师班';break;
	         	   	    	          case  12:var cla = '中法班';break;
	         	   	    	          default: var cla=list[i].className;
	         	   	    	      }	
	         	        	 	    	   
	         	        	 	     	  var tr = $("<tr role='row'></tr>");
	         	        	 	     	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	         	        	 	     	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	         	        	 	                  +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	         	        	 	  	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	         	        	 	  	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	         	        	 	     	  table.append(tr);
	         	        	 	     	  } 
	         	        	 	       personPage();
	         	        	 	      displayT();
	         	        	 	      clicktd();
	         	        	 	      //创建分页条 
	         	        	 	       var pageNow = data.pageNum;
	         	        	 	       var pageTotal = data.pages;
	         	        	 	       var total  = data.total;
	         	        	 	       var pageInfo = $("#pageInfo");
	         	        	 	           pageInfo.html(" ");
	         	        	 	           pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	         	        	 	      //创建分页导航条
	         	        	 	         var pa = $("#pnValue").val();
	         	        	 	         var ul =$("<ul></ul>").addClass("pagination");
	         	        	 	         var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	         	        	 	         var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	         	        	 	         if(data.hasPreviousPage == false){
	         	        	 	         	firstPage.addClass("disabled");
	         	        	 	         	prePage.addClass("disabled");
	         	        	 	          }else{
	         	        	 	           firstPage.click(function(){
	         	        	 	        	   to_page(1,pa);
	         	        	 	           })
	         	        	 	           prePage.click(function(){
	         	        	 	        	   to_page(pageNow-1,pa);
	         	        	 	           })
	         	        	 	          }
	         	        	 	         
	         	        	 	         var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	         	        	 	         var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	         	        	 	            if(data.hasNextPage == false){
	         	        	 	          	  nextPage.addClass("disabled");
	         	        	 	          	  lastPage.addClass("disabled");
	         	        	 	            }else{
	         	        	 	              nextPage.click(function(){
	         	        	 	              	to_page(pageNow+1,pa);
	         	        	 	              })
	         	        	 	              lastPage.click(function(){
	         	        	 	              	to_page(pageTotal,pa);
	         	        	 	              })
	         	        	 	            }
	         	        	 	         
	         	        	 	           ul.append(firstPage);
	         	        	 	           ul.append(prePage);
	         	        	 	         $.each(data.navigatepageNums,function(index,item){
	         	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	         	        	 	         	if(pageNow == item){
	         	        	 	         		numli.addClass("active");
	         	        	 	         	}
	         	        	 	         	  numli.click(function(){
	         	        	 	         		  to_page(item,pa); 
	         	        	 	         	  })
	         	        	 	              ul.append(numli); 
	         	        	 	         })
	         	        	 	          ul.append(nextPage);
	         	        	 	          ul.append(lastPage);
	         	        	 	          var nav = $("<nav></nav>").append(ul);
	         	        	 	           var pageNav = $("#pageNav");
	         	        	 	               pageNav.html(" ");
	         	        	 	               pageNav.append(nav);
	         	        	 	       
	         	        	 	             $("#pnValue").on("change",function(){
	         	        	 	    	     		var pa = $("#pnValue").val();
	         	        	 	    	     		to_page(1,pa);
	         	        	 	    	     	})      	        	 	       
	         	        	 	       }              
	         	        	           

	         	        		        	     
	         	        			});
	         	        		}

	         	        	  to_page(1,pa);
	                	 }else{
	                	 //通过班级查询学生
	                	 function to_page(pn,pa){
	                		 var classNo = $("#classNo").val();
	                		 var major = $("#major").val();   
	 	               	          
	               	          var nianji = $("#nianji").val();
	               	          var stuType = "本科生";
	     	        			$.ajax({url: "getStuByClass",
	     	        		           type:"post", 
	     	        		           dataType:"json",
	     	        		           data:{"pn":pn,
	     	        		        	     "pa":pa,
	     	        		        	     "classNo":classNo,
	     	        		        	     "nianji":nianji,
	     	        		        	     "major":major,
	     	        		        	     "stuType":stuType
	     	        		        	     },
	     	        		           scriptCharset: 'utf-8',
	     	        	 	       success: function(data){	     	 
	     	        	 	    	 var list = data.list;	  	    	   
	     	        	 	       var table = $("#stutable");            
	     	        	 	       table.html(" ") ;   

	     	        	 	       for(var i=0;i<list.length;i++){
	     	        	 	    	   
	     	      	    	         switch(list[i].className){
	     	   	    	          case  10:var cla = '会计金融双学位班';break;
	     	   	    	          case  11:var cla = '卓越会计师班';break;
	     	   	    	          case  12:var cla = '中法班';break;
	     	   	    	          default: var cla=list[i].className;
	     	   	    	      }	
	     	        	 	    	   
	     	        	 	     	  var tr = $("<tr role='row'></tr>");
	     	        	 	     	 var roomNum = list[i].buildingName+ "-"+list[i].roomNum+"-"+ list[i].bedNum;
	     	        	 	     	 tr.html("<input class='compareBox' type='checkbox' value="+list[i].studentNo+"><td class='personPage'>"+list[i].studentNo+"</td><td>"+list[i].studentName+'</td><td>'+list[i].sex+'</td><td>'+list[i].major+'</td><td>'+cla+'</td><td>'+list[i].phone+'</td><td style="display:none">'+list[i].qq+'</td>'
	     	        	 	                  +'<td style="display:none" >'+roomNum+'</td><td style="display:none">'+list[i].personID+'</td><td style="display:none">'+list[i].mz+'</td><td style="display:none">'+list[i].zzmm+'</td><td style="display:none">'+list[i].address+'</td><td style="display:none" class="tr_awards" sid='+list[i].studentNo+'>获奖详情</td><td style="display:none" class="tr_punish" sid='+list[i].studentNo+'>处分明细</td>'
	     	        	 	  	   			+'<td style="display:none" class="tr_level" sid='+list[i].studentNo+'>过级详细</td><td style="display:none" class="tr_office" sid='+list[i].studentNo+'>任职详情</td><td style="display:none" class="tr_active" sid='+list[i].studentNo+'>校外活动详情</td><td style="display:none" >'+list[i].tc+'</td><td style="display:none" class="tr_grade" sid='+list[i].studentNo+'>成绩详细</td><td style="display:none">'+list[i].sfps+'</td><td style="display:none" class="tr_help" sid='+list[i].studentNo+' >补助详细</td><td>'
	     	        	 	  	   		+list[i].fatherName+"</td><td>"+list[i].fatherPhone+"</td><td>"+list[i].fatherWorkplace+"</td><td>"+list[i].motherName+"</td><td>"+list[i].motherPhone+"</td><td>"+list[i].motherWorkplace+"</td><td>"+list[i].studyType+"</td>");  
	     	        	 	     	  table.append(tr);
	     	        	 	     	  } 
	     	        	 	       personPage();
	     	        	 	      displayT();
	     	        	 	      clicktd();
	     	        	 	      //创建分页条 
	     	        	 	       var pageNow = data.pageNum;
	     	        	 	       var pageTotal = data.pages;
	     	        	 	       var total  = data.total;
	     	        	 	       var pageInfo = $("#pageInfo");
	     	        	 	           pageInfo.html(" ");
	     	        	 	           pageInfo.append("当前页："+pageNow+"  ,总页："+pageTotal+"   ，总记录数："+total);

	     	        	 	      //创建分页导航条
	     	        	 	         var pa = $("#pnValue").val();
	     	        	 	         var ul =$("<ul></ul>").addClass("pagination");
	     	        	 	         var firstPage = $("<li></li>").append($("<a>首页</a>").attr("href","#"));  
	     	        	 	         var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&laquo;</span>"))); 
	     	        	 	         if(data.hasPreviousPage == false){
	     	        	 	         	firstPage.addClass("disabled");
	     	        	 	         	prePage.addClass("disabled");
	     	        	 	          }else{
	     	        	 	           firstPage.click(function(){
	     	        	 	        	   to_page(1,pa);
	     	        	 	           })
	     	        	 	           prePage.click(function(){
	     	        	 	        	   to_page(pageNow-1,pa);
	     	        	 	           })
	     	        	 	          }
	     	        	 	         
	     	        	 	         var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>&raquo;</span>")));  
	     	        	 	         var lastPage = $("<li></li>").append($("<a>末页</a>").attr("href","#"));   
	     	        	 	            if(data.hasNextPage == false){
	     	        	 	          	  nextPage.addClass("disabled");
	     	        	 	          	  lastPage.addClass("disabled");
	     	        	 	            }else{
	     	        	 	              nextPage.click(function(){
	     	        	 	              	to_page(pageNow+1,pa);
	     	        	 	              })
	     	        	 	              lastPage.click(function(){
	     	        	 	              	to_page(pageTotal,pa);
	     	        	 	              })
	     	        	 	            }
	     	        	 	         
	     	        	 	           ul.append(firstPage);
	     	        	 	           ul.append(prePage);
	     	        	 	         $.each(data.navigatepageNums,function(index,item){
	     	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	     	        	 	         	if(pageNow == item){
	     	        	 	         		numli.addClass("active");
	     	        	 	         	}
	     	        	 	         	  numli.click(function(){
	     	        	 	         		  to_page(item,pa); 
	     	        	 	         	  })
	     	        	 	              ul.append(numli); 
	     	        	 	         })
	     	        	 	          ul.append(nextPage);
	     	        	 	          ul.append(lastPage);
	     	        	 	          var nav = $("<nav></nav>").append(ul);
	     	        	 	           var pageNav = $("#pageNav");
	     	        	 	               pageNav.html(" ");
	     	        	 	               pageNav.append(nav);
	     	        	 	       
	     	        	 	             $("#pnValue").on("change",function(){
	     	        	 	    	     		var pa = $("#pnValue").val();
	     	        	 	    	     		to_page(1,pa);
	     	        	 	    	     	})        	 	     
	     	        	 	       }              
	     	        	           	     	        		        	     
	     	        			});
	     	        		}//
	                	 to_page(1,pa);
	                	 }
	                 })
	                 
	    	          },
	   	           error: function(){
	   	        	 alert("查询出错");  
	   	           }
	          })
	          }
           })
})
//违规情况插入
$(function(){
	
	$("#save").click(function(){
     		
		var stuNum =$("#stuNum").val(); 
		var stuName = $("#stuName").val();
		var stuClass = $("#stuClass").val();
		var eventarea = $("#eventarea").val();
		var result = $("#result-types").val();
		var Time = $("#Time").val();
		var stuType ="本科生";
	//	alert(stuNum+stuName+stuClass+Time+eventarea+result);
		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
		if(!reg.test(Time))//判断日期格式符合YYYY-MM-DD
		    {
		        alert("不是一个日期！");
		   }else{
		$.ajax({url: "Setpunish",
	           type:"post", 
	           dataType:"text",
	           data:{"studentNo":stuNum,
	        	     "punishTime":Time,
	        	     "punishReason":eventarea,
	        	     "punishName":result,
	        	     "stuType":stuType
	                },
	           scriptCharset: 'utf-8',
	       success: function(data){
	         alert(data);
	    		 
	       }  
		})   	     
			
		   }
	})
})
//学籍异动插入
$(function(){
	
	$("#save2").click(function(){
     		
		var stuNum =$("#stuNum2").val(); 
		var stuName = $("#stuName2").val();
		var stuClass = $("#stuClass2").val();
		var eventarea = $("#eventarea2").val();
		var result = $("#result-types2").val();
		var Time = $("#Time2").val();
		var stuType = "本科生";
	//	alert(stuNum+stuName+stuClass+Time+eventarea+result);
		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
		if(!reg.test(Time))//判断日期格式符合YYYY-MM-DD
		    {
		        alert("不是一个日期！");
		   }else{
			
		$.ajax({url: "SetXJYD",
	           type:"post", 
	           dataType:"text",
	           data:{"studentNo":stuNum,
	        	     "YDtime":Time,
	        	     "YDreason":eventarea,
	        	     "BZ":result,
	        	     "stuType":stuType
	                },
	           scriptCharset: 'utf-8',
	       success: function(data){
	         alert(data);
	    		 
	       }  
		})   	     
			
		   }
	})
})

//新增教师用户模态框的控制
$(function(){
    $("#add_user").click(function(){
	    $("#user_add_Modal").modal({
		    backdrop:"static",
	  })
	  
	  $("#teabtn").click(function(){
		  var tea = $("#tea_name").val();
		  var password = $("#tea_password").val();
	     $(this).attr('disabled',true);
		  $.ajax({url: "setTUser",
	           type:"post", 
	           dataType:"text",
	           data:{"userName":tea,
	                 "password":password,
	                 "userType":'teacher'
	                },
	           scriptCharset: 'utf-8',
	          success: function(data){
	        	  $(this).attr('disabled',false);
	        	  alert(data);	    		  
		   	   } ,
	           error: function(){
	        	   $(this).attr('disabled',false);
		   	    	alert("新增出错");  
		   	      }
		})   	     
		  
	  })
	  
   })
})
//学籍异动查询
$(function(){
	$("#xiyd_search").click(function(){
		  $("#2xjyd").modal({
			    backdrop:"static",
		  })		
		  
		  var stuType = "本科生";
		  $.ajax({
			  url:"getXjydView",
			  type:"post",
			  data:{"stuType":stuType},
			  dataType:"json",
			  scriptCharset: 'utf-8',
			  success:function(data){
				  var table=$("#xjyd_table");
				     table.html(" ");
					 var tr = $("<tr><td>学号</td><td>姓名</td><td>专业</td><td>班级</td><td>异动情况</td><td>原因</td><td>时间</td></tr>");
				     table.append(tr);
				 for(var i=0;i<data.length;i++){
					 
 	    	         switch(data[i].className){
	    	          case  10:var cla = '会计金融双学位班';break;
	    	          case  11:var cla = '卓越会计师班';break;
	    	          case  12:var cla = '中法班';break;
	    	          default: var cla=data[i].className;
	    	      }	
					 
					 var tr = $("<tr><td  class='personPage'>"+data[i].studentNo+"</td><td>"+data[i].studentName+"</td><td>"+data[i].major+"</td><td>"+cla+"</td><td>"+data[i].bz+"</td><td>"+data[i].ydreason+"</td><td>"+data[i].ydtime+"</td></tr>");
				     table.append(tr);
				 };
				 
			  },
			  error: function(){
			   	    alert("查询出错");  
			   	      }
		  
		  })
		
	})
})
//高级查询隐藏切换	
$(function(){
	$("#gaojichaxun_btn").click(function(){
		$("#gaojichaxun").toggle();
	})
})	

//学生雷达图比较
$(function(){
	
	$("#compareStudent").click(function(){
		  var box = [];
		  $.each($('#displayTable input:checkbox:checked'),function(){
				box.push($(this).val());
			});
		$.getScript('js/echarts.min.js',function(){
			
				  $("#Studentcompare").modal({
					    backdrop:"static",
				  })
	 	     
	 	   $.ajax({
	 		   url:"stuCompare",
	 		   type:"post",
	     	   data:{"id":box},
	     	   dataType:"json",
	     	   scriptCharset: 'utf-8',
	     	   success:function(result){
	     		   var dom = document.getElementById("compareAnalyze");
	                var myChart = echarts.init(dom,myChart,
	                     {
	                         width: 600,
	                         height: 560,
	                         lockY: true,
	                         throttle: 70
	                     });

	                     // 指定图表的配置项和数据
	               var app = {};
	               var data =result ;
	                 option = null;
	                 option = {
	                   tooltip: {},

	                 radar: {
	                     // shape: 'circle',
	                     name: {
	                         textStyle: {
	                             color: '#6666FF',
	                             backgroundColor: '#F0F0F0',
	                             borderRadius: 3,
	                             padding: [3, 5]

	                        }
	                     },
	                     indicator: [
	                        { name: '惩罚次数', max: 20},
	                        { name: '获奖次数', max: 20},
	                        { name: '职业技能', max: 15},
	                        { name: '校外活动', max: 10},
	                        { name: '校内任职', max: 10},
	                        { name: '平均绩点', max: 4}
	                     ]
	                 },
	                 series : (function (){
	                     var series = [];
	                     for(var key in data) {
	                         series.push({
	                             name:'学生分析',
	                             type: 'radar',
	                             symbol: 'none',
	                             lineStyle: {
	                                 width: 1
	                             },
	                             emphasis: {
	                                 areaStyle: {
	                                     color: 'rgba(0,250,0,0.3)'
	                                 }
	                             },
	                             data:[
	                               {
	                                 value:data[key],
	                                 name: key
	                               }
	                             ]
	                         });
	                     }
	                     return series;
	                 })()
	             };;
	             if (option && typeof option === "object") {
	                 myChart.setOption(option, true);
	             }//这个函数是在new.js里面的，当点击click后运行这个函数
	         	 
	            
	     	   },
	 		   
	 	   })
		})
	})
	
})
	 

//文件上传
$(function(){
	$("#uplodfile_btn").click(function(){

		var file = $("#uploadfiles").val();
		  
		var fileName=getFileName(file);
		
		var stuType = "本科生";
		
	    if(file == '')
	     {  
	     alert("请选择文件,再上传");  
	    
	     }else{
	    //   alert(fileName);
	       
	    var formData=new FormData();
       	formData.append("image",$("#uploadfiles")[0].files[0]);
       	formData.append("fileName",fileName);
       	formData.append("stuType",stuType);
       	$.ajax({ url: "uploadFile",
  	           type:"post", 
  	           dataType:"text",
 	           data:formData,
   	         cache: false,//上传文件无需缓存 
             processData: false,//用于对data参数进行序列化处理 这里必须false
             contentType: false, //必须 
  	         scriptCharset: 'utf-8',    	        	           
   	        success: function(data){
   	        	alert(data);
	    	} , 
  	         error:function(){
  	        	 alert("上传错误");
   	         } 
		});
	       
	       
	     }
	})

})
//解析上传的文件的文件名
function getFileName(path) {

    var pos1 = path.lastIndexOf('/');

    var pos2 = path.lastIndexOf('\\');

    var pos = Math.max(pos1, pos2);

    if (pos < 0) {

        return path;

    }

    else {

        return path.substring(pos + 1);

    }

}

//查询文件列表
$(function(){
	
	$("#6page").click(function(){
			
	var stuType = "本科生";
	$.ajax({
		 url:"listFile",
		   type:"post",
   	       dataType:"json",
   	       data:{"stuType":stuType},
   	       scriptCharset: 'utf-8',
   	       success:function(data){
   	    	   var ul = $("#fileName_list");
   	    	   for(var i = 0;i<data.length;i++){
   	    	   var li = $("<li><span class='fileName_li'>"+data[i].fileName+"</span> &nbsp; &nbsp; &nbsp; &nbsp;<span class='deleteFile'>删除</span></li>")
   	    	   li.css("margin","10px");
   	    	   li.css("cursor","pointer");
   	    	   ul.append(li);
   	    	   
   	    	   }
   	    	   
   	    	  //鼠标经过li的时候li变蓝色
  	    	   $(".fileName_li").mouseenter(function(){
  	    		   $(this).css("color","blue");
  	    	   })
  	    	   //鼠标离开时变黑色
  	    	   $(".fileName_li").mouseleave(function(){
  	    		   $(this).css("color","black");
  	    	   })
   	    	   
   	    	$(".fileName_li").click(function(){

   	 		     var url="downloadFile";//下载文件url

   	 		     $("#fileForm").attr('action',url);
   	 		
   	 		     $("#fileName").val($(this).html());

   	 		     $("#fileForm").submit();

   	 	    });
  	    	 
  	    	   $(".deleteFile").click(function(){
  	    		   var fileName = $(this).parent().children().eq(0).html();
  	    		   var stuType = "本科生";
  	    		      $.ajax({
  	    		    	  url:"deleteFile",
  	    		    	  type:"post",
  	    		    	  data:{"fileName":fileName,
  	    		    		  "stuType":stuType},
  	    		    	  dataType:'text',
  	    		    	  success:function(data){
  	    		    		  alert("删除成功");
  	    		    		  
  	    		    	  }
  	    		      })
  	    	   })
   	       }
	})
	
	})
})
//学生申请修改信息
$(function(){
	function list(){
		var stuType = "本科生";
		$.ajax({
			url:"listAlertStudent",
			type:"post",
			data:{"stuType":stuType},
			dataType:"json",
			scriptCharset: 'utf-8',
			success:function(data){   //把申请人的列表显示出来
	
			    var table = $("#alertStudent_table");
			        table.html(" ");
			    for(var i=0;i<data.length;i++){
			    	var tr = $("<tr></tr>");
			    	    tr.html("<td><input type='checkbox' value="+data[i].studentNo+"></td><td>"+data[i].studentNo+"</td><td>"+data[i].studentName+"</td><td>"+data[i].major+"</td><td>"+data[i].className+"</td><td class='afert_alert'>点击查看修信息对比</td>");
			        table.append(tr);  
			    }
			    //点击查看申请前后的信息对比
			    $(".afert_alert").click(function(){
			    	 
			    	//打开模态框
			    	 $("#alertInfo").modal({
					       backdrop:"static",
				         })
				         
			    	//查询出修改前的信息和修改后的信息
			    	var stuNo = $(this).parent().children().eq(1).html();
			    	$.ajax({
			    		url:"getAlertStudentInfo",
			    		type:'get',
			    		dataType:"json",
			    		data:{"studentNo":stuNo},
			    		scriptCharset: 'utf-8',
			    		success:function(data){
			    		   $("#refuse").attr("stuNo",data[0].studentNo);
			    		//	alert(data);//data[0]为修改后的数据，data[1]为修改前的数据
			    		   
			    	         switch(data[0].className){
			    	          case  10:var cla0 = '会计金融双学位班';break;
			    	          case  11:var cla0 = '卓越会计师班';break;
			    	          case  12:var cla0 = '中法班';break;
			    	          default: var cla0 =data[0].className;
			    	      }
			    	         switch(data[1].className){
			    	          case  10:var cla1 = '会计金融双学位班';break;
			    	          case  11:var cla1 = '卓越会计师班';break;
			    	          case  12:var cla1 = '中法班';break;
			    	          default: var cla1 =data[1].className;
			    	      }	
			    		   
			    		  $("#before_no").html(data[1].studentNo);$("#after_no").html(data[0].studentNo);
			    		  $("#before_name").html(data[1].studentName);$("#after_name").html(data[0].studentName);
			    		  $("#before_termYear").html(data[1].termYear);$("#after_termYear").html(data[0].termYear);
			    		  $("#before_major").html(data[1].major);$("#after_major").html(data[0].major);
			    		  $("#before_className").html(cla0);$("#after_className").html(cla1);
			    		  $("#before_sex").html(data[1].sex);$("#after_sex").html(data[0].sex);
			    		  $("#before_birthday").html(data[1].birthday);$("#after_birthday").html(data[0].birthday);
			    		  $("#before_mz").html(data[1].mz);$("#after_mz").html(data[0].mz);
			    		  $("#before_zzmm").html(data[1].zzmm);$("#after_zzmm").html(data[0].zzmm);
			    		  $("#before_jg").html(data[1].jg);$("#after_jg").html(data[0].jg);
			    		  $("#before_personID").html(data[1].personID);$("#after_personID").html(data[0].personID);
			    		  $("#before_phone").html(data[1].phone);$("#after_phone").html(data[0].phone);
			    		  $("#before_QQ").html(data[1].qq);$("#after_QQ").html(data[0].qq);
			    		  $("#before_fatherName").html(data[1].fatherName);$("#after_fatherName").html(data[0].fatherName);
			    		  $("#before_fatherPhone").html(data[1].fatherPhone);$("#after_fatherPhone").html(data[0].fatherPhone);
			    		  $("#before_fatherWorkplace").html(data[1].fatherWorkplace);$("#after_fatherWorkplace").html(data[0].fatherWorkplace);
			    		  $("#before_motherName").html(data[1].motherName);$("#after_motherName").html(data[0].motherName);
			    		  $("#before_motherPhone").html(data[1].motherPhone);$("#after_motherPhone").html(data[0].motherPhone);
			    		  $("#before_motherWorkplace").html(data[1].motherWorkplace);$("#after_motherWorkplace").html(data[0].motherWorkplace);
			    		  $("#before_address").html(data[1].address);$("#after_address").html(data[0].address);
			    		  $("#before_buildingName").html(data[1].buildingName);$("#after_buildingName").html(data[0].buildingName);
			    		  $("#before_roomNum").html(data[1].roomNum);$("#after_roomNum").html(data[0].roomNum);
			    		  $("#before_bedNum").html(data[1].bedNum);$("#after_bedNum").html(data[0].bedNum);
			    		  $("#before_tc").html(data[1].tc);$("#after_tc").html(data[0].tc);
			    		  $("#before_sfps").html(data[1].sfps);$("#after_sfps").html(data[0].sfps);
			    		  $("#before_studyType").html(data[1].studyType);$("#after_studyType").html(data[0].studyType);
			
			    		  $("#alert_Table tr").each(function(){
			    			  
			    			  $(this).css("background-color","");
			    			  
			    			  if($(this).children().eq(1).html()!=$(this).children().eq(2).html()){

			    				  $(this).css("background-color","red");
			    			  }

			    		  })
			    		  
			    		}
			    	})
			    })
			    
			},
		    erorr:function(){
		    	alert("查看失败");
		    }
		})
	}
	$("#5page").click(function(){
		//alert();
		 list();
		
	})
	  $("#selectAll").click(function(){
	      $("#alertStudent_table input[type=checkbox]").each(function(){
		     $(this).prop("checked","checked");
	       })
		})
		
	   $("#confirm").click(function(){
		   $("#dealingImage").show();
		   var area = $('#alertStudent_table');
		   if(area.children().length==0){
			   alert('暂无申请人');
			   $("#dealingImage").hide();
			   return;			   
		   }	
		   if(area.find("input[type=checkbox]:checked").length==0){
			   alert('请选择申请人');
			   $("#dealingImage").hide();
			   return;	
		   }
		   var box=[];
	      $("#alertStudent_table input[type=checkbox]:checkbox:checked").each(function(){
		    box.push($(this).val());
	       })
	   //    alert(box);
	       $.ajax({
	    	   url:"confirmAlertStudent",
	   	       type:"post",
	    	   dataType:"text",
	    	   data:{"box":box},
	    	   scriptType:"utf-8",
	    	   success:function(data){
	    		   $("#dealingImage").hide();
	    		   alert(data);
	    		   list();
	    		   
	    	   }
	       })
		})
		
		   $("#refuse").click(function(){
               var studentNo = $(this).attr("stuNo");

	          $.ajax({
	    	   url:"refuseAlertStudent",
	   	       type:"post",
	   	       dataType:"text",
	    	   data:{"studentNo":studentNo},
	    	   scriptCharset: 'utf-8',
	    	   success:function(data){
	    		   alert(data);
	    		   list();
	    		   
	    	   }
	       })
		})
})

