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
	    	getCourseByClass();
	    },
	    error:function(){
	    	alert("出错，请重试!");
	    }
	})
})


function editCourse(){
	
	var termYear = $("#termYear").text();

    var major = $("#major").text();

    var className = $("#className").text();

    var xuenian = $("#xuenian").val();   
	      
	      $(".editCourse").click(function(){
             	
             	$("#editCourse").attr("cid",$(this).attr("cid"));
             	
             	$("#courseName").val($(this).parent().parent().children().eq(0).html());
             	           	
             	$("#courseScore").val(parseFloat($(this).parent().parent().children().eq(1).html()));
             	             
             })
             
            $("#editCourse").click(function(){
                    	var name = $("#courseName").val();
                    	var credit = $("#courseScore").val();
                    	var cid = $(this).attr("cid");
                    	
                    	//alert(name+score+cid);
                    	
                     if(name.length>0 && name.length<20 &&credit>0 && credit<20){
                    		
                    		if(cid!=undefined){
                    			$(this).attr("disabled",true);
                    		   //ajax修改
                    		   $.ajax({
                    		   	type:"post",
                    		   	url:" ../monitor/updateOneCourse",
                    		   	async:true,
                    		   	data:{"xuenian":xuenian,
	  		                          "termYear":termYear,
	  	                              "major":major,
	  	                            "className":className,
                    		   	      "id":cid,
                    		   	      "courseName":name,
                    		   	      "credit":credit
                    		   	    },
                    		   	  dataType:"text",
                    		   	  success:function(data){
                    		   	  	   alert(data);
                    		   	  	  location.reload();
                    		   	  },
                    		   	  error:function(){
                    		   	  	alert("error");
                    		   	  	$(this).attr("disabled",false);
                    		   	  }
                    		   });
                    		}
                    	}else{
                    		alert("请正确输入");
                    	}
                    	
                    })
}


function addCourse(){
	
	var termYear = $("#termYear").text();

    var major = $("#major").text();

    var className = $("#className").text();

    var xuenian = $("#xuenian").val();  
	
                   $("#addCourse").click(function(){
                    	var name = $("#courseName").val();
                    	var credit = $("#courseScore").val();
                    	
                    	
                    	if(name.length>0 && name.length<20 &&credit>0 && credit<20){
                    		//ajax新增
                    		$(this).attr("disabled","true");
                    		 $.ajax({
                    		   	type:"post",
                    		   	url:"../monitor/addOneCourse",
                    		   	async:true,
                    		   	data:{"xuenian":xuenian,
	  		                          "termYear":termYear,
	  	                              "major":major,
	  	                            "className":className,
                    		   	      "courseName":name,
                    		   	      "credit":credit
                    		   	    },
                    		   	  dataType:"text",
                    		   	  success:function(data){
                    		   	  	   alert(data);
                    		   	  	  location.reload();
                    		   	  },
                    		   	  error:function(){
                    		   	  	alert("error");
                    		   	  	$(this).attr("disabled","false");
                    		   	  }
                    		   });
                    	}else{
                    		alert("请正确输入");
                    	}
                    	
                    })	
}


function deleteCourse(){
	        $(".deleteCourse").click(function(){
             	var flag = confirm("确认要删除吗？");
             	
             	if(flag){
             		var cid = $(this).attr("cid");
             		//ajax删除此课程
             		$(this).attr("disabled",true);
             	       $.ajax({
                    		   	type:"get",
                    		   	url:"../monitor/deleteOneCourse",
                    		   	async:true,
                    		   	data:{"cid":cid
                    		   	    },
                    		   	  dataType:"text",
                    		   	  success:function(data){
                    		   	  	   alert(data);
                    		   	  	  location.reload();
                    		   	  },
                    		   	  error:function(){
                    		   	  	alert("error");
                    		   	  	$(this).attr("disabled",false);
                    		   	  }
                    		   });
             	}
             })
}

//查看班级智育科目

function getCourseByClass(){
	
	var termYear = $("#termYear").text();

	var major = $("#major").text();

	var className = $("#className").text();

	var xuenian = $("#xuenian").val();
	
	  $.ajax({
	  	type:"post",
	  	url:"../monitor/getCourseByClass",
	  	async:true,
	  	data:{"xuenian":xuenian,
	  		 "termYear":termYear,
	  	     "major":major,
	  	     "className":className},
	  	dataType:"json",
	  	success:function(data){

             var table = $("#setting tbody");
                 table.html(" ");
              
             for(var i=0;i<data.length;i++){
             	var tr = $("<tr></tr>");
             	    tr.append("<td>"+data[i].courseName+"</td><td>"+data[i].credit+"</td>");
             	    tr.append("<td><button class='editCourse btn-info' cid="+data[i].id+">edit</button></td>");
             	    tr.append("<td><button class='deleteCourse btn-danger' cid="+data[i].id+">dele</button></td>");
             	table.append(tr);
             }
             
             editCourse();
             
             addCourse();

             deleteCourse();
                
	  		
	  	},
	  	error:function(data){
	  		alert("error");
	  	}
	  });
	
}




