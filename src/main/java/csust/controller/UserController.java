package csust.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import csust.bean.User;
import csust.service.UserService;
import readExcel.imgPojo;
import utils.UserType;

@Controller
@RequestMapping("")
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping("/chen")
	public String chen() {

		return "schoolmate/chen";
	}
	@RequestMapping("/zhuan")
	public String zhuan() {

		return "schoolmate/zhuan";
	}
	@RequestMapping("/fang")
	public String fang() {

		return "schoolmate/fang";
	}
	
	@RequestMapping("/zhao")
	public String zhao() {

		return "schoolmate/zhao";
	}
	@RequestMapping("/wang")
	public String wang() {

		return "schoolmate/wang";
	}
	@RequestMapping("/hu")
	public String hu() {

		return "schoolmate/hu";
	}
	@RequestMapping("/wu")
	public String wu() {

		return "schoolmate/wu";
	}
	@RequestMapping("/ding")
	public String ding() {

		return "schoolmate/ding";
	}
	
	/****** 没有权限跳转到该界面 ********/
	@RequestMapping("/unauthorized")
	public String unauthorizedUrl() {

		return "403";
	}

	@RequestMapping("/index") // 跳转到登录界面
	public String login__() {
		return "login";
	}
	
	//@RequestMapping("/404")
	//public String error() {
	//	return "404_Not_Found";
	//}
	
	@RequestMapping("/indexPage") // 跳转首页讲座的界面
	public String homePage() {

		return "indexPage";
	}

	@RequestMapping("/Alumni") // 跳转首页校友的界面
	public String Alumni() {

		return "Alumni";
	}

	@RequestMapping("/lectures") // 跳转首页的所有的讲座的界面
	public String lecture() {

		return "lectures";
	}

	@RequestMapping("/lectureDetails") // 跳转讲座的详细的界面
	public String lectureDetails() {

		return "lectureDetails";
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST) // 登录功能
	@ResponseBody
	public String to_login(@RequestParam(value = "username") String name,
			@RequestParam(value = "password") String password,
			@RequestParam(value = "upway", defaultValue = "0") String upway,
			HttpSession se) {

		se.setAttribute("name", name);
		UserType userType = UserType.getTypeByValue(upway);

		Subject subject = SecurityUtils.getSubject();
		

		UsernamePasswordToken token = new UsernamePasswordToken(name, password);
		try {
			subject.login(token);
			Session session = subject.getSession();
			session.setAttribute("subject", subject);
			
			switch (userType) {
			case student:
				return "b";
			case monitor:
				return "m";
			case studyDept:
				return "s";
			case teacher:
				return "a";
			}

		} catch (AuthenticationException e) {

			return "l";
		}

		return "l";
	}

	@RequestMapping(value = "setTUser", method = RequestMethod.POST) // 添加老师用户
	@ResponseBody
	public String setTUser(User tuser) {

		User user = userService.getUserByName(tuser.getUserName());
		if (user == null) {
			userService.addUser(tuser);
			String mess = "sucess!";
			return mess;
		} else {
			String mess = "The user already exists!";
			return mess;
		}
	}

	@RequestMapping(value = "listTeacherUser", method = RequestMethod.POST) // 查询所有老师用户
	@ResponseBody
	public List<User> listTeacherUser(@RequestParam("userType") String userType) {

		List<User> ts = userService.listUser(userType);

		return ts;
	}

	@RequestMapping(value = "deleteTeacherUser", method = RequestMethod.POST) // 删除教师用户
	@ResponseBody
	public String deleteTeacherUser(String teacher) {

		userService.deleteUser(teacher);
		String mess = "sucess";

		return mess;
	}

	@RequestMapping(value = "b", method = RequestMethod.GET)
	@RequiresRoles(value = { "student", "monitor" }, logical = Logical.OR)
	public String to_stuPage() {

		return "studentPage";
	}

	@RequestMapping(value = "getStudentNo", method = RequestMethod.POST) // 登陆后得到学号
	@ResponseBody
	@RequiresRoles(value = { "student", "monitor" }, logical = Logical.OR)
	public String getStudentNo() {

		String userName = (String) SecurityUtils.getSubject().getPrincipal();

		return userName;
	}

	@RequestMapping(value = "uploadImg", method = RequestMethod.POST) // 上传用户图片
	@ResponseBody
	public String uploadImg(HttpServletRequest request, imgPojo image) throws IllegalStateException, IOException {
		String name = request.getSession().getAttribute("name").toString();

		if (image.getImage().getName() == null || image.getImage() == null) {
			return "上传的图片为空（注意上传图片时请关闭打开的图片）";
		}

		String newFileName = name + ".jpg";
		File newFile = new File(request.getServletContext().getRealPath("/image"), newFileName);
		newFile.getParentFile().mkdirs();
		String n = (String) request.getServletContext().getRealPath("/image").toString();
		System.out.println(n);
		image.getImage().transferTo(newFile);
		String mess = "sucess!";
		return mess;
	}

	// 修改学生密码
	@RequestMapping(value = "updateStudentPassword", method = RequestMethod.POST) // 登陆后得到学号
	@ResponseBody
	public String updateStudentPassword(@RequestParam("sno") String sno) {
		userService.updatePassword(sno, "123456");// 把密码重置为123456
		String mess = "success";
		return mess;
	}
}
