package csust.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import csust.bean.Answer;
import csust.bean.Question;
import csust.bean.Questionnaire;

public interface QuestionnaireMapper {

	public void addQuestionnaire(Questionnaire questionnaire);

	public void addQuestions(List<Question> qlist);

	public void addAnswers(List<Answer> alist);

	public List<Answer> getAnswers(int qid);

	public List<Question> getQuestions(int qnid);

	public List<Questionnaire> listQuestionnaires(Questionnaire questionnaire);

	public void deleteQuestionnaire(int qnid);

	public Questionnaire getQuestionnaireSelf(int qnid);

	// 把问卷填了的学生加入该表
	public void addFilledOutStudent(@Param("studentNo") String studentNo, @Param("qnid") int qnid);

	// 通过学号把属于他需要填的问卷列出来
	public List<Questionnaire> listQuestionnaireByStudentNo(@Param("studentNo") String studentNo);

}
