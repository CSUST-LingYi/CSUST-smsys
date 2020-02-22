package csust.bean;

//个人体育
public class PersonSports extends BasicInfo {

	private String xuenian;
	private double firstTerm;// 第一个学期成绩
	private double secondTerm;// 第二个学期成绩
	private double sum;

	public double getFirstTerm() {
		return firstTerm;
	}

	public void setFirstTerm(double firstTerm) {
		this.firstTerm = firstTerm;
	}

	public double getSecondTerm() {
		return secondTerm;
	}

	public void setSecondTerm(double secondTerm) {
		this.secondTerm = secondTerm;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	@Override
	public String toString() {
		return "PersonSports [" + (xuenian != null ? "xuenian=" + xuenian + ", " : "") + "firstTerm=" + firstTerm
				+ ", secondTerm=" + secondTerm + ", " + (studentNo != null ? "studentNo=" + studentNo + ", " : "")
				+ (studentName != null ? "studentName=" + studentName + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "ClassName=" + ClassName + ", "
				+ (termYear != null ? "termYear=" + termYear : "") + "]";
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

}
