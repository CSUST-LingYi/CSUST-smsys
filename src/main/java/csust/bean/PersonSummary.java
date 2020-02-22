package csust.bean;

//综测汇总
public class PersonSummary extends BasicInfo {

	private int id;
	private String xuenian;// 学年
	private double moral;// 德育分
	private double knowledge;// 智育分
	private double sports;// 体育分
	private double deduction;// 扣分
	private double sum;// 汇总
	private String bz;// 备注
	private int fails;// 挂科数目
	private boolean status;// 表示审核状态

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

	public double getMoral() {
		return moral;
	}

	public void setMoral(double moral) {
		if (moral > 25) {
			this.moral = 25;
		} else {
			this.moral = moral;
		}

	}

	public double getKnowledge() {
		return knowledge;
	}

	public void setKnowledge(double knowledge) {
		this.knowledge = knowledge;
	}

	public double getSports() {
		return sports;
	}

	public void setSports(double sports) {
		this.sports = sports;
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "PersonSummary [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "") + "moral="
				+ moral + ", knowledge=" + knowledge + ", sports=" + sports + ", sum=" + sum + ", "
				+ (bz != null ? "bz=" + bz + ", " : "") + (studentNo != null ? "studentNo=" + studentNo + ", " : "")
				+ (studentName != null ? "studentName=" + studentName + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "ClassName=" + ClassName + ", "
				+ (termYear != null ? "termYear=" + termYear : "") + "]";
	}

	public double getDeduction() {
		return deduction;
	}

	public void setDeduction(double deduction) {
		this.deduction = deduction;
	}

	public int getFails() {
		return fails;
	}

	public void setFails(int fails) {
		this.fails = fails;
	}

}
