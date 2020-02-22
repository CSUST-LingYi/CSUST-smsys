package csust.bean;

//个人智育
public class PersonKnowledge extends BasicInfo {

	private int id;
	private String xuenian;
	private String courseName;
	private double credit;// 学分
	private int cid;
	private double score;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public double getCredit() {
		return credit;
	}

	public void setCredit(double credit) {
		this.credit = credit;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "PersonKnowledge [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "")
				+ (courseName != null ? "courseName=" + courseName + ", " : "") + "credit=" + credit + ", cid=" + cid
				+ ", score=" + score + ", " + (studentNo != null ? "studentNo=" + studentNo + ", " : "")
				+ (studentName != null ? "studentName=" + studentName + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "ClassName=" + ClassName + ", "
				+ (termYear != null ? "termYear=" + termYear + ", " : "") + (sex != null ? "sex=" + sex + ", " : "")
				+ (bz != null ? "bz=" + bz : "") + "]";
	}

}
