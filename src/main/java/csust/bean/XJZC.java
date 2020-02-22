package csust.bean;

public class XJZC {
	private int id;
	private String studentNo;
	private String ZCyear;
	private String term;
	private boolean ZCorNot = false;
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

	public void setTerm(String trem) {
		this.term = trem;
	}

	public boolean isZCorNot() {
		return ZCorNot;
	}

	public void setZCorNot(boolean zCorNot) {
		ZCorNot = zCorNot;
	}

}
