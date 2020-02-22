package csust.bean;

public class XJYDView {
	private String studentNo;
	private String YDtime;
	private String YDreason;
	private String BZ;
	private String studentName;// 学生姓名
	private int Class; // ：班级全称
	private String major; // ：专业
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getYDtime() {
		return YDtime;
	}

	public void setYDtime(String yDtime) {
		YDtime = yDtime;
	}

	public String getYDreason() {
		return YDreason;
	}

	public void setYDreason(String yDreason) {
		YDreason = yDreason;
	}

	public String getBZ() {
		return BZ;
	}

	public void setBZ(String bZ) {
		BZ = bZ;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public int getClassName() {
		return Class;
	}

	public void setClass(int class1) {
		Class = class1;
	}

}
