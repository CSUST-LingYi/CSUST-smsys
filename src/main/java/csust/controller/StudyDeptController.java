package csust.controller;

import java.util.Collections;
import java.util.List;

import csust.bean.*;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import csust.service.MonitorService;
import csust.service.PermissionService;
import csust.service.PublicService;
import csust.service.StudyDeptService;
import utils.DeductionComparator;
import utils.KnowledgeComparator;
import utils.MoralComparator;
import utils.SportsComparator;

@Controller
@RequestMapping("/studyDept")
public class StudyDeptController {

	@Autowired
	StudyDeptService studyDeptService;

	@Autowired
	MonitorService monitorService;

	@Autowired
	PublicService publicService;

	@Autowired
	PermissionService permissionService;

	@RequestMapping(value = "/study-home", method = RequestMethod.GET)
	@RequiresRoles(value = { "stuAdmin"})
	public String to_studyDept() {

		return "study-home";
	}

	@RequestMapping(value = "/lectureManager", method = RequestMethod.GET)
	@RequiresRoles(value = { "stuAdmin" ,"teacher"},logical = Logical.OR)
	public String lectureManager() {

		return "lectureManager";
	}

	@RequestMapping(value = "/manageMonitor", method = RequestMethod.GET)
	@RequiresRoles(value = { "stuAdmin" })
	public String to_manageMonitor() {

		return "manageMonitor";
	}

	@RequestMapping(value = "/setZcStatus_o",method = RequestMethod.POST)
	@RequiresRoles(value = {"stuAdmin"})
	@ResponseBody
	public String setZcStatus_o(@RequestParam(value = "xuenian") String xuenian){
		 studyDeptService.setZcStatus_o(xuenian);
		 return "success";
	}

	@RequestMapping(value = "/setZcStatus_c",method = RequestMethod.POST)
	@RequiresRoles(value = {"stuAdmin"})
	@ResponseBody
	public String setZcStatus_c(@RequestParam(value = "xuenian") String xuenian){
		studyDeptService.setZcStatus_c(xuenian);
		return "success";

	}

	@RequestMapping(value = "/class-audit", method = RequestMethod.GET)
	@RequiresRoles(value = { "stuAdmin" })
	public String to_class_audit() {

		return "class-audit";
	}

	@RequestMapping(value = "/sort", method = RequestMethod.GET)
	@RequiresRoles(value = { "stuAdmin" })
	public String to_sort() {

		return "sort";
	}

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	@RequiresRoles(value = { "stuAdmin" })
	public String to_home() {

		return "home";
	}

	@RequestMapping(value = "/individual-review", method = RequestMethod.GET)
	@RequiresRoles(value = { "stuAdmin" })
	public String to_individual_review() {

		return "individual-review";
	}

	@RequestMapping(value = "/personal", method = RequestMethod.GET)
	@RequiresRoles(value = { "teacher", "stuAdmin" }, logical = Logical.OR)
	public String to_personal() {

		return "personal";
	}

	@RequestMapping(value = "/setProportion", method = RequestMethod.POST)
	@ResponseBody
	public String addProportion(Proportion p) {

		studyDeptService.setProportion(p);

		return "sucess";
	}

	@RequestMapping(value = "/getProportion", method = RequestMethod.POST)
	@ResponseBody
	public Proportion getProportion(@RequestParam("xuenian") String xuenian) {

		Proportion p = studyDeptService.getProportion(xuenian);

		return p;
	}

	// 通过年级或者专业或者班级的汇总情况
	@RequestMapping(value = "/getSummary", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<PersonSummary> getSummary(@RequestParam(value = "pn", defaultValue = "1") int pn, // 第几页
			@RequestParam(value = "pa", defaultValue = "100") int pa, // 每页多少记录
			@RequestParam(value = "xuenian") String xuenian, // 学年
			@RequestParam(value = "nianji") String nianji, // 年级
			@RequestParam(value = "major", defaultValue = "majo") String major, // 专业
			@RequestParam(value = "classNo", defaultValue = "99") int classNo,
			@RequestParam(value = "way", defaultValue = "0") int way) {

	//	PageHelper.startPage(pn, pa);

		List<PersonSummary> list = publicService.getSummaryByClass(xuenian, nianji, major, classNo);

		switch (way) {
		// 按德育分排序
		case 1:
			Collections.sort(list, new MoralComparator());
			break;
		// 按智育分排序
		case 2:
			Collections.sort(list, new KnowledgeComparator());
			break;
		// 按体育分排序
		case 3:
			Collections.sort(list, new SportsComparator());
			break;
		// 按扣分排序
		case 4:
			Collections.sort(list, new DeductionComparator());
			break;
		}

		PageInfo<PersonSummary> page = new PageInfo<PersonSummary>(list);

		return page;

	}

	// 通过mid查询德育分类别
	@RequestMapping(value = "/getMoralByMid", method = RequestMethod.GET)
	@ResponseBody
	public List<Moral> getMoralType(@RequestParam("mid") int mid) {

		List<Moral> list = studyDeptService.getMoralsByMid(mid);

		return list;
	}

	// 增加德育分项
	@RequestMapping(value = "/addMoral", method = RequestMethod.POST)
	@ResponseBody
	public String addMoral(@RequestParam("mid") int mid, @RequestParam("name") String name,
			@RequestParam("score") double score) {

		Moral m = new Moral();
		m.setMid(mid);
		m.setName(name);
		m.setScore(score);
		System.out.println(m);

		studyDeptService.addMoral(m);
		;

		return "success";
	}

	// 通过id修改德育分项
	@RequestMapping(value = "/updateMoral", method = RequestMethod.POST)
	@ResponseBody
	public String updateMoral(@RequestParam("id") int id, @RequestParam("name") String name,
			@RequestParam("score") double score) {

		Moral m = new Moral();
		m.setId(id);
		m.setName(name);
		m.setScore(score);
		System.out.println(m);

		studyDeptService.updateMoralById(m);

		return "success";
	}

	// 删除一项德育分项
	@RequestMapping(value = "/deleteMoral", method = RequestMethod.GET, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String deleteMoral(@RequestParam("id") int id) {

		String mess = studyDeptService.deleteMoralById(id);

		return mess;
	}

	// 增加一项扣分项
	@RequestMapping(value = "/addDeduction", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String addDeduction(Deduction deduction) {

		studyDeptService.addDeduction(deduction);

		return "success";
	}

	// 修改一项扣分项
	@RequestMapping(value = "/updateDeduction", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String updateDeduction(Deduction deduction) {

		studyDeptService.updateDeduction(deduction);

		return "success";
	}

	// 删除一项扣分项
	@RequestMapping(value = "/deleteDeduction", method = RequestMethod.GET, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String deleteDeduction(@RequestParam("id") int id) {

		studyDeptService.deleteDeduction(id);

		return "success";
	}

	// 查找一项扣分项
	@RequestMapping(value = "/getDeduction", method = RequestMethod.GET, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public Deduction getDeduction(@RequestParam("id") int id) {

		Deduction d = studyDeptService.getDeduction(id);

		return d;
	}

	// 列出所有的扣分项
	@RequestMapping(value = "/listDeduction", method = RequestMethod.GET)
	@ResponseBody
	public List<Deduction> listDeduction() {

		List<Deduction> list = studyDeptService.listDeduction();

		return list;
	}

	// 通过学年，年级，专业查询该班名称，该班的人数，已经审核的人数
	@RequestMapping(value = "/getClassCheckSummary", method = RequestMethod.POST)
	@ResponseBody
	public List<ClassInfo> getClassCheckSummary(@RequestParam("xuenian") String xuenian,
			@RequestParam("nianji") String nianji, @RequestParam("major") String major) {

		List<ClassInfo> list = studyDeptService.getClassCheckSummary(xuenian, nianji, major);

		return list;
	}

	/***************** monitor权限管理 ***********************/
	// 增加monitor信息
	@RequestMapping(value = "/addMonitor", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String addMonitor(BasicInfo b) {
		return permissionService.addMonitor(b);
	}

	// 修改monitor信息
	@RequestMapping(value = "/updateMonitor", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String updateMonitor(BasicInfo b) {
		permissionService.updateMonitor(b);
		return "success";
	}

	// 删除monitor信息
	@RequestMapping(value = "/deleteMonitor", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String deleteMonitor(@RequestParam("studentNo") String studentNo) {
		return permissionService.deleteMonitor(studentNo);
	}

	@RequestMapping(value = "/getMonitor", method = RequestMethod.POST)
	@ResponseBody
	public List<BasicInfo> getMonitor(@RequestParam("nianji") String nianji,
			@RequestParam(value = "major", defaultValue = "mj") String major) {

		List<BasicInfo> list = permissionService.getMonitor(nianji, major);

		return list;
	}

	@RequestMapping(value = "getZcStatus",method = RequestMethod.POST)
    public ResponseEntity<Boolean> getZcStatus(@RequestParam(value = "xuenian") String xuenian){
        Boolean zcStatusByXuenian = this.studyDeptService.getZcStatusByXuenian(xuenian);
        return ResponseEntity.ok(zcStatusByXuenian);
    }

    @RequestMapping(value = "insertXuenian",method = RequestMethod.POST,produces = {"text/plain;charset=utf-8","text/html;charset=utf-8"})
    @ResponseBody
    @RequiresRoles("stuAdmin")
    public ResponseEntity<String> insertXuenian(@RequestParam(value = "startTime",required = true) String startTime,
                                @RequestParam(value = "endTime",required = true) String endTime){
		Boolean aBoolean = this.studyDeptService.insertXuenian(startTime, endTime);
		if (aBoolean){
			return ResponseEntity.status(HttpStatus.CREATED).body("增加成功");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("该学年已存在");

    }

    @RequestMapping(value = "listXuenian",method = RequestMethod.GET)
    public ResponseEntity<List<Xuenian>> listXuenian(){
        List<Xuenian> xuenians = this.studyDeptService.ListXuenian();
        if (CollectionUtils.isEmpty(xuenians)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(xuenians);

    }
}
