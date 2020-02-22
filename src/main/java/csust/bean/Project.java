package csust.bean;

public class Project {

	private String projectId;
	private String studentNo;// 学号
	private String projectName; // 项目名称

	private String time;// 时间
	private String isFirstCharge;// 是否项目第一负责人(是，否)
	private String image;// 图片名字
	private String stuType;// 学生类型

	public String getIsFirstCharge() {
		return isFirstCharge;
	}

	public void setIsFirstCharge(String isFirstCharge) {
		this.isFirstCharge = isFirstCharge;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

}
