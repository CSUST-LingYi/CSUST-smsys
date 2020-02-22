package csust.bean;

public class TeacherInfo {

	private int teacherId;
	private String teacherName;
	private String position;
	private String officeSpace;
	private String responsibility;
	private String phone;

	public String getResponsibility() {
		return responsibility;
	}

	public void setResponsibility(String responsibility) {
		this.responsibility = responsibility;
	}

	public int getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(int teacherId) {
		this.teacherId = teacherId;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getOfficeSpace() {
		return officeSpace;
	}

	public void setOfficeSpace(String officeSpace) {
		this.officeSpace = officeSpace;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
