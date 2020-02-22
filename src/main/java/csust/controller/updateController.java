package csust.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import csust.bean.*;
import csust.service.QueryService;

import csust.service.StudentService;
import csust.service.UserService;

@Controller
@RequestMapping("")
public class updateController {

	@Autowired
	StudentService studentService;

	@Autowired
	UserService userService;

	@Autowired
	QueryService queryService;

	@RequestMapping(value = "updatePassword", method = RequestMethod.POST) // 修改登陆密码
	@ResponseBody
	public String updatePassword(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "newPassword") String newPassword,
			@RequestParam(value = "oldPassword") String oldPassword,
			@RequestParam(value = "userType", defaultValue = "student") String userType) {
		if (userService.getUser(studentNo, oldPassword) != null) {
			System.out.println(studentNo + newPassword + oldPassword);
			userService.updatePassword(studentNo, newPassword);
			System.out.println("a");
			String data = "success!";
			return data;
		} else {
			String data = "修改失败,原密码错误!";
			System.out.println("b");
			return data;
		}
	}

	@RequestMapping(value = "updateGrade", method = RequestMethod.POST) // 修改学生成绩
	@ResponseBody
	public String updateGrade(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "termNo") String termNo, @RequestParam(value = "avgGrade") String avgGrade,
			@RequestParam(value = "avgCPA") String avgCPA) {
		queryService.updateGrade(studentNo, termNo, avgGrade, avgCPA);
		String mess = "修改成功";
		return mess;
	}

	@RequestMapping(value = "updatePractice", method = RequestMethod.POST) // 修改社会实践
	@ResponseBody
	public String updatePractice(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "practiceName") String practiceName, @RequestParam(value = "type") String type,
			@RequestParam(value = "startTime") String startTime, @RequestParam(value = "endTime") String endTime,
			@RequestParam(value = "update_practiceName") String update_practiceName,
			@RequestParam(value = "update_practiceType") String update_practiceType,
			@RequestParam(value = "update_startPTime") String update_startPTime,
			@RequestParam(value = "update_endPTime") String update_endPTime) {
		queryService.updatePractice(studentNo, update_practiceName, update_practiceType, update_startPTime,
				update_endPTime, practiceName, type, startTime, endTime);
		String mess = "success!";
		return mess;
	}

	@RequestMapping(value = "updatePstudent", method = RequestMethod.POST) // 修改资助信息
	@ResponseBody
	public String updatePstudent(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "ZZname") String ZZname, @RequestParam(value = "ZZtime") String ZZtime,
			@RequestParam(value = "update_ZZname") String update_ZZname,
			@RequestParam(value = "update_zz_Type") String update_zz_Type,
			@RequestParam(value = "update_ZZtime") String update_ZZtime) {
		queryService.updatePstudent(studentNo, update_ZZname, update_ZZtime, update_zz_Type, ZZname, ZZtime);
		String mess = "success!";
		return mess;
	}

	@RequestMapping(value = "updateStudent_T", method = RequestMethod.POST) // 教师端修改学生信息
	@ResponseBody
	public String updateStudent_T(Student student) {

		studentService.updateStudent_T(student);

		return null;
	}

	@RequestMapping(value = "updateProject", method = RequestMethod.POST) // 教师端修改学生信息
	@ResponseBody
	public String updateProject(Project p) {

		studentService.updateProject(p);

		return null;
	}
}
