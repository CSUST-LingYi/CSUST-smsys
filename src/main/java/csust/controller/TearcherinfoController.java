package csust.controller;

import java.util.List;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import csust.bean.TeacherInfo;
import csust.service.TeacherinfoService;

@Controller
@RequestMapping("")
@RequiresRoles("teacher")
public class TearcherinfoController {

	@Autowired
	TeacherinfoService teacherinfoService;

	@RequestMapping(value = "listTeacherInfo", method = RequestMethod.GET) // 查询所有的老师信息
	@ResponseBody
	public List<TeacherInfo> listAlertStudetn() {

		List<TeacherInfo> ts = teacherinfoService.listTeacherinfo();

		return ts;

	}

	@RequestMapping(value = "addTeacherInfo", method = RequestMethod.POST) // 增加的老师信息
	@ResponseBody
	public String addTeacherInfo(TeacherInfo teacherInfo) {

		String mess = teacherinfoService.addTeacherinfo(teacherInfo);

		return mess;

	}

	@RequestMapping(value = "updateTeacherInfo", method = RequestMethod.GET) // 修改的老师信息
	@ResponseBody
	public String updateTeacherInfo(TeacherInfo teacherInfo) {

		String mess = teacherinfoService.updateTeacherinfo(teacherInfo);

		return mess;

	}

	@RequestMapping(value = "deleteTeacherInfo", method = RequestMethod.GET) // 修改的老师信息
	@ResponseBody
	public String deleteTeacherInfo(int teacherId) {

		String mess = teacherinfoService.deleteTeacherinfo(teacherId);

		return mess;

	}
}
