package csust.bean;

public class Practice { // 学生社会实践信息表

	private int practiceId; // 实践编号（自动生成的编号）
	private String studentNo;// 学号
	private String practiceName;// 实践项目名称简介
	private String startTime;// ：实践开始时间
	private String endTime;// 实践结束时间
	private String type;// 类型
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public int getPracticeId() {
		return practiceId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setPracticeId(int practiceId) {
		this.practiceId = practiceId;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getPracticeName() {
		return practiceName;
	}

	public void setPracticeName(String practiceName) {
		this.practiceName = practiceName;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

}
