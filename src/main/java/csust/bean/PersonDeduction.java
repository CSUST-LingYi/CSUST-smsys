package csust.bean;

public class PersonDeduction extends Deduction {

	private int id;
	private String xuenian;
	private String studentNo;
	private int did;
	private int times;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

	public int getDid() {
		return did;
	}

	public void setDid(int did) {
		this.did = did;
	}

	@Override
	public String toString() {
		return "PersonDeduction [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "")
				+ (studentNo != null ? "studentNo=" + studentNo + ", " : "") + "did=" + did + ", times=" + times + ", "
				+ (name != null ? "name=" + name + ", " : "") + "score=" + score + ", " + (bz != null ? "bz=" + bz : "")
				+ "]";
	}

}
