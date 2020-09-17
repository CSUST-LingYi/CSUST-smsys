/**
 *页面测试阶段
 **/
import {getUrlVars, getXN} from "../general/getXuenian.js"

//检查综测系统是否关闭函数
let isOpenQuery = (xuenian) => {

    return new Promise((resolve,reject) => {
        $.ajax({
            type:"get",
            url:"../public/getZcStatus",
            data:{
                "xuenian":xuenian
            }
        }).done((msg) => {
            resolve(msg)
        }).fail((errMsg) =>{
            reject(errMsg)
        })
    })
};
function isOpen(xuenian,fn) {
    isOpenQuery(xuenian).then(res => {
      if (!res){
        alert("综测系统已关闭,操作失败");
        return false;
      }else{
        fn();
      }
    })
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
      window.location = "to_stu?xuenian="+$(this).val();
  })

});
//成绩录入——导航栏+按钮——查询智育体育 id="SetGrade"——2019-01-13成功
$(function() {

	$.ajax({
		url:"../public/getStudentInfo",
	    type:"get",
	    dataType:"json",
	    success:function(result){
	    	$("#nianji").text(result.termYear);
	    	$("#major").text(result.major);
	    	$("#className").text(result.className);
	    	$("#studentNo").text(result.studentNo);
	    	$("#studentName").text(result.studentName);
	    	$('#stuName_h').text(result.studentName);
            var xuenian = $("#xuenian").val();
	 	    var studentNo = $("#studentNo").html(); //学号从前端的span中取出
	 	    var major = $("#major").html(); //学号从前端的span中取出
	 	    var nianji = $("#nianji").html(); //学号从前端的span中取出
	 	    var className = $("#className").html(); //学号从前端的span中取出
            $.ajax({
                url:"../public/getZcStatus",
                type:"get",
                dataType:"json",
                data:{
                    "xuenian":xuenian
                },
                success:function (res) {
                    if(!res){
                        $("input[type='text']").prop("disabled",true);
                        $("button[id ^= 'Set']").prop("disabled",true);
                        $("button[id ^= 'input']").prop("disabled",true);
                        $("input[type='text']").prop("readOnly",true);
                        console.log( $("[type='text']"));
                        $("#zcStatus").css("color","red").text("关闭");
                    }else{
                        $("#zcStatus").css("color","green").text("开启");
                    }
                },
                error:function () {
                    alert("请检查网络状态，稍后重试");
                }
            })
	 	    getPEAndKnowInfos(xuenian,studentNo,nianji,major,className); 	
	    },
	    error:function(){
	    	alert("出错，请重试!");
	    }
	})


  $("#SetGrade,#SetKnowledge").click(function() {
    var xuenian = $("#xuenian").val();
    var studentNo = $("#studentNo").html(); //学号从前端的span中取出
    var major = $("#major").html(); //学号从前端的span中取出
    var nianji = $("#nianji").html(); //学号从前端的span中取出
    var className = $("#className").html(); //学号从前端的span中取出

    getPEAndKnowInfos(xuenian,studentNo,nianji,major,className);
    
  })
})

//成绩录入——查询德育分加分项+已有明细项
$(function(){
  $("#SetMoral").click(function(){
    var xuenian = $("#xuenian").val();
    var studentNo = $("#studentNo").html();
    $("#ul_Moral").html("");
    getMoralByMid(0,"#ul_Moral");
    getMoralPrizeInfo(xuenian,studentNo,"moralPrizeTable1");
  })
})

//成绩录入——体育分录入——2019-01-10成功
$(function() {
  $("#input_sports").click(function(){
	    var xuenian = $("#xuenian").val();
	    var studentNo = $("#studentNo").html();
	    var major = $("#major").html();
	    var nianji = $("#nianji").html();
	    var className = $("#className").html(); 
    var firstTerm = parseFloat($("#firstTermScore").val());
    var secondTerm = parseFloat($("#secondTermScore").val());

    if(firstTerm<0 | firstTerm>100 |secondTerm<0 | secondTerm>100 |firstTerm==null |secondTerm==null){
    	alert("请正确填写！");
    	return false;
    }
      isOpen(xuenian,function(){
          $.ajax({
              url: "../public/addPersonSports",
              type: "post",
              dataType: "text",
              scriptCharset: "utf-8",
              data: {
                  "studentNo": studentNo,
                  "xuenian": xuenian,
                  "firstTerm": firstTerm,
                  "secondTerm": secondTerm
              },
              success: function(data) {
                  alert("增加成功！");
                  getPEAndKnowInfos(xuenian,studentNo,nianji,major,className);
                  resetStatus(xuenian,studentNo);
              },
              error: function(data) {
                  alert("增加失败！");
              }
          });
      });


  })
});

//成绩录入——提交单项智育分
$(function() {
  $("#input_knowledge").click(function() {
    var xuenian = $("#xuenian").val();
    var studentNo = $("#studentNo").html();
    var major = $("#major").html();
    var nianji = $("#nianji").html();
    var className = $("#className").html(); 
    var json = [];
    //遍历表格将值传入后台保存至数据库
    $("#course_table tr").each(function(i){
      $(this).children('td').each(function(j){
        if(j == 2){
          var score = $(this).parent().find(".knowledgeScore").val();
          var cid = $(this).next().text();
      //    if(score != ""){
            var row = {};
            row.xuenian = xuenian;
            row.studentNo = studentNo;
            row.cid = cid;
            row.score = score;
            json.push(row);
        //  }
        }
      })
    })

    var list = JSON.stringify(json);
    // console.log(list);
      isOpen(xuenian,function(){
          $.ajax({
              url: "../public/addPersonKnowledge",
              type: "post",
              dataType: "text",
              scriptCharset: "utf-8",
              data:{"list":list,"xuenian":xuenian},
              success:function(data){
                  alert("操作成功");
                  resetStatus(xuenian,studentNo);
                  getPEAndKnowInfos(xuenian,studentNo,nianji,major,className);
              },
              error:function(data){
                  alert("操作失败");
              }
          });
      })

  })
});

//成绩录入——德育分录入
$(function(){
  $("#submitMoral").click(function(){
    
    var studentNo = $("#studentNo").html();
    var xuenian = $("#xuenian").val();
    var pname = $("#prizeName").val();
    var pscore = $("#prizeScore").val();
    var pDate =  $("#prizeDate").val();
    var pid = $("#did-in-modal").html();
    if(pname.length<1|pDate.length<1|pscore.length<1){
    	alert("请输入完整的信息");
    	return false;
    }
    if($("#prizeFile")[0].files.length==0){
    	alert('请选择要上传的文件');
    	return false;
    }
    if($("#prizeFile")[0].files[0].size>2097152){
    	alert('文件太大！请注意文件大小限制2MB');
    	return false;
    }
    var pFile = new FormData();
    pFile.append('image',$("#prizeFile")[0].files[0]);
    pFile.append('mid',pid);
    pFile.append('score',pscore);
    pFile.append('name',pname);
    pFile.append('xuenian',xuenian);
    pFile.append('studentNo',studentNo);
    pFile.append('getTime',pDate);
    isOpen(xuenian,function(){
        $.ajax({
            url:"../public/addPersonMoral",
            type:"post",
            dataType:"text",
            scriptCharset: "utf-8",
            data:pFile,
            cache:false,//上传文件无需缓存
            processData:false,//用于对data参数进行序列化处理
            contentType:false,//必须
            success:function(data){
                alert("添加成功");
                $("#myModal").modal('hide');
                resetStatus(xuenian,studentNo);
                getMoralPrizeInfo(xuenian,studentNo,"moralPrizeTable1");
            },
            error:function(data){
                alert("添加失败");
            }
        });
    })
  })
})

//成绩查询——导航栏+按钮——查询 id="SearchGrade"——2019-01-10成功
$(function() {
	
	$("#SearchGrade,#SearchKnowledge").click(function() {

    var xuenian = $("#xuenian").val();
    var studentNo = $("#studentNo").html();
    var major = $("#major").html();
    var nianji = $("#nianji").html();
    var className = $("#className").html();
		
		getKnowledgeInfo(xuenian,studentNo,nianji,major,className,"knowledgeTable");
		getPEInfo(xuenian,studentNo,"PETable");
	})
})

//成绩查询——查询个人德育分以及加分项  id="SearchMoral" ——2019-01-10成功，数据库缺少扣分项，暂无分数，数据库奖项未完善，方法未完成
$(function() {
  $("#SearchMoral").click(function() {
    var xuenian = $("#xuenian").val();
    var studentNo = $("#studentNo").html();
    getMoralInfo(xuenian,studentNo,"moralTable");
    getMoralPrizeInfo(xuenian,studentNo,"moralPrizeTable");
  })
})

//成绩录入——修改奖项
$(function(){
  $(document).on("click",".updMoral",function(){
        var xuenian = $("#xuenian").val();
        var studentNo = $("#studentNo").html();
        var trnow = $(this).parent().parent();
        var id = trnow.children("td").eq(0).attr("did");
        var name = trnow.children("td").eq(0).html();
        var sc =  trnow.children("td").eq(2).html();

    //    alert(trnow.html()+"____"+trnow.children("td").eq(0).html()+"_____"+name+"_____"+sc);
        $("#prizeName2").val(name);
        $("#prizeScore2").val(sc);
        $("#myModal2").modal('show');
        $("#submitMoral2").click(function(){
          isOpen(xuenian,function(){
              $.ajax({
                  url: "../public/updatePersonMoral",
                  type: "post",
                  dataType: "text",
                  scriptCharset: "utf-8",
                  data: {
                      "xuenian": xuenian,
                      "studentNo": studentNo,
                      "id": id,
                      "name":$("#prizeName2").val(),
                      "score":$("#prizeScore2").val()
                  },
                  success: function(data) {
                      alert("修改成功");
                      $("#myModal2").modal('hide');
                      getMoralPrizeInfo(xuenian,studentNo,"moralPrizeTable1");
                  },
                  error: function() {
                      alert("修改失败");
                  }
              });
          })

        });
      })
})
      
//成绩录入——删除奖项
$(function(){
  $(document).on("click",".delMoral",function(){
    if(confirm("确定要删除吗？")){
      var xuenian = $("#xuenian").val();
      var studentNo = $("#studentNo").html();
      var id = $(this).parent().parent().children().attr("did");
      isOpen(xuenian,function(){
          $.ajax({
              url: "../public/deletePersonMoral",
              type: "post",
              dataType: "text",
              scriptCharset: "utf-8",
              data: {
                  "xuenian": xuenian,
                  "studentNo": studentNo,
                  "id": id
              },
              success: function(data) {
                  alert("删除成功");
                  getMoralPrizeInfo(xuenian,studentNo,"moralPrizeTable1");
              },
              error: function() {
                  alert("删除失败");
              }
          });
      })

    }
  })
})

//查询学生的综测总分填入总分栏 
$(function() {
  $("#SearchGrade").click(function() {
    var xuenian = $("#xuenian").val();
    var studentNo = $("#studentNo").html(); //学号从前端的input中取出
    $.ajax({
      url: "../public/getMoralAndKnowledgeAndSports",
      type: "get",
      dataType: "json",
      scriptCharset: "utf-8",
      data: {
        "xuenian": xuenian,
        "studentNo": studentNo
      },
      success: function(data) {
        $("#AllTable").html("");
        var tr = $("<tr></tr>");
        var status = "已审核";
        if(!data.personSummary.status){
          status = "未审核";
        }
        tr.html("<td>" + data.personSummary.knowledge + "</td><td>" + data.personSummary.moral + "</td><td>" + data.personSummary.sports + "</td><td>" + data.personSummary.deduction + "</td><td>"+data.personSummary.fails+"</td><td>"+data.personSummary.sum+"</td><td>"+status+"</td><td>"+data.personSummary.bz+"</td>");
        $("#AllTable").append(tr);

      },
      error: function() {
        alert("查询出错11");
      }

    })
  })
})

//成绩查询——扣分查询
$(function(){
  $("#SearchDeductionsBtn").click(function(){
    var xuenian = $("#xuenian").val();
    var studentNo = $("#studentNo").html();
    
    $.ajax({
      url: "../monitor/listPersonDeduction",
      type: "get",
      dataType: "json",
      scriptCharset: "utf-8",
      data: {
        "xuenian": xuenian,
        "studentNo": studentNo
      },
      success: function(data) {
        $("#DeducionsTable").html("");
        for(var i=0;i<data.length;i++){
          var tr = $("<tr></tr>");
          tr.html("<td>" + data[i].name + "</td><td>" + data[i].score + "</td><td>" + data[i].times + "</td><td>" + (data[i].times*data[i].score) + "</td><td>" + data[i].bz + "</td>");
          $("#DeducionsTable").append(tr);
        }
      },
      error: function() {
        alert("查询出错");
      }
    });
  })
});



