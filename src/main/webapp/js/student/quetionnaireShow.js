/**
 * 
 */

$(function(){

	 $("#questionnaire").click(function(){
		
		  $.ajax({
		         url:"listQuestionnaireByStudentNo",
		         type:"get",
		         data:{"studentNo":$("#sno").val()},
		         dataType:"json",
		         success:function(data){		        	 
		           var table = $("#listQuestionnaire");
		               table.html(" ");
		             for(var i=0;i<data.length;i++){
		            
		            	 var tr = $("<tr>" +
		            	    		"<td>"+data[i].uname+"</td>" +
		            	     		"<td>"+data[i].questionnaireName+"</td>" +
		            	     		"<td>"+data[i].termYear+"</td>"+
		            	     		"<td class='mydetail' qnid="+data[i].qnid+" style='color:blue'>填写</td>"+
		            	     		"<td class='deleteQuestionnaire' qnid="+data[i].qnid+" style='color:red'>删除</td>"+
		            	            "</tr>");
		            	  table.append(tr);
		             }
		           
		             
		             $(".deleteQuestionnaire").click(function(){
		            	 var qnid = $(this).attr("qnid");
		            //	 alert(qnid);
		            	 
		            	 //在改问卷下增加一个已填学生而不是删除一份问卷
		            	 $.ajax({
		            		 url:"filledoutQuestionnaire",
		            		 type:"get",
		            		 data:{"qnid":qnid},
		            		 dataType:"text",
		            		 success:function(data){
		            			 alert(data);
		            		 }
		            	 })
		             })
		             
		             //获得一份问卷的问题用来回答
		        	 $(".mydetail").click(function(){ 
		       		  
		        		 var qnid = $(this).attr("qnid");

		       		  
		       		  $.ajax({
		       		         url:"getQuestionnaire",
		       		         type:"get",
		       		         data:{"qnid":qnid},
		       		         dataType:"json",
		       		         success:function(data){

		       		        	 $("#questionnaire_answer").show();
		       		        	 $("#questionnaire_submit").attr("qnid",qnid);
		       		        	 
		       			        	 var table =$("#questionTable");
		       		        	     table.html(" ");
		       		        	   
		       		        	      $("#bz").html(data[0].bz);
		       		        	      
		       		        	   if(data[0].bz==null){
		       		        		$("#bz").html("无说明");
		       		        	   }
		       		        	      
		       		        	     for(var i=1;i<data.length;i++){
		       		        	    	 var tr = $("<tr></tr>");
		       		        	    	 if(data[i].introduce==null||data[i].introduce==""){
		       		        	    		 var introduce = "";
		       		        	    	 }else{
		       		        	    		 var introduce = data[i].introduce;
		       		        	    	 }
		       		        	    	     tr.html("<td class='aid' aid="+data[i].qid+">"+data[i].questionName+"</td><td><input type='text' class='answer form-control'></td><td>"+introduce+"</td>");
		       	                         table.append(tr);	        	     
		       		        	     }	 
		       		        	 }
		       		        	 
		       		        	    
		       		         
		       		     }) 
		       	 })
		             
		        	    
		         }
		     })
		 
	 })
	   
	     
})

$(function(){
	
	 $("#questionnaire_submit").click(function(){
		 
		 $(this).attr("disabled", true);
		 
		 var qnid = $(this).attr("qnid");
		 
		 alert(qnid);
		 
		 var answers = new Array();
		 var aids = new Array();
		 
		 $(".aid").each(function(){
			 aids.push($(this).attr("aid"));
		   });
	 	var flag =true;
		 $(".answer").each(function(){
			 if($(this).val().length==0){ 
				 $(this).attr("disabled", false);
				 alert("回答不可以为空，实在为空可填写无或null");
				 flag = false;
				 return false;
			 }
	 	 	answers.push($(this).val());
	   });
      	if(flag==false){
      		 $(this).attr("disabled", false);	 
      		return false;
      	}
      	alert("ssss");
		 $.ajax({
			 url:"addAnswer",
			 type:"post",
			 data:{"answers":answers,
				   "aids":aids,
				   "qnid":qnid
			    },
			 dataType:"text",
			 success:function(data){
			   alert(data+"提交成功，感谢您的填写");
			   $(this).attr("disabled", false);	 
			 },
			 error:function(data){
				 alert(data+"请联系管理员");
				 $(this).attr("disabled", false);	 
			 }
		 })
	 })
})
