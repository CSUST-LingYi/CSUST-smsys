
/**
 * 
 */

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

//四舍五入小数的方法
function round(num, decimal) {
    if (isNaN(num)) {
        return 0;
    }
    const p1 = Math.pow(10, decimal + 1);
    const p2 = Math.pow(10, decimal);
    return Math.round(num * p1 / 10) / p2;
}
function toFixed(num, decimal) {
    return round(num, decimal).toFixed(decimal);
}

$(function(){
	
	$.ajax({
		url:"../monitor/getMonitorInfo",
	    type:"get",
	    dataType:"json",
	    success:function(result){
	    	$("#termYear").text(result.termYear);
	    	$("#major").text(result.major);
	    	$("#className").text(result.className);
	    	$("#monitor").text(result.studentName);
	    	var ty = result.termYear.substr(2,2);
	    	$('#bjhead').text(result.major+ty+'0'+result.className);
	    	
	    },
	    error:function(){
	    	alert("出错，请重试!");
	    }
	})
/***********通过地址栏的参数查询个人综测的情况******************/	
	 var url= location.search;
	 var studentNo = url.substr(1);
	 studentNo=uncompileStr(studentNo);
	 $("#studentNo").val(studentNo);  
	 var xuenian = $("#xuenian").val();
	 
	
		
	 getMoralAndKnowledgeAndSports(xuenian, studentNo);
	 
	 updateMoral(xuenian,studentNo);
	 $.ajax({
			url:"../monitor/getTban",
		    type:"post",
		    dataType:"json",
		    data:{		    	
		    	'xuenian':xuenian,
		    	'studentNo':studentNo
		    },
		    success:function(isban){
		    	if(isban==true){
		    		//$('#approve').remove();
		    		//$('#refuse').prop('disabled',true);
		    		//$('#refuse').val('学习部或教师端拒绝了审核，操作已锁定');
		    		console.log('ban');
		    	}
		    	
		    },
		    error:function(){
		    	alert("出错，请重试!");
		    }
		})
	
	 $(document).on("click",".editDeduction",function(){
    	var name = $(this).attr("name");
    	var score = $(this).attr("score");
    	var times = $(this).attr("times");
    	var id = $(this).attr("did");
    	
    	$("#deductionName").html(" ");
    	$("#deductionName").val(name);
    	$("#deductionScore").val(score);
    	$("#deductionTimes").val(times);
    	$("#deductionDid").val(id);
    	
    })
    
     $(document).on("click",".deleteDeduction",function(){
    		
           var flag = confirm("确认删除吗？");
             
              if(flag){
           	   var id = $(this).attr("did");
 	    	   var xuenian = $("#xuenian").val();
	    	   var studentNo = $("#studentNo").val();
            	
 			  $.ajax({
				  url:"../monitor/deletePersonDeduction",
			      type:"get",
			      data:{"id":id,
			    	     "xuenian":xuenian,
			    	     "studentNo":studentNo
			           },
			      dataType:"text",
			      success:function(result){
			    	  alert(result);
			    	  getMoralAndKnowledgeAndSports(xuenian,studentNo);
			      },
			      error:function(){
			    	  alert("updatededuction error");
			      }
			  })
	    	   
              }
    	
    })
    
    
    $(document).on("click","#updateDeduction",function(){
    		  var name = $("#deductionName").val();
    		  var score = $("#deductionScore").val();
    		  var times = $("#deductionTimes").val();
    		  var id = $("#deductionDid").val();
	    	  var xuenian = $("#xuenian").val();
	    	  var studentNo = $("#studentNo").val();

    		  if(name.length>0 && score>0 && score<100 &&times>0 && times<100 && id!=0){
    			  
    			  $.ajax({
    				  url:"../monitor/updatePersonDeduction",
    			      type:"post",
    			      data:{"id":id,
    			    	     "times":times,
    			    	     "xuenian":xuenian,
    			    	     "studentNo":studentNo
    			           },
    			      dataType:"text",
    			      success:function(result){
    			    	  alert(result);
    			    	  getMoralAndKnowledgeAndSports(xuenian,studentNo);
    			      },
    			      error:function(){
    			    	  alert("updatededuction error");
    			      }
    			  })
    			  
    		  }else{
    			  alert("请正确输入！！");
    		  }
    	 })
    	 
     addDedution();//此方法用来增加扣分项
	 
    	 
    $("#btn_moralImage").click(function(){
    	$('#moralImage').modal('show');
    	
    	var year = $("#xuenian").val();
    	var sno = $("#studentNo").val();
    	
    	$.ajax({
    		url: "../public/getPersonMoralBySno",
    		type: "get",
    		dataType: "json",
    		scriptCharset: "utf-8",
    		data: {
    			"xuenian": year,
    			"studentNo": sno
    		},
    		success: function(data) {
    			var table = $("#moralPrizeTable1");
    			    table.html("");
   
    			for (var i = data.length-1 ; i >= 0 ; i--) {
    				var tr = $("<tr></tr>");


    			tr.html("<td>" + data[i].name + "</td><td>" + data[i].type + "</td><td>" + data[i].score + "</td><td>" + data[i].getTime + "</td><td><img class=\"prizePicture\" src=\""+"../"+data[i].imagePath+"\"></td>");

    				table.append(tr);
    			}
    			var summoral=0;
    			$("#moralPrizeTable1 tr").each(function(){
    				$(this).children('td').each(function(j){
    					if (j == 2)
    						summoral= summoral + parseFloat($(this).html());
    				})
    			})
    			$("#moralSumSet").html(toFixed(summoral,2));

    		},
    		error: function() {
    			alert("查询出错");
    		}
        });
    })
})



    	  
function check(xuenian,studentNo,status){

  	 $.ajax({
	   	type:"post",
	   	url:"../monitor/checkOnePersonSummary",
	   	async:true,
	   	data:{"xuenian":xuenian,
	   	     "studentNo":studentNo,
	   	     "status":status},
	   	dataType:"text",
	   	success:function(data){
	   		alert(data);
	   		getMoralAndKnowledgeAndSports(xuenian,studentNo);
	   	},
	   	error:function(){
	   		alert("error");
	   	}
	   });		 
}

function setPersonSummary(xuenian,studentNo,result){


 	   	    var table = $("#personSummaryTable tbody");
 	   	        table.html(" ");
 	   	    
 	   	    var tr = $("<tr></tr>");
 	   	        tr.append("<td>"+result.studentNo+"</td>");
 	   	        tr.append("<td>"+result.studentName+"</td>");
 	   	        tr.append("<td>"+result.knowledge+"</td>");
 	   	        tr.append("<td>"+result.moral+"</td>");
 	   	        tr.append("<td>"+result.sports+"</td>");
 	   	        tr.append("<td>"+result.deduction+"</td>");
 	   	        tr.append("<td>"+result.fails+"</td>");
 	   	        tr.append("<td>"+result.sum+"</td>");
 	   	        tr.append("<td>"+result.bz+"</td>");
 	   	        tr.append("<td><input id='approve'  type='button' class='btn btn-warning btn-xs' value='审核通过'><input id='refuse' type='button' class='btn  btn-xs btn-danger'  value='不通过'></td>");
 	   	        tr.append("<td>"+result.status+"</td>");
 	   	    table.append(tr);
 	   	    
 	   	    	 
          $("#approve").on("click",function(){
          	 var status = 'true';
              check(xuenian,studentNo,status);
              
               })

           $("#refuse").click(function(){
           	var status = 'false';
               check(xuenian,studentNo,status);
               
               })
}

function setMoralSummary(result){
			
 	     if(result!=null){
 			$("#selfEvaluation").text(result.selfEvaluation);
 			$("#classEvaluation").text(result.classEvaluation);
 			$("#teacherEvaluation").text(result.teacherEvaluation);
 			$("#additionnalScore").text(result.additionnalScore);
 			$("#MoralSummary").text(result.summary);
 			
 			/***********设置模态框的值便于修改时使用*************/	  			
 		    $("#modal_selfEvaluation").val(result.selfEvaluation);
 			$("#modal_classEvaluation").val(result.classEvaluation);
 			$("#modal_teacherEvaluation").val(result.teacherEvaluation);
 			$("#modal_additionnalScore").val(result.additionnalScore);
 			$("#modal_MoralSummary").val(result.summary);
 			$("#updateMoral").attr("mid",result.id);
 			
}
}
function setKnowledgeBySno(result){

   	var table = $("#knowledge tbody");
   	    table.html(" ");
   	    
   	var sumCredit=0;
   	var temp=0;
   	var sum=0;
   	   
   	   for (var i=0;i<result.length;i++) {
   	   	
			if(result[i].score>=0){                      
				sumCredit = sumCredit+result[i].credit;
         	    temp = temp + (result[i].credit * (result[i].score>=60?result[i].score:0));
            				                   					
		}
   	   	
   	   	  var tr = $("<tr></tr>");
   	   	      tr.append("<td>"+result[i].courseName+"</td>");
   	   	      tr.append("<td>"+result[i].credit+"</td>");
   	   	      tr.append("<td>"+result[i].score+"</td>");
   	      table.append(tr);
   	   }
   	   
   	   var sum = temp*0.7/sumCredit;
   	       sum = toFixed(sum,2);
   	   
   	   var tr = $("<tr></tr>");
   	       tr.append("<td>合计：</td>");
   	       tr.append("<td>"+sumCredit+"</td>");
   	       tr.append("<td>"+sum+"</td>");
   	       table.append(tr);
   	   
}

function setSportsBySno(result){

 			
 	     if(result!=null){
 	
 	         $("#firstTerm").text(result.firstTerm);
 	         $("#secondTerm").text(result.secondTerm);
 	         
 	         $("#sportsSummary").text(result.sum);
 			}
 			
}

function setDeduction(result){
	 
	 var table = $("#deductionList");
	     table.html(" ");
	     var sum=0;
	 for(var i=0;i<result.length;i++){
		 sum+=result[i].score*result[i].times;
	      var tr =$("<tr></tr>");
	          tr.append("<td> "+result[i].name+"</td><td>"+result[i].score+"</td><td>"+result[i].times+"次</td>");
	          tr.append("<td><button class='editDeduction btn btn-info btn-xs' name="+result[i].name+" score="+result[i].score+" times="+result[i].times+" did="+result[i].id+">edit</button></td>");
	          tr.append("<td><button class='deleteDeduction btn btn-danger btn-xs' did="+result[i].id+">delete</button></td>")
	          table.append(tr);
	     }
	 $("#deductionSummary").html(sum);
	  
}
function moralInputChange(){
	

 		var selfE  = $("#modal_selfEvaluation").val();
 		    selfE = (isNaN(parseInt(selfE))) ? 0 : parseInt(selfE);
 		var classE = $("#modal_classEvaluation").val();
 		    classE = (isNaN(parseInt(classE))) ? 0 : parseInt(classE);
 		var teacherE  =	$("#modal_teacherEvaluation").val();
 		    teacherE = (isNaN(parseInt(teacherE))) ? 0 : parseInt(teacherE);
 		var addE =	$("#modal_additionnalScore").val();
 		    addE = (isNaN(parseFloat(addE))) ? 0 : parseFloat(addE);
 		
 		 if(classE<0) {
 			 alert("请正确输入");
 			$("#modal_classEvaluation").val(0);classE=0;
 		 }
 		 if(classE>100) {
 			 alert("请正确输入");
 			$("#modal_classEvaluation").val(100);classE=100;
 		 }
 		 if(teacherE<0) {
 			 alert("请正确输入");
 			$("#modal_classEvaluation").val(0);teacherE=0;
 		 }
 		 if(teacherE>100) {
 			 alert("请正确输入");
 			$("#modal_classEvaluation").val(100);teacherE=100;
 		 } 
 		    
 		 var sum = parseFloat(selfE*0.015 + classE*0.09+teacherE*0.045+addE);
 		     sum = sum.toFixed(2);
 		
 		$("#modal_MoralSummary").val(sum);
 

}

function updateMoral(xuenian,studentNo){

 $("#updateMoral").click(function(){
	 var selfE  = $("#modal_selfEvaluation").val();
	    selfE = (isNaN(parseInt(selfE))) ? 0 : parseInt(selfE);
	var classE = $("#modal_classEvaluation").val();
	    classE = (isNaN(parseInt(classE))) ? 0 : parseInt(classE);
	var teacherE  =	$("#modal_teacherEvaluation").val();
	    teacherE = (isNaN(parseInt(teacherE))) ? 0 : parseInt(teacherE);
	var addE =	$("#modal_additionnalScore").val();
	    addE = (isNaN(parseFloat(addE))) ? 0 : parseFloat(addE);
 		var id = $(this).attr("mid");
 		
 		if(id!=0 && classE>=0 && classE<=100 && teacherE>=0 && teacherE<=100){
 			
 		
 			$(this).attr("disabled",true);
 			//ajax修改德育分汇总
 			 $.ajax({
 	            type:"post",
 	            url:" ../public/updateMoralSummary",
 	            async:true,
 	            data:{"xuenian":xuenian,
 		         "studentNo":studentNo,
 	             "selfEvaluation":selfE,
 	             "classEvaluation":classE,
 	             "teacherEvaluation":teacherE,
 	             "additionnalScore":addE,
 	             "id":id
 	            },
 		        dataType:"text",
 		        success:function(result){
 		        	alert('update');
 		        	alert(result);
 		        	getMoralAndKnowledgeAndSports(xuenian, studentNo);
 		        },
 		        error:function(){
 		        	alert("error");
 		        }
 			 })
 			
 			
 			$(this).attr("disabled",false);
 		}else{
 			alert("请正确输入");
 		}
 })

}

function getMoralAndKnowledgeAndSports(xuenian,studentNo){
	$.ajax({
 	    type:"get",
 	    url:" ../public/getMoralAndKnowledgeAndSports",
 	    async:true,
 	    data:{"xuenian":xuenian,
 		      "studentNo":studentNo},
 		dataType:"json",
 		success:function(result){

 			setMoralSummary(result.moralSummary);
 			setKnowledgeBySno(result.list);
 			setSportsBySno(result.personSports);
 			setPersonSummary(xuenian,studentNo,result.personSummary);
 			setDeduction(result.deductions);
 			
 		},
 		error:function(){
 			alert("error3");
 		}
});
}


function addDedution(){
	$(document).on("click","#openDeductionModal",function(){
		$("#deductionModal").modal("show");
		//把所有的扣分项查询出来做成下拉框
		$.ajax({
			url:"../studyDept/listDeduction",
			type:"get",
			dataType:"json",
			success:function(result){
				console.log(result);
				var select = $("#add_deductionName");
				    select.html(" ");
				    
				    for(var i=0;i<result.length;i++){
				    	var option = $("<option value="+result[i].id+">"+result[i].name+"</option>");
				    	select.append(option);
				    }
			},
			error:function(){
				alert("error");
			}
		})
		
		$(document).on("click","#btn_addDeduction",function(){
			 var did = $("#add_deductionName").val();
			 var times = parseInt($("#add_deductionTimes").val());
			 var studentNo = $("#studentNo").val();
			 var xuenian = $("#xuenian").val();
			  		
			if(times>0 && times<100  ){
				
				$.ajax({
					url:"../monitor/addPersonDeduction",
					type:"post",
					data:{"studentNo":studentNo,
					      "xuenian":xuenian,
					      "did":did,
					      "times":times
					},
					dataType:"text",
					success:function(result){
						alert(result);
					    getMoralAndKnowledgeAndSports(xuenian,studentNo);
						
					}
				})
				
			}else{
				alert("请正确输入次数！！");
			}
			 
		})
		
	})
}