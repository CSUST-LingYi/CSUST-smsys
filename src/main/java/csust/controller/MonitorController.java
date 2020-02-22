package csust.controller;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import csust.bean.BasicInfo;
import csust.bean.Course;
import csust.bean.Feedback;
import csust.bean.PersonDeduction;
import csust.bean.PersonSummary;
import csust.bean.Student;

import csust.service.MonitorService;
import csust.service.PublicService;
import csust.service.UserService;
import readExcel.ExportExcel;
import utils.StudentNoComparator;

@Controller
@RequestMapping("/monitor")
public class MonitorController {

	@Autowired
	PublicService publicService;

	@Autowired
	MonitorService monitorService;

	@Autowired
	UserService userService;

	private int count;

	@RequestMapping(value = "/summary")
	@RequiresRoles(value = { "monitor" })
	public String to_monitorSummary() {

		return "summary";
	}

	@RequestMapping(value = "/monitorIndex")
	@RequiresRoles(value = { "monitor" })
	public String to_monitorIndex(HttpServletRequest req) {

		return "monitorIndex";

	}

	@RequestMapping(value = "/subjsetting")
	@RequiresRoles(value = { "monitor" })
	public String to_subjsetting() {

		return "subjsetting";
	}

	@RequestMapping(value = "/personDetails", method = RequestMethod.GET)
	@RequiresRoles(value = { "monitor" })
	public String to_personDetails() {

		return "personDetails";
	}
	
	@RequestMapping(value = "/view-feedback", method = RequestMethod.GET)
	@RequiresRoles(value = { "monitor" })
	public String to_viewfeedback() {

		return "view-feedback";
	}

	// 获取班长的信息
	@RequestMapping(value = "/getMonitorInfo", method = RequestMethod.GET)
	@RequiresRoles(value = { "monitor" })
	@ResponseBody
	public BasicInfo getMonitorInfo() {

		String userName = (String) SecurityUtils.getSubject().getPrincipal();

		BasicInfo info = monitorService.getMonitorInfo(userName);

		return info;
	}

	// 通过年级专业班级查询学生
	@RequestMapping(value = "/getClassStudents", method = RequestMethod.POST)
	@ResponseBody
	public List<Student> getClassStudents(HttpServletResponse rs, @RequestParam("nianji") String nianji,
			@RequestParam("major") String major, @RequestParam("classNo") int classNo) {

		List<Student> list = publicService.getStudentsByClass(nianji, major, classNo);

		// 学生按学号从小到大排序
		Collections.sort(list, new StudentNoComparator());

		return list;
	}

	// 查看该班级的所有科目
	@RequestMapping(value = "/getCourseByClass", method = RequestMethod.POST)
	@ResponseBody
	public List<Course> getCourseByClass(Course c) {

		// 这里的c注入了学年，年级，专业，班级
		List<Course> list = monitorService.getCourseByclass(c);

		return list;
	}

	// 增加一门课程
	@RequestMapping(value = "/addOneCourse", method = RequestMethod.POST)
	@ResponseBody
	public String addOneCourse(Course c) {

		monitorService.addCourse(c);

		return "success";
	}

	// 删除一门课程
	@RequestMapping(value = "/deleteOneCourse", method = RequestMethod.GET)
	@ResponseBody
	public String deleteOneCourse(@RequestParam("cid") int id) {

		monitorService.deleteCourse(id);
		;

		return "success";
	}

	// 修改一门课程
	@RequestMapping(value = "/updateOneCourse", method = RequestMethod.POST)
	@ResponseBody
	public String updateOneCourse(Course c) {

		monitorService.updateCourse(c);
		;

		return "success";
	}

	// 查询班级的汇总情况
	@RequestMapping(value = "/getSummaryByClass", method = RequestMethod.POST)
	@ResponseBody
	public List<PersonSummary> getSummaryByClass(@RequestParam("xuenian") String xuenian,
			@RequestParam("nianji") String nianji, @RequestParam("major") String major,
			@RequestParam("classNo") int classNo) {

		List<PersonSummary> list = publicService.getSummaryByClass(xuenian, nianji, major, classNo);

		return list;
	}
	@RequestMapping(value = "/getTban",method = RequestMethod.POST)
	@ResponseBody
	public boolean  getTban(@RequestParam("xuenian") String xuenian,@RequestParam("studentNo") String studentNo) {
		
		int ban = publicService.getTban(xuenian, studentNo);
		if (ban==1) {
			return true;
		}
		return false;
	}
	// 通过年级专业班级查询导出excel
	@RequestMapping(value = "/exportComparisonExcel", method = RequestMethod.POST)
	public String exportComparisonExcel(HttpServletRequest req, HttpServletResponse response,
			@RequestParam("xuenian") String xuenian, 
			@RequestParam("nianji") String nianji,
			@RequestParam(value = "major", defaultValue = "majo") String major,
			@RequestParam(value = "classNo", defaultValue = "99") int classNo) {

		List<PersonSummary> data = publicService.getSummaryByClass(xuenian, nianji, major, classNo);
		ExportExcel<PersonSummary> export = new ExportExcel<PersonSummary>();

		String path = req.getServletContext().getRealPath("") + "/file/";

		String fileName = path + nianji + major + classNo + ".xls";

		FileOutputStream out = null;
		if (major.equals("majo")) {
			major = "";
		}
		String className = "";
		if (classNo != 99) {
			className = String.valueOf(classNo);
		}

		String[] top = { xuenian + "学年      ", nianji + "年级     ", major + "专业     ", className + "班级        ",
				"综合测评以及评奖评优表" };

		String[] headers = { "序号", "学号", "姓名", "智育分", "德育分", "体育分", "扣分", "挂科数", "总分", "排名", "个人签名" };

		try {
			out = new FileOutputStream(fileName);
			export.exportComparisonExcel("综测成绩表", top, headers, data, out);
		} catch (Exception e) {
			e.printStackTrace();
		}

		export.download(fileName, response);

		return null;
	}

	// 班长端审核一个学生
	@RequestMapping(value = "/checkOnePersonSummary", method = RequestMethod.POST)
	@ResponseBody
	public String checkOnePersonSummary(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String studentNo, @RequestParam("status") boolean status) {

		publicService.checkOneStudent(xuenian, studentNo, status);

		return "success";
	}
	//学习部 教师端审核
	@RequestMapping(value = "/checkOnePersonSummaryT", method = RequestMethod.POST)
	@ResponseBody
	public String checkOnePersonSummaryT(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String studentNo, @RequestParam("status") boolean status) {

		publicService.checkOneStudentT(xuenian, studentNo, status);

		return "success";
	}

	/************* 扣分项 ********************/
	// 增加一项个人扣分项
	@RequestMapping(value = "/addPersonDeduction", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String addPersonDeduction(PersonDeduction pd) {

		if (publicService.getPersonOneDeduction(pd.getXuenian(), pd.getStudentNo(), pd.getDid()) == null) {
			publicService.addPersonDeduction(pd);
		} else {
			return "已存在该条记录";
		}

		return "success";
	}

	// 修改一项个人扣分项
	@RequestMapping(value = "/updatePersonDeduction", method = RequestMethod.POST)
	@ResponseBody
	public String updatePersonDeduction(PersonDeduction pd) {

		publicService.updatePersonDeduction(pd);

		return "success";
	}

	// 删除一项个人扣分项
	@RequestMapping(value = "/deletePersonDeduction", method = RequestMethod.GET)
	@ResponseBody
	public String deletePersonDeduction(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String studentNo, @RequestParam("id") int id) {

		publicService.deletePersonDeduction(xuenian, studentNo, id);

		return "success";
	}

	// 查看一个人所有的扣分项
	@RequestMapping(value = "/listPersonDeduction", method = RequestMethod.GET)
	@ResponseBody
	public List<PersonDeduction> listPersonDeduction(@RequestParam(value = "xuenian") String xuenian,
			@RequestParam(value = "studentNo") String studentNo) {

		List<PersonDeduction> list = publicService.listPersonDeduction(xuenian, studentNo);

		return list;
	}
	
	@RequestMapping(value = "/getFeedback",method = RequestMethod.POST)
	@ResponseBody
	@RequiresRoles(value = {"monitor","stuAdmin"},logical = Logical.OR)
	public List<List<Feedback>> getFeedbacks(@RequestParam(value = "monitorNo") String[] monitorNo) {
		String[] mos = monitorNo;
		List<List<Feedback>> fbList = new ArrayList();
		for(String s:mos) {
			System.out.println(s);
			fbList.add(monitorService.getFeedbacks(s));
		}		
		return fbList;
	}	
	
	@RequestMapping(value = "/countUnreadMsg",method = RequestMethod.POST)
	@ResponseBody
	@RequiresRoles("monitor")
	public boolean countUnreadMsg(@RequestParam(value = "monitorNo") String[] monitorNo) {
		int count = 0;
		String[] mos = monitorNo;
		for(String mo:mos) {
			count = count + monitorService.countUnreadMsg(mo);
		}
		
		if (count>0) {
			
			return true;
		}
		return false;
		
	}
	


}
