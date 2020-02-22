package csust.bean;

//用来统计奖状的数量
public class view_count_reward {
	private String xuenian;
	private String nianji;
	private String major;
	private String level;
	private String name;
	private String adviser;
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public String getNianji() {
		return nianji;
	}

	public void setNianji(String nianji) {
		this.nianji = nianji;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAdviser() {
		return adviser;
	}

	public void setAdviser(String adviser) {
		this.adviser = adviser;
	}

}
