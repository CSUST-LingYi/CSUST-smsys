package csust.bean;

public class JL {

	private int JLId; // 奖励编号
	private String studentNo;// 学号
	private String JLname;// 奖励名称
	private String JLlevel;// 奖励级别
	private String getTime;// 获取时间
	private String adviser;// 指导老师
	private String sponsor;// 主办方
	private String termOrindividual;// 团队或个人
	private String imageName;
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public String getSponsor() {
		return sponsor;
	}

	public void setSponsor(String sponsor) {
		this.sponsor = sponsor;
	}

	public String getAdviser() {
		return adviser;
	}

	public void setAdviser(String adviser) {
		this.adviser = adviser;
	}

	public String getTermOrindividual() {
		return termOrindividual;
	}

	public void setTermOrindividual(String termOrindividual) {
		this.termOrindividual = termOrindividual;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public int getJLId() {
		return JLId;
	}

	public void setJLId(int jLId) {
		JLId = jLId;
	}

	public String getGetTime() {
		return getTime;
	}

	public void setGetTime(String getTime) {
		this.getTime = getTime;
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

}
