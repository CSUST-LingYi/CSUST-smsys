package csust.bean;

public class JLView {

	private int JLId; // 奖励编号
	private String studentNo;// 学号
	private String JLname;// 奖励名称
	private String JLlevel;// 奖励级别
	private String adviser;// 指导老师
	private String sponsor;// 主办方
	private String getTime;// 获取时间
	private String studentName;// 学生姓名
	private String major; // 专业名字
	private String Class; // ：班级全称
	private String termYear; // 学年
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public String getAdviser() {
		return adviser;
	}

	public void setAdviser(String adviser) {
		this.adviser = adviser;
	}

	public String getSponsor() {
		return sponsor;
	}

	public void setSponsor(String sponsor) {
		this.sponsor = sponsor;
	}

	public int getJLId() {
		return JLId;
	}

	public void setJLId(int jLId) {
		JLId = jLId;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getJLname() {
		return JLname;
	}

	public void setJLname(String jLname) {
		JLname = jLname;
	}

	public String getJLlevel() {
		return JLlevel;
	}

	public void setJLlevel(String jLlevel) {
		JLlevel = jLlevel;
	}

	public String getGetTime() {
		return getTime;
	}

	public void setGetTime(String getTime) {
		this.getTime = getTime;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getClassName() {
		return Class;
	}

	public void setClass(String class1) {
		Class = class1;
	}

	public String getTermYear() {
		return termYear;
	}

	public void setTermYear(String termYear) {
		this.termYear = termYear;
	}
}
