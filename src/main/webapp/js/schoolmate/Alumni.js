
//查询某个校友风采的详细信息
function getAlumni(obj){
	var sid = $(obj).attr("sid");
	$.ajax({
		type:"get",
		url:"teacher/getAlumni",
		async:true,
		data:{"sid":sid},
		dataType:"json",
		success:function(data){
			console.log(data.sid);
		},
		error:function(){
			alert("系统出错，请联系管理员");
		}
	});
}

$(function(){
	$.ajax({
		type:"get",
		url:"teacher/listAlumniName",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data);
			var ul = $("#AlumniName");
			for (var i in data) {
				var li = $("<li sid="+data[i].sid+" onclick='getAlumni(this)'></li>");
				    li.append("<a href="+data[i].deeds+">"+data[i].name+"</a>");
				 ul.append(li);
			}
		},
		error:function(){
			alert("系统出错，请联系管理员");
		}
	});
    $('.close,.closeModal').click(function(){
        $('.modal').hide('fast');
    })
    $("#btn_login").click(function(){
        $("#loginModal").show('fast');
    })
    $("#login").click(function(){
        var userName = $("#userName").val();
        var password =  $("#password").val();

        if(userName.lenght<1 | password.length<1){
            alert("请输入账号或密码");
        }else{
            $.ajax({
                url:"./login",
                type:"post",
                dataType:"text",
                scriptCharset:"utf-8",
                data:{"username":userName,
                    "password":password,
                },
                success:function(data){
                    switch(data){
                        case 'l':alert("账号密码不正确");break;
                        case 'b':alert("登录成功");$("#loginModal").hide();break;
                    }

                },
                error:function(){
                    alert("登录出错");
                }

            })
        }
    })
})
