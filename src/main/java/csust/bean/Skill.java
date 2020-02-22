package csust.bean;

public class Skill {// 学生资格技能信息表

	private int skillId;// 技能编号（自动生成的编号）
	private String studentNo;// 学号
	private String skillName;// 技能证书名称（驾驶证，会从证等）
	private String gettime;
	private String skillType;
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public String getGettime() {
		return gettime;
	}

	public void setGettime(String gettime) {
		this.gettime = gettime;
	}

	public String getType() {
		return skillType;
	}

	public void setType(String skillType) {
		this.skillType = skillType;
	}

	public int getSkillId() {
		return skillId;
	}

	public String getTime() {
		return gettime;
	}

	public void setTime(String time) {
		this.gettime = time;
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

}
