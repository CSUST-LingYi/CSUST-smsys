package csust.bean;

public class BasicInfo {

	String studentNo; // 学号
	String studentName;// 学生姓名
	String major; // 专业名字
	int ClassName; // ：班级全称
	String termYear;// 年级
	String sex;// 性别
	String phone;
	String bz;// 备注（主要用于monitor表的备注）
	int num;

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	@Override
	public String toString() {
		return "BasicInfo [" + (studentNo != null ? "studentNo=" + studentNo + ", " : "")
				+ (studentName != null ? "studentName=" + studentName + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "ClassName=" + ClassName + ", "
				+ (termYear != null ? "termYear=" + termYear + ", " : "") + (sex != null ? "sex=" + sex + ", " : "")
				+ (phone != null ? "phone=" + phone + ", " : "")
				+ (bz != null ? "bz=" + bz + ", " : "") + "num=" + num + "]";
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
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
		return ClassName;
	}

	public void setClassName(int ClassName) {
		this.ClassName = ClassName;
	}

	public String getTermYear() {
		return termYear;
	}

	public void setTermYear(String termYear) {
		this.termYear = termYear;
	}
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
