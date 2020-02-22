package csust.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestScope;

import csust.bean.Grade;
import csust.bean.JL;
import csust.bean.LeaveTip;
import csust.bean.Practice;
import csust.bean.Project;
import csust.bean.Rewardinfo;
import csust.bean.Skill;
import csust.bean.Student;
import csust.bean.Submission;
import csust.bean.XJYD;
import csust.bean.XJZC;
import csust.bean.psStudent;
import csust.bean.punish;
import csust.service.AlertStudentService;
import csust.service.JLViewService;
import csust.service.QueryService;
import csust.service.StudentService;
import readExcel.imgPojo;

@Controller
@RequestMapping("")
public class addController {

	@Autowired
	QueryService queryService;

	@Autowired
	JLViewService jlViewService;

	@Autowired
	StudentService studentService;

	@Autowired
	AlertStudentService alertStudentService;

	@RequestMapping(value = "addLeave", method = RequestMethod.POST) // 学生请假信息录入
	@ResponseBody
	public String addLeave(LeaveTip leavetip) {

		leavetip.setStatus(0);// 设置状态为0（未审核）
		if (studentService.getLeaveTip(leavetip.getSno(), leavetip.getLeavebegin(), leavetip.getStatus()).size() == 0) {
			studentService.addLeaveTip(leavetip);
			;// 如果请假表没有信息则增加一条记录
		} else {
			studentService.updateLeaveTip(leavetip);// 否则修改
		}
		String mess = "success!";

		return mess;

	}

	@RequestMapping(value = "listLeave", method = RequestMethod.GET) // 学生请假学号查询
	@ResponseBody
	public List<LeaveTip> listLeave(@RequestParam(value = "sno") String sno) {

		// 通过学号查询请假信息
		List<LeaveTip> list = studentService.listLeaveTip(sno);

		return list;

	}

	@RequestMapping(value = "getLeaveByStatus", method = RequestMethod.POST) // 查看未批准的请假信息
	@ResponseBody
	public List<LeaveTip> getLeaveByStatus(@RequestParam(value = "stuType") String stuType) {

		// 查看未批准的请假信息
		List<LeaveTip> list = studentService.getLeaveTipBystatus(0, stuType);

		return list;

	}

	@RequestMapping(value = "getLeaveByTime", method = RequestMethod.POST) // 根据时间查询请假信息
	@ResponseBody
	public List<LeaveTip> getLeaveByTime(@RequestParam(value = "time") String time,
			@RequestParam(value = "termYear") String termYear, @RequestParam(value = "stuType") String stuType) {

		List<LeaveTip> list = studentService.getLeaveTipByTime(termYear, time, stuType);

		return list;

	}

	@RequestMapping(value = "handleLeave", method = RequestMethod.POST,produces = "text/plain;charset=UTF-8") // 批准请假信息
	@ResponseBody
	public String handleLeave(LeaveTip leavetip, HttpServletRequest request) throws Exception {
		request.setCharacterEncoding("utf-8");
		String name = (String) request.getSession().getAttribute("name");// 查看操作是账号处不处于在线状态

		String mess = null;
		System.out.println(name);
		if (name == null) {
			mess = "登录超时，请重新登录";
			//mess = "login failed";// 如果不在线，则重新登录

			return mess;
		}

		leavetip.setUserName(name);// 记录是哪个账号处理的

		studentService.approveLeaveTip(leavetip);// 处理请假信息

		mess = "处理成功";

		return mess;

	}

	@RequestMapping(value = "updateStudent", method = RequestMethod.POST) // 学生基本信息录入
																			// 此时保存在中间学生表，而不是最后的学生表里
	@ResponseBody
	public String addStudent(Student student) {

		student.setStatus(0);// 设置状态为0（未审核）
		if (alertStudentService.selectAlertStudent(student.getStudentNo()) == null) {
			alertStudentService.addAlertStudent(student);
			;// 如果中间表没有信息则增加一条记录
		} else {
			alertStudentService.updateAlertStudent(student);// 否则修改
		}
		String mess = "success!";
		// System.out.println("success");
		return mess;

	}

	@RequestMapping(value = "listAlertStudent", method = RequestMethod.POST) // 从中间表里查询所有申请修改信息的学生
	@ResponseBody
	public List<Student> listAlertStudetn(@RequestParam(value = "stuType") String stuType) {

		List<Student> als = alertStudentService.listAlertStudent(stuType);// 查询中间表里的学生（status=0的学生）

		return als;

	}

	@RequestMapping(value = "getAlertStudentInfo", method = RequestMethod.GET) // 从中间表里查询一个申请修改信息的学生
	@ResponseBody
	public List<Student> getAlertStudentInfo(@RequestParam(value = "studentNo") String studentNo) {

		List<Student> ss = new ArrayList<Student>();

		Student alerts = alertStudentService.selectAlertStudent(studentNo);// 从中间表里查询学生的信息

		Student befores = queryService.selectStudent(studentNo);// 从学生表里查询学生的信息

		ss.add(alerts);

		ss.add(befores);

		return ss;

	}

	@RequestMapping(value = "confirmAlertStudent", method = RequestMethod.POST) // 把中间表里的学生信息保存到学生表里面去，同时把该条记录的状态修改为1
	@ResponseBody
	public String confirmAlertStudent(@RequestParam(value = "box[]") String[] box) {

		Student stu = null;
		int status = 1; // 设置状态为1----已审核，已批准
		for (String studentNo : box) {
			alertStudentService.updateStatus(studentNo, status);// 根据学号把状态改为1

			stu = alertStudentService.selectAlertStudent(studentNo);// 根据学号从中间表里面查询学生

			queryService.updateStudent(stu);// 把中间表里面查出来的学生保存到学生表里面去
		}
		String mess = "success";
		return mess;

	}

	@RequestMapping(value = "deleteAlertStudent", method = RequestMethod.POST) // 根据学号删除中间表里的记录
	@ResponseBody
	public String deleteAlertStudent(@RequestParam(value = "studentNo") String studentNo) {

		alertStudentService.deleteAlertStudent(studentNo);// 根据学号删除

		String mess = "success";

		return mess;

	}

	@RequestMapping(value = "refuseAlertStudent", method = RequestMethod.POST) // 拒绝学生修改他的信息，同时把该条记录的转状态修改为2
	@ResponseBody
	public String refuseAlertStudent(@RequestParam(value = "studentNo") String studentNo) {

		int status = 2; // 设置状态为2----已审核，未批准

		alertStudentService.updateStatus(studentNo, status);// 根据学号把状态改为2

		String mess = "The student's amendment has been rejected";
		return mess;

	}

	@RequestMapping(value = "addpunish", method = RequestMethod.POST) // 违规信息录入
	@ResponseBody
	public String addpunish(@RequestParam(value = "stuNum") String studentNo, @RequestParam(value = "Time") String time,
			@RequestParam(value = "reason") String reason, @RequestParam(value = "result") String result) {
		punish p = new punish();
		p.setStudentNo(studentNo);
		p.setPunishTime(time);
		;
		p.setPunishReason(reason);
		p.setPunishName(result);
		queryService.addPunish(p);
		return "getin3";
	}

	@RequestMapping(value = "getRewardName", method = RequestMethod.POST)
	@ResponseBody
	public List<Rewardinfo> getRewardName(Rewardinfo rewardinfo) {

		List<Rewardinfo> rs = jlViewService.getRewardinfo(rewardinfo);

		return rs;
	}

	@RequestMapping(value = "addRewardinfo", method = RequestMethod.POST) // 增加一条奖励的信息
	@ResponseBody
	public String addRewardinfo(Rewardinfo rewardinfo) {

		String mess = jlViewService.addRewardinfo(rewardinfo);

		return mess;
	}

	@RequestMapping(value = "addJL", method = RequestMethod.POST) // 奖励信息录入 成功
	@ResponseBody
	public String addJL(HttpServletRequest request, @RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "JLname") String JLname, @RequestParam(value = "JLlevel") String JLlevel,
			@RequestParam(value = "getTime") String getTime, @RequestParam(value = "sponsor") String sponsor,
			@RequestParam(value = "adviser") String adviser,
			@RequestParam(value = "termOrindividual") String termOrindividual,
			@RequestParam(value = "stuType") String stuType, imgPojo image) throws IllegalStateException, IOException {

		if (image.getImage().getName() == null || image.getImage() == null) {
			return "上传的图片为空（注意上传图片时请关闭打开的图片）";
		}
		if (!queryService.isExistJL(studentNo, JLname, JLlevel, getTime)) {
			JL j = new JL();
			j.setStudentNo(studentNo);
			j.setJLname(JLname);
			j.setJLlevel(JLlevel);
			j.setGetTime(getTime);
			j.setAdviser(adviser);
			j.setSponsor(sponsor);
			j.setTermOrindividual(termOrindividual);
			j.setStuType(stuType);
			String imageName = RandomStringUtils.randomAlphanumeric(10);
			j.setImageName(imageName);
			queryService.addJL(j);
			String newFileName = studentNo + imageName + ".jpg";
			File newFile = new File(request.getServletContext().getRealPath("/image"), newFileName);
			newFile.getParentFile().mkdirs();

			image.getImage().transferTo(newFile);
			String mess = "success!";

			return mess;
		} else {
			String mess = "already exist!";

			return mess;
		}
	}

	@RequestMapping(value = "addSkill", method = RequestMethod.POST) // 技能信息录入
																		// 成功
	@ResponseBody
	public String addSkill(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "skillName") String skillName, @RequestParam(value = "getTime") String getTime,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "getType") String getType) {
		if (!queryService.isExistSkill(studentNo, skillName, getTime)) {
			Skill s = new Skill();
			s.setStudentNo(studentNo);
			s.setSkillName(skillName);
			s.setTime(getTime);
			s.setType(getType);
			s.setStuType(stuType);
			queryService.addSkill(s);
			String mess = "success!";

			return mess;
		} else {
			String mess = "already exist!";
			System.out.println("err");
			return mess;
		}
	}

	@RequestMapping(value = "addPractice", method = RequestMethod.POST) // 实践信息录入
																		// 成功
	@ResponseBody
	public String addPractice(@RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "practiceName") String practiceName, @RequestParam(value = "type") String type,
			@RequestParam(value = "startTime") String startTime, @RequestParam(value = "stuType") String stuType,
			@RequestParam(value = "endTime") String endTime) {
		if (!queryService.isExistPractice(studentNo, practiceName, type, startTime, endTime)) {
			Practice p = new Practice();
			p.setStudentNo(studentNo);
			p.setPracticeName(practiceName);
			p.setType(type);
			p.setStartTime(startTime);
			p.setEndTime(endTime);
			p.setStuType(stuType);
			queryService.addPractice(p);
			String mess = "success";

			return mess;
		} else {
			String mess = "already exist!";

			return mess;
		}
	}

	@RequestMapping(value = "addPstudent", method = RequestMethod.POST) // 资助信息录入
																		// 成功
	@ResponseBody
	public String addPstudent(@RequestParam(value = "pstudentNo") String pstudentNo,
			@RequestParam(value = "SFZK") String SFZK, @RequestParam(value = "ZZname") String ZZname,
			@RequestParam(value = "ZZtime") String ZZtime, @RequestParam(value = "ZZmoney") int ZZmoney,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "ZZtype") String ZZtype) {
		if (!queryService.isExistPstudent(pstudentNo, SFZK, ZZname, ZZtime)) {
			psStudent p = new psStudent();
			p.setPstudentNo(pstudentNo);
			p.setSFZK(SFZK);
			p.setZZname(ZZname);
			p.setZZmoney(ZZmoney);
			p.setZZtime(ZZtime);
			p.setType(ZZtype);
			p.setStuType(stuType);
			queryService.addPstudent(p);
			String mess = "保存成功!";
			return mess;
		} else {
			String mess = "already exist!";
			System.out.println("err");
			return mess;
		}
	}

	@RequestMapping(value = "addProject", method = RequestMethod.POST) // 课题项目录入
																		// 成功
	@ResponseBody
	public String addProject(HttpServletRequest request, @RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "isFirstCharge") String isFirstCharge,
			@RequestParam(value = "projectName") String projectName, @RequestParam(value = "time") String time,
			@RequestParam(value = "stuType") String stuType, imgPojo image) throws IllegalStateException, IOException {

		if (image.getImage().getName() == null || image.getImage() == null) {
			return "上传的图片为空（注意上传图片时请关闭打开的图片）";
		}

		Project p = new Project();
		p.setStudentNo(studentNo);
		p.setProjectName(projectName);
		p.setIsFirstCharge(isFirstCharge);
		p.setTime(time);
		if (!queryService.isExistProject(p)) {
			p.setStuType(stuType);
			String imageName = RandomStringUtils.randomAlphanumeric(10);
			p.setImage(imageName);
			queryService.addProject(p);
			String newFileName = studentNo + imageName + ".jpg";
			File newFile = new File(request.getServletContext().getRealPath("/image"), newFileName);
			newFile.getParentFile().mkdirs();

			image.getImage().transferTo(newFile);
			String mess = "success!";

			return mess;
		} else {
			String mess = "already exist!";

			return mess;
		}
	}

	@RequestMapping(value = "addLWFB", method = RequestMethod.POST) // 课题项目录入 成功
	@ResponseBody
	public String addLWFB(HttpServletRequest request, @RequestParam(value = "studentNo") String studentNo,
			@RequestParam(value = "articleName") String articleName, @RequestParam(value = "type") String type,
			@RequestParam(value = "time") String time, @RequestParam(value = "periodical") String periodical,
			imgPojo image) throws IllegalStateException, IOException {

		if (image.getImage().getName() == null || image.getImage() == null) {
			return "上传的图片为空（注意上传图片时请关闭打开的图片）";
		}

		Submission s = new Submission();
		s.setStudentNo(studentNo);
		s.setArticleName(articleName);
		s.setType(type);
		s.setPeriodical(periodical);
		s.setTime(time);
		if (!queryService.isExistSubmission(s)) {
			String imageName = RandomStringUtils.randomAlphanumeric(10);
			s.setImage(imageName);
			queryService.addSubmission(s);
			String newFileName = studentNo + imageName + ".jpg";
			File newFile = new File(request.getServletContext().getRealPath("/image"), newFileName);
			newFile.getParentFile().mkdirs();

			image.getImage().transferTo(newFile);
			String mess = "success!";

			return mess;
		} else {
			String mess = "already exist!";

			return mess;
		}
	}

	@RequestMapping(value = "addGrade", method = RequestMethod.POST) // 学生成绩录入
																		// 成功
	@ResponseBody
	public String addGrade(Grade grade) {
		// 先判断该学生对应学期成绩是否存在
		Boolean b = queryService.isExistGrade(grade.getStudentNo(), grade.getTermNo());
		if (!b) {
			queryService.addGrade(grade);
			String mess = "success!";
			return mess;
		} else {
			String mess = "already exist!";

			return mess;
		}
	}

	@RequestMapping(value = "addXJYD", method = RequestMethod.POST) // 学籍异动信息录入
																	// 成功
	@ResponseBody
	public String addXJYD(XJYD xjyd) {
		Boolean b = queryService.isExistXJYD(xjyd.getStudentNo(), xjyd.getYDtime(), xjyd.getYDreason(), xjyd.getBZ());
		if (!b) {
			queryService.addXJYD(xjyd);
			String mess = "success!";

			return mess;
		} else {
			String mess = "already exist!";

			return mess;
		}
	}

	@RequestMapping(value = "addXJZC", method = RequestMethod.POST) // 学籍注册信息录入
																	// 成功
	@ResponseBody
	public String addXJZC(XJZC xjzc) {
		Boolean b = queryService.isExistXJZC(xjzc.getStudentNo(), xjzc.getZCyear(), xjzc.getTerm(), xjzc.isZCorNot());
		if (!b) {
			queryService.addXJZC(xjzc);
			String mess = "success!";

			return mess;
		} else {
			String mess = "already exist!";

			return mess;
		}
	}

	@RequestMapping(value = "selectStudent", method = RequestMethod.POST) // 学生基础信息查询
																			// 成功
	@ResponseBody
	public Student selectStudent(String studentNo) {
		return queryService.selectStudent(studentNo);
	}

	@RequestMapping(value = "selectGrade", method = RequestMethod.POST) // 学生成绩信息查询
																		// 成功
	@ResponseBody
	public List<Grade> selectGrade(String studentNo) {
		return queryService.selectGrade(studentNo);
	}

	@RequestMapping(value = "selectJL", method = RequestMethod.POST) // 学生奖励信息查询
																		// 成功
	@ResponseBody
	public List<JL> selectJL(String studentNo) {
		return queryService.selectJL(studentNo);
	}

	@RequestMapping(value = "selectSkill", method = RequestMethod.POST) // 学生技能信息查询
																		// 成功
	@ResponseBody
	public List<Skill> selectSkill(String studentNo) {
		return queryService.selectSkill(studentNo);
	}

	@RequestMapping(value = "selectPractice", method = RequestMethod.POST) // 学生实践信息查询
																			// 成功
	@ResponseBody
	public List<Practice> selectPractice(String studentNo) {
		return queryService.selectPractice(studentNo);
	}

	@RequestMapping(value = "selectPstudent", method = RequestMethod.POST) // 学生资助信息查询
																			// 成功
	@ResponseBody
	public List<psStudent> selectPstudent(String studentNo) {
		return queryService.selectPstudent(studentNo);
	}

	@RequestMapping(value = "selectProject", method = RequestMethod.POST) // 学生项目信息查询
																			// 成功
	@ResponseBody
	public List<Project> selectProject(String studentNo) {
		return queryService.selectProject(studentNo);
	}

	@RequestMapping(value = "selectLWFB", method = RequestMethod.POST) // 学生论文发表信息查询
																		// 成功
	@ResponseBody
	public List<Project> selectLWFB(String studentNo) {
		return queryService.selectLWFB(studentNo);
	}

	@RequestMapping(value = "selectXJYD", method = RequestMethod.POST) // 学籍异动信息查询
																		// 成功
	@ResponseBody
	public List<XJYD> selectXJYD(String studentNo) {
		return queryService.selectXJYD(studentNo);
	}

	@RequestMapping(value = "selectXJZC", method = RequestMethod.POST) // 学籍注册信息查询
																		// 成功
	@ResponseBody
	public List<XJZC> selectXJZC(String studentNo) {

		return queryService.selectXJZC(studentNo);
	}
}
