package csust.bean;

public class Submission {

	private int submissionId;// 文章发表id
	private String studentNo;// 学号
	private String articleName;// 文章主题名称
	private String type;// 文章类型
	private String time;
	private String periodical;// 期刊
	private String image;// 图片名称

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public int getSubmissionsId() {
		return submissionId;
	}

	public void setSubmissionsId(int submissionsId) {
		this.submissionId = submissionsId;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getArticleName() {
		return articleName;
	}

	public void setArticleName(String articleName) {
		this.articleName = articleName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPeriodical() {
		return periodical;
	}

	public void setPeriodical(String periodical) {
		this.periodical = periodical;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
