package csust.bean;

public class XjzcView {
	private int id;
	private String studentNo;
	private String ZCyear;
	private String term;
	private boolean ZCorNot = false;
	private String studentName;// 学生姓名
	private String major; // 专业名字
	private int Class; // ：班级全称
	private String termYear; // 学年
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getZCyear() {
		return ZCyear;
	}

	public void setZCyear(String zCyear) {
		ZCyear = zCyear;
	}

	public String getTerm() {
		return term;
	}

	public void setTrem(String trem) {
		this.term = trem;
	}

	public boolean isZCorNot() {
		return ZCorNot;
	}

	public void setZCorNot(boolean zCorNot) {
		ZCorNot = zCorNot;
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

	public int getClassName() {
		return Class;
	}

	public void setClass(int class1) {
		Class = class1;
	}

	public String getTermYear() {
		return termYear;
	}

	public void setTermYear(String termYear) {
		this.termYear = termYear;
	}

}
