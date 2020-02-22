package csust.bean;

//校友风采表（优秀校友）
public class Alumni {

	private int sid;// 外键，校友信息表的主键
	private String name;// 校友姓名
	private String deeds;// 校友事迹
	private String imagePath;// 图片保存路径

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDeeds() {
		return deeds;
	}

	public void setDeeds(String deeds) {
		this.deeds = deeds;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	@Override
	public String toString() {
		return "Alumni [sid=" + sid + ", " + (name != null ? "name=" + name + ", " : "")
				+ (deeds != null ? "deeds=" + deeds + ", " : "") + (imagePath != null ? "imagePath=" + imagePath : "")
				+ "]";
	}

}
