

//查看个人的申请修改信息的审核状态
$(function(){
	function apply(){
		$("#apply").click(function(){
			 $("#alertInfo").modal({
			       backdrop:"static",
		         })
		                 var studentNo = $("#studentNo1").val();
		         	    	$.ajax({
				    		url:"getAlertStudentInfo",
				    		type:'get',
				    		dataType:"json",
				    		data:{"studentNo":studentNo},
				    		scriptCharset: 'utf-8',
				    		success:function(data){
				    			if(data[0]==null){
				    				alert("无申请记录");
				    			}else{
				    				 $("#delete").attr("stuNo",data[0].studentNo);
						    		 //审核状态
						    		 var status = data[0].status;
						    		 switch(status){
						    		 case 0:$("#status").html("(未审核)");break;
						    		 case 1:$("#status").html("(已审核通过)");break;
						    		 case 2:$("#status").html("(审核未通过)");break;
						    		 }
						    		//	alert(data);//data[0]为修改后的数据，data[1]为修改前的数据
						     		 $("#after_no").html(data[0].studentNo);
						    		 $("#after_name").html(data[0].studentName);
						    		 $("#after_termYear").html(data[0].termYear);
						    		 $("#after_major").html(data[0].major);
						    		 
						             switch(data[0].className){
						             case  10:var cla = '会计金融双学位班';break;
						             case  11:var cla = '卓越会计师班';break;
						             case  12:var cla = '中法班';break;
						             default: var cla=data[0].className;
						         }	
						    		 
						    		 $("#after_className").html(cla);
						    		 $("#after_sex").html(data[0].sex);
						    		 $("#after_birthday").html(data[0].birthday);
						    		 $("#after_mz").html(data[0].mz);
						    		 $("#after_zzmm").html(data[0].zzmm);
						    		 $("#after_jg").html(data[0].jg);
						    		 $("#after_personID").html(data[0].personID);
						    		 $("#after_phone").html(data[0].phone);
						    		 $("#after_QQ").html(data[0].qq);
						    		 $("#after_fatherName").html(data[0].fatherName);
						    		 $("#after_fatherPhone").html(data[0].fatherPhone);
						    		 $("#after_fatherWorkplace").html(data[0].fatherWorkplace);
						    		 $("#after_motherName").html(data[0].motherName);
						    		 $("#after_motherPhone").html(data[0].motherPhone);
						    		 $("#after_motherWorkplace").html(data[0].motherWorkplace);
						    		 $("#after_address").html(data[0].address);
						    		 $("#after_buildingName").html(data[0].buildingName);
						    		 $("#after_roomNum").html(data[0].roomNum);
						    		 $("#after_bedNum").html(data[0].bedNum);
						    		 $("#after_tc").html(data[0].tc);
						    		 $("#after_sfps").html(data[0].sfps);
						    		 $("#after_studyType").html(data[0].studyType);
				    			}
				    		
				             
				    		 
				    		}
				    	})

		})
	}
	apply();
		$("#delete").click(function(){
			 var studentNo = $(this).attr("stuNo");
			 if(studentNo=="00"){
				 alert("无申请记录");
			 }else
			 {$("#delete").attr("disabled", true); 
		         $.ajax({
	    	    	   url:"deleteAlertStudent",
	    	   	       type:"post",
	    	   	       dataType:"text",
	    	    	   data:{"studentNo":studentNo},
	    	    	   scriptCharset: 'utf-8',
	    	    	   success:function(data){
	    	    		   alert("删除成功");	$("#delete").attr("disabled", false); 
	    	    		 
	    	    	   }
	    	       })
			 }
     
		})
})


//文件下载功能
$(function(){
	$("#file_download").click(function(){
	//	alert();
		$("#fileName_list").slideToggle(500); 
		var stuType = "本科生";
	$.ajax({
		 url:"listFile",
		   type:"post",
		   data:{"stuType":stuType},
  	       dataType:"json",
  	       scriptCharset: 'utf-8',
  	       success:function(data){
  	    	   //查询后添加<li>标签
  	    	   var ul = $("#fileName_list");
  	    	       ul.html(" ");
  	    	   for(var i = 0;i<data.length;i++){
  	    	   var li = $("<li><span class='fileName_li'>"+data[i].fileName+"</span></li>")
  	    	        li.css("margin","10px");
  	    	   ul.append(li);
  	    	   }
  	    	   
  	    	   //鼠标经过li的时候li变蓝色
  	    	   $(".fileName_li").mouseenter(function(){
  	    		   $(this).css("color","blue");
  	    	   })
  	    	   //鼠标离开时变黑色
  	    	   $(".fileName_li").mouseleave(function(){
  	    		   $(this).css("color","black");
  	    	   })
  	    	   
  	    	   //文件下载
  	    	$(".fileName_li").click(function(){

  	 		     var url="downloadFile";//下载文件url

  	 		     $("#fileForm").attr('action',url);
  	 		
  	 		     $("#fileName").val($(this).html());

  	 		     $("#fileForm").submit();

  	 	    });
  	       }
	})
		
	})
})




//学生页面的功能模块实现（save按钮依次从1到8，对应左侧导航栏的八个模块）


$(function(){
	$.ajax({
		url:"getStudentNo",
		type:"post",
		dataType:"text",
		success:function(data){
		//	alert(data);
			$("#userName").val(data);
			$("#studentNo1").val(data);
			$("#studentName").val(data);
			$("#studentNo2").val(data);
			$("#studentNo3").val(data);
			$("#studentNo4").val(data);
			$("#studentNo5").val(data);
			$("#studentNo6").val(data);
			$("#studentNo7").val(data);
			$("#studentNo8").val(data);
			$("#suserStudentNo").val(data);
			$("#update_grade_studentNo").val(data);
			$("#update_practice_studentNo").val(data);
			$("#update_pstudent_studentNo").val(data);
			$("#sno").val(data);
		}
	})
})


$("#save1").click(function(){                  //学生基本信息录入  
	var studentNo = $("#studentNo1").val();
	var studentName = $("#studentName").val();
	var termYear = $("#termYear").val();
	var major = $("#major").val();
	var className = $("#className").val();
	var sex = $("#sex").val();
	var MZ = $("#MZ").val();
	var ZZMM = $("#ZZMM").val();
	var JG = $("#JG").val();
	var personID = $("#personID").val();
	var sfps = $("#sfps").val();
	var phone = $("#phone").val();
	var QQ = $("#QQ").val();
	var fatherName = $("#fatherName").val();
	var fatherPhone = $("#fatherPhone").val();
	var motherName = $("#motherName").val();
	var motherPhone = $("#motherPhone").val();
	var address = $("#address").val();
	var buildingName = $("#buildingName").val();
	var roomNum = $("#roomNum").val();
	var bedNum = $("#bedNum").val();
	var studyType =$("#studyType").val();
	var fatherWorkplace = $("#fatherWorkplace").val();
	var motherWorkplace = $("#motherWorkplace").val();
	var TC = $("#TC").val();
	var stuType = "本科生";
	var birthday = $("#birthday").val();
	
	if(QQ.length>15){
		alert("注意不是QQ邮箱！ ");return false;
	}
	
	if(personID.length>18){
		alert("请输入正确的身份证号码！");return false;
	}
	
	if(phone.length>11 | fatherPhone.length>11 | motherPhone.length>11){
		alert("请注意手机号码的正确填写！");return false;
	}
	
	if(studentNo==""|studentName==""|termYear==""|major==""
	 |className==""|sex==""|MZ==""|ZZMM==""|JG==""|personID==""|phone==""
	 |QQ==""|fatherName==""|fatherPhone==""|motherName==""|JG==""|motherPhone==""|address==""|birthday==""
	 |buildingName==""|roomNum==""|bedNum==""|studyType==""|fatherWorkplace==""|motherWorkplace==""|TC==""
	 )
	 {alert("请填写完整信息!");}
	  else{
	
		  $("#save1").attr("disabled", true); 
	$.ajax({  url:"updateStudent",
			type:"post",
			dataType:"text",
			data:{
				"studentNo":studentNo,
				"studentName":studentName,
				"termYear":termYear,
				"major":major,
				"className":className,
				"sex":sex,
				"MZ":MZ,
				"ZZMM":ZZMM,
				"JG":JG,
				"birthday":birthday,
				"personID":personID,
				"sfps":sfps,
				"phone":phone,
				"QQ":QQ,
				"fatherName":fatherName,
				"fatherPhone":fatherPhone,
				"motherName":motherName,
				"motherPhone":motherPhone,
				"address":address,
				"buildingName":buildingName,
				"roomNum":roomNum,
				"bedNum":bedNum,
				"TC":TC,
				"fatherWorkplace":fatherWorkplace,
				"motherWorkplace":motherWorkplace,
				"stuType":stuType,
				"studyType":studyType
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				alert(data); $("#save1").attr("disabled", false); 
				document.getElementById("base").style.display="block";
 	        },
			error:function(){
				alert("执行出错，请注意信息的正确填写"); $("#save1").attr("disabled", false); 
			}
	});
	}
	//$("#cj").style.display="block";
})

$("#save2").click(function(){                  //学生成绩录入   成功
	var studentNo = $("#studentNo2").val();
	var termNo = $("#termNo").val();
	var avgGrade = $("#avgGrade").val();
	var avgCPA = $("#avgCPA").val();
	var stuType = "本科生";
	  if(isNaN(avgGrade)|isNaN(avgCPA))
		  {alert("成绩只能输入数字");}else{
	  if(studentNo==""|termNo==""|avgGrade==""|avgCPA==""|avgGrade.length>6|avgCPA>6)
	  {alert("请正确填写信息");}
	  else{
	//alert(studentNo + avgGrade + avgCPA);
		  $("#save2").attr("disabled", true); 
	$.ajax({  url:"addGrade",
			type:"post",
			dataType:"text",
			data:{
				"studentNo":studentNo,
				"termNo":termNo,
				"avgGrade":avgGrade,
				"avgCPA":avgCPA,
				"stuType":stuType
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				alert(data); $("#save2").attr("disabled", false); 
				document.getElementById("cj").style.display="block";
 	        },
			error:function(){
				alert("执行出错"); $("#save2").attr("disabled", false); 
			}
	});
	$("#cj").style.display="block";
	}
		  }
})

$(function(){
	$(".RewardName").change(function(){
		var rewardTime =$("#jl_termYear").val();
		var rewardLevel =$("#JLlevel").val();
		var stuType = "本科生";
		$.ajax({
			url:"getRewardName",
			type:"post",
			dataType:"json",
			data:{"rewardTime":rewardTime,
				"rewardLevel":rewardLevel,
				"stuType":stuType},
			scriptCharset: 'utf-8',
			success:function(data){
				$("#sponsor").val("");
				var select = $("#JLname");
				    select.html("");
				 var flag = false;   
				 var rewardNames = new Array();   
				 for(var j=0;j<data.length;j++){
					 for(var m=0;m<rewardNames.length;m++){
						 if(data[j].rewardName!=rewardNames[m]){
							 flag=false;continue;
						 }else{
							 flag=true;
						 }	 
					 }
					 if(flag==false){
						 rewardNames.push(data[j].rewardName); 
					 }
					
				 }   
				    				    
				var option=$("<option >请先选择学年和级别</option>");
				    select.append(option);
				for(var i=0;i<rewardNames.length;i++){					
					var option=$("<option value="+rewardNames[i]+"></option>");
					    option.html(rewardNames[i]);
					    select.append(option);
				}
				
				
			}
			
			
		})
	})
	
		$("#JLname").change(function(){
		var rewardTime =$("#jl_termYear").val();
		var rewardLevel =$("#JLlevel").val();
		var JLname =$("#JLname").val();
		var stuType = "本科生";
		$.ajax({
			url:"getRewardName",
			type:"post",
			dataType:"json",
			data:{"rewardTime":rewardTime,
				"rewardLevel":rewardLevel,
				"rewardName":JLname,
				"stuType":stuType
				},
			scriptCharset: 'utf-8',
			success:function(data){
				$("#sponsor").val("");
			    $("#sponsor").val(data[0].sponsor);
			}
			
			
		})
	})
	
	$("#addRewardinfo").click(function(){
		 $("#addRewardInfo").modal({
		       backdrop:"static",
	         })
	     $("#btn_addRewardinfo").click(function(){
	    	 var rewardTime = $("#add_jl_termYear").val();
	    	 var rewardLevel = $("#add_JLlevel").val();
	    	 var rewardName = $("#add_rewardName").val();
	    	 var sponsor = $("#add_sponsor").val();
	    	 var stuType = "本科生";
	    	
	    	 if(rewardName.length==0 |sponsor.length==0 |rewardName.length>25|sponsor.length>25){
	    		 alert("请填写正确信息");
	    	 }else{
	    		 $.ajax({
	    			 url:"addRewardinfo",
	    			 type:"post",
	    			 data:{"rewardTime":rewardTime,
	    				 "rewardLevel":rewardLevel,
	    				 "rewardName":rewardName,
	    				 "sponsor":sponsor,
	    				 "stuType":stuType},
	    			 dataType:"text",
	    			 scriptCharset: 'utf-8',
	    			 success:function(data){
	    				 alert(data);
	    			 }
	    			 
	    		 })
	    	 }
	     })
	})
})


$("#save3").click(function(){                       //奖励信息录入    成功
		var studentNo = $("#studentNo3").val();
		var JLname = $("#JLname").val();
		var JLlevel = $("#JLlevel").val();
		var jl_termYear = $("#jl_termYear").val();
		var sponsor = $("#sponsor").val();
		var getTime = $("#getJLTime").val();
		var adviser = $("#adviser").val();
		var termOrindividual = $("#termOrindividual").val();
		var stuType = "本科生";
		var image = $("#JLimage")[0].files[0].name;
                             
        getTime .replace(/./ig, "-");

        if(image == '')
        {  
        alert("请选择照片,再上传");  
       
        }else if(image.lastIndexOf(".jpg")<0 && image.lastIndexOf(".JPG")<0  && image.lastIndexOf(".JPEG")<0 && image.lastIndexOf(".jpeg")<0 ){ 
            alert("只能上传.jpg文件");    
        }else{      			
		if(studentNo==""|JLname==""|JLlevel==""|getTime==""|sponsor.length==0|adviser.length==0)
			{alert("请填写完整信息");}
		else{
		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
		if(!reg.test(getTime))//判断日期格式符合YYYY-MM-DD
		    {
		        alert("请输入正确的日期！YYYY-MM-DD");
		   }else{
			   
			   $("#save3").attr("disabled", true); 	   
		var formData=new FormData();
		formData.append("image",$("#JLimage")[0].files[0]);
		formData.append("studentNo",studentNo);
		formData.append("JLname",JLname);
		formData.append("JLlevel",JLlevel);
		formData.append("getTime",getTime);
		formData.append("sponsor",sponsor);
		formData.append("adviser",adviser);
		formData.append("termOrindividual",termOrindividual);
		formData.append("stuType",stuType);

 	  $.ajax({ url: "addJL",
  	           type:"post", 
  	           dataType:"text",
 	           data:formData,
   	         cache: false,//上传文件无需缓存 
             processData: false,//用于对data参数进行序列化处理 这里必须false
             contentType: false, //必须 
  	         scriptCharset: 'utf-8',
   	           
   	        success: function(data){
   	        	alert(data); 
   	        	$("#save3").attr("disabled", false); 
  	        	document.getElementById("jiangli").style.display="block";
	    	} , 
  	         error:function(){
  	        	 alert("保存出错"); $("#save3").attr("disabled", false); 
   	         } 
		});
		$("#save3").style.display="block";}
		}
        }
})

$("#save4").click(function(){                        //技能信息录入   成功
		var studentNo = $("#studentNo4").val();
		var skillName = $("#skillName").val();
		var getSTime = $("#getSTime").val();
		var getType = $("#getType").val();
		var stuType = "本科生";
		if(skillName.length>50){
			alert("输入的技能名称过长");
		}else{
		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
		if(!reg.test(getSTime))//判断日期格式符合YYYY-MM-DD
		    {
		        alert("请输入正确的日期！");
		   }
		else{
			 $("#save4").attr("disabled", true); 
		$.ajax({ url: "addSkill",
   	           	 type:"post", 
   	           dataType:"text",
   	           data:{"studentNo":studentNo,
   	        	     "skillName":skillName,
   	        	     "getTime":getSTime,
   	        	     "getType":getType,
   	        	     "stuType":stuType
   	           },
   	           scriptCharset: 'utf-8',
   	           
   	        success:function(data){
   	        	alert(data); $("#save4").attr("disabled", false); 
   	        	document.getElementById("skill").style.display="block";
 	    	} , 
   	         error:function(){
   	        	 alert();$("#save4").attr("disabled", false); 
   	         }    
		});
		}
		}
})

$("#save5").click(function(){                    //实践信息录入     测试成功 
		var studentNo = $("#studentNo5").val();
		var practiceName = $("#practiceName").val();
		var type =  $("#practiceType").val();              
		var startPTime = $("#startPTime").val();
		var endPTime = $("#endPTime").val();
		var stuType = "本科生";
		 if(practiceName==""|practiceName.length>100){
			 alert("请正确输入实践名称")
		 }else{
		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
		if(!reg.test(startPTime)|!reg.test(endPTime))//判断日期格式符合YYYY-MM-DD
		    {
		        alert("请输入正确的日期！YYYY-MM-DD");
		   }
		else{
			 $("#save5").attr("disabled", true); 
			
		$.ajax({ url: "addPractice",
   	           	 type:"post", 
   	           dataType:"text",
   	           data:{"studentNo":studentNo,
   	        	     "practiceName":practiceName,
   	        	     "type":type,
   	        	     "startTime":startPTime,
   	        	     "endTime":endPTime,
   	        	     "stuType":stuType
   	           },
   	           scriptCharset: 'utf-8',
   	           
    	       success: function(data){
    	    	   alert(data); $("#save5").attr("disabled", false); 
    	    	   document.getElementById("practice").style.display="block";
    	       },
	   	        error: function(){
	 	    	   alert("errors"); $("#save5").attr("disabled", false); 
	 	       }
		});
		}
		 }
})
$("#save6").click(function(){                       //资助信息录入      成功 
	var pstudentNo = $("#studentNo6").val();
	var SFZK = $("#SFZK").val();
	var ZZname = $("#ZZname").val();
	var ZZtime = $("#ZZtime").val();
	var ZZmoney = $("#ZZmoney").val();
	var ZZType = $("#zz_Type").val();
	var stuType = "本科生";
	if(ZZname.length==0 | ZZType.length==0 |ZZmoney.length==0 |ZZname.length>45|ZZmoney.length>11){
		alert("请正确输入信息！");
	}else{
	var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
	if(!reg.test(ZZtime))//判断日期格式符合YYYY-MM-DD
	    {
	        alert("请输入正确的日期！YYYY-MM-DD");
	   } else{
		   
		   $("#save6").attr("disabled", true); 
		   
	$.ajax({  url:"addPstudent",
			type:"post",
			dataType:"text",
			data:{
				"pstudentNo":pstudentNo,
				"SFZK":SFZK,
				"ZZname":ZZname,
				"ZZtime":ZZtime,
				"ZZmoney":ZZmoney,
				"ZZtype":ZZType,
				"stuType":stuType
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
 	    	   alert("success"); $("#save6").attr("disabled", false); 
 	    	  document.getElementById("zz").style.display="block";
 	       },
	   	    error: function(){
	 	       alert("errors"); $("#save6").attr("disabled", false); 
	 	    }
	});
	   }
	}
})

$("#save7").click(function(){                       // 学籍异动信息录入
	var studentNo = $("#studentNo7").val();
	var YDtime = $("#YDtime").val();
	var YDreason = $("#YDreason").val();
	var BZ = $("#BZ").val();
	var stuType = "本科生";
	 if(YDtime==""|YDreason==""|BZ==""|YDreason>100){
		 alert("请正确输入信息");
	 }else{
		 var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
			if(!reg.test(YDtime))//判断日期格式符合YYYY-MM-DD
			    {
			        alert("请输入正确的日期！YYYY-MM-DD");
			   } else{
				   
				   $("#save7").attr("disabled", true); 
	$.ajax({  url:"addXJYD",
			type:"post",
			dataType:"text",
			data:{
				"studentNo":studentNo,
				"YDtime":YDtime,
				"YDreason":YDreason,
				"BZ":BZ,
				"stuType":stuType
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
 	    	   alert(data); $("#save7").attr("disabled", false); 
 	    	  document.getElementById("xjyd").style.display="block";
 	       },
	   	    error: function(){
	 	       alert("errors");$("#save7").attr("disabled", false); 
	 	    }
	});
	 }
			}
})

$("#save8").click(function(){                       // 学籍注册信息录入      成功
	var studentNo = $("#studentNo8").val();
	var ZCyear = $("#ZCyear").val();
	var term = $("#term").val();
	var ZCorNot = $("#ZCorNot").val();
	var stuType = "本科生";

	$("#save8").attr("disabled", true); 
	
	$.ajax({  url:"addXJZC",
			type:"post",
			dataType:"text",
			data:{
				"studentNo":studentNo,
				"ZCyear":ZCyear,
				"term":term,
				"ZCorNot":ZCorNot,
				"stuType":stuType
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
 	    	   alert(data);$("#save8").attr("disabled", false); 
 	    	  document.getElementById("xjzc").style.display="block";
 	       },
	   	    error: function(){
	 	       alert("errors");$("#save8").attr("disabled", false); 
	 	    }
	});
})

							//查询模块八大功能
$("#Base1").click(function(){                       // 学生基础信息查询模块
	var studentNo=document.getElementById("userName").value;

	$.ajax({  url:"selectStudent",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){

				 var src = "image/"+studentNo+".jpg";
				$("#imgDisplay").attr("src",src);				   
				document.getElementById("sea_studentNo8").value = data.studentNo;
				document.getElementById("sea_studentName").value = data.studentName;
				document.getElementById("sea_termYear").value = data.termYear;
				document.getElementById("sea_major").value = data.major;
				
		         switch(data.className){
		          case  10:var cla = '会计金融双学位班';break;
		          case  11:var cla = '卓越会计师班';break;
		          case  12:var cla = '中法班';break;
		          default: var cla=data.className;
		      }	
				
				document.getElementById("sea_className").value = cla;
				document.getElementById("sea_sex").value = data.sex;
				document.getElementById("sea_MZ").value = data.mz;
				document.getElementById("sea_ZZMM").value = data.zzmm;
				document.getElementById("sea_JG").value = data.jg;
				document.getElementById("sea_birthday").value = data.birthday;
				document.getElementById("sea_personID").value = data.personID;
				document.getElementById("sea_phone").value = data.phone;
				document.getElementById("sea_QQ").value = data.qq;
				document.getElementById("sea_fatherName").value = data.fatherName;
				document.getElementById("sea_fatherPhone").value = data.fatherPhone;
				document.getElementById("sea_motherName").value = data.motherName;
				document.getElementById("sea_motherPhone").value = data.motherPhone;
				document.getElementById("sea_address").value = data.address;
				document.getElementById("sea_buildingName").value = data.buildingName;
				document.getElementById("sea_roomNum").value = data.roomNum;
				document.getElementById("sea_bedNum").value = data.bedNum;
				document.getElementById("sea_studyType").value = data.studyType;
				document.getElementById("sea_tc").value = data.tc;
				document.getElementById("sea_fatherWorkplace").value = data.fatherWorkplace;
				document.getElementById("sea_motherWorkplace").value = data.motherWorkplace;
				var sfps = data.sfps;
				if(sfps==0){
					document.getElementById("sea_sfps").value = "否";
				}
				if(sfps==1){
					document.getElementById("sea_sfps").value = "是";
				}
 
				
				 $.getScript('js/echarts.min.js',function(){
	            	   
	            	   $.ajax({
	            		   url:"stuAnalyze",
	            		   type:"post",
	                	   data:{"id":studentNo},
	                	   dataType:"json",
	                	   scriptCharset: 'utf-8',
	                	   success:function(result){
	                		   var dom = document.getElementById("personAnalyze");
	                           var myChart = echarts.init(dom,myChart,
	                                {
	                                    width: 300,
	                                    height: 260,
	                                    lockY: true,
	                                    throttle: 70
	                                });

	                                // 指定图表的配置项和数据
	                          var app = {};
	                          var data = result;
	                            option = null;
	                            option = {
	                              tooltip: {},

	                            radar: {
	                                // shape: 'circle',
	                                name: {
	                                    textStyle: {
	                                        color: '#6666FF',
	                                        backgroundColor: '#F0F0F0',
	                                        borderRadius: 3,
	                                        padding: [3, 5]

	                                   }
	                                },
	                                indicator: [
	                                   { name: '惩罚次数', max: 10},
	                                   { name: '获奖次数', max: 10},
	                                   { name: '职业技能', max: 10},
	                                   { name: '校外活动', max: 10},
	                                   { name: '校内任职', max: 10},
	                                   { name: '平均绩点', max: 4}
	                                ]
	                            },
	                            series: [{
	                                name: '学生个人分析',
	                                type: 'radar',
	                                // areaStyle: {normal: {}},
	                                data : [
	                                    {
	                                        value : data,
	                                        name : '学生个人分析'
	                                    },
	                                
	                                ]
	                            }]
	                        };;
	                        if (option && typeof option === "object") {
	                            myChart.setOption(option, true);
	                        }//这个函数是在new.js里面的，当点击click后运行这个函数
	                    	 
	                       
	                	   },
	            		   
	            	   })
				 })
				
				
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

$("#Cj1").click(function(){                       // 学生成绩信息查询模块
	var studentNo=document.getElementById("userName").value;
	$.ajax({  url:"selectGrade",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				//console.log(data[0]);
				var table=$("#cjtable");
				  table.html("")
				  for(var i=0;i<data.length;i++){
					var tr=$("<tr class='gradeA odd ' role='row'></tr>");
					
					tr.html('<td>'+data[i].studentNo+'</td><td>'+data[i].termNo+'</td><td>'+data[i].avgGrade+'</td><td>'+
							data[i].avgCPA+'</td><td class="bj_grade" sid='+data[i].termNo+'>编辑</td>');
					table.append(tr);
			
				}		
				updateGrade();
				deleteGrade();
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

function updateGrade(){                         //修改成绩模态框的实现
	$(".bj_grade").click(function(){
	    $("#update_grade").modal({   
		    backdrop:"static",
	  })
	  
	  document.getElementById("update_grade_studentNo").value = document.getElementById("userName").value;
	  $("#update_term").val( $(this).attr("sid")) ;
	  
	  $("#update_grade_btn").click(function(){
		  var studentNo = document.getElementById("update_grade_studentNo").value;
		  var termNo = document.getElementById("update_term").value;
		  var avgGrade = document.getElementById("update_avgGrade").value;
		  var avgCPA = document.getElementById("update_avgCPA").value;
		  if(isNaN(avgGrade)|isNaN(avgCPA))
		  {alert("成绩只能输入数字");}
		  else{
			  $("#update_grade_btn").attr("disabled", true); 
		  $.ajax({  url:"updateGrade",
				type:"post",
				dataType:"text",
				data:{
					"studentNo":studentNo,
					"termNo":termNo,
					"avgGrade":avgGrade,
					"avgCPA":avgCPA
				},
				scriptCharset: 'utf-8',
				
				success: function(data){
					alert("保存成功"); $("#update_grade_btn").attr("disabled", false); 
					document.getElementById("update_avgGrade").value="";
					document.getElementById("update_avgCPA").value="";
	 	       },
		   	    error: function(){
		 	       alert("errors"); $("#update_grade_btn").attr("disabled", false); 
		 	    }
		});   	     
		  }
	  })
	  
   })
}

function deleteGrade(){                         //删除成绩 模态框的实现
	  $(".delete_grade").click(function(){
		  var studentNo=document.getElementById("userName").value;
		  var termNo = $(this).attr("sid");
		  $("#delete_grade").attr("disabled", true); 
		  $.ajax({  url:"deleteGrade",
				type:"post",
				dataType:"text",
				data:{
					"studentNo":studentNo,
					"termNo":termNo
				},
				scriptCharset: 'utf-8',
				
				success: function(data){
					alert(data); $("#delete_grade").attr("disabled", false); 
					$("#Cj1").click();
	 	       },
		   	    error: function(){
		 	       alert("errors");
		 	    }
		});   	     
		  
	  })
	  
}


$("#Jiangli1").click(function(){                       // 学生奖励信息查询模块
	var studentNo=document.getElementById("userName").value;
	
	$.ajax({  url:"selectJL",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				//console.log(data[0]);
				
				var table=$("#jltable");
				  table.html("")
				  for(var i=0;i<data.length;i++){
					var tr=$("<tr class='gradeA odd ' role='row'></tr>");
					 var src = "image/"+data[i].studentNo+data[i].imageName+".jpg";
					tr.html("<td>"+data[i].studentNo+"</td><td>"+data[i].jlname+"</td><td>"+data[i].jllevel+"</td><td>"+data[i].adviser+"</td><td>"+data[i].sponsor+"</td><td>"+data[i].getTime+"</td><td><img  src="+src+" width='100' ></td><td class='deleteJL' sid="+data[i].jlid+">删除</td>");
					
					
					table.append(tr);
				}
				  $(".deleteJL").click(function(){
					var sid = $(this).attr("sid");
				$.ajax({
					url: "deleteJL",
		            type: "post",
		            dataType: "text",
		            data:{"sid":sid},
		            scriptCharset: 'utf-8',
		            success: function (data) {
		                alert(data);
		            },
		            error:function(data){
		            	alert("删除失败");
		            }
				}) 
				  })
 	    	  
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

$("#Skill1").click(function(){                       // 学生技能信息查询模块
	var studentNo=document.getElementById("userName").value;
	$.ajax({  url:"selectSkill",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
			//	console.log(data[0]);
				
				 var table=$("#skilltable");
					table.html("")
					for(var i=0;i<data.length;i++){
						var tr=$("<tr class='gradeA odd ' role='row'></tr>");
						tr.html('<td>'+data[i].studentNo+'</td><td>'+data[i].skillName+'</td><td>'+data[i].type+'</td><td>'+data[i].time+'</td><td class="deleteSkill" sid='+data[i].skillId+'>删除</td>');
						table.append(tr);
					}	
					
					$(".deleteSkill").click(function(){
					var sid = $(this).attr("sid");
				$.ajax({
					url: "deleteSkill",
		            type: "post",
		            dataType: "text",
		            data:{"sid":sid},
		            scriptCharset: 'utf-8',
		            success: function (data) {
		                alert(data);
		            },
		            error:function(data){
		            	alert("删除失败");
		            }
				}) 
				  })
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

$("#Practice1").click(function(){                       // 学生实践信息查询模块
	var studentNo=document.getElementById("userName").value;
	$.ajax({  url:"selectPractice",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				//console.log(data[0]);
				
				var table=$("#practicetable")
				table.html("");
				for(var i=0;i<data.length;i++){
					var tr=$("<tr class='gradeA odd ' role='row'></tr>");
					tr.html('<td>'+data[i].studentNo+'</td><td>'+data[i].practiceName+'</td><td>'+data[i].type+'</td><td>'+data[i].startTime+'</td><td>'
							+data[i].endTime+'</td><td class="bj_practice" sid='+data[i].studentNo+'>编辑</td><td class="delete_practice" sid='+data[i].studentNo+'>&nbsp&nbsp删除</td>');
					table.append(tr);
				}
				updatePractice();
				deletePractice();
 	    	   //alert(data[0].studentNo);
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

function updatePractice(){                         //修改实践信息 模态框的实现
	$(".bj_practice").click(function(){
	    $("#update_practice").modal({   
		    backdrop:"static",
	  })
	  
	  $("#update_practice_studentNo").val($(this).attr("sid"));
	  
	  var studentNo =$(this).parent().children().eq(0).text(); 
	  var practiceName =$(this).parent().children().eq(1).text();
	  var type =$(this).parent().children().eq(2).text();
	  var startTime =$(this).parent().children().eq(3).text();
	  var endTime =$(this).parent().children().eq(4).text();
	  
		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
		if(!reg.test(startTime)|!reg.test(endTime))//判断日期格式符合YYYY-MM-DD
		    {
		        alert("请输入正确的日期！YYYY-MM-DD");
		   }else{
			   
		 
	  $("#update_practice_btn").click(function(){
		  var update_practiceName = document.getElementById("update_practiceName").value;
		  var update_practiceType = document.getElementById("update_practiceType").value;
		  var update_startPTime = document.getElementById("update_startPTime").value;
		  var update_endPTime = document.getElementById("update_endPTime").value;
		  $.ajax({  url:"updatePractice",
				type:"post",
				dataType:"text",
				data:{
					"studentNo":studentNo,
					"practiceName":practiceName,
					"type":type,
					"startTime":startTime,
					"endTime":endTime,
					"update_practiceName":update_practiceName,
					"update_practiceType":update_practiceType,
					"update_startPTime":update_startPTime,
					"update_endPTime":update_endPTime
				},
				scriptCharset: 'utf-8',
				
				success: function(data){
					alert(data);
					$("#Practice1").click();
	 	       },
		   	    error: function(){
		 	       alert("errors");
		 	    }
		});   	     
	  })
		   }
   })
}

function deletePractice(){                         //删除实践信息 模态框的实现
	  $(".delete_practice").click(function(){
		  var studentNo =$(this).parent().children().eq(0).text(); 
		  var practiceName =$(this).parent().children().eq(1).text();
		  var type =$(this).parent().children().eq(2).text();
		  var startTime =$(this).parent().children().eq(3).text();
		  var endTime =$(this).parent().children().eq(4).text();
		  $.ajax({  url:"deletePractice",
				type:"post",
				dataType:"text",
				data:{
					"studentNo":studentNo,
					"practiceName":practiceName,
					"type":type,
					"startTime":startTime,
					"endTime":endTime
				},
				scriptCharset: 'utf-8',
				
				success: function(data){
					alert(data);
					$("#Practice1").click();
	 	       },
		   	    error: function(){
		 	       alert("errors");
		 	    }
		});   	     
		  
	  })
	  
}

$("#Zz1").click(function(){                       // 学生资助信息查询模块
	var studentNo=document.getElementById("userName").value;
	$.ajax({  url:"selectPstudent",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				//console.log(data[0]);
				
				var table=$("#zztable")
				table.html("");
				for(var i=0;i<data.length;i++){
					var tr=$("<tr class='gradeA odd ' role='row'></tr>");
					tr.html('<td>'+data[i].pstudentNo+'</td><td>'+data[i].zzname+'</td><td>'+data[i].type+'</td><td>'+data[i].zztime+
							'</td><td>'+data[i].zzmoney+'</td><td class="bj_pstudent" sid='+data[i].pstudentNo+'>编辑</td>');
					table.append(tr);
				}	
				updatePstudent();
 	    	   //alert(data[0].pstudentNo);
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

function updatePstudent(){                         //修改资助信息 模态框的实现
	$(".bj_pstudent").click(function(){
	    $("#update_pstudent").modal({   
		    backdrop:"static",
	  })
	  
	  $("#update_pstudent_studentNo").val($(this).attr("sid"));
	  
	  var studentNo =$(this).parent().children().eq(0).text(); 
	  var ZZname =$(this).parent().children().eq(1).text();
	  var ZZtime =$(this).parent().children().eq(2).text();

	  $("#update_pstudent_btn").click(function(){
		  var update_ZZname = document.getElementById("update_ZZname").value;
		  var update_ZZtime = document.getElementById("update_ZZtime").value;
		  var update_zz_Type = document.getElementById("update_zz_Type").value;
		  
		  var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
			if(!reg.test(update_ZZtime))//判断日期格式符合YYYY-MM-DD
			    {
			        alert("请输入正确的日期！YYYY-MM-DD");
			   }else{
		  $.ajax({  url:"updatePstudent",
				type:"post",
				dataType:"text",
				data:{
					"studentNo":studentNo,
					"ZZname":ZZname,
					"ZZtime":ZZtime,
					"update_ZZname":update_ZZname,
					"update_ZZtime":update_ZZtime,
					"update_zz_Type":update_zz_Type
				},
				scriptCharset: 'utf-8',
				
				success: function(data){
					alert(data);
					$("#update_ZZname").val(" ");
					$("#update_ZZtime").val(" ");
					$("#Zz1").click();
	 	       },
		   	    error: function(){
		 	       alert("errors");
		 	    }
		});
			   }
	  })
   })
}

$("#Xjyd1").click(function(){                       // 学籍异动信息查询模块
	var studentNo=document.getElementById("userName").value;
	$.ajax({  url:"selectXJYD",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				var table=$("#xjydtable");
				  table.html("");
				  for(var i=0;i<data.length;i++){
					var tr=$("<tr class='gradeA odd ' role='row'></tr>");
					tr.html('<td>'+data[i].studentNo+'</td><td>'+data[i].ydtime+'</td><td>'+data[i].ydreason+'</td><td>'+data[i].bz+'</td>');
					table.append(tr);
				   }	
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

$("#Xjzc1").click(function(){                       // 学籍注册查询模块
	//var studentNo="201544078888";
	var studentNo = document.getElementById("userName").value;
	$.ajax({  url:"selectXJZC",
			type:"post",
			dataType:"json",
			data:{
				"studentNo":studentNo
			},
			scriptCharset: 'utf-8',
			
			success: function(data){
				//alert(data.length);
				//console.log(data[0]);
				//alert(data[0].studentNo);
				var table=$("#xjzctable");
				  table.html("")
				  for(var i=0;i<data.length;i++){
					var tr=$("<tr class='gradeA odd' role='row'></tr>");
					tr.html('<td>'+data[i].studentNo+'</td><td>'+data[i].zcyear+'</td><td>'
							+data[i].term+'</td><td>'+data[i].zcorNot+'</td>');
					table.append(tr);
				 }	
 	       },
	   	    error: function(){
	 	       alert("errors");
	 	    }
	});
})

$(function(){
    $("#updateSPassword").click(function(){
	    $("#user_update_Password").modal({   
		    backdrop:"static",
	  })
	  
	  $("#suserbtn").click(function(){
		  var studentNo = document.getElementById("suserStudentNo").value;
		  var oldPassword = document.getElementById("oldSuserPassword").value;
		  var newPassword = document.getElementById("newSuserPassword").value;
		  $.ajax({  url:"updatePassword",
				type:"post",
				dataType:"text",
				data:{
					"studentNo":studentNo,
					"newPassword":newPassword,
					"oldPassword":oldPassword
				},
				scriptCharset: 'utf-8',
				
				success: function(data){
					alert(data);
					document.getElementById("oldSuserPassword").value="";
					document.getElementById("newSuserPassword").value="";
	 	       },
		   	    error: function(){
		 	       alert("errors");
		 	    }
		}); 
	  })
   })
})



$(function(){
	$("#Base").click(function(){
	var  stuNo= $("#studentNo1").val();

	$.ajax({
		url:"getstuByNo",
		type:"post",
		dataType:"json",
		data:{
		 "id":stuNo
		},
		scriptCharset: 'utf-8',
		success:function(data){

			$("#studentName").val(data.studentName);
			//$("#termYear").val(data.termYear);
			//$("#major").val(data.major);
			//$("#className").val(data.className);
			//$("#MZ").val(data.mz);
			//$("#sex").val(data.sex);
		}
	})
        $.ajax({
            url:"getAlertStudentInfo",
            type:'get',
            dataType:"json",
            data:{"studentNo":stuNo},
            scriptCharset: 'utf-8',
            success:function(data){
                if(data[0]==null){
                    console.log("无申请记录");
                }else{
                    // $("#delete").attr("stuNo",data[0].studentNo);
                    //审核状态
                    var status = data[0].status;
                    switch(status){
                        case 0:$("#ti_stauts").html("(信息未审核)");break;
                        case 1:$("#ti_stauts").html("(已审核通过)");break;
                        case 2:$("#ti_stauts").html("(审核未通过)");break;
                    }
                    //	alert(data);//data[0]为修改后的数据，data[1]为修改前的数据

                    $("#termYear").val(data[0].termYear);
                    $("#major").val(data[0].major);

                    switch(data[0].className){
                        case  10:var cla = '会计金融双学位班';break;
                        case  11:var cla = '卓越会计师班';break;
                        case  12:var cla = '中法班';break;
                        default: var cla=data[0].className;
                    }

                    $("#className").val(cla);
                    $("#sex").val(data[0].sex);
                    $("#birthday").val(data[0].birthday);
                    $("#MZ").val(data[0].mz);
                    $("#ZZMM").val(data[0].zzmm);
                    $("#JG").val(data[0].jg);
                    $("#personID").val(data[0].personID);
                    $("#phone").val(data[0].phone);
                    $("#QQ").val(data[0].qq);
                    $("#fatherName").val(data[0].fatherName);
                    $("#fatherPhone").val(data[0].fatherPhone);
                    $("#fatherWorkplace").val(data[0].fatherWorkplace);
                    $("#motherName").val(data[0].motherName);
                    $("#motherPhone").val(data[0].motherPhone);
                    $("#motherWorkplace").val(data[0].motherWorkplace);
                    $("#address").val(data[0].address);
                    $("#buildingName").val(data[0].buildingName);
                    $("#roomNum").val(data[0].roomNum);
                    $("#bedNum").val(data[0].bedNum);
                    $("#TC").val(data[0].tc);
                    $("#sfps").val(data[0].sfps);

                }



            }
        })
	})
})
//学生头像上传
$(function(){
	$("#fileIMG_btn").click(function(){
		var formData=new FormData();
		formData.append("image",$("#imgFile")[0].files[0]);		
		var leg = $("#imgFile")[0].files.length;
		if(leg===0){
			alert('请选择要上传的图片');
			return;
		}
		var size = $("#imgFile")[0].files[0].size;
		if(size>2097152){
			alert('请注意文件大小限制，不能超过2MB');
			return;
		}
		$.ajax({
			url: "uploadImg",
            data: formData,
            type: "post",
            dataType: "text",
            cache: false,//上传文件无需缓存 
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须 
            success: function (data) {
                alert("上传成功");
            },
            error:function(data){
            	alert("上传失败");
            }
		})
	})
})


$(function(){
	
       $("[data-toggle='tooltip']").tooltip();
	   
	   $("#leavetip").click(function(){
		var sno = $("#sno").val();
	    var major=	$("#L_major").val();
	    var classno=	$("#classno").val();
	    var sname=	$("#sname").val();
	   	var studenttel=	$("#studenttel").val();
	   	var dormitory=	$("#dormitory").val();
	   	var reason =	$("#reason").val();
	   	var gotowhere=	$("#gotowhere").val();
	   	var dayofleave =	$("#dayofleave").val();
	   	var parenttel=	$("#parenttel").val();
	   	var leavebegin=	$("#leavebegin").val();
	   	var leaveend=	$("#leaveend").val();
	   	var leavedate=	$("#leavedate").val();
	   	var myname=	$("#myname").val();
	   	var stuType = "本科生";
	  // 	alert(major+classno+studenttel+sname+dormitory+reason+gotowhere+dayofleave+parenttel+leavebegin+leaveend+leavedate+myname);
	   	if(major.length==0||classno.length==0||sname.length==0||studenttel.length==0||dormitory .length==0||reason.length==0||gotowhere.length==0 ){ 
	   		alert(major.length+classno.length+sname.length+studenttel.length+dormitory.length+reason.length+gotowhere.length);
	   		alert("有地方漏填，请先将请假条填写完整！");return false;}	   	
	   	else{
	   	 $("#leavetip").attr("disabled", true); 
	   		
	   	 $.ajax({
	   	 	url:"addLeave",
	   	 	type:"post",
	   	  	data:{"sno":sno,
	   	  		"major":major,
	   	  	"classno":classno,
	   	    "sname":sname,
	   	    "studenttel":studenttel,
	   	    "dormitory":dormitory,
	   	 "reason":reason,
	   	    "gowhere":gotowhere,
	   	    "dayofleave":dayofleave,
	   	    "parenttel":parenttel,
	   	 "leavebegin":leavebegin,
	   	    "leaveend":leaveend,
	   	    "leavedate":leavedate,
	   	    "stuType":stuType
	   	    },
	   	 	 dataType:"text",
	   	 	 scriptCharset: 'utf-8',
	   	 	success:function(data){
	   	 		alert(data); $("#leavetip").attr("disabled", false); 
	   	 		},
            error:function(){
            	alert("提交失败"); $("#leavetip").attr("disabled", false); 
            }
	   	 });
	   }	 
	   })
	
	
        var htmltopdf = document.getElementById("htmltopdf");
              var div_pdf =document.getElementById("container");
            	div_pdf.style.background = "#FFFFFF";
        
        htmltopdf.onclick=function(){
        	var div = document.getElementById("oporate");
        	div.style.display="none";
        	var div_pdf =document.getElementById("container");
        	html2canvas(div_pdf, {
          onrendered:function(canvas) {

              var contentWidth = canvas.width;
              var contentHeight = canvas.height;

              //一页pdf显示html页面生成的canvas高度;
              var pageHeight = contentWidth / 792.28 * 841.89;
              //未生成pdf的html页面高度
              var leftHeight = contentHeight;
              //pdf页面偏移
              var position = 0;
              //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
              var imgWidth = 850.28;
              var imgHeight = 841.28/contentWidth * contentHeight;

              var pageData = canvas.toDataURL('image/jpeg', 1.0);

              var pdf = new jsPDF('', 'pt', 'a4');

              //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
              //当内容未超过pdf一页显示的范围，无需分页
              if (leftHeight < pageHeight) {
                  pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
              } else {
                  while(leftHeight > 0) {
                      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                      leftHeight -= pageHeight;
                      position -= 1041.89;
                      //避免添加空白页
                      if(leftHeight > 0) {
                          pdf.addPage();
                      }
                  }
              }

              pdf.save('请假条.pdf');
          }
      })
  }
        //查看自己的请假信息
        $("#myLeave").click(function(){
     		$("#listMyLeave").modal({
			    backdrop:"static",
		  })
		  var sno = $("#sno").val();
		  $.ajax({
		   	 	url:"listLeave",
		   	 	type:"get",
		   	 	dataType:"json",
		   	 	data:{"sno":sno},
		   	 scriptCharset: 'utf-8',
		   	 success:function(data){
		   		var table = $("#tablebody_myleave");
		   		    table.html("");
		   		    for(var i=0; i<data.length;i++){
		   		    	var tr = $("<tr></tr>");
		   		    	if(data[i].status==1){
		   		    		var status = "未批准";
		   		    	}else if(data[i].status==0){
		   		    		var status = "未审批";
		   		    	}else{
		   		    		var status = "已批准";
		   		    	}
		   		    	tr.html("<td>"+data[i].leavebegin+"——"+data[i].leaveend+"</td><td>"+data[i].reason+"</td><td>"+data[i].dayofleave+"</td>" +
		   		    			"<td>"+data[i].studenttel+"</td><td>"+data[i].parenttel+"</td><td>"+status+"</td>");
		   		        table.append(tr);
		   		    }
		   	 },
		   	 error:function(){
		   		 alert("查看失败");
		   	 }
		   	 	
		  })
        })
})

 $(function(){
	  	   var json = {
	  	    	"Base":"base",
	  	    	"leave":"container",
	  	    	"Cj":"cj",
	  	    	"Jiangli":"jiangli",
	  	    	"Skill":"skill",
	  	    	"Practice":"practice",
	  	    	"Zz":"zz",
	  	    	"Xjyd":"xjyd",
	  	    	"Xjzc":"xjzc",
	  	    	"search":"pstudent",
	  	    	"Base1":"t1",
	  	    	"Cj1":"t2",
	  	    	"Jiangli1":"t3",
	  	    	"Skill1":"t4",
	  	    	"Practice1":"t5",
	  	    	"Zz1":"t6",
	  	    	"Xjzc1":"t7",
	  	    	"questionnaire":"questionnairePage"
	  	    }
	  	   
	  	   $(".pageChange").click(function(){
	  	       var id = $(this).attr("id");         	  
         	  $.each(json, function(key,value) {
	  	   	  		$("#"+value+"").hide();

	  	   	  		   if(key==id){	  	   	          			
	  	   	            $("#"+value+"").show();
	  	   	         	  	 	         
	  	   	  		  }
	  	   	         
	  	   	  	});
	  	   })
	  	  
	  	   var json1 = {
	  	    	"Base1":"t1",
	  	    	"Cj1":"t2",
	  	    	"Jiangli1":"t3",
	  	    	"Skill1":"t4",
	  	    	"Practice1":"t5",
	  	    	"Zz1":"t6",
	  	    	"Xjyd1":"t7",
	  	    	"Xjzc1":"t8",
	  	    	"questionnaire":"questionnairePage"
	  	    }
	  	   
	  	   $(".pageChange1").click(function(){
	  	       var id = $(this).attr("id");         	  
         	  $.each(json1, function(key,value) {
	  	   	  		$("#"+value+"").hide();

	  	   	  		   if(key==id){	  	   	          			
	  	   	            $("#"+value+"").show();
	  	   	         	  	   	         
	  	   	  		  }
	  	   	         
	  	   	  	});
	  	   })
	  	   

	  })


$(function(){
	 $("#luru").click(function(){
			$("#showlist").slideToggle(500);					
			 });



$("#ZZname").focusin(function(){
var val =  $("#ZZname").val();
if( $("#ZZname").val()=='')
val= "如：助学金";
$("#ZZname").val(val);
});
$("#ZZname").focusout(function(){
var val =  $("#ZZname").val();
if( $("#ZZname").val()=='')
val ="如：助学金";
$("#ZZname").val(val);

});



$("#ZZtime").focusin(function(){
var val =  $("#ZZtime").val();
if( $("#ZZtime").val()=='')
	  val ="格式为：YYYY-MM-DD" ;
$("#ZZtime").val(val);
});
$("#ZZtime").focusout(function(){
	  var val =  $("#ZZtime").val();
if( $("#ZZtime").val()=='')
	   val ="格式为：YYYY-MM-DD";
  $("#ZZtime").val(val);

});
})