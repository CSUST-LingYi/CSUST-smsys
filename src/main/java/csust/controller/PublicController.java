package csust.controller;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import csust.bean.*;
import csust.service.MonitorService;
import csust.service.PublicService;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import readExcel.imgPojo;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/public")
public class PublicController {

	@Autowired
	PublicService publicService;

	@Autowired
	MonitorService monitorService;

	private Boolean isOpen(String xuenian){
		return this.publicService.getZcStatusByXuenian(xuenian);
	}

	// 跳转到学生端综测界面
	@RequestMapping(value = "/to_stu", method = RequestMethod.GET)

	public String tu_stu() {

		return "stuPage";
	}

	@RequestMapping(value = "/getStudentInfo", method = RequestMethod.GET)
	@ResponseBody
	@RequiresRoles(value = { "monitor", "student","stuAdmin" }, logical = Logical.OR)
	public BasicInfo getStudentInfo() {
		String userName = (String) SecurityUtils.getSubject().getPrincipal();
		return publicService.getStuInfo(userName);
	}


	// 查询用户是否上传综测
	@RequestMapping(value = "/getIsUpload",method = RequestMethod.POST)
	@ResponseBody
	public boolean getIsUpload(@RequestParam("xuenian") String xuenian,
							   @RequestParam("studentNo") String studentNo) {
		
		PersonSummary per = publicService.getIsUpload(xuenian,studentNo);
		Double moral = per.getMoral();
		Double kn = per.getKnowledge();
		//Double de =  per.getDeduction();
		Double sp = per.getSports();
		if (moral==0|kn==0|sp==0) {
			return false;
		}else {
			return true;
		}
		
		
	}
	/************** 个人智育 ****************************/
	// 查看个人的智育成绩
	@RequestMapping(value = "/getPersonKnowledgeBySno", method = RequestMethod.POST)
	@ResponseBody
	public List<PersonKnowledge> getPersonKnowledgeBySno(@RequestParam("xuenian") String xuenian,
			@RequestParam("nianji") String nianji, @RequestParam("major") String major,
			@RequestParam("className") int className, @RequestParam("studentNo") String sno) {

		Course c = new Course();
		c.setClassName(className);
		c.setMajor(major);
		c.setTermYear(nianji);
		c.setXuenian(xuenian);
		List<Course> cs = monitorService.getCourseByclass(c);

		List<PersonKnowledge> list = new ArrayList<PersonKnowledge>();

		for (Course cc : cs) {
			PersonKnowledge p = publicService.getKnowledgeBySnoAndCourseId(xuenian, sno, cc.getId());

			if (p == null) {
				p = new PersonKnowledge();
				p.setCid(cc.getId());
				p.setCourseName(cc.getCourseName());
				p.setCredit(cc.getCredit());
			}

			list.add(p);
		}

		return list;
	}

	// 增加一项个人的智育成绩
	@RequestMapping(value = "/addPersonKnowledge", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String addPersonKnowledge(@RequestParam("list") String jsonString,@RequestParam("xuenian") String xuenian)
			throws JsonParseException, JsonMappingException, IOException {

		if (!this.isOpen(xuenian)){
			return "system did not open";
		}
		ObjectMapper mapper = new ObjectMapper();

		List<PersonKnowledge> list = mapper.readValue(jsonString, new TypeReference<List<PersonKnowledge>>() {
		});



		for (PersonKnowledge pk : list) {

			if (publicService.getKnowledgeBySnoAndCourseId(pk.getXuenian(), pk.getStudentNo(), pk.getCid()) == null) {

				publicService.addPersonKnowledge(pk);
			} else {

				publicService.updatePersonKnowledge(pk);
			}
		}

		return "success";
	}

	// 修改一项个人智育成绩
	@RequestMapping(value = "/updatePersonKnowledge", method = RequestMethod.POST)
	@ResponseBody
	public String updatePersonKnowledge(PersonKnowledge pk) {

		publicService.updatePersonKnowledge(pk);

		return "success";
	}

	// 删除一项个人智育成绩
	@RequestMapping(value = "/deletePersonKnowledge", method = RequestMethod.POST)
	@ResponseBody
	public String deletePersonKnowledge(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String studentNo, @RequestParam("id") int id) {
		if (!this.isOpen(xuenian)){
			return "system did not open";
		}
		publicService.deletePersonKnowledge(xuenian, studentNo, id);

		return "success";
	}

	/************** 个人体育 ****************************/

	// 通过学年，学号查询个人的体育情况
	@RequestMapping(value = "/getPersonSports", method = RequestMethod.POST)
	@ResponseBody
	public PersonSports getPersonSportser(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String sno) {

		PersonSports ps = publicService.getPersonSportsBySno(xuenian, sno);
		 if(ps==null) {
			 ps= new PersonSports();
		 }
		return ps;
	}

	// 增加一项个人的体育的成绩
	@RequestMapping(value = "/addPersonSports", method = RequestMethod.POST)
	@ResponseBody
	public String addPersonSports(PersonSports ps) {
		if (!this.isOpen(ps.getXuenian())){
			return "system did not open";
		}
		if (publicService.getPersonSportsBySno(ps.getXuenian(), ps.getStudentNo()) != null) {

			publicService.updatePersonSports(ps);

		} else {

			publicService.addPersonSports(ps);
		}

		return "success";
	}

	// 修改个人的体育的成绩
	@RequestMapping(value = "/updatePersonSports", method = RequestMethod.POST)
	@ResponseBody
	public String updatePersonSports(PersonSports ps) {

		publicService.updatePersonSports(ps);

		return "success";
	}

	// 删除个人的体育成绩
	@RequestMapping(value = "deletePersonSports", method = RequestMethod.GET)
	@ResponseBody
	public String deletePersonSports(@RequestParam("id") int id) {

		publicService.deletePersonSports(id);

		return "success";
	}

	/************** 个人德育 ****************************/
	// 查看个人的全部德育加分项
	@RequestMapping(value = "/getPersonMoralBySno", method = RequestMethod.GET)
	@ResponseBody
	public List<PersonMoral> getPersonMoralBySno(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String sno) {

		List<PersonMoral> list = publicService.getPersonMoralBySno(xuenian, sno);

		if (list == null) {
			list = new ArrayList<PersonMoral>();
		}

		return list;
	}

	// 增加一项个人的德育项
	@RequestMapping(value = "/addPersonMoral", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String addPersonMoral(HttpServletRequest request, @RequestParam(value = "xuenian") String xuenian,
			@RequestParam(value = "studentNo") String sno, @RequestParam(value = "name") String name,
			@RequestParam(value = "mid") int mid, @RequestParam(value = "score") double score,
			@RequestParam(value = "getTime") String getTime, imgPojo image) {
		if (!this.isOpen(xuenian)){
			return "system did not open";
		}
		if (image.getImage().getName() == null || image.getImage() == null) {
			return "上传的图片为空（注意上传图片时请关闭打开的图片）";
		} else {
			String imageName = RandomStringUtils.randomAlphanumeric(16);
			String newFileName = imageName + ".jpg";
			File newFile = new File(request.getServletContext().getRealPath("/comparison"), newFileName);
			newFile.getParentFile().mkdirs();
			String imagePath = "comparison/" + newFileName;
			PersonMoral m = new PersonMoral();
			m.setXuenian(xuenian);
			m.setStudentNo(sno);
			m.setMid(mid);
			m.setName(name);
			m.setScore(score);
			m.setGetTime(getTime);
			m.setImagePath(imagePath);
			System.out.println(request.getServletContext().getRealPath("/comparison"));
			try {
				image.getImage().transferTo(newFile);
				publicService.addPersonMoral(m);

			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				return "上传出错";
			} catch (IOException e) {
				// TODO Auto-generated catch block
				return "上传出错";
			}
		}

		return "success";
	}

	// 修改一项个人德育项
	@RequestMapping(value = "/updatePersonMoral", method = RequestMethod.POST)
	@ResponseBody
	public String updatePersonMoral(PersonMoral m) {
		if (!this.isOpen(m.getXuenian())){
			return "system did not open";
		}
		publicService.updatePersonMoral(m);

		return "success";
	}

	// 删除一项个人德育项
	@RequestMapping(value = "/deletePersonMoral", method = RequestMethod.POST)
	@ResponseBody
	public String deletePersonMoral(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String studentNo, @RequestParam("id") int id) {
		if (!this.isOpen(xuenian)){
			return "system did not open";
		}
		publicService.deletePersonMoral(xuenian, studentNo, id);

		return "success";
	}

	/************** 个人德育汇总 ****************************/

	// 查询个人德育汇总
	@RequestMapping(value = "/getMoralSummary", method = RequestMethod.POST)
	@ResponseBody
	public MoralSummary getMoralSummary(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String studentNo) {

		MoralSummary ms = publicService.getMoralSummary(xuenian, studentNo);

		if (ms == null) {
			ms = new MoralSummary();
		}

		return ms;
	}

	// 增加个人德育汇总
	@RequestMapping(value = "/addMoralSummary", method = RequestMethod.POST)
	@ResponseBody
	public String addMoralSummary(MoralSummary ms) {

		publicService.addMoralSummary(ms);

		return "success";
	}

	// 修改个人德育汇总
	@RequestMapping(value = "/updateMoralSummary", method = RequestMethod.POST)
	@ResponseBody
	public String updateMoralSummary(MoralSummary ms) {

		publicService.updateMoralSummary(ms);

		return "success";
	}

	/************** 个人综测汇总 ****************************/
	@RequestMapping(value = "/getPersonSummaryBySno", method = RequestMethod.POST)
	@ResponseBody
	public PersonSummary getPersonSummaryBySno(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String studentNo) {

		PersonSummary ps = publicService.getPersonSummaryBySno(xuenian, studentNo);
		
		System.out.println(ps.toString());

		return ps;
	}

	@RequestMapping(value = "/getMoralAndKnowledgeAndSports", method = RequestMethod.GET)
	@ResponseBody
	public Summary getMoralAndKnowledgeAndSports(@RequestParam("xuenian") String xuenian,
			@RequestParam("studentNo") String sno) {

		Summary sm = new Summary();

		PersonSummary psm = publicService.getPersonSummaryBySno(xuenian, sno);

		sm.setPersonSummary(psm);

		List<PersonKnowledge> list = publicService.getPersonKnowledgeBySno(xuenian, sno);

		if (list == null) {
			list = new ArrayList<PersonKnowledge>();
		}

		sm.setList(list);

		MoralSummary ms = publicService.getMoralSummary(xuenian, sno);
		if (ms == null) {
			ms = new MoralSummary();
		}
		sm.setMoralSummary(ms);

		PersonSports ps = publicService.getPersonSportsBySno(xuenian, sno);

		if (ps == null) {
			ps = new PersonSports();
		}
		sm.setPersonSports(ps);

		List<PersonDeduction> deductions = publicService.listPersonDeduction(xuenian, sno);

		if (deductions == null) {
			deductions = new ArrayList<PersonDeduction>();
		}
		sm.setDeductions(deductions);

		return sm;
	}
	
	@RequestMapping(value = "/resetStatus",method = RequestMethod.POST)
	@ResponseBody
	public String resetStatus(@RequestParam(value = "xuenian") String xuenian,@RequestParam(value = "studentNo") String studentNo) {
		publicService.resetStatus(xuenian,studentNo);
		return "success";
	}
	
	/*@RequestMapping(value =  "/insertFeedback",method = RequestMethod.POST)
	@ResponseBody
	public void insertFeedback(@RequestParam(value = "monitorNo") String monitorNo,
							   @RequestParam(value = "studentNo") String studentNo,
							   @RequestParam(value = "P_moral") String P_moral,
							   @RequestParam(value = "D_moral") String D_moral) {
		
		publicService.insertFeedback(monitorNo, studentNo, P_moral, D_moral);
	}*/
	
	@RequestMapping(value =  "/insertFeedback",method = RequestMethod.POST)
	@ResponseBody
	@RequiresRoles(value = {"stuAdmin","monitor"},logical = Logical.OR)
	public String insertFeedback(Feedback fb) {		
		publicService.insertFeedback(fb);
		return "success";
	}
	
	@RequestMapping(value = "/updateFeedbackStatus",method = RequestMethod.POST)
	@ResponseBody
	public String updateFeedbackStatus(@RequestParam(value = "studentNo") String studentNo,@RequestParam(value = "isRead") int isRead) {
		publicService.updateFeedbackStatus(studentNo,isRead);
		return "success";
	}
	
/*	@RequestMapping(value =  "/updateFeedback",method = RequestMethod.POST)
	@ResponseBody
	@RequiresRoles(value = {"stuAdmin","monitor"},logical = Logical.OR)
	public String updateFeedback(Feedback fb) {		
		publicService.updateFeedback(fb);
		return "success";
	}*/

	@RequestMapping(value = "getZcStatus",method = RequestMethod.GET)
	public ResponseEntity<Boolean> getZcStatus(@RequestParam(value = "xuenian") String xuenian){
		Boolean zcStatusByXuenian = this.publicService.getZcStatusByXuenian(xuenian);
		return ResponseEntity.ok(zcStatusByXuenian);
	}
}
