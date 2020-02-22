package csust.bean;

public class PsStudentView {

	private int id;
	private String pstudentNo;
	private boolean SFZK = false;
	private String ZZname;
	private String ZZtime;
	private String type;
	private int ZZmoney;
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

	public int getZZmoney() {
		return ZZmoney;
	}

	public void setZZmoney(int zZmoney) {
		ZZmoney = zZmoney;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPstudentNo() {
		return pstudentNo;
	}

	public void setPstudentNo(String pstudentNo) {
		this.pstudentNo = pstudentNo;
	}

	public boolean isSFZK() {
		return SFZK;
	}

	public void setSFZK(boolean sFZK) {
		SFZK = sFZK;
	}

	public String getZZname() {
		return ZZname;
	}

	public void setZZname(String zZname) {
		ZZname = zZname;
	}

	public String getZZtime() {
		return ZZtime;
	}

	public void setZZtime(String zZtime) {
		ZZtime = zZtime;
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
