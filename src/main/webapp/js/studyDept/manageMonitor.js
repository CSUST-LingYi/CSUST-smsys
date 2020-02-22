/**
 * 学习部管理班长权限js
 */

function updateMonitor(){
					/* 班长修改*/
				$(document).on("dblclick","#ms_table tr",function(){
					$("#updatemonitor").modal({
						backdrop:"static"
					})
					
					var major = $(this).children().eq(0).html();
					var termYear = $(this).children().eq(1).html();
					var Class = $(this).children().eq(2).html();
					var sno = $(this).children().eq(3).html();
					var sname = $(this).children().eq(4).html();
					var bz = $(this).children().eq(5).html();
					
					$("#m_change_Num").val(sno);
					$("#m_change_Name").val(sname);
					$("#m_change_Grade").val(termYear);
					$("#m_change_Class").val(Class);
					$("#m_change_Major").val(major);
					$("#m_change_bz").val(bz);
					
					$("#m_update").click(function(){
						$.ajax({
							url:"../studyDept/updateMonitor",
							type:"post",
							dataType:"text",
							data:{
								"studentNo":$("#m_change_Num").val(),
								"studentName":$("#m_change_Name").val(),
								"major":$("#m_change_Major").val(),
								"termYear":$("#m_change_Grade").val(),
								"bz":$("#m_change_bz").val(),
								"className": parseInt($("#m_change_Class").val())
							},
							scriptCharset:'utf-8',
							success:function(data){
                                    alert(data);
								$("#updatemonitor").modal('hide');
								getMonitor();
							},
							error:function(){
								alert("系统错误，请联系管理员");
							}
						})
					})
				})
}


function deleteMonitor(){
					/* 班长删除 */
				$(document).on("click",".m_delete",function(){
					$("#deletemonitor").modal({
						backdrop:"static"
					})
					
					var tr=$(this).parent().parent();
					
					var major=tr.children().eq(0).html();
					var termYear=tr.children().eq(1).html();
					var cla=tr.children().eq(2).html();
					var sno=tr.children().eq(3).html();
					var sname=tr.children().eq(4).html();
					
					$("#m_del").click(function(){
						$.ajax({
							url:"../studyDept/deleteMonitor",
							type:"post",
							dataType:"text",
							data:{
								"studentNo":sno,
							},
							scriptCharset:'utf-8',
							success:function(data){
							     alert(data);
								$("#deletemonitor").modal('hide');
								getMonitor();
							}
						})
					})
				})
}


/* 教师查询班长 */
function getMonitor(){
		
		var grade = $("#m_grade").val();
		var major = $("#m_major").val();
		
		if(grade==null || major==null)
			return;
		
		$.ajax({
			url:"../studyDept/getMonitor",
			type:"post",
			dataType:"json",
			data:{
				"nianji":grade,
				"major":major
			},
			scriptCharset:'utf-8',
			success:function(data){
				var table = $("#m_table");
				table.html("");
				for(var i=0;i<data.length;i++){
					var tr = $("<tr></tr>");
					var cla;
					switch (data[i].className){
						case 10:
							cla="会计金融双学位班"
							break;
						case 11:
							cla="卓越会计师班"
							break;
						case 12:
							cla="中法班"
							break;
						default :
							cla=data[i].className;
					}
					tr.html("<td>"+data[i].termYear+"</td>"+
					        "<td>"+data[i].major+"</td>"+
					        "<td>"+cla+"</td>"+
					        "<td>"+data[i].studentNo+"</td>"+
					        "<td>"+data[i].studentName+"</td>"+
					        "<td>"+data[i].bz+"</td>"+
					        "<td><button type=\"button\" class=\"btn btn-danger m_delete\">删除</button>")
					table.append(tr);
				}
			
			},
			error:function(){
				alert("error!");
			}
		})
}

function addMonitor(){
		$("#m_new_btn").click(function(){
		var studentNo = $("#m_Num").val();
		var studentName = $("#m_Name").val();
		var termYear = $("#m_Grade").val();
		var major = $("#m_Major").val();
		var Class = $("#m_Class").val();
		var bz = $("#m_bz").val();
		
		if(studentNo==null || studentName==null || termYear==null || major==null || Class==null){
			alert("请输入信息！");
			return;
		}
		if(bz.legth>15){
			alert("备注过长！！");return false;
		}
		$.ajax({
			url:"../studyDept/addMonitor",
			type:"post",
			dataType:"text",
			data:{
				"studentNo":studentNo,
				"studentName":studentName,
				"major":major,
				"className":Class,
				"bz":bz,
				"termYear":termYear
			},
			scriptCharset: 'utf-8',
			success: function(data){
                    alert(data);
                    getMonitor();
                   $("#newmonitor").modal("hide");
				
			}
		})
	})
}

$(function(){
	
	$("#m_select").click(function(){
     	getMonitor();	
	})
	 
	 addMonitor();
	 updateMonitor();
	 deleteMonitor();
	
})


/* 新增班长模态框 */
$(function(){
	$("#m_new").click(function(){
		$("#newmonitor").modal({
			backdrop:"static"
		})
	})
})




