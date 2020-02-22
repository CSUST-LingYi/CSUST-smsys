package csust.bean;

public class Grade {// 成绩表
	private String studentNo;// 学号
	private String termNo;// 学期编号
	private double avgGrade;// 平均成绩
	private double avgCPA;// 平均学分
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getTermNo() {
		return termNo;
	}

	public double getAvgGrade() {
		return avgGrade;
	}

	public void setAvgGrade(double avgGrade) {
		this.avgGrade = avgGrade;
	}

	public double getAvgCPA() {
		return avgCPA;
	}

	public void setAvgCPA(double avgCPA) {
		this.avgCPA = avgCPA;
	}

	public void setTermNo(String termNo) {
		this.termNo = termNo;
	}

}