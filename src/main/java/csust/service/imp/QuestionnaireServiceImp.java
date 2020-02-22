package csust.service.imp;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import csust.bean.Answer;
import csust.bean.Question;
import csust.bean.Questionnaire;
import csust.bean.User;
import csust.mapper.QuestionnaireMapper;
import csust.mapper.UserMapper;
import csust.service.QuestionnaireService;

@Service
public class QuestionnaireServiceImp implements QuestionnaireService {

	@Autowired
	QuestionnaireMapper questionnaireMapper;

	@Autowired
	UserMapper userMapper;

	@Transactional
	public String addQuestionnaire(String uname, String questionnaireName, String termYear, String bz,
			String[] questions, String[] introdeces) {
		// TODO Auto-generated method stub

		User tuser = userMapper.getUserByName(uname);

		Questionnaire questionnaire = new Questionnaire(tuser.getId(), questionnaireName, termYear, bz);
		questionnaire.setReleaseTime(new Date());

		questionnaireMapper.addQuestionnaire(questionnaire);// 添加一份问卷

		List<Question> qlist = new ArrayList<Question>();

		for (int i = 0; i < questions.length; i++) {
			Question q = new Question(questionnaire.getQnid(), questions[i], introdeces[i]);
			qlist.add(q);
		}

		questionnaireMapper.addQuestions(qlist);// 添加问卷里面的问题
		return "success";
	}

	@Transactional
	public String addAnswers(int[] qids, String[] answers, String studentNo, int qnid) {
		// TODO Auto-generated method stub
		List<Answer> alist = new ArrayList<Answer>();
		for (int i = 0; i < qids.length; i++) {
			Answer a = new Answer(qids[i], answers[i], studentNo);
			alist.add(a);
		}
		questionnaireMapper.addAnswers(alist);
		// questionnaireMapper.addFilledOutStudent(studentNo, qnid);
		return "success";
	}

	public List<List<String>> getAnswersByQnid(int qnid) {
		// TODO Auto-generated method stub
		Map<String, List<Answer>> map = new HashMap<String, List<Answer>>();

		List<Question> Questions = questionnaireMapper.getQuestions(qnid);

		for (Question s : Questions) {
			List<Answer> list = questionnaireMapper.getAnswers(s.getQid());
			map.put(s.getQuestionName(), list);
		}

		List<String> keys = new ArrayList<String>();

		for (String s : map.keySet()) {
			keys.add(s);
		}

		List<List<String>> listlist = new ArrayList<List<String>>();

		listlist.add(keys);
		// map.get(ss[0]).size()通过第一个key获取他的List,然后再获取list的长度
		for (int i = 0; i < map.get(keys.get(0)).size(); i++) {

			List<String> list = new ArrayList<String>();

			// 循环key数组
			for (int j = 0; j < keys.size(); j++) {
				// 获取第j个key对于的List的第i个答案 这里循环i不变，取到的都是答案List同层的的值
				list.add(map.get(keys.get(j)).get(i).getAnswer());
			}
			listlist.add(list);
		}

		return listlist;
	}

	public List<Questionnaire> listQuestionnaires(Questionnaire questionnaire) {
		// TODO Auto-generated method stub
		return questionnaireMapper.listQuestionnaires(questionnaire);
	}

	public void deleteQuestionnaire(int qnid) {
		// TODO Auto-generated method stub
		questionnaireMapper.deleteQuestionnaire(qnid);
	}

	public List<Question> getQuestionnaire(int qnid) {
		// TODO Auto-generated method stub
		return questionnaireMapper.getQuestions(qnid);
	}

	public Questionnaire getQuestionnaireSelf(int qnid) {
		// TODO Auto-generated method stub
		return questionnaireMapper.getQuestionnaireSelf(qnid);
	}

	public void addFilledOutStudent(String studentNo, int qnid) {
		// TODO Auto-generated method stub
		questionnaireMapper.addFilledOutStudent(studentNo, qnid);
	}

	public List<Questionnaire> listQuestionnaireByStudentNo(String studentNo) {
		// TODO Auto-generated method stub
		return questionnaireMapper.listQuestionnaireByStudentNo(studentNo);
	}

}
