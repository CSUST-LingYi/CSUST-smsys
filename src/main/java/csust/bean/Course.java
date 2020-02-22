package csust.bean;

//课程
public class Course {

	private int id;// 课程id
	private String xuenian;// 学年
	private String termYear;// 年级
	private String major;// 专业
	private int className;// 班级名称
	private String courseName;// 课程名称
	private double credit;// 学分

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

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public int getClassName() {
		return className;
	}

	public void setClassName(int className) {
		this.className = className;
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

	public String getTermYear() {
		return termYear;
	}

	public void setTermYear(String termYear) {
		this.termYear = termYear;
	}

	@Override
	public String toString() {
		return "Course [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "className=" + className + ", "
				+ (courseName != null ? "courseName=" + courseName + ", " : "") + "credit=" + credit + "]";
	}

}
