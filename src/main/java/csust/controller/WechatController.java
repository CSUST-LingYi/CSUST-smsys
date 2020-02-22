package csust.controller;

import java.util.Date;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import csust.bean.Registration;
import csust.bean.Student;
import csust.service.LectureService;
import csust.service.StudentService;
import csust.service.UserService;

@Controller
@RequestMapping("/weixin")
public class WechatController {

	@Autowired
	UserService userService;
	@Autowired
	LectureService lectureService;
	@Autowired
	StudentService studentService;

	@RequestMapping(value = "/weixinLogin", method = RequestMethod.POST)
	@ResponseBody
	public Student weixinLogin(@RequestParam(value = "username") String userName,
			@RequestParam(value = "password") String password) {

		Student s = new Student();
		s.setStudentNo("0");// 前端判断当为0时账号密码错误
		if (userService.getUser(userName, password) != null) {

			s = studentService.getStudentByN(userName);

		}
		return s;
	}	
	
	@RequestMapping(value = "/updateStudent_wx",method = RequestMethod.POST)
	@ResponseBody
	public String updateStudent_wx(Student student) {

		studentService.updateStudent_wx(student);

		return null;
	}
	@RequestMapping(value = "/addRegistration_wx",method = RequestMethod.POST)
	@ResponseBody
	public String addRegistration_wx(Registration registration) {

			Date d = new Date();
			registration.setRegistrationTime(d);

			String mess = lectureService.addRegistration_wx(registration);

			return mess;
		}
	
}
