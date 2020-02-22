/**
 *辅助函数
 **/

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

//重置审核状态
function resetStatus(xuenian,studentNo){
	$.ajax({
		url:"../public/resetStatus",
		type:"post",
		dataType:"json",
		data:{
			"xuenian":xuenian,
			"studentNo":studentNo
		},
		success:function(data){
			console.log("resetsuccess");
		},
		error:function(){
			//alert("Error_stu1:提交失败");
		}
	})
}

//查询——按学号、学年查询智育分并写入相应表格
function getKnowledgeInfo(xuenian,studentNo,nianji,major,className,tablename){
	$.ajax({
			url: "../public/getPersonKnowledgeBySno",
			type: "post",
			dataType: "json",
			scriptCharset: "utf-8",
			data: {
				"xuenian": xuenian,
				"studentNo": studentNo,
				"nianji":nianji,
				"major":major,
				"className":className
			},
		  	success: function(data) {
		  		
		  		var sum=0,score=0,temp=0,t2=0;
		        var table = $("#"+tablename+"");
		        table.html("");
		        for (var i = 0; i < data.length; i++) {
					var tr = $("<tr></tr>");
					tr.html("<td>" + data[i].courseName + "</td><td>" + data[i].credit + "</td><td>" + data[i].score + "</td>");
					if(data[i].score!=0){
						sum = sum + (data[i].score>=60?data[i].score:0);
						t2 = t2+data[i].credit;
						temp = temp + (data[i].credit * data[i].score);
					}
					table.append(tr);
		    	}
		    	score = 0.7*(temp/t2);

		    	//$("#scoreOfKnow").html(toFixed(score,2));
		    	$("#scoreOfKnow").text($('#scoreOfKnowInput').text());
		    	$("#sumOfKnow").html(sum);
		  	},
			error: function() {
				alert("查询出错10");
			}
		});
}

//按学号、学年查询体育分并写入相应表格
function getPEInfo(year,sno,tablename){
	$.ajax({
			url: "../public/getPersonSports",
			type: "post",
			dataType: "json",
			scriptCharset: "utf-8",
			data: {
				"xuenian": year,
				"studentNo": sno
			},
		  	success: function(data) {
		        var table = $("#"+tablename+"");
		        table.html("");
		        var tr = $("<tr></tr>");
				tr.html("<td>" + data.firstTerm + "</td><td>" + data.secondTerm + "</td>");
				table.append(tr);

				$('#sumOfPE').html(data.firstTerm+data.secondTerm);
				$("#scoreOfPE").html(data.sum);
		  	},
			error: function() {
				alert("查询出错11");
			}
		});
}

//按学号、学年查询德育分情况并写入相应表格
function getMoralInfo(year,sno,tablename){
	$.ajax({
		url: "../public/getMoralSummary",
		type: "post",
		dataType: "json",
		scriptCharset: "utf-8",
		data: {
			"xuenian": year,
			"studentNo": sno
		},
		success: function(data) {
			var table = $("#"+tablename+"");
			table.html("");
			var tr = $("<tr></tr>");
			tr.html("<td>" + data.selfEvaluation + "</td><td>" + data.classEvaluation + "</td><td>" + data.teacherEvaluation + "</td><td>" + data.additionnalScore + "</td><td>" + data.summary + "</td>");
			table.append(tr);
		},
		error: function() {
			alert("查询出错12");
		}
    });
}

//按学号、学年查询德育分中的获奖情况并写入相应表格
function getMoralPrizeInfo(year,sno,tablename){
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
			var table = $("#"+tablename+"");
			var tabletr = $("#"+tablename+" tr");
			table.html("");
			if(data.length==0){
				$(".moralHeader").hide();
			}
			for (var i = data.length-1 ; i >= 0 ; i--) {
				var tr = $("<tr></tr>");
				if(tablename == "moralPrizeTable1"){
					tr.html("<td did=\""+data[i].id+"\">" + data[i].name + "</td><td>" + data[i].type + "</td><td>" + data[i].score + "</td><td>" + data[i].getTime + "</td><td><img class=\"prizePicture\" src=\""+"../"+data[i].imagePath+"\"></td><td><button type=\"button\" class=\"btn btn-primary btn-sm updMoral\">修改</button><button type=\"button\" class=\"btn btn-danger btn-sm delMoral\">删除</button></td>");					
				}
				else{
					tr.html("<td>" + data[i].name + "</td><td>" + data[i].type + "</td><td>" + data[i].score + "</td><td>" + data[i].getTime + "</td><td><img class=\"prizePicture\" src=\""+"../"+data[i].imagePath+"\"></td>");
				}
				table.append(tr);
			}
			var summoral=0;
			$("#"+tablename+" tr").each(function(){
				$(this).children('td').each(function(j){
					if (j == 2)
						summoral= summoral + parseFloat($(this).html());
				})
			})
			$("#moralSumSet").html(toFixed(summoral,2));
		},
		error: function() {
			alert("查询出错14");
		}
    });
}

//查询体育智育信息——录入界面
function getPEAndKnowInfos(xuenian,studentNo,nianji,major,className){
	//体育分
	$.ajax({
		url: "../public/getPersonSports",
		type: "post",
		dataType: "json",
		scriptCharset: "utf-8",
		data: {
			"xuenian": xuenian,
			"studentNo": studentNo		},
	  	success: function(data) {
	  		$("#firstTermScore").val(data.firstTerm);
	  		$("#secondTermScore").val(data.secondTerm);
			$('#sumOfPEinput').html(data.firstTerm+data.secondTerm);
			$("#scoreOfPEinput").html(data.sum);
	  	},
		error: function(data) {
			alert("查询出错15");
			console.log(data);
		}
	});
	//智育分
	$.ajax({
		url: "../public/getPersonKnowledgeBySno",
		type: "post",
		dataType: "json",
		scriptCharset: "utf-8",
		data: {
			"xuenian": xuenian,
			"studentNo": studentNo,
			"nianji":nianji,
			"major":major,
			"className":className
		},
	  	success: function(data) {
	  		
	  		if(data==null | data.length==0){
	  			var table = $("#course_tableB");
	  			    table.html(" ");
	  			    table.append("<tr><td>暂无设置</td><td>暂无设置</td><td>暂无设置</td></tr>");
	  			    return false;
	  			    
	  		}
	  		
	  		var sum=0,score=0,temp=0,t2=0;
	        var table = $("#course_tableB");
	        table.html("");
	        for (var i = 0; i < data.length; i++) {

				var tr = $("<tr></tr>");
			//	if (data[i].score==0) {
	       // 		tr.html("<td>" + data[i].courseName + "</td><td>" + data[i].credit + "</td><td><input type=\"text\" class=\"form-control knowledgeScore\" placeholder=\"请输入分数\" ></td><td style=\"display:none;\">"+data[i].cid+"</td>");
		//		}
			//	else{
	        		tr.html("<td>" + data[i].courseName + "</td><td>" + data[i].credit + "</td><td><input type=\"text\" class=\"form-control knowledgeScore\" placeholder=\"请输入分数\" value=\""+data[i].score+"\"></td><td style=\"display:none;\">"+data[i].cid+"</td>");
			//	}
				if(data[i].score>=0){                      
                    	   sum = sum + (data[i].score>=60?data[i].score:0);
                    	   t2 = t2+data[i].credit;
                    	   temp = temp + (data[i].credit * (data[i].score>=60?data[i].score:0));
                       				                   					
				}
				table.append(tr);
	    	}
	    	score = 0.7*(temp/t2);
	    	$("#scoreOfKnowInput").html(toFixed(score,2));
	    	$("#sumOfKnowInput").html(sum);
	  	},
		error: function() {
			alert("查询出错16");
		}
	});
}

//计算体育分总分
function sumSport(obj) {
	var sportsumArr = document.getElementsByClassName("SportScore");
	var sumsport = 0;
	//console.log(sportsumArr[0].value);
	for (var i = 0; i < sportsumArr.length; i++) {
		sumsport += (isNaN(parseInt(sportsumArr[i].value))) ? 0 : parseInt(sportsumArr[i].value);
	}
	$("#sumOfPEinput").html(sumsport);
}

//德育分项目节点查询
function getMoralByMid(mid,dom){	
    $.ajax({
    	url:"../studyDept/getMoralByMid",
    	type:"get",
    	data:{"mid":mid},
    	dataType:"json",
    	success:function(data){

    		var LI = $(dom);
    		var ul;
    		if(mid==0){
    			ul = $("<ul style=\"font-size:18px;\"></ul>");
    		}
    		else{
    			ul = $("<ul style=\"font-size:16px;\"></ul>");
    		}

    		for(var i=0;i<data.length;i++){
				if(data[i].score!=0){
					var score = data[i].score;
					var li = $("<li did="+data[i].id+" mid="+data[i].mid+" sc="+score+">"+data[i].name+"("+score+")<button class=\"btn btn-default btn-xs moralButton\" data-toggle=\"modal\" data-target=\"#myModal\">+</button></li>");
				}
				else{
					var li = $("<li did="+data[i].id+" mid="+data[i].mid+">"+data[i].name+"</li>");
					li.append("<span class='add glyphicon glyphicon-cog' did="+data[i].id+" mid="+data[i].mid+" name="+data[i].name+" score="+data[i].score+"></span>");

				}
    			ul.append(li);
    		}
    		LI.append(ul);

    		$(".moralButton").click(function(){
				var id = $(this).parent().attr("did");
				var sc = $(this).parent().attr("sc");
				$("#did-in-modal").html(id);
				$("#prizeScore").val(sc);
				$("#prizeName").val("");
			})
    	},
    	error:function(){
    		alert("error");
    	}
    })
}

//绑定德育分子层切换，如果有子层就收起或者隐藏
//否则通过自身的did查询是否有下一层
function clickLi(){
	$(document).on("click","#ul_Moral ul li",function(){
		 var mid = $(this).attr("did");
	     if($(this).children().length>1){
	    	$(this).children("ul").toggle(400);
	     }
	     else{
	    	getMoralByMid(mid,this);
	     }
		 return false;
	})
}
clickLi();


