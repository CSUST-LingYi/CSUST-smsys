package csust.bean;

public class MoralSummary {

	private int id;
	private String xuenian;
	private String studentNo;
	private double selfEvaluation;
	private double classEvaluation;
	private double teacherEvaluation;
	private double additionnalScore;
	private double summary;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public double getSelfEvaluation() {
		return selfEvaluation;
	}

	public void setSelfEvaluation(double selfEvaluation) {
		this.selfEvaluation = selfEvaluation;
	}

	public double getClassEvaluation() {
		return classEvaluation;
	}

	public void setClassEvaluation(double classEvaluation) {
		this.classEvaluation = classEvaluation;
	}

	public double getTeacherEvaluation() {
		return teacherEvaluation;
	}

	public void setTeacherEvaluation(double teacherEvaluation) {
		this.teacherEvaluation = teacherEvaluation;
	}

	public double getAdditionnalScore() {
		return additionnalScore;
	}

	public void setAdditionnalScore(double additionnalScore) {
		this.additionnalScore = additionnalScore;
	}

	public double getSummary() {
		return summary;
	}

	public void setSummary(double summary) {
		this.summary = summary;
	}

	@Override
	public String toString() {
		return "MoralSummary [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "")
				+ (studentNo != null ? "studentNo=" + studentNo + ", " : "") + "selfEvaluation=" + selfEvaluation
				+ ", classEvaluation=" + classEvaluation + ", teacherEvaluation=" + teacherEvaluation
				+ ", additionnalScore=" + additionnalScore + ", summary=" + summary + "]";
	}

}
