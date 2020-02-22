/**
 * 
 */

//解决浮点数加法精度问题
function add(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

//设置德，智，体比例
function setProportion(){
	
	  //初始时时设置德，智，体比例合计
         $.ajax({
        	 url:"../studyDept/getProportion",
        	 type:"post",
        	 data:{"xuenian":$("#moralXuenian").val()},
        	 dataType:"json",
        	 success:function(data){
        	// 	console.log(data);
        		 $("#moralPer").val(data.moralPer);
        		 $("#knowledgePer").val(data.knowledgePer);
        		 $("#sportsPer").val(data.sportsPer);
        		 $("#proportion").html(add(add(data.moralPer,data.knowledgePer),data.sportsPer));
		     
        	 },
        	 error:function(){
        		 alert("error1");
        	 }
         })
		
		//当德，智，体比例改变时设置德，智，体比例合计
		$(".setProportion li input").change(function(){
			
			//获取，德，智，体比例
			var moralPer = parseFloat($("#moralPer").val());
			var knowledgePer = parseFloat($("#knowledgePer").val());
			var sportsPer = parseFloat($("#sportsPer").val());
			
			//相加，此处用的是自己写的add函数，解决浮点数相加产生的精度问题
			var sum = add(add(moralPer,knowledgePer),sportsPer);
			
			//设置德，智，体比例合计
	    $("#proportion").html(sum);
		    });
  }

//ajax通过mid查询德育分项
function getMoralByMid(mid,dom){	
    $.ajax({
    	url:"../studyDept/getMoralByMid",
    	type:"get",
    	data:{"mid":mid},
    	dataType:"json",
    	success:function(data){
    	//	console.log(data);
    		var LI = $(dom);
    		
    		var ul = $("<ul></ul>");
    		 
    		for(var i=0;i<data.length;i++){
    			
    			 if(data[i].score!=0){
    				 var score = data[i].score;
    				 var li = $("<li did="+data[i].id+" mid="+data[i].mid+" data-toggle='tooltip' data-placement='left' title='点击可查看或收起子项'>"+data[i].name+"(0--"+score+")</li>");
    			 }else{
    				 var li = $("<li did="+data[i].id+" mid="+data[i].mid+" data-toggle='tooltip' data-placement='left' title='点击可查看或收起子项'>"+data[i].name+"</li>");
    			 }  		        
    			   li.append("<span class='add' did="+data[i].id+" mid="+data[i].mid+" name="+data[i].name+" score="+data[i].score+">+</span>");
    			ul.append(li);
    		}  	
    		LI.append(ul);   		    		
    	},
    	error:function(){
    		alert("error2");
    	}
    });
}

//绑定德育分子层切换，如果有子层就收起或者隐藏
//否则通过自身的did查询是否有下一层
function clickLi(){
   
	$(document).on("click","#ul_Moral ul li",function(){
		
		 var mid = $(this).attr("did");
		 
	     if($(this).children().length>1){
	    	 
	    	 $(this).children("ul").toggle(400);
	     
	     }else{	    	
	    	 getMoralByMid(mid,this);
	     }
		 return false;
	});
   
}

//增加一项德育分项
function addOneMoral(){
	 
	$(document).on("click",".add",function(){
		      

		          $("#addMoralMenu").show(100);
		          
		          $("#moralId").val($(this).attr("did"));
		          
		          $("#moralMid").val($(this).attr("mid"));
		          
		          $("#moralSelf").html("（"+$(this).attr("name")+"）");
		          
		          $("#updateMoralName").val($(this).attr("name"));
		          
		          $("#updateMoralScore").val($(this).attr("score"));

		          $("#deleteMoralName").val($(this).attr("name"));
		          
		          $("#deleteMoralScore").val($(this).attr("score"));
		          
		     //     alert( $("#moralId").val());

			      return false;	    
	});
	 
	 //三个小页面的切换
	    $("#li_addMoral").click(function(){

			          $("#addMoral").show();
			          $("#updateMoral").hide();
			          $("#deleteMoral").hide();
			          $("#li_addMoral").addClass("active");
			          $("#li_updateMoral").removeClass("active");
			          $("#li_deleteMoral").removeClass("active");
				     
		      });
		       
		       $("#li_updateMoral").click(function(){

			          $("#addMoral").hide();
			          $("#updateMoral").show();
			          $("#deleteMoral").hide();
			          $("#li_addMoral").removeClass("active");
			          $("#li_updateMoral").addClass("active");
			          $("#li_deleteMoral").removeClass("active");				     
		       });
		     $("#li_deleteMoral").click(function(){

			          $("#addMoral").hide();
			          $("#updateMoral").hide();
			          $("#deleteMoral").show();
			          $("#li_addMoral").removeClass("active");
			          $("#li_updateMoral").removeClass("active");
			          $("#li_deleteMoral").addClass("active");     
		      });
	 
      $("#closeMenu").click(function(){

	       	        $("#addMoralMenu").hide(); 	
	       	   
	       	 return false;
	        });
	         
	  $("#submit_add_moral").click(function(){
		  
		  var type = $("#addMoralMenu input[name='addMoralRadio']:checked").val();
		  
		    if(type==undefined){
		    	alert("请选择增加的为同级或者子级");
		    	return false;
		    }else{
		    	var name = $("#addMoralName").val(); 
		    	var score = $("#addMoralScore").val();
	    	
		    	if(type=="sameLevel"){
		    	    var	mid = $("#moralMid").val();
		    	}else{
		    		var mid = $("#moralId").val();
		    	}
		    //	alert($("#moralMid").val()+" "+$("#moralId").val());
		    //	alert(name+mid);return false;
		    	
		    	if(name.length==0){
		    		alert("名称不能为空");
		    	}else{
		    		//ajax保存增加的德育分项
		    		$.ajax({
		    			url:"../studyDept/addMoral",
		    			type:"post",
		    			data:{"mid":mid,
		    				  "name":name,
		    				  "score":score
		    			     },
		    			 dataType:"text",
		    			 success:function(data){
		    				 alert(data);
		    				
		    				 window.location.reload();
		    			 },
		    			 error:function(){
		    				 alert("error3");
		    			 }
		    	});
		    	}
		    }
	  });
	  
	  //修改德育分项
	  	  $("#submit_update_moral").click(function(){
		 
		    	var name = $("#updateMoralName").val(); 
		    	var score = $("#updateMoralScore").val();	    	
		    	var id = $("#moralId").val();

		    	
		    	if(name.length==0){
		    		alert("名称不能为空");
		    	}else{
		    		//ajax保存增加的德育分项
		    		$.ajax({
		    			url:"../studyDept/updateMoral",
		    			type:"post",
		    			data:{"id":id,
		    				  "name":name,
		    				  "score":score
		    			     },
		    			 dataType:"text",
		    			 success:function(data){
		    				 alert(data);
		    				
		    				 window.location.reload();
		    			 },
		    			 error:function(){
		    				 alert("error4");
		    			 }
		    	});
		    	
		    }
	  });
	  
	  	  //删除德育分项
	  	  $("#submit_delete_moral").click(function(){
   	
		    	var id = $("#moralId").val();
		    		//ajax删除增加的德育分项
		    		$.ajax({
		    			url:"../studyDept/deleteMoral",
		    			type:"get",
		    			data:{"id":id
		    			     },
		    			 dataType:"text",
		    			 success:function(data){
		    				 alert(data);
		    				
		    				 window.location.reload();
		    			 },
		    			 error:function(){
		    				 alert("error5");
		    			 }
		    	});

	  });
}

$(function(){

	function getZcSta() {
        var zcxuenian = $("#zcxuenian").val();
        $.ajax({
            url:"../public/getZcStatus",
            type:"post",
            dataType:"json",
            data:{
                xuenian:zcxuenian
            },
            success:function (res) {
                if(res==1){
                    $("#status").text("已开启/正在使用");
                }else if(res==0){
                    $("#status").text("已停止/暂停使用");
                }else {
                    $("#status").text("加载中...");
                }
            },
            error:function () {
                $("#status").text("加载中...");
            }
        })
    }

	getZcSta();

	$("#zcxuenian").change(function () {
        getZcSta();
    });

	$("#startzc").click(function () {
        var xuenian = $("#zcxuenian").val();
        $.ajax({
            url:"../studyDept/setZcStatus_o",
            type:"post",
            dataType:"text",
            data:{
                xuenian:xuenian
            },
            success:function () {
                $("#status").text("已开启/正在使用");
            },
            error:function () {
                alert("操作失败，请重试")
            }
        })
    })
    $("#stopzc").click(function () {
        var xuenian = $("#zcxuenian").val();
        $.ajax({
            url:"../studyDept/setZcStatus_c",
            type:"post",
            dataType:"text",
            data:{
                xuenian:xuenian
            },
            success:function () {
                $("#status").text("已停止/暂停使用");
            },
            error:function () {
                alert("操作失败，请重试")
            }
        })
    })
	//设置德，智，体比例
	setProportion();
	
	//增加一项德育分项
	addOneMoral();
     
	//使文本框可修改
	$("#updateProportion").click(function(){
		
		  $(".setProportion li input").prop("disabled",false);
	});
	
	//使文本框不可修改
	$("#sureProportion").click(function(){
		
		  $(".setProportion li input").prop("disabled",true);
	});
		
	//提交设置的德，智，体比例
	$("#submitProportion").click(function(){
		 $(".setProportion li input").prop("disabled",true);
		//获取，德，智，体比例
		var moralPer = parseFloat($("#moralPer").val());
		var knowledgePer = parseFloat($("#knowledgePer").val());
		var sportsPer = parseFloat($("#sportsPer").val());
		var xuenian = $("#moralXuenian").val();
		
		//相加，此处用的是自己写的add函数，解决浮点数相加产生的精度问题
		var sum = add(add(moralPer,knowledgePer),sportsPer);
            
		   if(sum!=1){
			   alert("智育分，德育分，体育分的占比合计应该为1，请重新设置");
		   }else{
			   //ajax提交
			   $.ajax({
				   url:"../studyDept/setProportion",
				   type:"post",
				   data:{
					   "xuenian":xuenian,
					   "moralPer":moralPer,
					   "knowledgePer":knowledgePer,
					   "sportsPer":sportsPer
				        },
				    dataType:"text",
				    success:function(data){
				    	alert(data);
				    },
				    error:function(){
				    	alert("error6");
				    }
			   });
		   }
	});     
       clickLi();  
      
});

 $(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function(){ 
  getMoralByMid(0,"#ul_Moral");
});


$(function(){
	 $("#pageReq").click(function(){
		 $.ajax({
			 url:"../studyDept/applyReview",
			 type:"get",
			 dataType:"html",
			 success:function(data){				
				 $("#page").html(data);			
			 },
			 error:function(){
				 alert("error7");
			 }
		 });
	 });
});
