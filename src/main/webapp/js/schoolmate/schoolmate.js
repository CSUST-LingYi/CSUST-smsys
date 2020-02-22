
//用表格显示数据
function showSchoolmates(data){
	     var table = $("#tb tbody");
			table.html(" ");
			for (var i = 0; i < data.length; i++) {
				var tr = $("<tr></tr>");  // 注意<tr>闭合，避免出现排版错误
				tr.append("<td>"+data[i].name+"</td>");	
				//tr.append("<td>"+data[i].faculty+"</td>");
				tr.append("<td>"+data[i].major+"</td>");
				tr.append("<td>"+data[i].termYear+"</td>");
				tr.append("<td>"+data[i].graduationYear+"</td>");
				tr.append("<td>"+data[i].alumniAssociation+"</td>");
				tr.append("<td>"+data[i].alu_position+"</td>");
				tr.append("<td>"+data[i].area+"</td>");
				tr.append("<td>"+data[i].workUnit+"</td>");
				//tr.append("<td>"+data[i].department+"</td>");
				tr.append("<td>"+data[i].position+"</td>");
				tr.append("<td>"+data[i].phone+"</td>");
				tr.append("<td>"+data[i].email+"</td>");
				tr.append("<td>"+data[i].wechatId+"</td>");
				tr.append("<td>"+data[i].qq+"</td>");
				tr.append("<td>"+data[i].bz+"</td>");
				tr.append('<td><input type="button" name="edit"  class="btn btn-default btn-xs edit" value="编辑" onclick="showUpdate('+data[i].id+',this)" />'+'<input type="button" name="del" value="删除"  class="btn btn-default btn-xs del" onclick="Delete('+data[i].id+',this)"/></td>');
				table.append(tr);
			}
}

var k_counts = 0;
//关键字查询校友信息
function SearchByKey(pn,pa){
	var key = document.getElementById("keyword").value;
	if(key==""){
		alert("暂无输入的关键字，您可以输入相关姓名，地区，专业，毕业年份，所属校友会等信息");
		return ;
	}
	$("#major").find("option:first").prop("selected",true);
	$("#area").find("option:first").prop("selected",true);
	$("#graduationYear").find("option:first").prop("selected",true);
	$.ajax({
		type:"post",
		url:"../teacher/getSchoolmatesByLike",
		async:false,
		data:{
			"condition":key,
			"pn":pn,
			"pa":pa
		},
		dataType:"json",
		success:function(data){
			console.log(data);
			
			if(data.list.length==0){
		        alert("暂无有关 "+key+" 的相关校友信息，请确认该关键字是否合理!"); 
		        return;
			}
			showSchoolmates(data.list);
			var pageNow = data.pageNum;
            var pageTotal = data.pages;
	    	var total  = data.total;
            var ul =$("#page");
      		ul.html(" ");
      			
       var prePage = $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>上一页</span>"))); 
       ul.append(prePage);
        if(data.hasPreviousPage == false){     	        	 	         	
	     	        	 	         	prePage.addClass("disabled");
	     	        	 	          }else{
	     	        	 	           
	     	        	 	           prePage.click(function(){
	     	        	 	        	   SearchByKey(pageNow-1,pa);
	     	        	 	           })
	     	        	 	          }
	   
     $.each(data.navigatepageNums,function(index,item){
	     	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	     	        	 	         	if(pageNow == item){
	     	        	 	         		numli.addClass("active");
	     	        	 	         	}
	     	        	 	         	  numli.click(function(){
	     	        	 	         		  SearchByKey(item,pa); 
	     	        	 	         	  })
	     	        	 	              ul.append(numli); 
	     	        	 	         })
     
       var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>下一页</span>")));  
     if(data.hasNextPage == false){
	     	        	 	          	  nextPage.addClass("disabled");
	     	        	 	          	  
	     	        	 	            }else{
	     	        	 	              nextPage.click(function(){
	     	        	 	              	SearchByKey(pageNow+1,pa);
	     	        	 	              })
	     	        	 	             
	     	        	 	            }
	    ul.append(nextPage);
     	k_counts = data.total;

		},
		error:function(){
			alert("关键字查询失败，请稍后重试！");
		}
	});

}

var counts;

//查询某些校友信息
function SearchSome(pn,pa){

	pa = 10;
	var major = document.getElementById("major").value;
	//var termYear = document.getElementById("graduationYear").value;
	//var faculty = document.getElementById("collegeList").value;
	var graduationYear = document.getElementById("graduationYear").value;
	var ar = document.getElementById("area").value;
	 parent.document.getElementById("keyword").value = "";
	$.ajax({
		type:"post",
		url:"../teacher/getSchoolmates",
		async:false,
		data:{
			"major":major,
			//"termYear":termYear,
			//"faculty":faculty,
			"graduationYear":graduationYear,
			"area":ar,
			"pn":pn,
			"pa":pa
		},
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data.list.length==0){
				alert("该条件下，没有校友信息，请重新选择条件！");
				return ; 
			}
			showSchoolmates(data.list);
			var pageNow = data.pageNum;
            var pageTotal = data.pages;
	    	var total  = data.total;
            var ul =$("#page");
      		ul.html(" ");
      			
       var prePage = $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>上一页</span>"))); 
       ul.append(prePage);
        if(data.hasPreviousPage == false){     	        	 	         	
	     	        	 	         	prePage.addClass("disabled");
	     	        	 	          }else{
	     	        	 	           
	     	        	 	           prePage.click(function(){
	     	        	 	        	   SearchSome(pageNow-1,pa);
	     	        	 	           })
	     	        	 	          }
	   
     $.each(data.navigatepageNums,function(index,item){
	     	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	     	        	 	         	if(pageNow == item){
	     	        	 	         		numli.addClass("active");
	     	        	 	         	}
	     	        	 	         	  numli.click(function(){
	     	        	 	         		  SearchSome(item,pa); 
	     	        	 	         	  })
	     	        	 	              ul.append(numli); 
	     	        	 	         })
     
       var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>下一页</span>")));  
     if(data.hasNextPage == false){
	     	        	 	          	  nextPage.addClass("disabled");
	     	        	 	          	  
	     	        	 	            }else{
	     	        	 	              nextPage.click(function(){
	     	        	 	              	SearchSome(pageNow+1,pa);
	     	        	 	              })
	     	        	 	             
	     	        	 	            }
	    ul.append(nextPage);
	   	counts = data.total;
		},
		error:function(){
			alert("查询失败，请稍后重试！");
		}
	});
}

//删除某个校友信息
function Delete(id,obj){
	var flag = confirm("删除操作无法恢复，请确认！");
	if(flag){
	$.ajax({
		type:"get",
		url:"../teacher/deleteSchoolmate",
		async:true,
		data:{
			"id":id
		},
		dataType:"text",
		success:function(data){
			console.log(data);
			alert("删除成功");
		var parent = $(obj).parent().parent();
	
		parent.remove();
		},
		error:function(){
			alert("删除失败，请稍后重试！");
		}
	});
	}
}

//新增一个校友信息
function Add(){
	//前台显示
	/*var infoBox ={};
	var addInfo = document.getElementsByClassName("add");
	var title =document.getElementById("addInfo").getElementsByTagName("label");
	for(var i=0;i<addInfo.length;i++){
		//console.log(addInfo[i].value+"==="+title[i].innerHTML);
			infoBox[title[i].innerHTML]=addInfo[i].value;
	}
	if(isEmptyValue(infoBox)){
		alert("请输入内容");
	}else{
	
	//console.log(infoBox);
	var tbObj = document.getElementById("show_tbody");
	var trObj = document.createElement("tr");
	tbObj.appendChild(trObj);
	var arr = Object.keys(infoBox); 
	
	for(var k=0;k<arr.length;k++){
		var tdObj =document.createElement("td");
		trObj.appendChild(tdObj);
		tdObj.innerText = infoBox[arr[k]];
	}
	var tdButtonObj = document.createElement("td");
	var buttonObj = document.createElement("input");
	buttonObj.type="button";
	buttonObj.className="edit btn btn-default btn-xs"
	buttonObj.value="编辑";
	buttonObj.onclick = function(){
		editInfo(this);
		
	};
	var buttonObj2 = document.createElement("input");
	buttonObj2.type="button";
	buttonObj2.className="del btn btn-warning btn-xs";
	buttonObj2.value="删除";
	buttonObj2.style.marginLeft = "5px";
	buttonObj2.onclick = function(){
			del(this);
	};
	trObj.appendChild(tdButtonObj);
	tdButtonObj.appendChild(buttonObj);
	tdButtonObj.appendChild(buttonObj2);
	alert("添加成功");
	$("#add").modal('hide');*/

	//后台增加
	var name = document.getElementById("addUserName").value;
	var username = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证名字合法性的正则表达式
	if(!username.test(name)){
		alert("请输入合法的姓名！");
		return ; 
	}
	
	var termYear = document.getElementById("addTerm").value;
	//var faculty = document.getElementById("addCollege").value;
	var major = document.getElementById("addMajor").value;
	var graduationYear = document.getElementById("addYear").value;
	var workUnit = document.getElementById("addCompany").value;
	var po = document.getElementById("addJob").value;
	//var department = document.getElementById("addPart").value;
	var phone = document.getElementById("addPhoneNum").value;
	var email = document.getElementById("addEmail").value;
	var wechatId = document.getElementById("addWechatId").value;
	var bz = document.getElementById("extra").value;
	var qq = document.getElementById("addQQ").value;
	var a = document.getElementById("addArea").value;
	var alumni = document.getElementById("addAumni").value;
	var apos = document.getElementById("addA-position").value;
	
	if(termYear==""||major==""||graduationYear==""){
		alert("请尽量输入完整的个人专业，年级，毕业年份信息");
		return ; 
	}
	if(workUnit==""||po==""||alumni==""||apos==""||a==""){
		alert("请尽量输入完整的个人工作与校友会相关信息");
		return ; 
	}
	if(qq==""&&wechatId==""&&phone==""&&bz==""&&email==""){
		alert("请尽量输入完整的个人联系方式与备注");
		return ; 
	}
	$.ajax({
		type:"post",
		url:"../teacher/addSchoolmate",
		async:true,
		data:{
			"name":name,
			"alumniAssociation":alumni,
			"alu_position":apos,
			"area":a,
			"termYear":termYear,
			//"faculty":faculty,
			"major":major,
			"graduationYear":graduationYear,
			"workUnit":workUnit,
			//"department":department,
			"position":po,
			"phone":phone,
			"email":email,
			"wechatId":wechatId,
			"qq":qq,
			"bz":bz
		},
		dataType:"text",
		success:function(data){
			console.log(data);
			alert("新增成功！");
		},
		error:function(){
			alert("新增失败，请稍后重试！");
		}
	});

} // 括号匹配出现了错误

//显示某个校友信息
function showUpdate(id,obj){
	//document.getElementById("myeditModal").style.display = "block";
	$("#myeditModal").modal("show"); // bootstrap里自己封装
	var thisparent = $(obj).parent().parent();
	var tds = thisparent.children();
	parent.document.getElementById("lid").value = id;
	parent.document.getElementById("editUserName").value = tds.eq(0).html();
	parent.document.getElementById("editTerm").value = tds.eq(2).html();
	parent.document.getElementById("editMajor").value= tds.eq(1).html();
	parent.document.getElementById("editYear").value = tds.eq(3).html();
	parent.document.getElementById("editCompany").value= tds.eq(7).html();
	parent.document.getElementById("editJob").value= tds.eq(8).html();	
	parent.document.getElementById("editPhoneNum").value= tds.eq(9).html();
	parent.document.getElementById("editEmail").value= tds.eq(10).html();
	parent.document.getElementById("editWechatId").value= tds.eq(11).html();
	parent.document.getElementById("editextra").value= tds.eq(13).html();
	parent.document.getElementById("editQQ").value= tds.eq(12).html();
	parent.document.getElementById("editArea").value= tds.eq(6).html();
	parent.document.getElementById("editAumni").value= tds.eq(4).html();
	parent.document.getElementById("editA-position").value= tds.eq(5).html();
}
//更新某个校友信息
function Update(){
	var id = document.getElementById("lid").value;
	var name = document.getElementById("editUserName").value;
	var termYear = document.getElementById("editTerm").value;
	//var faculty = document.getElementById("editCollege").value;
	var major = document.getElementById("editMajor").value;
	var graduationYear = document.getElementById("editYear").value;
	var workUnit = document.getElementById("editCompany").value;
	var po = document.getElementById("editJob").value;
	//var department = document.getElementById("editPart").value;
	var phone = document.getElementById("editPhoneNum").value;
	var email = document.getElementById("editEmail").value;
	var wechatId = document.getElementById("editWechatId").value;
	var bz = document.getElementById("editextra").value;
	var qq = document.getElementById("editQQ").value;
	var a = document.getElementById("editArea").value;
	var alumni = document.getElementById("editAumni").value;
	var apos = document.getElementById("editA-position").value;
	$.ajax({
		type:"post",
		url:"../teacher/updateSchoolmate",
		async:true,
		data:{
			"id":id,
			"name":name,
			"alumniAssociation":alumni,
			"alu_position":apos,
			"area":a,
			"termYear":termYear,
			//"faculty":faculty,
			"major":major,
			"graduationYear":graduationYear,
			"workUnit":workUnit,
			//"department":department,
			"position":po,
			"phone":phone,
			"email":email,
			"wechatId":wechatId,
			"qq":qq,
			"bz":bz
		},
		dataType:"text",
		success:function(data){
			console.log(data);
			alert("修改成功,刷新后可查看修改后的信息");
		},
		error:function(){
			alert("修改失败，请稍后重试！");
		}
	});
}

//显示数据库中存在的 专业，地区，毕业年份
function showList(){
	$.ajax({
		type:"get",
		url:"../teacher/listcondition",
		async:true,	
		dataType:"json",
		success:function(data){
			//console.log(data);
			var gyears=new Array();
			var majors=new Array();
			//var facultys;
			var areas=new Array();
			for(var i = 0;i<data.length;i++){
				var flag=true;
				for(var j =0;j<gyears.length;j++){
					if(data[i].graduationYear==gyears[j])
					{flag=false;
					break;}
					else
					{flag=true;
					continue;}
				}
				if(flag)gyears.push(data[i].graduationYear);
				
				for(var j =0;j<majors.length;j++){
					if(data[i].major==majors[j])
					{flag=false;
					break;}
					else
					{flag=true;
					continue;}
				}
				if(flag)majors.push(data[i].major);
				
				/*for(var j =0;j<facultys.length;j++){
					if(data[i].faculty==facultys[j])
					{flag=false;
					break;}
					else
					{flag=true;
					continue;}
				}
				if(flag)facultys.push(data[i].faculty);*/
				
				for(var j =0;j<areas.length;j++){
					if(data[i].area==areas[j])
					{flag=false;
					break;}
					else
					{flag=true;
					continue;}
				}
				if(flag)areas.push(data[i].area);
			}
			//alert(gyears);
			//alert(areas);
			//alert(facultys);
			//alert(majors);
			var zy = $("#major");
			var dq = $("#area");
			var gt = $("#graduationYear");
			for(var i=0;i<majors.length;i++){
				var op = $("<option>"+majors[i]+"</option>");
				zy.append(op);
			}
			for(var i=0;i<areas.length;i++){
				var op = $("<option>"+areas[i]+"</option>");
				dq.append(op);
			}
			for(var i=0;i<gyears.length;i++){
				var op = $("<option>"+gyears[i]+"</option>");
				gt.append(op);
			}
		},
		error:function(){
			alert("请稍后重试！");
		}
	});
}

$(function(){

	showList();

	SearchSome();

	$(document).on("click","#search_btn",function () {
		SearchSome();
		alert("已为找到"+counts+"条记录");
    });

    $(document).on("click","#search_key_btn",function () {
        SearchByKey();
        alert("已为找到"+k_counts+"条记录");
    });
})
