package csust.bean;

//个人德育
public class PersonMoral extends BasicInfo {

	private int id;
	private String xuenian;
	private int mid;// 德育分id
	private String name;// 加分项名称
	private int jid;// 奖励的id
	private String type;// 加分项的类别
	private double score;// 分值
	private String getTime;// 获得时间
	private String imagePath;// 照片路径

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

	public int getJid() {
		return jid;
	}

	public void setJid(int jid) {
		this.jid = jid;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "PersonMoral [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "") + "mid=" + mid
				+ ", " + (name != null ? "name=" + name + ", " : "") + "jid=" + jid + ", "
				+ (type != null ? "type=" + type + ", " : "") + "score=" + score + ", "
				+ (imagePath != null ? "imagePath=" + imagePath + ", " : "")
				+ (studentNo != null ? "studentNo=" + studentNo + ", " : "")
				+ (studentName != null ? "studentName=" + studentName + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "ClassName=" + ClassName + ", "
				+ (termYear != null ? "termYear=" + termYear + ", " : "") + (sex != null ? "sex=" + sex : "") + "]";
	}

	public String getGetTime() {
		return getTime;
	}

	public void setGetTime(String getTime) {
		this.getTime = getTime;
	}

}
