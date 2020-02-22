
function compileStr(code){ //对字符串进行加密       
  var c=String.fromCharCode(code.charCodeAt(0)+code.length);
 for(var i=1;i<code.length;i++)
  {      
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
 }   
 return escape(c);  
 }

function getSummaryByClass(xuenian,termYear,major,className){
        
    	$.ajax({
	  	    type:"post",
	  	    url:" ../monitor/getSummaryByClass",
	  	    async:true,
	  	    data:{"xuenian":xuenian,
	  		     "nianji":termYear,
	  	         "major":major,
	  	        "classNo":className},
	  	   dataType:"json",
	  	   success:function(result){
	  		
	  		var table = $("#summaryTable tbody");
	  		    table.html(" ");
	  		  
	  		    $("#studentCount").text(result.length);
	  		    
	  		    for(var i=0;i<result.length;i++){
	  		    	var tr = $("<tr></tr>");
	  		    	    tr.append("<td>"+result[i].studentNo+"</td>");
	  		    	    tr.append("<td>"+result[i].studentName+"</td>");
	  		    	    tr.append("<td>"+result[i].knowledge+"</td>");
	  		    	    tr.append("<td>"+result[i].moral+"</td>");
	  		    	    tr.append("<td>"+result[i].sports+"</td>");
	  		    	    tr.append("<td>"+result[i].deduction+"</td>");
	  		    	    tr.append("<td>"+result[i].fails+"</td>");
	  		    	    tr.append("<td>"+result[i].sum+"</td>");
	  		    	    tr.append("<td>"+result[i].bz+"</td>");
	  		    	    
	  		    	    if(result[i].status){
	  		    	     tr.append("<td style='color:green'>已审核通过</td>"); 	
	  		    	    }else{
	  		    	    	 tr.append("<td style='color:red'>未审核通过</td>"); 	
	  		    	    }
	  		    	    tr.append("<td><button sno="+result[i].studentNo+" class='personDetails  btn-primary'>查看</button></td>");
	  		    	   
	  		    	table.append(tr);
	  		    }
	  		    
	  		    $(".personDetails").click(function(){
	  		    	
	  		    	var studentNo = $(this).attr("sno");  		    	
	  		    	    
	  		    	    studentNo = compileStr(studentNo);
	  		    	    
	  		    	  window.open("personDetails.html?"+studentNo);
	  		    	  
	  		    	
	  		    })
	  	   
	  	   },
	     	
	     	error:function(){
	   		   alert("error");
	  	    }
	  		  	
	  	})
}

$(function(){
	
/*******初始查看班长的个人信息**********/
/*******直接查看本班的综测信息汇总**********/
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
		    	//通过班级查询综测汇总成绩
		    	var xuenian = $("#xuenian").val()
		        getSummaryByClass(xuenian,result.termYear,result.major,result.className);
		    },
		    error:function(){
		    	alert("出错，请重试!");
		    }
		})      

})

function exportExcel(){
	var termYear = $("#termYear").text();
	var major =$("#major").text();
	var className =$("#className").text();
	var xuenian = $("#xuenian").val()
	var form = $("#exportExcel");
	    $("#f_nianji").val(termYear);
	    $("#f_major").val(major);
	    $("#f_classNo").val(className);
	    $("#f_xuenian").val(xuenian);
	
	   form.submit();
}
