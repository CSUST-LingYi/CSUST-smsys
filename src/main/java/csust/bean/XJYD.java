package csust.bean;

public class XJYD {
	private String studentNo;
	private String YDtime;
	private String YDreason;
	private String BZ;
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	private int id;

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

}
