package csust.bean;

//综测比例
public class Proportion {

	private int id;
	private String xuenian;// 学年
	private String moralPer;// 德育分比例
	private String knowledgePer;// 智育分比例
	private String sportsPer;// 体育分比例

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

	public String getMoralPer() {
		return moralPer;
	}

	public void setMoralPer(String moralPer) {
		this.moralPer = moralPer;
	}

	public String getKnowledgePer() {
		return knowledgePer;
	}

	public void setKnowledgePer(String knowledgePer) {
		this.knowledgePer = knowledgePer;
	}

	public String getSportsPer() {
		return sportsPer;
	}

	public void setSportsPer(String sportsPer) {
		this.sportsPer = sportsPer;
	}

	@Override
	public String toString() {
		return "Proportion [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "")
				+ (moralPer != null ? "moralPer=" + moralPer + ", " : "")
				+ (knowledgePer != null ? "knowledgePer=" + knowledgePer + ", " : "")
				+ (sportsPer != null ? "sportsPer=" + sportsPer : "") + "]";
	}

}
