package csust.service;

import java.util.List;

import csust.bean.Question;
import csust.bean.Questionnaire;

public interface QuestionnaireService {

	// 增加一份问卷 发布问卷用户的用户名，问卷名字，面向年级，问题数组
	public String addQuestionnaire(String uname, String questionnaireName, String termYear, String bz,
			String[] questions, String[] introduces);

	// 增加一个问卷的答案(一个问卷多个问题)
	public String addAnswers(int[] qids, String[] answers, String studentNo, int qnid);

	// 通过问卷id查询该问卷下面的所有回答
	public List<List<String>> getAnswersByQnid(int id);

	// 通过用户id查询所有该用户下的所有问卷
	// 通过面向年级查询问卷
	// 或者直接把所有的问卷都查出来
	public List<Questionnaire> listQuestionnaires(Questionnaire questionnaire);

	// 删除一份问卷
	public void deleteQuestionnaire(int qnid);

	public List<Question> getQuestionnaire(int qnid);

	public Questionnaire getQuestionnaireSelf(int qnid);

	// 添加一份问卷已填的学生
	public void addFilledOutStudent(String studentNo, int qnid);

	// 通过学号查询属于学生的问卷
	public List<Questionnaire> listQuestionnaireByStudentNo(String studentNo);

}
