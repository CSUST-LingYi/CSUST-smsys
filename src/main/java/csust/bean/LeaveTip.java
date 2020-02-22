package csust.bean;

public class LeaveTip {
	private int id;
	private String sno; // 学号
	private String termYear;// 年级
	private String major;// 专业
	private String classno;// 班级
	private String sname;// 姓名
	private String studenttel;// 手机号
	private String dormitory;// 所住宿舍
	private String reason;// 请假原因
	private String gowhere;// 请假去哪
	private String dayofleave;// 请假的天数
	private String parenttel;// 家长电话
	private String leavebegin;// 起止日期
	private String leaveend;// 终止日期
	private String leavedate;// 销假日期
	private String approve;// 同意签名
	private int status;// 记录请假的批准状态
	private String stuType;// 学生类型：本科生，研究生
	private String userName;// 记录处理时的账号的账号名

	public String getTermYear() {
		return termYear;
	}

	public void setTermYear(String termYear) {
		this.termYear = termYear;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSno() {
		return sno;
	}

	public void setSno(String sno) {
		this.sno = sno;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getClassno() {
		return classno;
	}

	public void setClassno(String classno) {
		this.classno = classno;
	}

	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

	public String getStudenttel() {
		return studenttel;
	}

	public void setStudenttel(String studenttel) {
		this.studenttel = studenttel;
	}

	public String getDormitory() {
		return dormitory;
	}

	public void setDormitory(String dormitory) {
		this.dormitory = dormitory;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getGowhere() {
		return gowhere;
	}

	public void setGowhere(String gowhere) {
		this.gowhere = gowhere;
	}

	public String getDayofleave() {
		return dayofleave;
	}

	public void setDayofleave(String dayofleave) {
		this.dayofleave = dayofleave;
	}

	public String getParenttel() {
		return parenttel;
	}

	public void setParenttel(String parenttel) {
		this.parenttel = parenttel;
	}

	public String getLeavebegin() {
		return leavebegin;
	}

	public void setLeavebegin(String leavebegin) {
		this.leavebegin = leavebegin;
	}

	public String getLeaveend() {
		return leaveend;
	}

	public void setLeaveend(String leaveend) {
		this.leaveend = leaveend;
	}

	public String getLeavedate() {
		return leavedate;
	}

	public void setLeavedate(String leavedate) {
		this.leavedate = leavedate;
	}

	public String getApprove() {
		return approve;
	}

	public void setApprove(String approve) {
		this.approve = approve;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}
