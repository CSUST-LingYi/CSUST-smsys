package csust.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.poi.util.SystemOutLogger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import csust.bean.BasicInfo;
import csust.bean.Lecture;

import csust.bean.Registration;
import csust.service.LectureService;
import readExcel.ExportExcel;
import readExcel.imgPojo;

@Controller
@RequestMapping("/lecture")
public class LectureController {

	@Autowired
	LectureService lectureService;

	@RequestMapping("/myLecture")
	@RequiresRoles(value = { "student", "monitor" }, logical = Logical.OR)
	public String myLecture() {

		return "myLecture";
	}

	// 查看所有讲座
	@RequestMapping(value = "/listLecture", method = RequestMethod.GET)
	@ResponseBody
	public List<Lecture> getLecture(@RequestParam(value = "start", defaultValue = "0") int start,
			@RequestParam(value = "end", defaultValue = "3") int end) {

		List<Lecture> list = lectureService.listLecture(start, end);

		return list;
	}

	// 查看所有讲座(分页)
	@RequestMapping(value = "/getLectureByPage", method = RequestMethod.GET)
	@ResponseBody
	public PageInfo<Lecture> getLectureByPage(@RequestParam(value = "start", defaultValue = "1") int start,
			@RequestParam(value = "end", defaultValue = "10") int end) {

		PageHelper.startPage(start, end);

		List<Lecture> list = lectureService.listLecture(0, 0);

		PageInfo<Lecture> page = new PageInfo<Lecture>(list, 5);

		return page;
	}

	// 发布一个讲座信息
	@RequestMapping(value = "/addLecture", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String addLecture(HttpServletRequest request, @RequestParam(value = "xuenian") String xuenian,
			@RequestParam(value = "title") String title, @RequestParam(value = "introduction") String introduction,
			@RequestParam(value = "holdTime") String holdTime, @RequestParam(value = "location") String location,
			@RequestParam(value = "speaker") String speaker,
			@RequestParam(value = "speakerIntroduction") String speakerIntroduction,
			@RequestParam(value = "deadlineTime") Date deadlineTime,
			@RequestParam(value = "limitNumber") int limitNumber, 
			@RequestParam(value = "publisher") String publisher,
			imgPojo image) {
		if (image.getImage().getName() == null || image.getImage() == null) {
			return "上传的图片为空（注意上传图片时请关闭打开的图片）";
		} else {
			String imageName = RandomStringUtils.randomAlphanumeric(16);
			String newFileName = imageName + ".jpg";
			File newFile = new File(request.getServletContext().getRealPath("/lecture"), newFileName);
			newFile.getParentFile().mkdirs();
			String imagePath = "lecture/" + newFileName;

			Lecture lecture = new Lecture();
			lecture.setXuenian(xuenian);
			lecture.setTitle(title);
			lecture.setIntroduction(introduction);
			lecture.setHoldTime(holdTime);
			lecture.setLocation(location);
			lecture.setSpeaker(speaker);
			lecture.setSpeakerIntroduction(speakerIntroduction);
			lecture.setDeadlineTime(deadlineTime);
			lecture.setLimitNumber(limitNumber);
			lecture.setPublisher(publisher);
			lecture.setImagePath(imagePath);
			Date releaseTime = new Date();
			lecture.setReleaseTime(releaseTime);

			System.out.println(request.getServletContext().getRealPath("/lecture"));
			try {
				image.getImage().transferTo(newFile);
				lectureService.addLecture(lecture);

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

	// 通过id查询某一条讲座的详细信息
	@RequestMapping(value = "/getLecture", method = RequestMethod.GET)
	@ResponseBody
	public Lecture getLectureBy(@RequestParam("id") int id) {

		return lectureService.getLectureById(id);
	}

	// 通过关键字查询讲座
	@RequestMapping(value = "/getLectureByKeyWord", method = RequestMethod.POST)
	@ResponseBody
	public List<Lecture> getLectureByKeyWord(@RequestParam("keyWord") String keyWord) {

		return lectureService.getLectureByKeyWord(keyWord);
	}

	// 查询精品讲座(此处查询优先级最高的两个)
	@RequestMapping(value = "/getLectureByPriority")
	@ResponseBody
	public List<Lecture> getLectureByPriority() {

		return lectureService.getLectureByPriority();
	}

	// 设定讲座的优先级
	@RequestMapping(value = "/setLecturePriority", method = RequestMethod.POST)
	@ResponseBody
	public String setLecturePriority(@RequestParam("id") int id,
			@RequestParam(value = "priority", defaultValue = "1") int priority) {

		lectureService.setLecturePriority(id, priority);
		return "success";
	}

	// 通过主讲人查询讲座（最近的两个）
	@RequestMapping(value = "/getLectureBySpeaker", method = RequestMethod.POST)
	@ResponseBody
	public List<Lecture> getLectureBySpeaker(@RequestParam("speaker") String speaker) {

		return lectureService.getLectureBySpeaker(speaker);
	}

	// 修改某条讲座信息
	@RequestMapping(value = "/updateLecture", method = RequestMethod.POST)
	@ResponseBody
	public String updateLecture(Lecture lecture) {

		lectureService.updateLecture(lecture);

		return "success";
	}

	// 删除某条讲座信息
	@RequestMapping(value = "/deleteLecture", method = RequestMethod.POST)
	@ResponseBody
	public String deleteLecture(@RequestParam("id") int id) {

		lectureService.deleteLectureById(id);

		return "success";
	}

	// 学生报名
	@RequestMapping(value = "/addRegistration", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	@RequiresRoles(value = { "student", "monitor" }, logical = Logical.OR)
	public String addRegistration(Registration registration) {

		Date d = new Date();
		registration.setRegistrationTime(d);

		String userName = (String) SecurityUtils.getSubject().getPrincipal();
		registration.setStudentNo(userName);

		String mess = lectureService.addRegistration(registration);

		return mess;
	}

	// 学生取消报名
	@RequestMapping(value = "/deleteRegistration", method = RequestMethod.POST,produces = "text/html; charset=UTF-8")
	@ResponseBody
	@RequiresRoles(value = { "student", "monitor" }, logical = Logical.OR)
	public String deleteRegistration(@RequestParam("id") int id) {

		String mess = lectureService.deleteRegistrarion(id);

		return mess;
	}

	// 查询某次讲座报名名单
	@RequestMapping(value = "/getRegistraTionByLid", method = RequestMethod.GET)
	@ResponseBody
	public List<Registration> getRegistraTionByLid(@RequestParam("lid") int lid) {

		return lectureService.getRegistraTionByLid(lid);
	}

	// 讲座报名名单导出excel
	@RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
	@ResponseBody
	public String exportExcel(HttpServletRequest req, HttpServletResponse response, @RequestParam("lid") int lid) {

		ExportExcel<Registration> exportExcel = new ExportExcel<Registration>();

		List<Registration> data = lectureService.getRegistraTionByLid(lid);

		String path = req.getServletContext().getRealPath("") + "/lecture/";

		String fileName = path + "报名表" + lid + ".xls";

		FileOutputStream out = null;

		String[] headers = { "年级", "专业", "班级", "学号", "姓名", "电话","报名状态" };

		try {
			out = new FileOutputStream(fileName);
			System.out.println(data);
			exportExcel.exportRegistrationExcel("报名表", headers, data, out);
		} catch (Exception e) {
			e.printStackTrace();
		}

		exportExcel.download(fileName, response);

		return null;
	}

	// 改变报名状态
	@RequestMapping(value = "/changeStatusByLidAndSno", method = RequestMethod.POST)
	@ResponseBody
	public String changeStatusByLidAndSno(Registration registration) {

		lectureService.changeStatusByLidAndSno(registration);

		return "seccuss";
	}

	// 查看个人已报名的讲座
	@RequestMapping(value = "/gerLecturesBySno", method = RequestMethod.GET)
	@ResponseBody
	@RequiresRoles(value = { "student", "monitor" }, logical = Logical.OR)
	public List<Lecture> gerLecturesBySno() {

		String userName = (String) SecurityUtils.getSubject().getPrincipal();
		List<Lecture> list = lectureService.gerLecturesBySno(userName);

		return list;
	}

	// 查看个人已报名的讲座
	@RequestMapping(value = "/getStudentLectures", method = RequestMethod.GET)
	@ResponseBody
	public List<Lecture> getStudentLectures(@RequestParam("studentNo") String studentNo) {

		List<Lecture> list = lectureService.gerLecturesBySno(studentNo);

		return list;
	}

	// 查询年级，专业，或者班级里面学生讲座的报名的次数
	@RequestMapping(value = "/registrationCount", method = RequestMethod.POST)
	@ResponseBody
	public PageInfo<BasicInfo> registrationConut(@RequestParam("xuenian") String xuenian,
			@RequestParam("nianji") String nianji, @RequestParam(value = "major", defaultValue = "mj") String major,
			@RequestParam(value = "classNo", defaultValue = "0") int classNo,
			@RequestParam(value = "start", defaultValue = "1") int start,
			@RequestParam(value = "end", defaultValue = "50") int end) {

		PageHelper.startPage(start, end);
		List<BasicInfo> list = lectureService.registraTionConut(xuenian, nianji, major, classNo);
		PageInfo<BasicInfo> page = new PageInfo<BasicInfo>(list, 5);

		return page;
	}

}
