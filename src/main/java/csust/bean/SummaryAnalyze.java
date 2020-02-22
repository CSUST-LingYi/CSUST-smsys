package csust.bean;

public class SummaryAnalyze extends BasicInfo {

	private String xuenian;// 学年
	private double score;// 分数
	private double fails;// 挂科率
	private int num;// 人数

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public double getFails() {
		return fails;
	}

	public void setFails(double fails) {
		this.fails = fails;
	}

	@Override
	public String toString() {
		return "SummaryAnalyze [" + (xuenian != null ? "xuenian=" + xuenian + ", " : "") + "score=" + score + ", fails="
				+ fails + ", num=" + num + ", " + (studentNo != null ? "studentNo=" + studentNo + ", " : "")
				+ (studentName != null ? "studentName=" + studentName + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "ClassName=" + ClassName + ", "
				+ (termYear != null ? "termYear=" + termYear + ", " : "") + (sex != null ? "sex=" + sex + ", " : "")
				+ (bz != null ? "bz=" + bz : "") + "]";
	}

}
