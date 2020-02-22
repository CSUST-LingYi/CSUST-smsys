package csust.bean;

public class SkillView {

	private String studentName;// 学生姓名
	private String major; // 专业名字
	private int Class; // ：班级全称
	private String termYear; // 学年
	private int skillId;// 技能编号（自动生成的编号）
	private String studentNo;// 学号
	private String skillName;// 技能证书名称（驾驶证，会从证等）
	private String skillType;
	private String gettime;
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
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

	public int getSkillId() {
		return skillId;
	}

	public void setSkillId(int skillId) {
		this.skillId = skillId;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

	public String getGettime() {
		return gettime;
	}

	public void setGettime(String gettime) {
		this.gettime = gettime;
	}

	public String getSkillType() {
		return skillType;
	}

	public void setSkillType(String skillType) {
		this.skillType = skillType;
	}

}
