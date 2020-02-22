package csust.bean;

public class Feedback {
	private String monitorNo;
	private String studentNo;
	protected String studentName;
	private String P_moral;
	private String D_moral;
	private int isRead;


	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	@Override
	public String toString() {
		return "Feedback [monitorNo=" + monitorNo + ", studentNo=" + studentNo + ", studentName=" + studentName
				+ ", P_moral=" + P_moral + ", D_moral=" + D_moral + ", isRead=" + isRead + "]";
	}
	public String getMonitorNo() {
		return monitorNo;
	}
	public void setMonitorNo(String monitorNo) {
		this.monitorNo = monitorNo;
	}
	public String getStudentNo() {
		return studentNo;
	}
	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}
	public String getP_moral() {
		return P_moral;
	}
	public void setP_moral(String p_moral) {
		P_moral = p_moral;
	}
	public String getD_moral() {
		return D_moral;
	}
	public void setD_moral(String d_moral) {
		this.D_moral = d_moral;
	}
	public int getRead() {
		return isRead;
	}
	public void setRead(int read) {
		this.isRead = read;
	}
}
