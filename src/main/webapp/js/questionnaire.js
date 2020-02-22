/**
 * 
 */

//几个页面的切换
$(function(){
	$("#1page").click(function(){
		 $("#page-wrapper").show();
		 $("#getin1id").hide();
		 $("#getin2id").hide();
		 $("#getin3id").hide();
		 $("#getin4id").hide();
		 $("#getin5id").hide();
		 $("#leavePage").hide();
		 $("#questionnaire").hide();
	})
	
	$("#2page").click(function(){
		 $("#page-wrapper").hide();
		 $("#getin1id").show();
		 $("#getin2id").hide();
		 $("#getin3id").hide();
		 $("#getin4id").hide();
		 $("#getin5id").hide();
		 $("#leavePage").hide();
		 $("#questionnaire").hide();
	})
	
	$("#3page").click(function(){
		 $("#page-wrapper").hide();
		 $("#getin1id").hide();
		 $("#getin2id").show();
		 $("#getin3id").hide();
		 $("#getin4id").hide();
		 $("#getin5id").hide();
		 $("#leavePage").hide();
		 $("#questionnaire").hide();
	})
	
	$("#4page").click(function(){
		 $("#page-wrapper").hide();
		 $("#getin1id").hide();
		 $("#getin2id").hide();
		 $("#getin3id").show();
		 $("#getin4id").hide();
		 $("#getin5id").hide();
		 $("#leavePage").hide();
		 $("#questionnaire").hide();
	})
	$("#5page").click(function(){
		 $("#page-wrapper").hide();
		 $("#getin1id").hide();
		 $("#getin2id").hide();
		 $("#getin3id").hide();
		 $("#getin4id").show();
		 $("#getin5id").hide();
		 $("#leavePage").hide();
		 $("#questionnaire").hide();
	})
		$("#6page").click(function(){
		 $("#page-wrapper").hide();
		 $("#getin1id").hide();
		 $("#getin2id").hide();
		 $("#getin3id").hide();
		 $("#getin4id").hide();
		 $("#getin5id").show();
		 $("#leavePage").hide();
		 $("#questionnaire").hide();
	})
	
	$("#stu_leave").click(function(){
		 $("#page-wrapper").hide();
		 $("#getin1id").hide();
		 $("#getin2id").hide();
		 $("#getin3id").hide();
		 $("#getin4id").hide();
		 $("#getin5id").hide();
		 $("#leavePage").show();
		 $("#questionnaire").hide();
	})
	
		$("#7page").click(function(){
		 $("#page-wrapper").hide();
		 $("#getin1id").hide();
		 $("#getin2id").hide();
		 $("#getin3id").hide();
		 $("#getin4id").hide();
		 $("#getin5id").hide();
		 $("#leavePage").hide();
		 $("#questionnaire").show();
	})
})

//三个页面的切换
 $(function(){
	   	   $("#addQuestionnaire").click(function(){
	   	   	  $("#addQuestionnaire").addClass("active");
	   	   	  $("#allQuestionnaire").removeClass("active");
	   	   	  $("#myQuestionnaire").removeClass("active");
	   	   	  $("#addQuestionnairePage").show();
	   	   	  $("#allQuestionnairePage").hide();
	   	   	  $("#myQuestionnairePage").hide();
	   	   	  
	   	   })
	   	   
	      $("#allQuestionnaire").click(function(){
	   	   	  $("#addQuestionnaire").removeClass("active");
	   	   	  $("#allQuestionnaire").addClass("active");
	   	   	  $("#myQuestionnaire").removeClass("active");
	   	   	  $("#addQuestionnairePage").hide();
	   	   	  $("#allQuestionnairePage").show();
	   	   	  $("#myQuestionnairePage").hide();
	   	   	  
	   	   })
	   	   	   	   
	   	   $("#myQuestionnaire").click(function(){
	   	   	  $("#addQuestionnaire").removeClass("active");
	   	   	  $("#allQuestionnaire").removeClass("active");
	   	   	  $("#myQuestionnaire").addClass("active");
	   	   	  $("#addQuestionnairePage").hide();
	   	   	  $("#allQuestionnairePage").hide();
	   	   	  $("#myQuestionnairePage").show();
	   	   	  
	   	   })
	   })

//查询一份问卷的详情
 $(function(){
	   	 
	   	  $(".details").click(function(){
	           var detailsTable = $("#detailsTable");
	           
	           for (var i=0;i<1000;i++) {
	           	
	              var tr = $("<tr></tr>");
	                  tr.html("<td>学号</td><td>答案1</td><td>答案2</td><td>答案3</td><td>答案4</td><td>答案5</td>");
	           	detailsTable.append(tr);
	           }
	      })
	   	
	   })
	
	
	
//问卷增加	
$(function(){
	
 //问卷问题的增加
   $("#btn_add_question").click(function(){
	   var question = $("#add_question").val();
	 	var introduce = $("#introduce").val();
	 	    if(question.length==0){
	 	    	alert("添加的需回答项不能为空！");
	 	    	return false;
	 	    }
	 	var table = $("#questions");
	 	var li = $("<li></li>");
	 	    li.append("<span class='question'>"+question+"</span>");
	 	    li.append("<span class='introduce'>"+introduce+"</span>");
	 	    table.append(li);
		 })

//问卷提交
 $("#submit_add_questionnaire").click(function(){
	     //问卷名称
	        var  questionnaireName = $("#questionnaireName").val();
	        
	     //面向的年级   
	        var termYear = $("#questionnaire_termYear").val();
	        
	        var bz = $.trim($("#questionnaire_bz").val());
	        
	         if(bz.length>200){
	        	 alert("备注不能太长");return false;
	         }
	        
	        if(questionnaireName.length==0){
	        	alert("采集主题不能为空");
	        	return false;
	        }
	     
	        //问题数组   
		 	var questions = new Array();
		 	 $(".question").each(function(){
		 	    	questions.push($(this).text());
		 	    });
			var introduces = new Array();
			 	 $(".introduce").each(function(){
			 		 if($(this).text().length>20){
			 			 alert("备注不能超过20个字");return false;
			 		 }
			 		introduces.push($(this).text());
			 });

		 	 if(questions.length==0){
		 		 alert("想采集的信息不能为空");
		 		 return false;
		 	 }
		 	 

		 	
		 	$.ajax({
		 		type:"post",
		 		url:"addQuestionnaire",
		 		async:true,
		 		data:{"questionnaireName":questionnaireName,
		 			  "termYear":termYear,
		 			  "bz":bz,
		 			  "questions":questions,
		 			  "introduces":introduces
		 			},
		 	    dataType:"text",
		 	    success:function(result){
		 	    	alert("发布成功");
		 	    	//alert(result);
		 	    },
		 	    error:function(){
		 	    	alert("新增错误");
		 	    }
		 	});
		 })
})

$(function(){
	
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
	
	$("#allQuestionnaire").click(function(){
		$.ajax({
	 		type:"get",
	 		url:"listQuestionnaire",
	 		async:true,
	 	    dataType:"json",
	 	    success:function(result){

	 	      var table = $("#listQuestionnaires");
	 	          table.html(" ");
	 	      for(var i=0;i<result.length;i++){
  			    var releaseTime = new Date(result[i].releaseTime);		        
  			        releaseTime=releaseTime.format('yyyy-MM-dd');
	 	    	 var tr = $("<tr ></tr>");
	 	          tr.html("<td>"+result[i].uname+"</td><td>"+result[i].questionnaireName+"</td><td>"+result[i].termYear+"</td><td>"+releaseTime+"</td><td class='detail'  qnid="+result[i].qnid+" style='color:blue'>详情</td>");
	 	          table.append(tr);
	 	      }
	 	      
	 	 	$(".detail").click(function(){
	 			var qnid = $(this).attr("qnid");
	 		      $("#exportExcel").attr("qnid",qnid);
	 		      $("#exportExcel").attr("questionnaireName",$(this).siblings().eq(1).text());
	 		     
	 			
	 			$.ajax({
	 		 		type:"get",
	 		 		url:"getQuestionnaire",
	 		 		async:true,
	 		 		data:{"qnid":qnid},
	 		 	    dataType:"json",
	 		 	    success:function(result){
	 		 	    
	 		 	    $("#questionnaireDetails").show();
	 		 	     var tbody = $("#detailsTable");
	 		 	     var thead = $("#detailsTableHead");
	 		 	         thead.html("  ");
	 		 	         tbody.html(" ");
	 		 	
	 		 	     var tr = $("<tr></tr>");
	 	             for(var i=0;i<result[0].length;i++){
	 	            	
	 	            	    tr.append("<th>"+result[0][i]+"</th>");
	 	            	    thead.append(tr); 
	 	             }
	 	
                     for(var i=1;i<result.length;i++){      
                    	 var tr = $("<tr></tr>");	 
                    	  for(var j=0;j<result[i].length;j++){
                    		                     		  
                    		   tr.append("<td>"+result[i][j]+"</td>");                		  
                    	  }
                    	  tbody.append(tr);
                     }
                   //  alert();
	 		 	    }
	 		 	    
	 			})
	 		}) 
	 	      
	 	    },
	 	    error:function(){
	 	    	alert("查询错误");
	 	    }
	 	});
	})
	
})

	$(function(){
		$("#exportExcel").click(function(){
		
			var qnid = $(this).attr("qnid");
			var name = $(this).attr("questionnaireName");
			 $("#export").attr('action','exportExcel');
			 $("#qnid").val(qnid);
			 $("#questionnaireName").val(name);

			 $("#export").submit();
						
		})
	})

//我的问卷
$(function(){
	 
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
	 
	 $("#myQuestionnaire").click(function(){
		$.ajax({
	 		type:"post",
	 		url:"myQuestionnaire",
	 		async:true,
	 	    dataType:"json",
	 	    success:function(result){
     
	 	      var table = $("#myQuestionnaires");
	 	          table.html(" ");
	 	      for(var i=0;i<result.length;i++){
  			    var releaseTime = new Date(result[i].releaseTime);		        
  			        releaseTime=releaseTime.format('yyyy-MM-dd');
	 	    	 var tr = $("<tr ></tr>");
	 	          tr.html("<td>"+result[i].uname+"</td><td>"+result[i].questionnaireName+"</td><td>"+result[i].termYear+"</td><td>"+releaseTime+
	 	        		  "</td><td class='mydetail btn btn-xs btn-primary'  qnid="+result[i].qnid+
	 	        		  ">详情</td><td class='deleteQuestionnaire btn btn-xs btn-danger' qnid="+result[i].qnid+">删除</td>");
	 	          table.append(tr);
	 	      }
	 	      
	 	      $(".deleteQuestionnaire").click(function(){
	 	    	 var qnid = $(this).attr("qnid");
	 	    	 var delTr = $(this).parent('tr'); 	    	 
		 			$.ajax({
		 		 		type:"post",
		 		 		url:"deleteQuestionnaire",
		 		 		async:true,
		 		 		data:{"qnid":qnid},
		 		 	    dataType:"text",
		 		 	    success:function(result){
		 		 			 alert("删除成功");
		 		 			 //location.reload();
		 		 			 delTr.remove();
		 		 			
		 		 	    }
		 			})
	 	      })
	 	      
	 	      
	 	 	$(".mydetail").click(function(){
	 			var qnid = $(this).attr("qnid");
	 		      $("#exportExcel").attr("qnid",qnid);
	 		      $("#exportExcel").attr("questionnaireName",$(this).siblings().eq(1).text());
	 		     
	 			
	 			$.ajax({
	 		 		type:"get",
	 		 		url:"getAnswersByQnid",
	 		 		async:true,
	 		 		data:{"qnid":qnid},
	 		 	    dataType:"json",
	 		 	    success:function(result){
	 		 	    //	alert(result+qnid);	    
	 		 	    $("#myquestionnaireDetails").show();
	 		 	     var tbody = $("#mydetailsTable");
	 		 	     var thead = $("#mydetailsTableHead");
	 		 	         thead.html("  ");
	 		 	         tbody.html(" ");
	 		 	
	 		 	     var tr = $("<tr></tr>");
	 	             for(var i=0;i<result[0].length;i++){
	 	            	
	 	            	    tr.append("<th>"+result[0][i]+"</th>");
	 	            	    thead.append(tr); 
	 	             }
	 	
                     for(var i=1;i<result.length;i++){      
                    	 var tr = $("<tr></tr>");	 
                    	  for(var j=0;j<result[i].length;j++){
                    		                     		  
                    		   tr.append("<td>"+result[i][j]+"</td>");                		  
                    	  }
                    	  tbody.append(tr);
                     }
                    
	 		 	    }
	 		 	    
	 			})
	 		}) 
	 	      
	 	    },
	 	    error:function(){
	 	    	alert("查询错误");
	 	    }
	 	});
	})
})

