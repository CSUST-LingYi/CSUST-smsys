/**
 *学工办综测管理
 **/

var list; //数据表单
var currentPage; //当前页
var numberSize = 100; //每页显示数量
//判断升序降序
function judgeASCorDESC(num) {
	if(num == 0)
		return 1;
	else
		return -1;
}

function backtoMain() {
	$('#main').show();
	$('#div_data_analyse').hide();
}
//查询综测结果————学年、专业
$(function() {
	$("#getResults").click(function() {
		//		search(1,4);
		showLectures();
	})
})

//专业搜索相应班级
$(function() {
	$("#major_name").change(function() {
		var major = $("#major_name").val();
		var xuenian = $("#xuenian").val();
		var grade = $("#grade").val();
		$("#showClass").html("");
		if(major == "0") {
			return;
		}
		$.ajax({
			url: "../studyDept/getClassCheckSummary",
			type: "post",
			dataType: "json",
			scriptCharset: "utf-8",
			data: {
				"xuenian": xuenian,
				"major": major,
				"nianji": grade
			},
			success: function(data) {
				var label = "<label>班级：</label>";
				$("#showClass").append(label);
				var sel = $("<select id=\"class_name\" name=\"class_name\"></select>");
				sel.append("<option value='99' selected='selected'>全部班级</option>")
				for(var i = 0; i < data.length; i++) {
					if(data[i].className==12){
						var option = $("<option value=" + data[i].className + ">中法班(12班)</option>");
					}else{
						var option = $("<option value=" + data[i].className + ">" + data[i].className + "班</option>");
					}
					
					sel.append(option);
				}
				$("#showClass").append(sel);
			},
			error: function() {

			}
		});
	})
})

//点击排序
$(function() {
	$("#IQ_sort,#moral_sort,#physical_sort,#deduction_sort,#total_sort").click(function() {
		var class_name = $(this).children("span").attr("class");
		var order;
		var column = $(this).parent().prevAll().length;
		if(class_name.indexOf("alt") >= 0) {
			$(this).children("span").attr("class", "glyphicon glyphicon-sort-by-order");
			order = 0;
		} else {
			$(this).children("span").attr("class", "glyphicon glyphicon-sort-by-order-alt");
			order = 1;
		}
		switch(column) {
			case 6:				
				list.sort(function(a, b) {
					return judgeASCorDESC(order) * (a.knowledge - b.knowledge);
				});
				break;
			case 7:
				list.sort(function(a, b) {
					return judgeASCorDESC(order) * (a.moral - b.moral);
				});
				break;
			case 8:
				list.sort(function(a, b) {
					return judgeASCorDESC(order) * (a.sports - b.sports);
				});
				break;
			case 9:
				list.sort(function(a, b) {
					return judgeASCorDESC(order) * (a.deduction - b.deduction);
				});
				break;
			case 10:
				list.sort(function(a, b) {
					return judgeASCorDESC(order) * (a.sum - b.sum);
				});
				break;
		}
		showPageLectures(currentPage, list);
	})
})

//获取所有数据
function showLectures() {
	var xuenian = $("#xuenian").val();
	var grade = $("#grade").val();
	var major = $("#major_name").val();
	var classNo = $("#class_name").val();
	if(major == 0){
		alert("请选择专业");
		return ;
	}
	list = null;
	$.ajax({
		url: "../studyDept/getSummary",
		type: "post",
		dataType: "json",
		scriptCharset: "utf-8",
		data: {
			"xuenian": xuenian,
			"major": major,
			"nianji": grade,
			"pn": 1,
			"pa": 100,
			"classNo": classNo
		},
		success: function(data) {
			list = data.list;
			currentPage = 1;
			showPageLectures(currentPage, list);
			if(list.length <= 0){
				$(".zxf_pagediv").hide();
				alert("暂无数据");
				return ;
			}
			//			分页按钮
			$(".zxf_pagediv").show();
			$(".zxf_pagediv").createPage({
				pageNum: Math.ceil(data.pageSize/numberSize),
				current: 1,
				backfun: function(e) {
					currentPage = e.current;
					showPageLectures(e.current, list);
				}
			});

		},
		error: function() {
			alert("获取失败");
		}
	});
}

//按页面获取课程信息
function showPageLectures(page, list) {
	$('#table_node').empty(); //移除所有table的子节点元素
	for(var i = (page - 1) * numberSize; i < page * numberSize && i < list.length; i++) {
		var status;
		if(list[i].status) {
			status = "<span class=\"label label-success\">已审核</span>";
		} else {
			status = "<span class=\"label label-warning\">审核中</span>";
		}
		var rowTr = document.createElement('tr');
		rowTr.className = "tr_node";
		rowTr.setAttribute('data-xuenian',list[i].xuenian);
		var child = "<td>"+(i+1)+"</td><td class='stuNo'>" + list[i].studentNo + "</td><td>" +
			list[i].studentName + "</td><td>" + list[i].major + "</td><td>" +
			list[i].termYear + "</td><td>" + list[i].className + "</td><td class=\"IQ_sort_td\">" +
			list[i].knowledge + "</td><td class=\"moral_sort_td\">" + list[i].moral + "</td><td class=\"sports_sort_td\">" +
			list[i].sports + "</td><td class=\"deduction_sort_td\">" + list[i].deduction + "</td><td class=\"sum_sort_td\">" +
			list[i].sum + "</td><td>" + status + "</td><td>" + list[i].bz + "</td><td><input type='button' class='btn btn-primary btn-xs showDetail' value='详情' /></td>";
		rowTr.innerHTML = child;
		$('#table_node').append(rowTr);
	}
}

$(function(){
	$('body').on('click','.showDetail',function(){
		var xuenian = $(this).parent().parent('tr').attr('data-xuenian');
		var stuNo = $(this).parent().parent('tr').children('.stuNo').text();
		console.log(xuenian+stuNo);
		//alert();
		   window.location.href = "../studyDept/personal.html?xuenian="+xuenian+"&studentNo="+stuNo+"";
	})

});

