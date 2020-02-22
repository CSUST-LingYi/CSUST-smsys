package csust.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

import csust.bean.Alumni;
import csust.bean.Schoolmate;
import csust.service.SchoolmateService;

@Controller
@RequestMapping("/teacher")
public class SchoolmateController {

	@Autowired
	SchoolmateService schoolmateService;
	
	@RequestMapping("/schoolmateManage")
	@RequiresRoles(value = { "teacher" })
	public String schoolmateManage() {

		return "schoolmate/schoolmateManage";
	}
	@RequestMapping("/data_show")
	@RequiresRoles(value = { "teacher" })
	public String data_show() {

		return "schoolmate/data_show";
	}
	

	/********* 增加校友信息 ************/
	@RequestMapping(value = "/addSchoolmate", method = RequestMethod.POST)
	@ResponseBody
	public String addSchoolMate(Schoolmate sm) {

		if (sm.getName() != null) {
			schoolmateService.addSchoolmate(sm);
		}

		return "success";
	}

	/********* 删除校友信息 ************/
	@RequestMapping(value = "/deleteSchoolmate", method = RequestMethod.GET)
	@ResponseBody
	public String deleteSchoolmate(@RequestParam("id") int id) {

		if (id != 0) {
			schoolmateService.deleteSchoolmate(id);

			return "success";
		}

		return "error";
	}

	/********* 修改校友信息 ************/
	@RequestMapping(value = "/updateSchoolmate", method = RequestMethod.POST)
	@ResponseBody
	public String updateSchoolmate(Schoolmate sm) {

		if (sm.getId() != 0) {
			schoolmateService.updateSchoolmate(sm);

			return "success";
		}

		return "error";
	}

	/********* 前端四个下拉框的值（需前端去重） ************/
	@RequestMapping(value = "/listcondition", method = RequestMethod.GET)
	@ResponseBody
	public List<Schoolmate> listcondition() {

		return schoolmateService.listcondition();
	}

	/********* 查询校友信息多条件查询 ************/
	@RequestMapping(value = "/getSchoolmates", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<Schoolmate> getSchoolmates(
			@RequestParam(value = "graduationYear", defaultValue = "1900") String graduationYear,
			@RequestParam(value = "area", defaultValue = "WU") String area,
			@RequestParam(value = "faculty", defaultValue = "Fy") String faculty,
			@RequestParam(value = "major", defaultValue = "Mj") String major,
			@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "20") int pa) {

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("graduationYear", graduationYear);
		map.put("area", area);
		map.put("faculty", faculty);
		map.put("major", major);

		PageHelper.startPage(pn, pa);

		List<Schoolmate> list = schoolmateService.getSchoolmates(map);

		PageInfo<Schoolmate> page = new PageInfo<Schoolmate>(list, 5);
		return page;
	}

	/********* 查询校友信息模糊查询 ************/
	@RequestMapping(value = "/getSchoolmatesByLike", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<Schoolmate> getSchoolmatesByLike(@RequestParam("condition") String condition,
			@RequestParam(value = "pn", defaultValue = "1") int pn,
			@RequestParam(value = "pa", defaultValue = "20") int pa) {
		PageHelper.startPage(pn, pa);

		List<Schoolmate> list = schoolmateService.getSchoolmatesByLike(condition);

		PageInfo<Schoolmate> page = new PageInfo<Schoolmate>(list, 5);
		return page;
	}

	/*
	 * 统计校友信息 用way来控制统计的方式 1代表按地区 2代表按所属校友会 3代表按院系
	 */
	@RequestMapping(value = "/groupSchoolmate", method = RequestMethod.GET)
	@ResponseBody
	public List<HashMap<String, Integer>> groupSchoolmate(@RequestParam("way") int way) {

		List<HashMap<String, Integer>> list = new ArrayList<HashMap<String, Integer>>();
		HashMap<String, Integer> map = new HashMap<String, Integer>();

		map = schoolmateService.groupByArea();
		list.add(map);
		map = schoolmateService.groupByAlumniAssociation();
		list.add(map);
		map = schoolmateService.groupByMajor();
		list.add(map);

		return list;
	}

	@RequestMapping(value = "/uploadEcxel", method = RequestMethod.POST) // 上传excel
	@ResponseBody
	public StringBuffer upload(@RequestParam(value = "file") MultipartFile file) {

		if (file.getName() == null || file.isEmpty()) {
			StringBuffer mess = new StringBuffer("上传的文件为空");
			return mess;
		}

		StringBuffer result = schoolmateService.readExcelFile(file);

		return result;
	}

	@RequestMapping(value = "/listAlumniName", method = RequestMethod.GET)
	@ResponseBody
	public List<Alumni> listAlumniName() {

		List<Alumni> list = schoolmateService.listAlumniName();

		return list;
	}

	@RequestMapping(value = "/getAlumni", method = RequestMethod.GET)
	@ResponseBody
	public Alumni getAlumni(@RequestParam(value = "sid") int sid) {

		Alumni a = schoolmateService.getAlumni(sid);

		return a;
	}
}
