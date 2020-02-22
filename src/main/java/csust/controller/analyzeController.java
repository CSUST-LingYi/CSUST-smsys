package csust.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import csust.bean.FileName;
import csust.bean.StudentGrade;
import csust.service.AnalyzeService;
import csust.service.UserService;
import readExcel.imgPojo;

@Controller
@RequestMapping("")
public class analyzeController {

	@Autowired
	AnalyzeService analyzeService;

	@Autowired
	UserService userService;

	@RequestMapping(value = "stuAnalyze", method = RequestMethod.POST)
	@ResponseBody
	public List<Double> stuAnalyze(@RequestParam(value = "id", defaultValue = "201544078888") String studentNo) {
		List<Double> list = analyzeService.stuAnalyze(studentNo);
		return list;

	}

	@RequestMapping(value = "stuCompare", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, List<Double>> stuCompare(@RequestParam(value = "id[]") String[] studentNo) {

		HashMap<String, List<Double>> map = new HashMap<String, List<Double>>();

		for (String s : studentNo) {

			List<Double> list = analyzeService.stuAnalyze(s);

			map.put(s, list);
		}
		return map;

	}

	@RequestMapping(value = "/downloadFile") // 文件下载功能

	public String downloads(HttpServletRequest req, HttpServletResponse response, String fileName) throws Exception {

		String path = req.getServletContext().getRealPath("") + "/file/";

		System.out.println(path);

		File file = new File(path, fileName);

		response.reset();

		response.setCharacterEncoding("UTF-8");

		response.setContentType("multipart/form-data");

		response.setHeader("Content-Disposition",

				"attachment;fileName=" + URLEncoder.encode(fileName, "UTF-8"));

		InputStream input = new FileInputStream(file);

		OutputStream out = response.getOutputStream();

		byte[] buff = new byte[1024];

		int index = 0;

		while ((index = input.read(buff)) != -1) {

			out.write(buff, 0, index);

			out.flush();

		}

		out.close();

		input.close();

		return null;

	}

	@RequestMapping(value = "uploadFile", method = RequestMethod.POST) // 文件上传功能
	@ResponseBody
	public String uploadFile(HttpServletRequest request, @RequestParam(value = "fileName") String fileName,
			@RequestParam(value = "stuType") String stuType, imgPojo file) throws IllegalStateException, IOException {

		// 如果数据库里面没有上传的文件的名字，则增加,如果文件名字相同，文件会覆盖
		if (analyzeService.getFileName(fileName, stuType) == null) {
			analyzeService.addFilleName(fileName, stuType);
		}
		;
		// 把文件保存在file文件夹下
		File newFile = new File(request.getServletContext().getRealPath("/file"), fileName);
		System.out.println(request.getServletContext().getRealPath("/file").toString());
		newFile.getParentFile().mkdirs();

		// 此getImage得到的其实是一个file，原因是最开始的时候只考虑了上传图片所以是getImage
		file.getImage().transferTo(newFile);

		String mess = "success!";

		return mess;

	}

	@RequestMapping(value = "listFile", method = RequestMethod.POST) // 查询文件列表功能
	@ResponseBody
	public List<FileName> listFile(@RequestParam(value = "stuType") String stuType) throws IllegalStateException, IOException {

		// 查询所有的文件的名字，前端根据文件名字下载该文件
		List<FileName> fileNames = analyzeService.listFileName(stuType);

		return fileNames;

	}

	@RequestMapping(value = "deleteFile", method = RequestMethod.POST) // 删除文件功能
	@ResponseBody
	public List<FileName> deleteFile(@RequestParam(value = "fileName") String fileName,
			@RequestParam(value = "stuType") String stuType) {

		analyzeService.deleteFileName(fileName, stuType);

		// 查询所有的文件的名字，前端根据文件名字下载该文件
		List<FileName> fileNames = analyzeService.listFileName(stuType);

		return fileNames;

	}

	@RequestMapping(value = "uploadStudentGradeEcxel", method = RequestMethod.POST) // 上传学生成绩的excel
	@ResponseBody
	public StringBuffer uploadStudentGradeEcxel(@RequestParam(value = "xuenian") String xuenian,
			@RequestParam(value = "xueqi") String xueqi, @RequestParam(value = "nianji") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "file") MultipartFile file) {

		if (file.getName() == null || file == null) {
			StringBuffer mess = new StringBuffer("上传的文件为空");
			return mess;
		}

		StringBuffer mess = analyzeService.uploadStudentGradeExcel(file, xuenian, xueqi, nianji, major);// 解析上传的成绩的Excel

		return mess;
	}

	@RequestMapping(value = "to_analyze")
	public String to_analyze() {

		return "analyze";
	}

	// 通过年级和专业查询班级
	@RequestMapping(value = "getClassName", method = RequestMethod.POST)
	@ResponseBody
	public List<String> getClassName(@RequestParam(value = "nianji") String nianji,

			@RequestParam(value = "major") String major) {

		List<String> classNames = analyzeService.getClassName(nianji, major);

		return classNames;
	}

	@RequestMapping(value = "selectStudentGrade", method = RequestMethod.POST) // 查询成绩
	@ResponseBody
	public List<StudentGrade> selectStudentGrade(@RequestParam(value = "xuenian") String xuenian,
			@RequestParam(value = "xueqi") String xueqi, @RequestParam(value = "nianji") String nianji,
			@RequestParam(value = "major") String major, @RequestParam(value = "className") String className,
			@RequestParam(value = "fail") int fail, @RequestParam(value = "minGrade") float minGrade,
			@RequestParam(value = "maxGrade") float maxGrade, @RequestParam(value = "minGPA") float minGPA,
			@RequestParam(value = "maxGPA") float maxGPA) {

		StudentGrade sg = new StudentGrade();
		sg.setXuenian(xuenian);
		sg.setXueqi(xueqi);
		sg.setNianji(nianji);
		if (!major.equalsIgnoreCase("null")) {
			sg.setMajor(major);
		}

		if (!className.equalsIgnoreCase("All")) {
			sg.setClass(className);
		}

		sg.setFail(fail);
		sg.setMinGrade(minGrade);
		sg.setMaxGrade(maxGrade);
		sg.setMinGPA(minGPA);
		sg.setMaxGPA(maxGPA);

		List<StudentGrade> sgs = analyzeService.selectStudentGrade(sg);

		return sgs;
	}

	@RequestMapping(value = "analezeAward", method = RequestMethod.POST)
	@ResponseBody
	public List<Object[]> analyzeAward(@RequestParam(value = "nianji") String nianji,
			@RequestParam(value = "stuType") String stuType, @RequestParam(value = "xuenian") String xuenian) {

		List<Object[]> rs = analyzeService.jlAnalyze(xuenian, nianji, stuType);

		return rs;
	}

	@RequestMapping(value = "compareStudentGrade", method = RequestMethod.POST) // 成绩分析
	@ResponseBody
	public List<double[]> compareStudentGrade(@RequestParam(value = "xuenian") String xuenian,
			@RequestParam(value = "xueqi") String xueqi, @RequestParam(value = "nianji") String nianji,
			@RequestParam(value = "minGrade") float minGrade, @RequestParam(value = "maxGrade") float maxGrade,
			@RequestParam(value = "minGPA") float minGPA, @RequestParam(value = "maxGPA") float maxGPA) {

		StudentGrade sg = new StudentGrade();
		sg.setXuenian(xuenian);
		sg.setXueqi(xueqi);
		sg.setNianji(nianji);
		sg.setMinGrade(minGrade);
		sg.setMaxGrade(maxGrade);
		sg.setMinGPA(minGPA);
		sg.setMaxGPA(maxGPA);

		List<double[]> sgs = analyzeService.compareStudentGrade(sg);

		return sgs;
	}

}
