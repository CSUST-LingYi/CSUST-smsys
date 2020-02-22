var pn=1;
var pa;

function search(pn,pa){
	
 var xuenian = document.getElementById("xuenian").value;
 var major = document.getElementById("major").value; 
 var nianji = document.getElementById("nianji").value;
 var classno = document.getElementById("classNo").value;
 if(document.getElementById("major").value=="") pa=50;
    else  pa=10;

    	$.ajax({
   type:"post",
   url: "../studyDept/getSummary",
   data:{"xuenian":xuenian,
		      "major":major,
		      "nianji":nianji,
		      "classNo":classno,
		      "pn":pn,
		      "pa":pa
		},

   dataType:"json",
   success: function(data){
      var pageNow = data.pageNum;
	     var pageTotal = data.pages;
	     var total  = data.total;
      var ul =$("#p");
      ul.html(" ");
      var count = 0;
      var mingci = (pageNow-1)*data.pageSize+count;
      
      var table=$("#all tbody");
      table.html(" ");
      for (var i= 0;i<data.list.length;i++) {
      	var tr = $("<tr></tr");
      	tr.append("<td>"+data.list[i].studentNo+"</td>");
      	tr.append("<td>"+data.list[i].studentName+"</td>");
      	tr.append("<td>"+data.list[i].sex+"</td>");     	
      	tr.append("<td>"+data.list[i].knowledge+"</td>");
      	tr.append("<td>"+data.list[i].moral+"</td>");
      	tr.append("<td>"+data.list[i].sports+"</td>");
      	tr.append("<td>"+data.list[i].deduction+"</td>");
      	tr.append("<td>"+data.list[i].fails+"</td>"); 
      	tr.append("<td>"+data.list[i].sum+"</td>");
      	tr.append("<td>"+data.list[i].bz+"</td>");
      	if(i!=0 && data.list[i].sum == data.list[i-1].sum){
      		tr.append("<td>"+mingci+"</td>");
      	}
      	else{
      		 mingci=(pageNow-1)*data.pageSize+i+1;
      		tr.append("<td>"+mingci+"</td>");
      	}
      	
      	table.append(tr);
      }
       
      var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>上一页</span>"))); 
       ul.append(prePage);
        if(data.hasPreviousPage == false){     	        	 	         	
	     	        	 	         	prePage.addClass("disabled");
	     	        	 	          }else{
	     	        	 	           
	     	        	 	           prePage.click(function(){
	     	        	 	        	   search(pageNow-1,pa);
	     	        	 	           })
	     	        	 	          }
	   
     $.each(data.navigatepageNums,function(index,item){
	     	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	     	        	 	         	if(pageNow == item){
	     	        	 	         		numli.addClass("cur");
	     	        	 	         	}
	     	        	 	         	  numli.click(function(){
	     	        	 	         		  search(item,pa); 
	     	        	 	         	  })
	     	        	 	              ul.append(numli); 
	     	        	 	         })
     
       var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>下一页</span>")));  
     if(data.hasNextPage == false){
	     	        	 	          	  nextPage.addClass("disabled");
	     	        	 	          	  
	     	        	 	            }else{
	     	        	 	              nextPage.click(function(){
	     	        	 	              	search(pageNow+1,pa);
	     	        	 	              })
	     	        	 	             
	     	        	 	            }
	    ul.append(nextPage);  
   },
   error :function(){
   	alert("error");
   }
   
});
	 
}

function exportExcel(){
	var nianji = $("#nianji").val();
	var major =$("#major").val();
	var className =$("#classNo").val();
	var xuenian = $("#xuenian").val()
	var form = $("#exportExcel");
	    $("#f_nianji").val(nianji);
	    $("#f_xuenian").val(xuenian);
	    
	    if(major!=null){
	    	form.append(" <input type='text' name='major' value='"+major+"'> ");
	    }
	    if(className!=null){
	    	form.append(" <input type='text' name='classNo' value='"+className+"'> ");
	    }
	
	   form.submit();
}