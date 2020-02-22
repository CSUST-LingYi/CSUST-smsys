package csust.controller;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.List;

import csust.bean.*;
import org.apache.ibatis.javassist.bytecode.stackmap.TypeData.ClassName;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import csust.mapper.QueryMapper;
import csust.service.JLViewService;
import csust.service.PracticeViewService;
import csust.service.PsStudentViewService;
import csust.service.PunishViewService;
import csust.service.QueryService;
import csust.service.SkillViewService;

import csust.service.StudentService;
import csust.service.UserService;
import csust.service.XJZCViewService;
import readExcel.ExportExcel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@RequestMapping("")
public class StuController {

	@Autowired
	XJZCViewService xjzcViewService;

	@Autowired
	PsStudentViewService psStudentViewService;

	@Autowired
	SkillViewService skillViewService;

	@Autowired
	PracticeViewService practiceViewService;

	@Autowired
	JLViewService jlViewService;

	@Autowired
	PunishViewService punishViewService;

	@Autowired
	StudentService studentService;

	@Autowired
	UserService userService;
	@Autowired 
	QueryMapper queryMapper;

	@RequestMapping(value = "getstuByNo", method = RequestMethod.POST) // 通过学号或者姓名查询学生
	@ResponseBody
	public Student getstuByNo(@RequestParam(value = "id", defaultValue = "201544078888") String id) {

		Student ss = studentService.getStudentByN(id);

		return ss;
	}

	@RequestMapping(value = "getstuByNo_name", method = RequestMethod.POST) // 通过学号或者姓名查询学生
	@ResponseBody
	public List<ALLfield> getStuByNO_Name(@RequestParam(value = "id", defaultValue = "201544078888") String NO_name,
			@RequestParam(value = "stuType", defaultValue = "本科生") String stuType) {

		List<ALLfield> ss = studentService.getStudent(NO_name, stuType);

		return ss;
	}

	@RequestMapping(value = "getStuByClass", method = RequestMethod.POST) // 通过班级查询学生
	@ResponseBody
	public PageInfo<ALLfield> getByClass(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "classNo", defaultValue = "信息管理与信息系统1588班") int classNo,
			@RequestParam(value = "nianji") String nianji, @RequestParam(value = "major") String major,
			@RequestParam(value = "stuType") String stuType) {

		PageHelper.startPage(pn, pa);
		List<ALLfield> ss = queryService.getStudentByClassName(nianji, major, classNo, stuType);
		PageInfo<ALLfield> page = new PageInfo<ALLfield>(ss, 5);
		return page;
	}

	@RequestMapping(value = "getclass", method = RequestMethod.POST) // 通过年级，专业查询班级
	@ResponseBody
	public List<String> getClass(@RequestParam(value = "nianji") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "stuType") String stuType) {

		List<String> Class = queryService.getClassByMajorAndTerm(nianji, major, stuType);
		return Class;
	}

	@RequestMapping(value = "getByNianjiAndMajor", method = RequestMethod.POST) // 通过年级专业查询学生
	@ResponseBody
	public PageInfo<ALLfield> getByNianjiAndMajor(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major", defaultValue = "信息管理与信息系统") String major,
			@RequestParam(value = "stuType") String stuType) {

		PageHelper.startPage(pn, pa);
		List<ALLfield> ss = queryService.getByNianjiAndMajor(nianji, major, stuType);
		PageInfo<ALLfield> page = new PageInfo<ALLfield>(ss, 5);
		return page;

	}

	@RequestMapping(value = "getAll", method = RequestMethod.POST) // 通过年级查询学生
	@ResponseBody
	public PageInfo<ALLfield> getAllByNianji(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "stuType") String stuType) {

		PageHelper.startPage(pn, pa);
		List<ALLfield> ss = queryService.getStudentByNianji(nianji, stuType);
		PageInfo<ALLfield> page = new PageInfo<ALLfield>(ss, 5);
		return page;
	}

	@RequestMapping(value = "getMonitorByStudent")   //通过学生查询班长
	@ResponseBody	
	public String[] getMonitorByStudent(@RequestParam(value = "id") String id) {
		Student o = (Student)queryMapper.getStudentByNo(id);
		String nianji = o.getTermYear();
		String major = o.getMajor();
		int className = o.getClassName();
		System.out.println(nianji+ major+className);
		System.out.println(queryService.getMonitorByStudent(nianji, major, className));
		return queryService.getMonitorByStudent(nianji, major, className);
		
	}
	@RequestMapping(value = "getMonitorByClass")	//通过班级查班长
	@ResponseBody
	public String[] getMonitorByClass(@RequestParam(value = "nianji") String nianji,@RequestParam(value = "major") String major,@RequestParam(value = "className") int className) {
		return queryService.getMonitorByStudent(nianji, major, className);
	}
	
	@RequestMapping(value = "a", method = RequestMethod.GET) // 跳转到老师界面
	@RequiresRoles(value = { "teacher" })
	public String to_teaPage() {

		return "teacher/teacherIndex";
	}

	@RequestMapping("to_graduateTeacher") // 跳转到研究生管理界面
	public String to_graduateTeacher() {
		return "graduateTeacher";
	}

	@Autowired
	QueryService queryService;

	@RequestMapping(value = "uploadEcxel", method = RequestMethod.POST) // 上传excel
	@ResponseBody
	public StringBuffer upload(@RequestParam(value = "stuType") String stuType,
			@RequestParam(value = "file") MultipartFile file) {

		if (file.getName() == null || file == null) {
			StringBuffer mess = new StringBuffer("上传的文件为空");
			return mess;
		}

		StringBuffer result = queryService.readExcelFile(file, stuType);
		return result;
	}

	// 违规情况插入
	@RequestMapping(value = "Setpunish", method = RequestMethod.POST)
	@ResponseBody
	public String setPunish(punish punish) {

		Student s = studentService.getStudentByN(punish.getStudentNo());
		String mess;
		if (s == null) {
			mess = "The student doesn't exist";
			return mess;
		}
		;
		if (queryService.isExistPunish(punish.getStudentNo(), punish.getPunishTime(), punish.getPunishReason(),
				punish.getPunishName())) {
			mess = "This record alread exists";
			return mess;
		}
		;
		studentService.setPunish(punish);
		mess = "sucess!";
		return mess;
	}

	// 学籍异动情况插入
	@RequestMapping(value = "SetXJYD", method = RequestMethod.POST)
	@ResponseBody
	public String setXJYD(XJYD xjyd) {
		// System.out.println(xjyd.getStudentNo()+xjyd.getBZ()+xjyd.getYDreason()+xjyd.getYDtime());
		Student s = studentService.getStudentByN(xjyd.getStudentNo());
		if (s == null) {
			String mess = "The student doesn't exist";
			return mess;
		}
		;
		studentService.setXJYD(xjyd);
		String mess = "sucess!";
		return mess;
	}

	// 获取奖励信息
	@RequestMapping(value = "getJL", method = RequestMethod.GET)
	@ResponseBody
	public List<JL> getJL(@RequestParam(value = "studentNo", defaultValue = "201544078888") String studentNo) {
		List<JL> jls = queryService.getJL(studentNo);

		return jls;

	}

	// 获取处分信息
	@RequestMapping(value = "getPunish", method = RequestMethod.POST)
	@ResponseBody
	public List<punish> getPunish(@RequestParam(value = "studentNo", defaultValue = "201544078888") String studentNo) {

		List<punish> punish = queryService.getPunish(studentNo);

		return punish;

	}

	// 获取过级证书情况
	@RequestMapping(value = "getLevel", method = RequestMethod.POST)
	@ResponseBody
	public List<Skill> getLevel(@RequestParam(value = "studentNo", defaultValue = "201544078888") String studentNo) {

		List<Skill> sk = queryService.getSkill(studentNo);

		return sk;

	}

	// 获取校内任职情况
	@RequestMapping(value = "getOffice", method = RequestMethod.POST)
	@ResponseBody
	public List<Practice> getOffice(
			@RequestParam(value = "studentNo", defaultValue = "201544078888") String studentNo) {

		List<Practice> pr = queryService.getPractice(studentNo, "校内");

		return pr;

	}

	// 获取校外活动情况
	@RequestMapping(value = "getActive", method = RequestMethod.POST)
	@ResponseBody
	public List<Practice> getActive(
			@RequestParam(value = "studentNo", defaultValue = "201544078888") String studentNo) {

		List<Practice> pr = queryService.getPractice(studentNo, "校外");

		return pr;

	}

	// 获取收到资助情况
	@RequestMapping(value = "getHelp", method = RequestMethod.POST)
	@ResponseBody
	public List<psStudent> getHelp(@RequestParam(value = "studentNo", defaultValue = "201544078888") String studentNo) {

		List<psStudent> ps = queryService.getPS(studentNo);

		return ps;

	}

	@RequestMapping(value = "getXjydView", method = RequestMethod.POST)
	@ResponseBody
	public List<XJYDView> getXjydView(@RequestParam(value = "stuType") String stuType) {

		List<XJYDView> data = queryService.getXjydView(stuType);

		return data;

	}

	@RequestMapping(value = "getGrade", method = RequestMethod.POST)
	@ResponseBody
	public List<Grade> getGrade(@RequestParam(value = "studentNo", defaultValue = "201544078888") String studentNo) {

		List<Grade> gr = queryService.getGrade(studentNo);

		return gr;

	}

	@RequestMapping(value = "getPunishByType", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<PunishView> getPunishByType(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "time") String time,
			@RequestParam(value = "punishType[]") String[] type) {

		PageHelper.startPage(pn, pa);
		int length = type.length;
		List<PunishView> p = null;
		if (major.equals("null") | major.equals("All")) {

			switch (length) {
			case 1:
				p = punishViewService.getPunishViewNianji1(nianji, time, type[0], stuType);
				break;
			case 2:
				p = punishViewService.getPunishViewNianji2(nianji, time, type[0], type[1], stuType);
				break;
			case 3:
				p = punishViewService.getPunishViewNianji3(nianji, time, type[0], type[1], type[2], stuType);
				break;
			case 4:
				p = punishViewService.getPunishViewNianji4(nianji, time, type[0], type[1], type[2], type[3], stuType);
				break;
			case 5:
				p = punishViewService.getPunishViewNianji5(nianji, time, type[0], type[1], type[2], type[3], type[4],
						stuType);
				break;
			case 6:
				p = punishViewService.getPunishViewNianji0(nianji, time, stuType);
				break;

			}
		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				switch (length) {
				case 1:
					p = punishViewService.getPunishViewMajor1(nianji, major, time, type[0], stuType);
					break;
				case 2:
					p = punishViewService.getPunishViewMajor2(nianji, major, time, type[0], type[1], stuType);
					break;
				case 3:
					p = punishViewService.getPunishViewMajor3(nianji, major, time, type[0], type[1], type[2], stuType);
					break;
				case 4:
					p = punishViewService.getPunishViewMajor4(nianji, major, time, type[0], type[1], type[2], type[3],
							stuType);
					break;
				case 5:
					p = punishViewService.getPunishViewMajor5(nianji, major, time, type[0], type[1], type[2], type[3],
							type[4], stuType);
					break;
				case 6:
					p = punishViewService.getPunishViewMajor0(nianji, major, time, stuType);
					break;

				}

			} else {
				switch (length) {
				case 1:
					p = punishViewService.getPunishViewClass1(nianji, major, className, time, type[0], stuType);
					break;
				case 2:
					p = punishViewService.getPunishViewClass2(nianji, major, className, time, type[0], type[1],
							stuType);
					break;
				case 3:
					p = punishViewService.getPunishViewClass3(nianji, major, className, time, type[0], type[1], type[2],
							stuType);
					break;
				case 4:
					p = punishViewService.getPunishViewClass4(nianji, major, className, time, type[0], type[1], type[2],
							type[3], stuType);
					break;
				case 5:
					p = punishViewService.getPunishViewClass5(nianji, major, className, time, type[0], type[1], type[2],
							type[3], type[4], stuType);
					break;
				case 6:
					p = punishViewService.getPunishViewClass0(nianji, major, className, time, stuType);
					break;
				}

			}
		}
		PageInfo<PunishView> page = new PageInfo<PunishView>(p, 5);
		return page;
	}

	@RequestMapping(value = "getJLByType", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<JLView> getJLByType(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "time") String time,
			@RequestParam(value = "type[]") String[] type) {

		PageHelper.startPage(pn, pa);
		int length = type.length;
		List<JLView> p = null;

		if (major.equals("null") | major.equals("All")) {
			switch (length) {
			case 1:
				p = jlViewService.getJLByNianji1(nianji, time, type[0], stuType);
				break;
			case 2:
				p = jlViewService.getJLByNianji2(nianji, time, type[0], type[1], stuType);
				break;
			case 3:
				p = jlViewService.getJLByNianji3(nianji, time, type[0], type[1], type[2], stuType);
				break;
			case 4:
				p = jlViewService.getJLByNianji0(nianji, time, stuType);
				break;
			}

		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				switch (length) {
				case 1:
					p = jlViewService.getJLByMajor1(nianji, major, time, type[0], stuType);
					break;
				case 2:
					p = jlViewService.getJLByMajor2(nianji, major, time, type[0], type[1], stuType);
					break;
				case 3:
					p = jlViewService.getJLByMajor3(nianji, major, time, type[0], type[1], type[2], stuType);
					break;
				case 4:
					p = jlViewService.getJLByMajor0(nianji, major, time, stuType);
					break;
				}
			} else {
				switch (length) {
				case 1:
					p = jlViewService.getJLByClass1(nianji, major, className, time, type[0], stuType);
					break;
				case 2:
					p = jlViewService.getJLByClass2(nianji, major, className, time, type[0], type[1], stuType);
					break;
				case 3:
					p = jlViewService.getJLByClass3(nianji, major, className, time, type[0], type[1], type[2], stuType);
					break;
				case 4:
					p = jlViewService.getJLByClass0(nianji, major, className, time, stuType);
					break;
				}
			}
		}
		PageInfo<JLView> page = new PageInfo<JLView>(p, 5);

		return page;

	}

	@RequestMapping(value = "getPracticeByType", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<PracticeView> getPracticeByType(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "time") String time,
			@RequestParam(value = "type[]") String[] type) {

		PageHelper.startPage(pn, pa);
		int length = type.length;
		List<PracticeView> p = null;

		if (major.equals("null") | major.equals("All")) {
			switch (length) {
			case 1:
				p = practiceViewService.getPracticeViewByNianji1(nianji, time, type[0], stuType);
				break;
			case 2:
				p = practiceViewService.getPracticeViewByNianji2(nianji, time, type[0], type[1], stuType);
				break;
			case 3:
				p = practiceViewService.getPracticeViewByNianji0(nianji, time, stuType);
				break;
			}
		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				switch (length) {
				case 1:
					p = practiceViewService.getPracticeViewByMajor1(nianji, major, time, type[0], stuType);
					break;
				case 2:
					p = practiceViewService.getPracticeViewByMajor2(nianji, major, time, type[0], type[1], stuType);
					break;
				case 3:
					p = practiceViewService.getPracticeViewByMajor0(nianji, major, time, stuType);
					break;
				}
			} else {
				switch (length) {
				case 1:
					p = practiceViewService.getPracticeViewByClass1(nianji, major, className, time, type[0], stuType);
					break;
				case 2:
					p = practiceViewService.getPracticeViewByClass2(nianji, major, className, time, type[0], type[1],
							stuType);
					break;
				case 3:
					p = practiceViewService.getPracticeViewByClass0(nianji, major, className, time, stuType);
					break;
				}
			}
		}
		PageInfo<PracticeView> page = new PageInfo<PracticeView>(p, 5);

		return page;

	}

	@RequestMapping(value = "getSkillByType", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<SkillView> getSkillByType(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "type[]") String[] type) {

		PageHelper.startPage(pn, pa);
		int length = type.length;
		List<SkillView> p = null;

		if (major.equals("null") | major.equals("All")) {
			switch (length) {
			case 1:
				p = skillViewService.getSkillViewByNianji1(nianji, type[0], stuType);
				break;
			case 2:
				p = skillViewService.getSkillViewByNianji2(nianji, type[0], type[1], stuType);
				break;
			case 3:
				p = skillViewService.getSkillViewByNianji3(nianji, type[0], type[1], type[2], stuType);
				break;
			case 4:
				p = skillViewService.getSkillViewByNianji0(nianji, stuType);
				break;
			}
		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				switch (length) {
				case 1:
					p = skillViewService.getSkillViewByMajor1(nianji, major, type[0], stuType);
					break;
				case 2:
					p = skillViewService.getSkillViewByMajor2(nianji, major, type[0], type[1], stuType);
					break;
				case 3:
					p = skillViewService.getSkillViewByMajor3(nianji, major, type[0], type[1], type[2], stuType);
					break;
				case 4:
					p = skillViewService.getSkillViewByMajor0(nianji, major, stuType);
					break;
				}
			} else {
				switch (length) {
				case 1:
					p = skillViewService.getSkillViewByClass1(nianji, major, className, type[0], stuType);
					break;
				case 2:
					p = skillViewService.getSkillViewByClass2(nianji, major, className, type[0], type[1], stuType);
					break;
				case 3:
					p = skillViewService.getSkillViewByClass3(nianji, major, className, type[0], type[1], type[2],
							stuType);
					break;
				case 4:
					p = skillViewService.getSkillViewByClass0(nianji, major, className, stuType);
					break;
				}
			}
		}
		PageInfo<SkillView> page = new PageInfo<SkillView>(p, 5);

		return page;

	}

	@RequestMapping(value = "getPsStudentByType", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<PsStudentView> getPsStudentByType(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "type[]") String[] type) {

		PageHelper.startPage(pn, pa);
		int length = type.length;
		List<PsStudentView> p = null;

		if (major.equals("null") | major.equals("All")) {
			switch (length) {
			case 1:
				p = psStudentViewService.getPsViewByNianji1(nianji, type[0], stuType);
				break;
			case 2:
				p = psStudentViewService.getPsViewByNianji2(nianji, type[0], type[1], stuType);
				break;
			case 3:
				p = psStudentViewService.getPsViewByNianji0(nianji, stuType);
				break;
			}
		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				switch (length) {
				case 1:
					p = psStudentViewService.getPsViewByMajor1(nianji, major, type[0], stuType);
					break;
				case 2:
					p = psStudentViewService.getPsViewByMajor2(nianji, major, type[0], type[1], stuType);
					break;
				case 3:
					p = psStudentViewService.getPsViewByMajor0(nianji, major, stuType);
					break;
				}
			} else {
				switch (length) {
				case 1:
					p = psStudentViewService.getPsViewByClass1(nianji, major, className, type[0], stuType);
					break;
				case 2:
					p = psStudentViewService.getPsViewByClass2(nianji, major, className, type[0], type[1], stuType);
					break;
				case 3:
					p = psStudentViewService.getPsViewByClass0(nianji, major, className, stuType);
					break;
				}
			}
		}
		PageInfo<PsStudentView> page = new PageInfo<PsStudentView>(p, 5);

		return page;

	}

	@RequestMapping(value = "getZCByType", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<XjzcView> getZCByType(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "term") String term, @RequestParam(value = "termYear") String zcYear,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "type[]") String[] type) {
		System.out.println(major + className);
		PageHelper.startPage(pn, pa);
		int length = type.length;
		List<XjzcView> p = null;
		if (major.equals("null") | major.equals("All")) {
			switch (length) {
			case 1:
				if (type[0].equals("1")) {
					p = xjzcViewService.getXjzcViewByNianjiYes(nianji, zcYear, term, stuType);
				} else {
					p = xjzcViewService.getXjzcViewByNianjiNot(nianji, zcYear, term, stuType);
				}
				;
				break;
			case 2:
				p = xjzcViewService.getXjzcViewByNianjiAll(nianji, zcYear, term, stuType);
			}

		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				switch (length) {
				case 1:
					if (type[0].equals("1")) {
						p = xjzcViewService.getXjzcViewByMajorYes(nianji, major, zcYear, term, stuType);
					} else {
						p = xjzcViewService.getXjzcViewByMajorNot(nianji, major, zcYear, term, stuType);
					}
					;
					break;
				case 2:
					p = xjzcViewService.getXjzcViewByMajorAll(nianji, major, zcYear, term, stuType);
				}
			} else {
				switch (length) {
				case 1:
					if (type[0].equals("1")) {
						p = xjzcViewService.getXjzcViewByClassYes(nianji, major, className, zcYear, term, stuType);
					} else {
						p = xjzcViewService.getXjzcViewByClassNot(nianji, major, className, zcYear, term, stuType);
					}
					;
					break;
				case 2:
					p = xjzcViewService.getXjzcViewByClassAll(nianji, major, className, zcYear, term, stuType);
				}
			}
		}
		PageInfo<XjzcView> page = new PageInfo<XjzcView>(p, 5);

		return page;
	}

	@RequestMapping(value = "getStudentBySex", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<ALLfield> getStudentBySex(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "sex") String sex) {
		PageHelper.startPage(pn, pa);
		List<ALLfield> p = null;
		if (major.equals("null") | major.equals("All")) {
			p = queryService.getStudentBySexAndNianji(nianji, sex, stuType);

		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				p = queryService.getStudentBySexAndMajor(nianji, major, sex, stuType);
			} else {
				p = queryService.getStudentBySexAndClass(nianji, major, className, sex, stuType);
			}
		}

		PageInfo<ALLfield> page = new PageInfo<ALLfield>(p, 5);
		// System.out.println(page.getList());
		return page;
	}

	@RequestMapping(value = "getStudentByMZ", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<ALLfield> getStudentByMZ(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "mz") String mz) {
		PageHelper.startPage(pn, pa);
		List<ALLfield> p = null;
		if (major.equals("null") | major.equals("All")) {
			p = queryService.getStudentByMZAndNianji(nianji, mz, stuType);

		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				p = queryService.getStudentByMZAndMajor(nianji, major, mz, stuType);
			} else {
				p = queryService.getStudentByMZAndClass(nianji, major, className, mz, stuType);
			}
		}

		PageInfo<ALLfield> page = new PageInfo<ALLfield>(p, 5);

		return page;
	}

	@RequestMapping(value = "getStudentByZZMM", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<ALLfield> getStudentByZZMM(@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "zzmm") String zzmm) {
		PageHelper.startPage(pn, pa);
		List<ALLfield> p = null;
		if (major.equals("null") | major.equals("All")) {
			p = queryService.getStudentByZZMMAndNianji(nianji, zzmm, stuType);

		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				p = queryService.getStudentByZZMMAndMajor(nianji, major, zzmm, stuType);
			} else {
				p = queryService.getStudentByZZMMAndClass(nianji, major, className, zzmm, stuType);
			}
		}

		PageInfo<ALLfield> page = new PageInfo<ALLfield>(p, 5);

		return page;
	}
	
	@RequestMapping(value = "getStudentByCommonQuery", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<ALLfield> getStudentByCommonQuery(
			@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "10") int pa,
			@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, 
			@RequestParam(value = "className",defaultValue = "0") Integer className,
			@RequestParam(value = "stuType") String stuType, 
			@RequestParam(value = "mingzu") String mingzu,
			@RequestParam(value = "zzmm") String zzmm,
			@RequestParam(value = "sex") String sex) {
		PageHelper.startPage(pn, pa);
		List<ALLfield> p = null;
		System.out.println(nianji+major+className+zzmm+mingzu+sex+stuType);
		//if (major.equals("null") | major.equals("All")) {
			p = queryService.getStudentByCommonQuery(nianji,major,className,zzmm,mingzu,sex,stuType);

		//} else {
		//	if (className.equals("null") | className.equals("All")) {
		//		p = queryService.getStudentByMZAndMajor(nianji, major, mz, stuType);
		//	} else {
		//		p = queryService.getStudentByMZAndClass(nianji, major, className, mz, stuType);
		//	}
		//}

		PageInfo<ALLfield> page = new PageInfo<ALLfield>(p, 5);

		return page;
	}
	
	@RequestMapping(value = "getStudentByBuilding", method = RequestMethod.POST)
	@ResponseBody
	public List<ALLfield> getStudentByBuilding(@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "buliding") String buliding, @RequestParam(value = "stuType") String stuType,
			@RequestParam(value = "room") String room) {

		List<ALLfield> p = null;
		if (major.equals("null") | major.equals("All")) {
			p = queryService.getStudentByBuildingAndNianji(nianji, buliding, room, stuType);

		} else {
			if (className.equals("0")|className.equals("null") | className.equals("All")) {
				p = queryService.getStudentByBuildingAndMajor(nianji, major, buliding, room, stuType);
			} else {
				p = queryService.getStudentByBuildingAndClass(nianji, major, className, buliding, room, stuType);
			}
		}

		return p;
	}

	// 查询结果不含高级excel
	@RequestMapping(value = "/exportNormalSearchExcel", method = RequestMethod.POST)
	@RequiresRoles(value = "teacher")
	public String exportNormalSearchExcel(HttpServletRequest req, HttpServletResponse response, @RequestParam("nianji") String nianji
			, @RequestParam("major") String major,@RequestParam("classNo") int classNo,@RequestParam("stuType") String stuType) {

		ExportExcel<ALLfield> exportExcel = new ExportExcel<ALLfield>();
		List<ALLfield> data;
		if (major.equals("All")){
			data = queryService.getStudentByNianji(nianji,stuType);
		}else if(major != "All" && classNo == 0){
			data = queryService.getByNianjiAndMajor(nianji,major,stuType);
		}else if(major != "All" && classNo != 0){
			data = queryService.getStudentByClassName(nianji,major,classNo,stuType);
		}else{
			data = null;
		}


		String path = req.getServletContext().getRealPath("") + "/file/";

		String fileName = path + nianji +"级"+major+"专业"+ classNo +"班"+ "查询结果" + ".xls";

		FileOutputStream out = null;

		String[] headers = { "学号", "姓名", "性别", "专业", "班级", "手机号"};

		try {
			out = new FileOutputStream(fileName);
			System.out.println(data);
			exportExcel.exportNormalSearchExcel("学生查询结果", headers, data, out);
		} catch (Exception e) {
			e.printStackTrace();
		}
		exportExcel.download(fileName, response);

		return null;
	}

	@RequestMapping(value = "getStudentByBuilding2", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<ALLfield> getStudentByBuilding2(@RequestParam(value = "nianji", defaultValue = "2015") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "buliding") String buliding) {

		List<ALLfield> p = null;
		if (major.equals("null") | major.equals("All")) {
			//System.out.println(nianji + buliding + stuType);
			p = queryService.getStudentByBuildingAndNianji(nianji, buliding, stuType);

		} else {
			if (className.equals("0")) {
				//System.out.println(nianji+major+buliding+stuType);
				p = queryService.getStudentByBuildingAndMajor(nianji, major, buliding, stuType);
			} else {
				p = queryService.getStudentByBuildingAndClass(nianji, major, className, buliding, stuType);
			}
		}

		PageInfo<ALLfield> page = new PageInfo<ALLfield>(p, 5);

		return page;
	}

}