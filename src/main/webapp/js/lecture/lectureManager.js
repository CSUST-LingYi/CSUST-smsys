		//转化为标准日期
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

		//显示某班级某学生关于讲座报名情况的信息
		function showStudents(pn,pa){
			var bj = document.getElementById("bj").value;
			var xn = document.getElementById("xn").value;
			var zy = document.getElementById("zy").value;
			var nj = document.getElementById("nj").value;
			if(zy==0){
				pa = 50;
			}
			else{
				pa = 20;
			}
			if(zy==0&&bj!=0){
				alert("请输入该班级对应的专业！");
			}
			else{
			$.ajax({
			type:"post",
			url:"../lecture/registrationCount",
            data:{
            	"classNo":bj,
            	"xuenian":xn,
            	"nianji":nj,
            	"major":zy,
            	"start":pn,
            	"end":pa
            },
            dataType:"json",
            success:function(data){
            	
            	console.log(data);
            	var table = $("#showStudents tbody");
            	table.html("");
            	for (var i=0; i<data.list.length; i++) {
            		var tr=$("<tr></tr>");
            		tr.append("<td>"+data.list[i].studentName+"</td>");
            		tr.append("<td>"+data.list[i].studentNo+"</td>");
            		tr.append("<td>"+data.list[i].sex+"</td>");
            		tr.append("<td>"+data.list[i].num+"</td>");
            		tr.append("<td><button class='btn-primary' onclick='showMore("+data.list[i].studentNo+","+xn+")'>查看详情</button></td>");
            	    table.append(tr);
            	}
            	
            	var pageNow = data.pageNum;
            	var pageTotal = data.pages;
	    				 var total  = data.total;
            	var ul =$("#page2");
      				ul.html(" ");
      			
       var prePage = $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>上一页</span>"))); 
       ul.append(prePage);
        if(data.hasPreviousPage == false){     	        	 	         	
	     	        	 	         	prePage.addClass("disabled");
	     	        	 	          }else{
	     	        	 	           
	     	        	 	           prePage.click(function(){
	     	        	 	        	   showStudents(pageNow-1,pa);
	     	        	 	           })
	     	        	 	          }
	   
     $.each(data.navigatepageNums,function(index,item){
	     	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	     	        	 	         	if(pageNow == item){
	     	        	 	         		numli.addClass("active");
	     	        	 	         	}
	     	        	 	         	  numli.click(function(){
	     	        	 	         		  showStudents(item,pa); 
	     	        	 	         	  })
	     	        	 	              ul.append(numli); 
	     	        	 	         })
     
       var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>下一页</span>")));  
     if(data.hasNextPage == false){
	     	        	 	          	  nextPage.addClass("disabled");
	     	        	 	          	  
	     	        	 	            }else{
	     	        	 	              nextPage.click(function(){
	     	        	 	              	showStudents(pageNow+1,pa);
	     	        	 	              })
	     	        	 	             
	     	        	 	            }
	    ul.append(nextPage);
	    
            },
            error:function(){
            	alert("名单显示出错，请稍后重试");
            }
		});
		}
		}	
		
		//显示某学生报名讲座的详情
		function showMore(sno,xn){
			document.getElementById("showStudentLectures").style.display = "";
			document.getElementById("SearchStudents").style.display = "none";
			xn = document.getElementById("xn").value;
			
			$.ajax({
				type:"get",
				url:"../lecture/getStudentLectures",
				data:{					
					"studentNo":sno
				},
				dataType:"json",
				success:function(data){
					//console.log(data);
					//console.log(data.length);
					var table = $("#showOne tbody");
					table.html("");
					var count = 0;
					//parent.document.getElementById("thisXuenian").innerHTML = xn;
					for (var i=0;i<data.length;i++) {
						if(data[i].xuenian == xn){
						var tr = $("<tr></tr>");
						tr.append("<td>"+xn+"</td>");
						tr.append("<td>"+data[i].title+"</td>");
						tr.append("<td>"+data[i].speaker+"</td>");
						tr.append("<td>"+data[i].holdTime+"</td>");
						tr.append("<td>"+data[i].location+"</td>");
						table.append(tr);
						count++;
					}
					}
					//console.log(count);
					if(count != data.length){
					var tr = $("<tr></tr>");
					tr.append("<td colspan='5'>非本学年报名的讲座如下</td>");
					table.append(tr);
					for (var i=0;i<data.length;i++) {
						if(data[i].xuenian != xn){
						var tr = $("<tr></tr>");
						tr.append("<td>"+data[i].xuenian+"</td>");
						tr.append("<td>"+data[i].title+"</td>");
						
						tr.append("<td>"+data[i].speaker+"</td>");
						tr.append("<td>"+data[i].holdTime+"</td>");
						tr.append("<td>"+data[i].location+"</td>");
						table.append(tr);
					  }
					 }
					}
				},
				error:function(){
					alert("显示详情出错，请稍后重试");
				}
			});
		}
		
		//显示某讲座报名名单
		function showEntryList(lid){
			document.getElementById("SearchTalk").style.display = "none";
      		document.getElementById("PostTalk").style.display = "none";
      		document.getElementById("ModifyTalk").style.display = "none";
      		document.getElementById("blockchoice").style.display = "none";
      		document.getElementById("EntryList").style.display = "";
			$.ajax({
			type:"get",
			url:"../lecture/getRegistraTionByLid",
			//url:"http://231818t30f.51mypc.cn/comparsion/lecture/getRegistraTionByLid",
            data:{
            	"lid":lid
            },
            dataType:"json",
            success:function(data){
         	    console.log(data);
         	    var table = $("#entryList tbody");
            	table.html(" ");
         	    if(data==""){
         	    	table.html(" ");
         	    	alert("暂时还没有人报名，请稍后在查看");
         	    }
         	    else{           	
            	parent.document.getElementById("title2").innerHTML = data[0].title;
            	parent.document.getElementById("thisLid").innerHTML = lid;
            	for(var i=0;i<data.length;i++){
            		var tr = $("<tr></tr>");
            		tr.append("<td>"+data[i].studentName+"</td>"+"<td >"+data[i].studentNo+"</td>"+"<td>"+data[i].sex+"</td>"+"<td>"+data[i].termYear+"</td>"+"<td>"+data[i].major+"</td>"+"<td>"+data[i].status+"</td>")           	                 
            	  tr.append('<td><button class="btn btn-primary btn-sm" onclick="updateSign('+data[i].studentNo+','+lid+')">修改签到状态</button></td>');
            	  table.append(tr);
            	}
            	
            	}
            },
            error:function(){
            	alert("报名名单显示出错，请稍后重试");
            }
		});
		}			
		
		//通过id查询讲座
		function searchLectureById(id){	
			document.getElementById("pri").style.display = "none";			
     		document.getElementById("SearchTalk").style.display = "none";
      		document.getElementById("PostTalk").style.display = "none";
      		document.getElementById("ModifyTalk").style.display = "block";
      		document.getElementById("blockchoice").style.display = "none";
      		document.getElementById("EntryList").style.display = "none";
		$.ajax({
			type:"get",
			url:"../lecture/getLecture",
            data:{
            	"id":id
            },
            dataType:"json",
            success:function(data){
            	console.log(data);
          var mydate = new Date(data.deadlineTime).format('yyyy-MM-dd hh:mm');	
         		parent.document.getElementById("mylid").value = id;
     			parent.document.getElementById("title1").value = data.title;
     			parent.document.getElementById("priority").value = data.priority;
     			parent.document.getElementById("xuenian1").value = data.xuenian;
     			parent.document.getElementById("holdTime1").value = data.holdTime;
     			parent.document.getElementById("location1").value = data.location;
     			parent.document.getElementById("speaker1").value = data.speaker;
     			parent.document.getElementById("publisher1").value = data.publisher;
     			parent.document.getElementById("deadlineTime1").value = mydate;
     			parent.document.getElementById("limitNumber1").value = data.limitNumber;
     		//	parent.document.getElementById("imagePath1").value = data.imagePath;
     			parent.document.getElementById("introduction3").value = data.speakerIntroduction;
     			parent.document.getElementById("introduction4").value = data.introduction;
           },
            error:function(){
            	alert("未找到该讲座信息！");
            }
		});
		}
				
		//修改讲座签到状态
		function updateSign(sno,lid){
			$.ajax({
			type:"get",
			url:"../lecture/getRegistraTionByLid",
            data:{
            	"lid":lid
            },
            dataType:"json",
            success:function(data){
            	var sta;
            	for(var i=0;i<data.length;i++){
            		if(data[i].studentNo==sno){
            			sta = data[i].status;
            		}
            	}
            	if(sta == "已报名"){
            		sta = "未签到";
            	}
            	else if(sta == "未签到"){
            		sta = "已报名";
            	}
            	$.ajax({
					type:"post", // get传递中文会乱码								
					url:"../lecture/changeStatusByLidAndSno",
        		    data:{
       		     	"lid":lid,
       		     	"status":sta,           	
          		  "studentNo":sno
          		  },
		            dataType:"text",
    		        success:function(data){
            			alert("修改成功");
            			showEntryList(lid);
            		},
 		    	       error:function(){
    		        	alert("修改签到出错，请稍后重试");
          	  }
							});
            }
		});		
		}	
		
	  //修改讲座优先级
	  function updatePriority(){
	  	var id = document.getElementById("mylid").value;
	  	var priority = document.getElementById("priority").value;  
	  	
	  	$.ajax({
	  		type:"post",
	  	url:"../lecture/setLecturePriority",
			 data:{
			 	"id":id,
			 	"priority":priority
			 },
			 dataType:"text",
			  success:function(data){
            	console.log(data);
            	alert("修改成功");
            },
            error:function(){
            	alert("修改优先级出错，请稍后重试");
            }	 
	  	});
	  }
	  
	  //显示修改讲座优先级
	  function showUpdatePriority(){
	  	document.getElementById("pri").style.display = "";
	  }
	  
	  //查询精品讲座
	  function searchFineLecture(){
	  	document.getElementById("mylectures").style.display = "block";
		document.getElementById("mylectures1").style.display = "none";
	  	document.getElementById("mylectures2").style.display = "none";
	  	
	  	$.ajax({
			type:"get",
			 url:"../lecture/getLectureByPriority",
            dataType:"json",
            success:function(data){
            	console.log(data);
            	var table = $("#lectureMessage tbody");
     			table.html(" ");  
     			//$("#mylectures").html(" ");
            	for(var i =0;i<data.length;i++){ 			
   			 	var mydate = new Date(data[i].deadlineTime).format('yyyy-MM-dd hh:mm'); // 转换为标准日期
	  			var tr = $("<tr style='display:none'></tr>");
     			tr.append("<td>讲座id</td>"+"<td>"+data[i].id+"</td>");
     			table.append(tr);
	  			var tr = $("<tr></tr>");
     			tr.append("<td>讲座主题</td>"+"<td>"+data[i].title+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>学年</td>"+"<td>"+data[i].xuenian+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座时间</td>"+"<td>"+data[i].holdTime+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>举办地点</td>"+"<td>"+data[i].location+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报告人</td>"+"<td>"+data[i].speaker+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名截止日期</td>"+"<td>"+mydate+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名人数上限</td>"+"<td>"+data[i].limitNumber+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>发布人</td>"+"<td>"+data[i].publisher+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>主讲人简介</td>"+"<td><textarea class='form-control' rows='3' style='width:100%' readonly='readonly'>"+data[i].speakerIntroduction+"</textarea></td>");
     			table.append(tr); 
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座概要</td>"+"<td><textarea class='form-control' rows='3' style='width:100%' readonly='readonly '>"+data[i].introduction+"</textarea></td>");
     			table.append(tr); 
     			var tr = $("<tr></tr>");
     			tr.append('<td><button type="button" id="showList" class="btn btn-primary btn-sm" onclick="showEntryList('+data[i].id+')">报名名单</button></td>'+'<td><button type="button" class="btn btn-primary btn-sm" onclick="searchLectureById('+data[i].id+')">修改讲座</button></td>');
     			table.append(tr);
     			}
          
            },
            error:function(){
            	alert("精品讲座显示出错，请稍后重试!");
            }
		});
	  }
	  
		//新增讲座信息
		function addLecture(){
			var xuenian=document.getElementById("xuenian").value;
			var title=document.getElementById("title").value;
			var holdTime=document.getElementById("holdTime").value;
			var lo=document.getElementById("location").value;
			var speaker=document.getElementById("speaker").value;
			var deadlineTime= new Date(Date.parse(document.getElementById("deadlineTime").value));
			var limitNumber=document.getElementById("limitNumber").value;
			var lectureIntroduction=document.getElementById("introduction1").value;
			var speakerIntroduction=document.getElementById("introduction2").value;
			var publisher=document.getElementById("publisher").value;
			//alert(xuenian);
			if(xuenian==""){
				alert("请输入学年");
			}
			else if(title=="") alert("请输入讲座主题");
			else if(title==""||holdTime==""||lo==""||speaker==""||deadlineTime==""||limitNumber==""||lectureIntroduction==""||speakerIntroduction==""||publisher=="") alert("请输入全部讲座信息");
			else if($("#imagePath")[0].files[0].size>512000) {alert('图片太大，限制大小为500KB');return false;}
			else{
			var newLecture = new FormData();
			
			newLecture.append('xuenian',xuenian);
			newLecture.append('title',title);
			newLecture.append('holdTime',holdTime);
			newLecture.append('location',lo);   // 出现过单词错误
			newLecture.append('speaker',speaker);
			newLecture.append('deadlineTime',deadlineTime);
			newLecture.append('limitNumber',limitNumber);
			newLecture.append('speakerIntroduction',speakerIntroduction);
			newLecture.append('introduction',lectureIntroduction);  // 漏传一个参数
			newLecture.append('publisher',publisher);
			newLecture.append('image',$("#imagePath")[0].files[0]);	 //传递图片本身	
			$.ajax({
				type:"post",
				url:"../lecture/addLecture",
	            data:newLecture,
	            dataType:"text",
	            cache:false,// 上传文件无需缓存
	            processData:false,//对data参数进行序列化处理
	            contentType:false,//必须
	            success:function(data){
	            	console.log(data);
	            	alert("发布成功");
	            },
	            error:function(){
	            	alert("发布出错，请稍后重试");
	            }
			});
		}
		}
	
	 	 //查询所有讲座信息
		function searchLecture(pn,pa){	
		document.getElementById("mylectures").style.display = "none";
		document.getElementById("mylectures1").style.display = "none";
	  	document.getElementById("mylectures2").style.display = "block";
	  	
		$.ajax({
			type:"get",
			url:"../lecture/getLectureByPage",
            async: true,
            data:{
            	"start":pn,
            	"end":pa
            },
            dataType:"json",
            success:function(data){
            	console.log(data);
            	if(data == '' || data == null) {
						alert('暂无讲座信息');
						return;
					}	
				var bigdiv = $("#mylectures2")
				var div = $("#myOne");		
         		//var t= $("#otherLectureMessage");
        		//t.html("");
        		div.html(" ");
     			for(var i =0;i<data.list.length;i++){
     			var mydate = new Date(data.list[i].deadlineTime).format('yyyy-MM-dd hh:mm'); // 转换为标准日期
     			var adiv = $("<div id='myOneLecture'></div>");
     			var table = $("<table class='table table-bordered' id='mytable' ></table>");  
     			var thead = $("<thead></thead>");
     	    	var tr=$("<tr ></tr>");
     	    	tr.append('<th style="text-align: center;width: 180px;">讲座信息</th><th style="text-align: center;">详情</th>');
     			thead.append(tr);
     			table.append(thead);
     			var tbody = $("<tbody></tbody>");
     			var tr = $("<tr style='display:none'></tr>");
     			tr.append("<td>讲 座id</td>"+"<td>"+data.list[i].id+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座主题</td>"+"<td>"+data.list[i].title+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>学年</td>"+"<td>"+data.list[i].xuenian+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座时间</td>"+"<td>"+data.list[i].holdTime+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>举办地点</td>"+"<td>"+data.list[i].location+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报告人</td>"+"<td>"+data.list[i].speaker+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名截止日期</td>"+"<td>"+mydate+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名人数上限</td>"+"<td>"+data.list[i].limitNumber+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>发布人</td>"+"<td>"+data.list[i].publisher+"</td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>主讲人简介</td>"+"<td><textarea class='form-control' rows='3' style='width:100%'>"+data.list[i].speakerIntroduction+"</textarea></td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座概要</td>"+"<td><textarea class='form-control' rows='3' style='width:100%'>"+data.list[i].introduction+"</textarea></td>");
     			tbody.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append('<td><button type="button" id="showList" class="btn btn-primary btn-sm" onclick="showEntryList('+data.list[i].id+')">报名名单</button></td>'+'<td><button type="button" class="btn btn-primary btn-sm" onclick="searchLectureById('+data.list[i].id+')">修改讲座</button></td>');
     			tbody.append(tr); 
     			table.append(tbody);
     			adiv.append(table);
     			div.append(adiv);
     			}
				bigdiv.append(div);
     			var pageNow = data.pageNum;
            	var pageTotal = data.pages;
	    		var total  = data.total;
            	var ul =$("#mypage");
      			ul.html(" ");
      			
       var prePage =   $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>上一页</span>"))); 
       ul.append(prePage);
        if(data.hasPreviousPage == false){     	        	 	         	
	     	        	 	         	prePage.addClass("disabled");
	     	        	 	          }else{
	     	        	 	           
	     	        	 	           prePage.click(function(){
	     	        	 	        	   searchLecture(pageNow-1,pa);
	     	        	 	           })
	     	        	 	          }
	   
     $.each(data.navigatepageNums,function(index,item){
	     	        	 	         	var numli = $("<li></li>").append($("<a></a>").append(item)); 
	     	        	 	         	if(pageNow == item){
	     	        	 	         		numli.addClass("active");
	     	        	 	         	}
	     	        	 	         	  numli.click(function(){
	     	        	 	         		  searchLecture(item,pa); 
	     	        	 	         	  })
	     	        	 	              ul.append(numli); 
	     	        	 	         })
     
       var nextPage =  $("<li></li>").append($("<a></a>").attr("href","#").append($("<span>下一页</span>")));  
     if(data.hasNextPage == false){
	     	        	 	          	  nextPage.addClass("disabled");
	     	        	 	          	  
	     	        	 	            }else{
	     	        	 	              nextPage.click(function(){
	     	        	 	              	searchLecture(pageNow+1,pa);
	     	        	 	              })
	     	        	 	             
	     	        	 	            }
	    ul.append(nextPage);
	    
            },
		error: function() {
			alert("获取失败");
			
		}        	
		});
		}
		
		//通过关键字查询讲座信息
		function searchLectureBykey(){	
			var keyWord=document.getElementById("InputKeyword").value;
			if(keyWord==""){
				alert("请输入关键字");
			}
			else{
				
		$.ajax({
			type:"post",
			url:"../lecture/getLectureByKeyWord",
      	
            data:{
            	"keyWord":keyWord
            },
            dataType:"json",
            success:function(data){
            	
            	if(data.length==0){
            		alert("没用关于这个关键字的讲座信息！")
            		return;
            	}
            	console.log(data); 
            			
     			//$("#mylectures").html("");
     			if(data.length>2){
     			document.getElementById("mylectures").style.display = "none";
				document.getElementById("mylectures2").style.display = "none";
	  			document.getElementById("mylectures1").style.display = "block";
	  	
     			var div = $("#mylectures1");
            	//document.getElementById("lectureMessage").style.display = "none";
     			div.html("");
   			 for(var i =0;i<data.length;i++){ 		
   			 	
   			 	var mydate = new Date(data[i].deadlineTime).format('yyyy-MM-dd hh:mm'); // 转换为标准日期
	  			var adiv = $("<div id='myOneLecture'></div>");
     			var t = $("<table class='table table-bordered' id='mytable' ></table>");  
     			var thead = $("<thead></thead>");
     	    	var tr=$("<tr ></tr>");
     	    	tr.append('<th style="text-align: center;width: 180px;">讲座信息</th><th style="text-align: center;">详情</th>');
     			thead.append(tr);
     			t.append(thead);
     			var table = $("<tbody></tbody>");
	  			var tr = $("<tr style='display:none'></tr>");
     			tr.append("<td>讲座id</td>"+"<td>"+data[i].id+"</td>");
     			table.append(tr);
	  			var tr = $("<tr></tr>");
     			tr.append("<td>讲座主题</td>"+"<td>"+data[i].title+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>学年</td>"+"<td>"+data[i].xuenian+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座时间</td>"+"<td>"+data[i].holdTime+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>举办地点</td>"+"<td>"+data[i].location+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报告人</td>"+"<td>"+data[i].speaker+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名截止日期</td>"+"<td>"+mydate+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名人数上限</td>"+"<td>"+data[i].limitNumber+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>发布人</td>"+"<td>"+data[i].publisher+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>主讲人简介</td>"+"<td><textarea class='form-control' rows='3' style='width:100%' readonly='readonly'>"+data[i].speakerIntroduction+"</textarea></td>");
     			table.append(tr); 
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座</td>"+"<td><textarea class='form-control' rows='3' style='width:100%' readonly='readonly'>"+data[i].introduction+"</textarea></td>");
     			table.append(tr); 
     			var tr = $("<tr></tr>");
     			tr.append('<td><button type="button" id="showList" class="btn btn-primary btn-sm" onclick="showEntryList('+data[i].id+')">报名名单</button></td>'+'<td><button type="button" class="btn btn-primary btn-sm" onclick="searchLectureById('+data[i].id+')">修改讲座</button></td>');     			
     			table.append(tr);
     			t.append(table);
     			adiv.append(t);
     			div.append(adiv);
   			 }
   			 }
     		  else{
     		  	document.getElementById("mylectures").style.display = "block";
				document.getElementById("mylectures2").style.display = "none";
	  			document.getElementById("mylectures1").style.display = "none";
     		  	var table = $("#lectureMessage tbody");
     			table.html(" ");  
     						
     		  	for(var i =0;i<data.length;i++){ 		
   			 	
   			 	var mydate = new Date(data[i].deadlineTime).format('yyyy-MM-dd hh:mm'); // 转换为标准日期
	  			
	  			var tr = $("<tr style='display:none'></tr>");
     			tr.append("<td>讲座id</td>"+"<td>"+data[i].id+"</td>");
     			table.append(tr);
	  			var tr = $("<tr></tr>");
     			tr.append("<td>讲座主题</td>"+"<td>"+data[i].title+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>学年</td>"+"<td>"+data[i].xuenian+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座时间</td>"+"<td>"+data[i].holdTime+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>举办地点</td>"+"<td>"+data[i].location+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报告人</td>"+"<td>"+data[i].speaker+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名截止日期</td>"+"<td>"+mydate+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>报名人数上限</td>"+"<td>"+data[i].limitNumber+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>发布人</td>"+"<td>"+data[i].publisher+"</td>");
     			table.append(tr);
     			var tr = $("<tr></tr>");
     			tr.append("<td>主讲人简介</td>"+"<td><textarea class='form-control' rows='3' style='width:100%' readonly='readonly'>"+data[i].speakerIntroduction+"</textarea></td>");
     			table.append(tr); 
     			var tr = $("<tr></tr>");
     			tr.append("<td>讲座</td>"+"<td><textarea class='form-control' rows='3' style='width:100%' readonly='readonly'>"+data[i].introduction+"</textarea></td>");
     			table.append(tr); 
     			var tr = $("<tr></tr>");
     			tr.append('<td><button type="button" id="showList" class="btn btn-primary btn-sm" onclick="showEntryList('+data[i].id+')">报名名单</button></td>'+'<td><button type="button" class="btn btn-primary btn-sm" onclick="searchLectureById('+data[i].id+')">修改讲座</button></td>');     			
     			table.append(tr);
     		}	
     		  }
   			 
            },
            error:function(){
            	alert("关键字查询出错，请稍后重试");
            }
		});
		}
		}
		
				
		//删除讲座信息
		function deleteLecture(){	
			//var thisid=document.getElementById("lid").innerHTML; //获取td中的值		
			var thisid = document.getElementById("mylid").value;
			var a = confirm("删除操作不能撤回，请确认");
			if(a){
		$.ajax({
			type:"post",
			url:"../lecture/deleteLecture",
		
            data:{
            	"id":thisid
            },
            dataType:"text",
            success:function(data){
            	console.log(data);
            	alert("删除成功,即将刷新网页");
            	location.reload() 
            },
            error:function(){
            	alert("删除出错，请稍后重试");
            }
		});
		}
		}
		
		
		//修改讲座信息
		function updateLecture(){		
			var xuenian=document.getElementById("xuenian1").value;
			var title=document.getElementById("title1").value;
			var holdTime=document.getElementById("holdTime1").value;
			var lo=document.getElementById("location1").value;
			var speaker=document.getElementById("speaker1").value;
			var deadlineTime= new Date(Date.parse(document.getElementById("deadlineTime1").value));
			var limitNumber=document.getElementById("limitNumber1").value;
			var lectureIntroduction=document.getElementById("introduction4").value;
			var speakerIntroduction=document.getElementById("introduction3").value;
			var publisher=document.getElementById("publisher1").value;
			var lid = document.getElementById("mylid").value;
			//var priority = document.getElementById("priority").value;
			
			var newLecture = new FormData();
			newLecture.append('id',lid);
			newLecture.append('xuenian',xuenian);
			newLecture.append('title',title);
			newLecture.append('holdTime',holdTime);
			newLecture.append('location',lo);   // 出现过单词错误
			newLecture.append('speaker',speaker);
			newLecture.append('deadlineTime',deadlineTime);
			newLecture.append('limitNumber',limitNumber);
			newLecture.append('speakerIntroduction',speakerIntroduction);
			newLecture.append('introduction',lectureIntroduction);  // 漏传一个参数
			newLecture.append('publisher',publisher);
			//newLecture.append('priority',priority);
			
		$.ajax({
			type:"post",
			url:"../lecture/updateLecture",
			//url:"http://231818t30f.51mypc.cn/comparsion/lecture/updateLecture",

            data:newLecture,
            dataType:"text",
            cache:false,// 上传文件无需缓存
            processData:false,//对data参数进行序列化处理
            contentType:false,//必须
            success:function(data){
            	alert("修改成功");
            	searchLectureById(lid);
            },
            error:function(){
            	alert("修改出错，请稍后重试");
            }
		});
		}
    
    // 显示与隐藏不同的div
 	$(function(){
        		$("#SearchTalkBtn").click(function(){
        			$("#SearchTalk").show();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#blockchoice").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})
        		$("#PostTalkBtn").click(function(){
        			$("#SearchTalk").hide();
        			$("#PostTalk").show();
        			$("#ModifyTalk").hide();
        			$("#blockchoice").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})
        		$("#SearchClass").click(function(){
        			$("#SearchStudents").show();
        			$("#SearchTalk").hide();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#blockchoice").hide();
        			$("#EntryList").hide();
        		})
        		/*$("#ModifyTalkBtn").click(function(){
        			$("#SearchTalk").hide();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").show();
        			$("#blockchoice").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})*/
        		$("#Back1").click(function(){
        			$("#blockchoice").show();
        			$("#SearchTalk").hide();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})
        		$("#Back5").click(function(){
        			$("#blockchoice").show();
        			$("#SearchTalk").hide();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})
        		$("#Back2").click(function(){
        			$("#blockchoice").show();
        			$("#SearchTalk").hide();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})
        		$("#Back3").click(function(){
        			$("#blockchoice").hide();
        			$("#SearchTalk").show();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})
        		$("#Back6").click(function(){
        			$("#blockchoice").hide();
        			$("#SearchTalk").show();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").hide();
        		})
        		$("#Back4").click(function(){
        			$("#blockchoice").hide();
        			$("#SearchTalk").hide();
        			$("#PostTalk").hide();
        			$("#ModifyTalk").hide();
        			$("#EntryList").hide();
        			$("#SearchStudents").show();
        			$("#showStudentLectures").hide();
        		})
        	})
 	 
 	//清除发布讲座信息
    function myclear(){
    	    parent.document.getElementById("title").value = " ";
     			parent.document.getElementById("xuenian").value = " ";
     			parent.document.getElementById("holdTime").value = " ";
     			parent.document.getElementById("location").value = " ";
     			parent.document.getElementById("speaker").value = " ";
     			parent.document.getElementById("publisher").value = " ";
     			parent.document.getElementById("deadlineTime").value = " ";
     			parent.document.getElementById("limitNumber").value = " ";
     			parent.document.getElementById("introduction1").value = " ";
     			parent.document.getElementById("introduction2").value = " ";
          
    }
    
    // 表单提交，导出excel名单
   function exportExcel(){
   	    
   	    var lid = document.getElementById("thisLid").innerHTML;
   	  
    	$("#lectureLid").val(lid);

    	$("#exportExcel").submit();
    }
