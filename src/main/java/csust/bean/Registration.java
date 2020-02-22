package csust.bean;

import java.util.Date;

public class Registration extends BasicInfo {

	private int id;
	private int lid;// 讲座的id
	private String title;
	private Date registrationTime;// 报名时间
	private String status;// 报名状态

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLid() {
		return lid;
	}

	public void setLid(int lid) {
		this.lid = lid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getRegistrationTime() {
		return registrationTime;
	}

	public void setRegistrationTime(Date registrationTime) {
		this.registrationTime = registrationTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Registration [id=" + id + ", lid=" + lid + ", " + (title != null ? "title=" + title + ", " : "")
				+ (registrationTime != null ? "registrationTime=" + registrationTime + ", " : "")
				+ (status != null ? "status=" + status + ", " : "")
				+ (studentNo != null ? "studentNo=" + studentNo + ", " : "")
				+ (studentName != null ? "studentName=" + studentName + ", " : "")
				+ (major != null ? "major=" + major + ", " : "") + "ClassName=" + ClassName + ", "
				+ (termYear != null ? "termYear=" + termYear + ", " : "") + (sex != null ? "sex=" + sex + ", " : "")
				+ (phone != null ? "phone=" + phone : "")+"]";
	}

}
