package csust.bean;

public class Question extends Questionnaire {

	protected int qid;// 问题的id
	protected String questionName;// 问题的id
	protected String introduce;

	public Question() {

	}

	public Question(String questionName) {
		// TODO Auto-generated constructor stub
		this.questionName = questionName;
	}

	public Question(int id, String question, String introduce) {
		// TODO Auto-generated constructor stub
		this.questionName = question;
		this.qnid = id;
		this.introduce = introduce;
	}

	public int getQid() {
		return qid;
	}

	public void setQid(int qid) {
		this.qid = qid;
	}

	public String getQuestionName() {
		return questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	public String getIntroduce() {
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	@Override
	public String toString() {
		return "Question [qid=" + qid + ", questionName=" + questionName + ", introduce=" + introduce + "]";
	}

}
