package csust.controller;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import csust.bean.Answer;
import csust.bean.Question;
import csust.bean.Questionnaire;

import csust.mapper.UserMapper;
import csust.service.QuestionnaireService;

import readExcel.ExportExcel;



@Controller
@RequestMapping("")
public class QuestionnaireController {

	@Autowired
	QuestionnaireService questionnaireService;

	@Autowired
	UserMapper userMapper;

	@RequestMapping(value = "addQuestionnaire", method = RequestMethod.POST)
	@ResponseBody
	public String addQuestionnaire(HttpServletRequest req,
			@RequestParam(value = "questionnaireName") String questionnaireName,
			@RequestParam(value = "termYear") String termYear,
			@RequestParam(value = "bz", defaultValue = " ") String bz,
			@RequestParam(value = "questions[]") String[] questions,
			@RequestParam(value = "introduces[]") String[] introduces) {

		String mess = null;
		if (req.getSession() == null || req.getSession().getAttribute("name") == null) {
			mess = "never login";
		} else {
			mess = questionnaireService.addQuestionnaire(req.getSession().getAttribute("name").toString(),
					questionnaireName, termYear, bz, questions, introduces);
		}

		return mess;

	}

	@RequestMapping(value = "addAnswer", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String addAnswers(HttpServletRequest req, @RequestParam(value = "qnid") int qnid,
			@RequestParam(value = "answers[]") String[] answers, @RequestParam(value = "aids[]") int[] qids) {

		String mess = null;

		if (req.getSession() == null || req.getSession().getAttribute("name") == null) {
			mess = "登录超时，请重新登录";
		} else {

			mess = questionnaireService.addAnswers(qids, answers, req.getSession().getAttribute("name").toString(),
					qnid);
		}

		return mess;

	}

	// 在问卷下增加一份已填
	@RequestMapping(value = "filledoutQuestionnaire", method = RequestMethod.GET, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String filledoutQuestionnaire(HttpServletRequest req, @RequestParam(value = "qnid") int qnid) {

		if (req.getSession() == null || req.getSession().getAttribute("name") == null) {
			return "登录超时，请重新登录";
		} else {
			questionnaireService.addFilledOutStudent(req.getSession().getAttribute("name").toString(), qnid);
		}

		return "删除成功";
	}

	// 获得问卷完整的回答情况
	@RequestMapping(value = "getAnswersByQnid", method = RequestMethod.GET)
	@ResponseBody
	public List<List<String>> getAnswersByQnid(@RequestParam(value = "qnid") int qnid) {

		List<List<String>> list = questionnaireService.getAnswersByQnid(qnid);

		return list;

	}

	@RequestMapping(value = "myQuestionnaire", method = RequestMethod.POST)
	@ResponseBody
	public List<Questionnaire> myQuestionnaire(HttpServletRequest req) {

		List<Questionnaire> list = new ArrayList<Questionnaire>();

		if (req.getSession() == null || req.getSession().getAttribute("name") == null) {
			// mess = "never login";
		} else {
			Questionnaire questionnaire = new Questionnaire();

			questionnaire.setUname(req.getSession().getAttribute("name").toString());

			list = questionnaireService.listQuestionnaires(questionnaire);
		}

		return list;

	}

	// 学生端根据自己的学号查询属于它该填的问卷
	@RequestMapping(value = "listQuestionnaireByStudentNo", method = RequestMethod.GET)
	@ResponseBody
	public List<Questionnaire> listQuestionnaireByStudentNo(@RequestParam(value = "studentNo") String studentNo) {

		List<Questionnaire> list = null;

		list = questionnaireService.listQuestionnaireByStudentNo(studentNo);

		return list;

	}

	@RequestMapping(value = "listQuestionnaire", method = RequestMethod.GET)
	@ResponseBody
	public List<Questionnaire> listQuestionnaire() {

		Questionnaire questionnaire = new Questionnaire();

		List<Questionnaire> list = questionnaireService.listQuestionnaires(questionnaire);

		return list;

	}

	@RequestMapping(value = "exportExcel", method = RequestMethod.POST)
	@ResponseBody
	public Object exportExcel(HttpServletRequest req, HttpServletResponse response,
			@RequestParam(value = "qnid") int qnid,
			@RequestParam(value = "questionnaireName") String questionnaireName) {

		ExportExcel<Answer> extExcel = new ExportExcel<Answer>();

		List<List<String>> list = questionnaireService.getAnswersByQnid(qnid);

		String path = req.getServletContext().getRealPath("") + "/file/";

		String fileName = path + "xxx" + questionnaireName + System.currentTimeMillis() + ".xls";

		FileOutputStream out = null;

		try {
			out = new FileOutputStream(fileName);
			extExcel.exportQuestionnaireExcel("xxx" + questionnaireName, list, out);
		} catch (Exception e) {
			e.printStackTrace();
		}

		extExcel.download(fileName, response);

		return null;
	}

	@RequestMapping(value = "getQuestionnaire", method = RequestMethod.GET)
	@ResponseBody
	public List<Question> getQuestionnaire(@RequestParam(value = "qnid") int qnid) {

		List<Question> list = new ArrayList<Question>();

		list = questionnaireService.getQuestionnaire(qnid);

		if (list.size() != 0) {
			Question q = new Question();

			q.setBz(questionnaireService.getQuestionnaireSelf(qnid).getBz());

			list.add(0, q);
		}

		return list;
	}

	@RequestMapping(value = "deleteQuestionnaire", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String deleteQuestionnaire(HttpServletRequest request, HttpServletResponse res,
			@RequestParam(value = "qnid") int qnid) {

		questionnaireService.deleteQuestionnaire(qnid);

		return "delete success!!";
	}

}