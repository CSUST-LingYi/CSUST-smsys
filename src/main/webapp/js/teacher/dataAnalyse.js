//获取学院各个专业的挂科率
function showMajorsFails() {
	var xuenian = $('#id_term_year option:selected').val();
	var nianji = $('#id_grade option:selected').val();
	var zhuanye = $('#id_major_name option:selected').val();
	$('#MajorFails').show();
	$("#CourseGrade").hide();
	$('#MajorGrade').hide();
	$('#CourseFails').hide();
	var myChart = echarts.init(document.getElementById('MajorFails'));
	var fails = new Array();
	var major = new Array();
	var isAccess = true;
	$('#id_major_name option').each(function() {
		if($(this).val() != '0') {
			zhuanye = $(this).val();
			$.ajax({
				type: "post",
				url: "../teacher/getFalis",
				async: false,
				data: {
					"xuenian": xuenian,
					"nianji": nianji,
					"major": zhuanye
				},
				success: function(data) {
					if(data.length > 0) {
						fails.push((data[0].fails * 100).toFixed(2));
						major.push(zhuanye);
					}
				},
				error: function() {
					alert("获取失败");
					isAccess = false;
				}
			});
			if(!isAccess)
				return false;
		}
	});

	var option = {
		tooltip: {
			show: true,
			formatter: '{b0}:{c0}%'

		},
		legend: {
			data: ['经管学院各专业挂科率']
		},
		xAxis: [{
			type: 'category',
			data: major
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			"name": "经管学院各专业挂科率",
			"type": "bar",
			"data": fails,
			itemStyle: {
				normal: {
					label: {
						show: true, //开启显示
						position: 'top', //在上方显示
						textStyle: { //数值样式
							color: 'black',
							fontSize: 16,
						},
						formatter: function(params) {
							if(params.value == 0) {
								return '';
							} else {
								return params.value + '%';
							}
						}
					}
				}
			}
		}]
	};
	myChart.setOption(option);
	myChart.on('click', function(params) {
		showDataDetail(params.name, xuenian, nianji);
	});
}
//获取专业各班级各分数段的人数
function showMajorGrade() {
	var xuenian = $('#id_term_year option:selected').val();
	var nianji = $('#id_grade option:selected').val();
	var zhuanye = $('#id_major_name option:selected').val();
	if(zhuanye.toString() == '0') {
		alert("请选择专业");
		return;
	}

	var number = new Array();
	var course = new Array();
	$.ajax({
		type: "post",
		url: "../teacher/getScoresCount",
		async: false,
		dataType: "json",
		data: {
			"xuenian": xuenian,
			"nianji": nianji,
			"major": zhuanye
		},
		success: function(data) {
			var isEmpty = true;
			$.each(data, function(key, value) {
				if(value.length > 0)
					isEmpty = false;
			});
			if(isEmpty == true) {
				alert('暂无数据');
				return false;
			}
			$('#MajorFails').hide();
			$("#CourseGrade").show();
			$('#MajorGrade').hide();
			$('#CourseFails').hide();
			var myChart = echarts.init(document.getElementById('CourseGrade'));
			$.each(data, function(key, value) {
				for(var index in value) {
					var i = course.indexOf(value[index].className + "班")
					if(i < 0) {
						course.push(value[index].className + "班");
						number[course.length - 1] = new Array(0, 0, 0, 0, 0);
						number[course.length - 1][exchange(key)] = value[index].num;
					} else {
						number[i][exchange(key)] = value[index].num;
					}

				}

			});
			var numData = new Array(5);
			for(var i = 0; i < 5; i++) {
				numData[i] = new Array();
			}
			for(var index in course) {
				for(var j in number[index]) {
					numData[j].push(number[index][j]);
				}
			}

			option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					},
					formatter: function(params) {
						var relVal = params[0].name;                   
						//alert(JSON.stringify(params))                       
						for(var i = 0, l = params.length; i < l - 1; i++) {             
							relVal += '<br/>' + params[i].seriesName  + ': ' + params[i].value + "个";                     
						}
						relVal += '<br/>' + params[params.length - 1].seriesName + ": " + params[params.length - 1].value + "分";                 
						return relVal;
					}
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				legend: {
					data: ['0~60(分)', '60~70(分)', '70~80(分)', '80~90(分)', '90~100(分)']
				},
				xAxis: [{
					type: 'category',
					data: course,
					axisPointer: {
						type: 'shadow'
					}
				}],
				yAxis: [{
					type: 'value',
					name: '人数',
					min: 0,
					max: 30,
					interval: 6,
					axisLabel: {
						formatter: '{value}'
					}
				}],
				series: [{
						name: '0~60(分)',
						type: 'bar',
						data: numData[0],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '60~70(分)',
						type: 'bar',
						data: numData[1],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '70~80(分)',
						type: 'bar',
						data: numData[2],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '80~90(分)',
						type: 'bar',
						data: numData[3],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '90~100(分)',
						type: 'bar',
						data: numData[4],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					}
				]
			};

			myChart.setOption(option);
		},
		error: function() {
			alert("获取失败");
		}
	});
}
//获取专业各个班级的挂科率
function showCourseFails() {
	var xuenian = $('#id_term_year option:selected').val();
	var nianji = $('#id_grade option:selected').val();
	var zhuanye = $('#id_major_name option:selected').val();
	if(zhuanye.toString() == '0') {
		alert("请选择专业");
		return;
	}

	var fails = new Array();
	var course = new Array();
	$.ajax({
		type: "post",
		url: "../teacher/getFalis",
		async: false,
		data: {
			"xuenian": xuenian,
			"nianji": nianji,
			"major": zhuanye
		},
		success: function(data) {
			if(data == null || data.length == 0) {
				alert("暂无数据");
				return false;
			}
			$('#MajorFails').hide();
			$("#CourseGrade").hide();
			$('#MajorGrade').hide();
			$('#CourseFails').show();
			for(var index in data) {
				fails.push((data[index].fails * 100).toFixed(2));
				course.push(data[index].className + "班");
			}

			var myChart = echarts.init(document.getElementById('CourseFails'));
			var option = {
				tooltip: {
					show: true,
					formatter: '{b0}:{c0}%'

				},
				legend: {
					data: [zhuanye + "专业挂科率"]
				},
				xAxis: [{
					type: 'category',
					data: course
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					"name": zhuanye + "专业挂科率",
					"type": "bar",
					"data": fails,
					itemStyle: {
						normal: {
							label: {
								show: true, //开启显示
								position: 'top', //在上方显示
								textStyle: { //数值样式
									color: 'black',
									fontSize: 16,
								},
								formatter: function(params) {
									if(params.value == 0) {
										return '';
									} else {
										return params.value + '%';
									}
								}
							}
						}
					}
				}]
			};
			myChart.setOption(option);
			myChart.on('click', function(params) {
				var zhuanye = params.seriesName;
				zhuanye = zhuanye.substr(0, zhuanye.length - 5);
				var classNo = params.name;
				classNo = classNo.substr(0, classNo.length - 1);
				showDataDetail(zhuanye, xuenian, nianji, classNo);
			});
		},
		error: function() {
			alert("获取失败");
		}
	});

}

//获取学院各个专业的各分数段的人数
function showAcademyGrade() {
	var xuenian = $('#id_term_year option:selected').val();
	var nianji = $('#id_grade option:selected').val();
	var zhuanye = $('#id_major_name option:selected').val();
	$('#MajorFails').hide();
	$("#CourseGrade").hide();
	$('#MajorGrade').show();
	$('#CourseFails').hide();
	var number = new Array();
	var major = new Array();
	$.ajax({
		type: "post",
		url: "../teacher/getScoresCount",
		async: false,
		data: {
			"xuenian": xuenian,
			"nianji": nianji,
			"major": ''
		},
		success: function(data) {
			console.log(data);
			if(data == null || data.length == 0) {
				alert("暂无数据");
				return false;
			}
			$.each(data, function(key, value) {
				for(var index in value) {
					var i = major.indexOf(value[index].major)
					if(i < 0) {
						major.push(value[index].major);
						number[major.length - 1] = new Array(0, 0, 0, 0, 0);
						number[major.length - 1][exchange(key)] = value[index].num;
					} else {
						number[i][exchange(key)] = value[index].num;
					}

				}

			});
			var numData = new Array(5);
			for(var i = 0; i < 5; i++) {
				numData[i] = new Array();
			}
			for(var index in major) {
				for(var j in number[index]) {
					numData[j].push(number[index][j]);
				}
			}
			var myChart = echarts.init(document.getElementById('MajorGrade'));
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					},
					formatter: function(params) {
						var relVal = params[0].name;                   
						//alert(JSON.stringify(params))                       
						for(var i = 0, l = params.length; i < l - 1; i++) {             
							relVal += '<br/>' + params[i].seriesName  + ': ' + params[i].value + "个";                     
						}
						relVal += '<br/>' + params[params.length - 1].seriesName + ": " + params[params.length - 1].value + "个";                 
						return relVal;
					}
				},
				toolbox: {
					feature: {
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				legend: {
					data: ['0~60(分)', '60~70(分)', '70~80(分)', '80~90(分)', '90~100(分)']
				},
				xAxis: [{
					type: 'category',
					data: major,
					axisPointer: {
						type: 'shadow'
					}
				}],
				yAxis: [{
					type : 'category',
					type: 'value',
					name: '人数',
					min: 0,
					max: 60,
					interval: 6,
					axisLabel: {
						formatter: '{value}'
					}
				}],
				series: [{
						name: '0~60(分)',
						type: 'bar',
						data: numData[0],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '60~70(分)',
						type: 'bar',
						data: numData[1],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '70~80(分)',
						type: 'bar',
						data: numData[2],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '80~90(分)',
						type: 'bar',
						data: numData[3],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					},
					{
						name: '90~100(分)',
						type: 'bar',
						data: numData[4],
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						}
					}
				]
			};
			myChart.setOption(option);
		},
		error: function() {
			alert("获取失败");
		}
	});
}
//根据分数确定数组位置
function exchange(grade) {
	switch(grade) {
		case "0":
			return 0;
		case "60":
			return 1;
		case "70":
			return 2;
		case "80":
			return 3;
		case "90":
			return 4;
	}
}
//显示数据表格详细信息
function showDataDetail(major, xuenian, nianji, classNo) {
	$.ajax({
		type: "post",
		url: "../teacher/getFailsDetails",
		async: true,
		data: {
			"xuenian": xuenian,
			"nianji": nianji,
			"major": major,
			"classNo": classNo
		},
		success: function(data) {
			if(!$('#data_table_node').isEmptyObject) {
				$('#data_table_node').empty();
			}
			$('#showFailsDetail').modal();
			for(var i = 0; i < data.length; i++) {
				var rowTr = document.createElement('tr');
				rowTr.className = "data_tr_node";
				var child = "<td>" + data[i].major + "</td><td>" +
					data[i].className + "班" + "</td><td>" + data[i].studentNo + "</td><td>" +
					data[i].studentName + "</td><td>" + data[i].termYear + "</td><td>" +
					data[i].courseName + "</td><td>" + data[i].score + "</td>";
				rowTr.innerHTML = child;

				$('#data_table_node').append(rowTr);
			}
		},
		error: function() {
			alert("获取失败");
		}
	});
}