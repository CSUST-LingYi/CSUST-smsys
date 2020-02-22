package csust.bean;

public class punish {

	private int id;
	private String studentNo;
	private String punishName;
	private String punishReason;
	private String punishTime;
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

	public String getPunishName() {
		return punishName;
	}

	public void setPunishName(String punishName) {
		this.punishName = punishName;
	}

	public String getPunishReason() {
		return punishReason;
	}

	public void setPunishReason(String punishReason) {
		this.punishReason = punishReason;
	}

	public String getPunishTime() {
		return punishTime;
	}

	public void setPunishTime(String punishTime) {
		this.punishTime = punishTime;
	}
}
