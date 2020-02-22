
	//添加信息js
function isEmptyValue(obj){
	var x=0;
	for(var key in obj){  
          if(!obj[key]==""){
          	x++;
          }
    }
     if(x==0){return true;}else{return false};
	}

function add(){
	var infoBox ={};
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
	$("#add").modal('hide');

	}
}

	
	

	//同步信息
	function editInfo(ele){
		var temp={};
		var infos =document.getElementById("editInfo").getElementsByTagName("label");
		for(var k=0;k<infos.length;k++){
					temp[infos[k].innerHTML]=ele.parentElement.parentElement.children[k].innerHTML;
					infos[k].parentElement.nextElementSibling.children[0].value=temp[infos[k].innerHTML];
			}
		
			$("#editModal").modal('show');
			ele.className = "edit btn btn-default btn-xs mark";
		
	}
		
		var editObj = document.getElementsByClassName("edit");

		for(var i=0;i<editObj.length;i++){
			editObj[i].onclick = function(){
				editInfo(this);				
			};
		}


	//修改信息js

function ed(){
	var kobj = document.getElementById("editButton");
	var parentTr = document.getElementsByClassName("mark")[0].parentElement.parentElement;
	var infos =document.getElementById("editInfo").getElementsByTagName("label");
		for(var k=0;k<infos.length;k++){
					
					parentTr.children[k].innerHTML = document.getElementsByClassName("editInput")[k].value;//temp1[infos[k].innerHTML];
			}
		alert("修改成功");
		$("#editModal").modal('hide');
		var markObj = document.getElementsByClassName("mark");
		for(var i=0;i<markObj.length;i++){
			markObj[i].className="edit btn btn-default btn-xs";
		};
		
	}


	//删除信息
	function del(ele){
		var parent = ele.parentElement.parentElement;
		document.getElementById("show_tbody").removeChild(parent);
		//-----------
		//从数据库中删除
	var delObj=document.getElementsByClassName("del");
		for(var s=0;s<delObj.length;s++){
			delObj[s].onclick = function(){
				del(this);
			};
		}
	}
	
  	//菜单动画		
			$(function(){
			        $('.type-right').click(function(){
			            $(this).prev('.type-left').toggleClass('showListType')
			        });
			        $('.type-left ul li').click(function(){
			            $(this).addClass('active').siblings('li').removeClass('active')
			        });
			        document.getElementById("showMenuBox").onclick = function(){
			    	document.getElementById("showMenu").className= (document.getElementById("showMenu").className=="glyphicon glyphicon-chevron-right")?"glyphicon glyphicon-chevron-left":"glyphicon glyphicon-chevron-right";
			    }
			        document.getElementById("closeEdit").onclick = function(){
				removeClassMark();
			};
			document.getElementById("closeBtn").onclick = function(){
				removeClassMark();
			};
			if(!document.body.className=="modal-open"){
				removeClassMark();
			}
			    })
			    
			    
		//清楚mark类样式
		function removeClassMark(){
			var markObj = document.getElementsByClassName("mark");
				for(var i=0;i<markObj.length;i++){
					markObj[i].className="edit btn btn-default btn-xs";
				}
			}
			
	