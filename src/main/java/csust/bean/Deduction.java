package csust.bean;

public class Deduction {

	int id;
	String name;// 扣分项名称
	double score;// 分值
	String bz;// 备注

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	@Override
	public String toString() {
		return "Deduction [id=" + id + ", " + (name != null ? "name=" + name + ", " : "") + "score=" + score + ", "
				+ (bz != null ? "bz=" + bz : "") + "]";
	}

}
