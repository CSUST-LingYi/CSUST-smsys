package csust.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import csust.bean.PersonKnowledge;
import csust.bean.SummaryAnalyze;
import csust.service.ComparisonAnalyzeService;

@Controller
@RequestMapping("/teacher")
public class ComparisonAnalyzeController {

	@Autowired
	ComparisonAnalyzeService comaprisonService;
	
	@RequestMapping(value = "/comparisonAnalyze", method = RequestMethod.GET) // 跳转到老师界面
	@RequiresRoles(value = { "teacher" })
	public String to_teaPage() {

		return "teacher/comparisonAnalyzeIndex";
	}
	
	@RequestMapping(value = "/dataAnalyse", method = RequestMethod.GET) // 跳转到老师界面
	@RequiresRoles(value = { "teacher" })
	public String dataAnalyse() {

		return "teacher/dataAnalyse";
	}

	// 获取挂科率
	@RequestMapping(value = "/getFalis", method = RequestMethod.POST)
	@ResponseBody
	public List<SummaryAnalyze> getFalis(@RequestParam("xuenian") String xuenian, @RequestParam("nianji") String nianji,
			@RequestParam(value = "major", defaultValue = "m") String major) {

		if (major.equals("m"))
			major = null;

		List<SummaryAnalyze> list = comaprisonService.getFails(xuenian, nianji, major);

		return list;
	}

	// 获取哪些人挂科级挂科相关科目
	@RequestMapping(value = "/getFailsDetails", method = RequestMethod.POST)
	@ResponseBody
	public List<PersonKnowledge> getFailsDetails(@RequestParam("xuenian") String xuenian,
			@RequestParam("nianji") String nianji,
			@RequestParam(value = "major") String major,
			@RequestParam(value = "classNo", defaultValue = "0") int calssName) {

		List<PersonKnowledge> list = comaprisonService.getFailsDetails(xuenian, nianji, major, calssName);

		return list;
	}

	// 获取各分数段的人数
	@RequestMapping(value = "/getScoresCount", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<Integer, List<SummaryAnalyze>> getScoresCount(@RequestParam("xuenian") String xuenian,
			@RequestParam("nianji") String nianji, @RequestParam(value = "major", defaultValue = "m") String major) {

		if (major.equals("m"))
			major = null;

		HashMap<Integer, List<SummaryAnalyze>> map = comaprisonService.getScoresCount(xuenian, nianji, major);

		return map;
	}

}
