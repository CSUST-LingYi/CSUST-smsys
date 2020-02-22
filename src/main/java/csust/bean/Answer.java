package csust.bean;

public class Answer extends Question {

	private int id;// 答案的id
	private String answer;
	private String studentNo;

	public Answer() {

	}

	public Answer(int qid, String answer, String studentNo) {
		// TODO Auto-generated constructor stub
		this.qid = qid;
		this.answer = answer;
		this.studentNo = studentNo;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	@Override
	public String toString() {
		return "Answer [id=" + id + ", answer=" + answer + ", studentNo=" + studentNo + ", qid=" + qid
				+ ", questionName=" + questionName + ", qnid=" + qnid + ", uid=" + uid + ", questionnaireName="
				+ questionnaireName + ", termYear=" + termYear + "]";
	}

}
