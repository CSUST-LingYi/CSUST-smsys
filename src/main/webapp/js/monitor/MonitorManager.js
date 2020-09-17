import {getUrlVars, getXN} from "../general/getXuenian.js";

function compileStr(code){ //对字符串进行加密
  var c=String.fromCharCode(code.charCodeAt(0)+code.length);
 for(var i=1;i<code.length;i++)
  {      
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
 }   
 return escape(c);  
 }

$(function(){
    //渲染学年列表
    getXN().then(xuenians => {
        $("#xuenian option").remove();
        xuenians.forEach((item,index) => {
            if (item.xuenian === getUrlVars()['xuenian']){
                $("#xuenian").append(`<option selected value="${item.xuenian}">${item.xuenian}</option>`);
            }
            else{
                $("#xuenian").append(`<option value="${item.xuenian}">${item.xuenian}</option>`);
            }
        })
    });
    $("#xuenian option[value='']").attr("selected", true);
    $('body').on('change','#xuenian',function () {
        window.location = "monitorIndex?xuenian="+$(this).val();
    })

});

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
	    	getClassStudents(result.termYear,result.major,result.className);
		   // $('#monitorNo').text(result.studentNo);
		    
	    	
	    	$.ajax({
				type:"post",
				url:"../getMonitorByClass",
				dataType:"json",
				data:{
					"nianji":result.termYear,
					"major":result.major,
					"className":result.className
				},
				success:function(mo){
					/*var arraymo = [];
					for(var i = 0 ;i<mo.length;i++){
						arraymo.push(mo[i]);
					}*/
					$('#monitorNo').text(mo);
					console.log(mo);
					 $.ajax({
					    	type:"post",
					    	url:"../monitor/countUnreadMsg",
					    	dataType:"json",
					    	traditional:true,
					    	data:{
					    		"monitorNo":mo
					    	},
					    	success:function(count){
					    		if(count){
					    			$('title').html('班长管理(您有未读消息,请及时查看)');
					    			$('#feedback').css('color','red');
					    			$('#newsBox').modal('show');
					    		}else{
					    			$('title').html('班长管理');
					    			$('#feedback').css('color','');
					    			$('#newsBox').modal('hide');
					    		}		    		
					    	},
					    	error:function(){
					    		alert("ErrorCode:M1.登录出错，请重试!");
					    	}
					    })
					//console.log(arraymo instanceof Array,arraymo);
					/*if(mo==null|mo=="null"|mo==""){
						alert("查询失败，该班级未设置班长");
						return false;
					}*/
			
				},
				error:function(){
					alert("ErrorCode:I1：发生未知错误,请刷新重试")
				}
			})
	    	
	    	
	    	
		   
		    
	    },
	    error:function(){
	    	alert("ErrorCode:M2.登录出错，请重试!");
	    }
	})
	
	
	
	
})

function getClassStudents(termYear,major,className){
	var xuenian = $('#xuenian').val();
	$.ajax({
		type:"post",
		url:"../monitor/getClassStudents",
		async:true,
		data:{"nianji":termYear,
		      "major":major,
		      "classNo":className
		},
		dataType:"json",
		success:function(result){
			$.ajax({
	      	    type:"post",
	      	    url:" ../monitor/getSummaryByClass",
	      	    async:true,
	      	    data:{"xuenian":xuenian,
	      		     "nianji":termYear,
	      	         "major":major,
	      	        "classNo":className},
	      	   dataType:"json",
	      	   success:function(re){
	      		   
	      		//console.log(re);
	      		   
	      			var div = $("#stuContainer");
				    div.html(" ");
				    
				    var rowdiv = $("<div class='row'></div>")
				    
				    for (var i=0;i<result.length;i++) {
				    	var cdiv = $("<div class='col-sm-6 col-md-2'></div>");
				    	    var tdiv = $("<div class='thumbnail'></div>");
				    	        tdiv.append('<img src="../img/test.jpg" alt="头像" width="110px" height="110px">');
				    	        
				    	        var jdiv = $("<div class='judge'></div>");
				    	            jdiv.append('<span class="label label-warning" id="isupload'+result[i].studentNo+'" style="text-align: center;">未上传</span>');
				                    jdiv.append('<span class="label label-warning" id="state'+result[i].studentNo+'" style="text-align: center;">未审核</span>'); 
				                tdiv.append(jdiv);
				               
				                var cadiv = $("<div class='caption'></div>");
				                    cadiv.append("<h4>姓名："+result[i].studentName+"</h4>");
				                    cadiv.append("<p>学号："+result[i].studentNo+"</p>");
				                    cadiv.append("<p>性别："+result[i].sex+"</p>");
				                    cadiv.append('<p class="text-lowercase"><a href="#" class="btn btn-primary btn-xs showPerson" role="button" data-toggle="modal" data-target="#details_01"> 详细信息</a> <a href="personDetails.html?'+compileStr(result[i].studentNo)+'" target="_self" class="btn btn-warning btn-xs" role="button">综测分数</a> </p>');
				                    
				                tdiv.append(cadiv);
				            cdiv.append(tdiv);
				         rowdiv.append(cdiv);
				    }
				    div.append(rowdiv);
				    //同步审核状态
				    for(var i=0;i<re.length;i++){
				    	   let sid = re[i].studentNo;
				    	   let stu =  $("p:contains("+sid+")");
				    	 //检查用户是否上传综测分数，否则不执行update操作
				    		   $.ajax({
					    	          type:"post",
					    	          url:" ../public/getIsUpload",
					    	          //async:false,
					    	          data:{
					    	          		"xuenian":xuenian,
					    	        	  	"studentNo":sid
					    	          },
					    		       	dataType:"json",
					    		        success:function(e){
					    		        	if(e==true){
					    		        		//console.log(sid);
					    		        		stu.parent('.caption').prev('.judge').children('#isupload'+sid+'').text('已上传').removeClass('label-warning').addClass('label-success');
					    		        	}else{
					    		        		//console.log('fa'+sid);
					    		        		stu.parent('.caption').prev('.judge').children('#isupload'+sid+'').text('未上传').removeClass('label-success').addClass('label-warning');
					    		        	}		    		        	
					    		        	  
					    		        },
					    		        error:function(){
					    		        	alert('发生未知错误，请检查网络');
					    		        	
					    		        }
					    			 })
				    	   
				    		
	      				   //alert(sid);
	      				   
	      				   //console.log(stu);
	      				   
		      			   if(re[i].status==true|re[i].status==1){		      				  
		      				   stu.parent('.caption').prev('.judge').children('#state'+sid+'').text('已审核').removeClass('label-warning').addClass('label-success');
		      			   }else{
		      				 stu.parent('.caption').prev('.judge').children('#state'+sid+'').text('未审核').removeClass('label-success').addClass('label-warning');
		      			   }
		      		   }
				    
	      		   //alert();
	      		//   console.log(result);
	      	   
	      	   },
	           error:function(){
	       		   alert("加载出错，请重试或联系管理员");
	      	    }
	      		  	
	      	})
		
			
		},
		error:function(){
			alert("加载出错，请重试或联系管理员");
		}
	});
	
}

//查看个人信息
$(function(){
	$('body').on('click','.showPerson',function(){
	  var stuNo = $(this).parent('p').parent('.caption').find('p:contains(学号)').text().substr(3);
	  //console.log(stuNo);
	  $.ajax({
		  type:'post',
		  async:true,
		  dataType:"json",
		  url:'../getstuByNo_name',
		  data:{"id":stuNo},
		  success:function(data){
			  //console.log(data);
			  var stuNo = data[0].studentNo;
			  var stuName = data[0].studentName;
			  var sex = data[0].sex;
			  var roomName = data[0].buildingName+'-'+data[0].roomNum+'-'+data[0].bedNum;
			  var tel = data[0].phone;
			  $('#details_01').modal('show');
			  $('#pstuNo').text(stuNo);
			  $('#pstuName').text(stuName);
			  $('#pstuSex').text(sex);
			  $('#pstuRoom').text(roomName);
			  $('#pstuTel').text(tel);
		  },
		  error:function(){
			  alert('查询出错，请重试！');
		  }
	  })
	})
});

$(function(){
	$('#feedback').click(function(){
		$('#newsBox').modal('show');
	})
	
	$('#viewFeedback').click(function(){
		var tempwindow=window.open('_blank');
		tempwindow.location='view-feedback.html?monitor='+$('#monitorNo').text()+'';
	})
});
