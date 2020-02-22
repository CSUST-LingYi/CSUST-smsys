package csust.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import csust.service.QueryService;

import csust.service.StudentService;
import csust.service.UserService;

@Controller
@RequestMapping("")
public class deleteController {
	@Autowired
	StudentService studentService;

	@Autowired
	UserService userService;

	@Autowired
	QueryService queryService;

	@RequestMapping(value = "deleteGrade", method = RequestMethod.POST) // 删除成绩
	@ResponseBody
	public String deleteGrade(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "termNo") String termNo) {
		queryService.deleteGrade(studentNo, termNo);
		String mess = "success!";
		return mess;
	}

	@RequestMapping(value = "deletePractice", method = RequestMethod.POST) // 删除实践信息
	@ResponseBody
	public String deletePractice(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "practiceName") String practiceName, @RequestParam(value = "type") String type,
			@RequestParam(value = "startTime") String startTime, @RequestParam(value = "endTime") String endTime) {
		queryService.deletePractice(studentNo, practiceName, type, startTime, endTime);
		String mess = "success!";
		return mess;
	}

	@RequestMapping(value = "deleteJL", method = RequestMethod.POST,produces="text/html;charset=UTF-8;") // 删除奖励信息
	@ResponseBody
	public String deleteJL(@RequestParam(value = "sid") int JLId) {
		queryService.deleteJL(JLId);
		String mess = "删除成功!";
		return mess;
	}

	@RequestMapping(value = "deleteSkill", method = RequestMethod.POST,produces="text/html;charset=UTF-8;") // 删除技能信息
	@ResponseBody
	public String deleteSkill(@RequestParam(value = "sid") int skillId) {
		queryService.deleteSkill(skillId);
		String mess = "删除成功!";
		return mess;
	}
}
