 
  //成绩上传
 $(function(){
         	$("#span_uploadGrade").click(function(){
         		$("#uploadGrade").modal({
			    backdrop:"static",
		  })
         		
		  //成绩模板下载
		  	 $("#btn_download").click(function(){

		        var url="downloadFile";//下载文件url

	 		     $("#fileForm").attr('action',url);
	 		
	 		     $("#fileName").val("成绩上传模板.xlsx");

	 		     $("#fileForm").submit();
		  
		})

		  
		  //成绩Excel上传
         		$("#upGradeExcel").click(function(){
         			var xuenian = $("#xuenian").val();
         			var xueqi = $("#xueqi").val();
         			var nianji = $("#nianji").val();
         			
         			var major = $("#major").val();
         			var yesORno = $("input[type=radio]:checked").val();
         			
         			if(yesORno=="no"){
         				alert("请使用模板上传");
         			}else{       				
         			var uploadEventFile = $("#studentGradeExcel").val();
  	                    if(uploadEventFile == '')
  	                    {  
  	                      alert("请选择excel,再上传");  
  	           
  	                      }else if(uploadEventFile.lastIndexOf(".xls")<0){//可判断以.xls和.xlsx结尾的excel  
  	                        alert("只能上传Excel文件");
  	        
  	                   }else{
  	                      var formData=new FormData();
  	            	      formData.append("file",$("#studentGradeExcel")[0].files[0]);
  	            	      formData.append("xuenian",xuenian);
  	            	      formData.append("xueqi",xueqi);
  	            	      formData.append("nianji",nianji);
  	            	      formData.append("major",major);
  	            	         $.ajax({ url: "uploadStudentGradeEcxel",
  	       	              type:"post", 
  	       	               dataType:"text",
  	      	               data:formData,
  	        	           cache: false,//上传文件无需缓存 
  	                       processData: false,//用于对data参数进行序列化处理 这里必须false
  	                         contentType: false, //必须 
  	       	               scriptCharset: 'utf-8',    	        	           
  	        	        success: function(data){
  	        	        	alert(data);
  	     	    	    } , 
  	       	         error:function(){
  	       	        	 alert("上传错误");
  	        	         } 
  	     		});
  	            }
  	                   }
         		})
         	})
         })
         
         
 //成绩分析
 $(function(){
	 $(".get_class").change(function(){
		 var nianji = $("#grade_ninaji").val();
		 var major = $("#grade_major").val();
		
		    $.ajax({
		    	 url: "getClassName",
    	         type:"post", 
    	         dataType:"json",
    	         data:{"nianji":nianji,
    	        	   "major":major,
    	        	   },
    	         scriptCharset: 'utf-8', 
    	         success:function(data){
    	        	 var cl = $("#grade_class");
    	        	     cl.html("");
    	                 cl.append("<option value='All'>所有班级</option>")
  	                   for(var i=0;i<data.length;i++){
  	                	   var option= $("<option value="+data[i]+">"+data[i]+"</option>");
  	                	       cl.append(option);
  	                   }
    	         }
    	         
		    })
	 })
	 
	 //成绩分析查询
	 $("#select_grade").click(function(){
		 var xuenian = $("#grade_xuenian").val();
		 var xueqi = $("#grade_xueqi").val();
		 var nianji = $("#grade_ninaji").val();
		 var major = $("#grade_major").val();
		 var className = $("#grade_class").val();
		 
		 if($("#grade_fial").prop("checked")){
		 var fail = 1;
		 }else{
			 var fail = 0;
		 };
		 

			 var minGrade = $("#minGrade").val();	 
			 var maxGrade = $("#maxGrade").val();	 
			 var minGPA = $("#minGPA").val();	 
		     var maxGPA = $("#maxGPA").val();
		     
		     if(isNaN(minGrade) | isNaN(maxGrade) | isNaN(minGPA) | isNaN(maxGPA) |minGrade.length<1
		    		 |maxGrade.length<1 |minGPA.length<1|maxGPA.length<1){
		    	 alert("只能填写数字");
		     }else{
		    	 if(parseFloat(minGrade) > parseFloat(maxGrade) | parseFloat(minGPA) > parseFloat(maxGPA)){
		    		 alert("请正确填写");
		    	 }else{
		    		// alert(xuenian+xueqi+nianji+major+className+fail+minGrade+maxGrade+minGPA+maxGPA);
		    		 
		    		 $.ajax({
		    	        	url:"selectStudentGrade",
		       	            type:'post',
		    	            dataType:"json",
		    	        	data:{
		    	        		"xuenian":xuenian,
		    	        		"xueqi":xueqi,
		    	        		"nianji":nianji,
		    	        		"major":major,
		    	        		"className":className,
		    	        		"fail":fail,
		    	        		"minGrade":minGrade,
		    	        		"maxGrade":maxGrade,
		    	        		"minGPA":minGPA,
		    	        		"maxGPA":maxGPA
		    	        		},
		    	        	scriptCharset: 'utf-8',
		    	        	success:function(data){
		    	        		$("#analyzeTable_head").show();
		    	              var table = $("#analyzeTable_body");
		    	                  table.html(" ");
		    	              for(var i = 0 ;i<data.length;i++){
		    	            	  var tr = $("<tr></tr>")
		    	            	      tr.html("<td>"+data[i].ranking+"</td><td>"+data[i].studentNo+"</td><td>"+data[i].studentName+"</td><td>"+data[i].sex+"</td>" +
		    	            	      		"<td>"+data[i].className+"</td><td>"+data[i].courseCount+"</td><td>"+data[i].fail+"</td><td>"+data[i].credit+"</td>" +
		    	            	      	    "<td>"+data[i].getCredit+"</td><td>"+data[i].gpa+"</td><td>"+data[i].creditGPA+"</td><td>"+data[i].avgCreditGPA+"</td>" +
		    	            	      	    		"<td>"+data[i].avgGrade+"</td>")
		    	            	      table.append(tr);
		    	              }
		    	                 $("#grade_totle").html(data.length);
		    	        	},
		    	        	error:function(){
		    	        		alert("查询错误");
		    	        	}
		    	        	
		    	        })
		    	 }
		     }

	
		 
	 })
 })
 
 //获奖分析
 
 
 $(function(){
 	
 	$("#jl_select").click(function(){
          var xuenian = $("#jl_xuenian").val();
          var nianji = $("#jl_nianji").val()
          var stuType = "本科生";     
         
          $.ajax({
        	  url:"analezeAward",
        	  type:"post",
        	  dataType:"json",
        	  data:{"xuenian":xuenian,
        	        "nianji":nianji,
        	        "stuType":stuType},
        	  scriptCharset: 'utf-8',
        	  success:function(data){
        		//  console.log(data);
        		  var y = 0;
        		  for(var i=0;i<data.length;i++){
        			  y += data[i][1];
        		  }
        		  var x = 0;
        		  for(var i=0;i<data.length;i++){
        			  x += data[i][2];
        		  }
        		  var s = 0;
        		  for(var i=0;i<data.length;i++){
        			  s += data[i][3];
        		  }
        		  var g = 0;
        		  for(var i=0;i<data.length;i++){
        			  g += data[i][4];
        		  }
        		   var dom = document.getElementById("compareAnalyze");

        		   var myChart = echarts.init(dom,myChart,
        		        {
        		            width: 1000,
        		            height: 580,
        		            lockY: true,
        		            throttle: 70
        		        });

        		        // 指定图表的配置项和数据
        		        
        		 option = {
        		    parallelAxis: [
        		         {
        		            dim: 0,
        		            name: '专业',
        		            type: 'category',
        		            data: ['信息管理与信息系统', '财务管理', '会计', '人力资源管理', '金融', '国际经济与贸易', 'ACCA','卓越会计','市场营销']
        		        },
        		        {dim: 1, name: '院级（'+y+'）'},
        		        {dim: 2, name: '校级（'+x+'）'},
        		        {dim: 3, name:'省级（'+s+'）'},
        		        {dim: 4, name:'国家级（'+g+'）'}
        		    ],
        		    series: {
        		        type: 'parallel',
        		        lineStyle: {
        		            width: 4
        		        },
        		        data: data
        		    }
        		};

        		if (option && typeof option === "object") {
        		    myChart.setOption(option, true);
        		}
        	  }
          })
 		


 	})
 
	     	   
 })

 $(function(){
	 $("#btn_compare").click(function(){
		 var xuenian = $("#compare_xuenian").val();
		 var xueqi = $("#compare_xueqi").val();
		 var nianji = $("#compare_nianji").val();
		
			 var minGrade = $("#compare_minGrade").val();	 
			 var maxGrade = $("#compare_maxGrade").val();	 
			 var minGPA = $("#compare_minGPA").val();	 
		     var maxGPA = $("#compare_maxGPA").val();
		     
		     if(isNaN(minGrade) | isNaN(maxGrade) | isNaN(minGPA) | isNaN(maxGPA) |minGrade.length<1
		    		 |maxGrade.length<1 |minGPA.length<1|maxGPA.length<1){
		    	 alert("只能填写数字");
		     }else{
		    	 if(parseFloat(minGrade) > parseFloat(maxGrade) | parseFloat(minGPA) > parseFloat(maxGPA)){
		    		 alert("请正确填写");
		    	 }else{
		    		
		    		 
		    		 $.ajax({
		    	        	url:"compareStudentGrade",
		       	            type:'post',
		    	            dataType:"json",
		    	        	data:{
		    	        		"xuenian":xuenian,
		    	        		"xueqi":xueqi,
		    	        		"nianji":nianji,
		    	        		"minGrade":minGrade,
		    	        		"maxGrade":maxGrade,
		    	        		"minGPA":minGPA,
		    	        		"maxGPA":maxGPA
		    	        		},
		    	        	scriptCharset: 'utf-8',
		    	        	success:function(data){console.log(data);
		    	        		var dom = document.getElementById("cont");
		    	         	    var myChart = echarts.init(dom,myChart,
		    	                {
		    	                    width: 1000,
		    	                    height: 450,
		    	                    lockY: true,
		    	                    throttle: 70
		    	                });
		    	         	option = {
		    	            title: {
		    	                text: '成绩分析图'
		    	            },
		    	            tooltip: {
		    	                trigger: 'axis'
		    	            },
		    	            legend: {
		    	                data:['比率','挂科率']
		    	            },
		    	            grid: {
		    	                left: '3%',
		    	                right: '4%',
		    	                bottom: '3%',
		    	                containLabel: true
		    	            },
		    	            toolbox: {
		    	                feature: {
		    	                    saveAsImage: {}
		    	                }
		    	            },
		    	            xAxis: {
		    	                type: 'category',
		    	                boundaryGap: false,
		    	                data: ['信息管理与信息系统','财务管理','会计','人力资源管理','金融','国际经济与贸易','ACCA','卓越会计','市场营销']
		    	            },
		    	            yAxis: {
		    	                type: 'value'
		    	            },
		    	            series: [
		    	                {
		    	                    name:'比率',
		    	                    type:'line',
		    	                    data:data[0]
		    	                },
		    	                {
		    	                    name:'挂科率',
		    	                    type:'line',
		    	                    data:data[1]
		    	                }

		    	            ]
		    	        };
		    	        if (option && typeof option === "object") {
		    	            myChart.setOption(option, true);
		    	        }
		    	        	},
		    	        	error:function(){
		    	        		alert("查询错误");
		    	        	}
		    	        	
		    	        })
		    	 }
		     }

	
		 
	 })
 })