package csust.bean;

public class psStudent {
	private int id;
	private String pstudentNo;
	private String SFZK = "0";
	private String ZZname;
	private String ZZtime;
	private int ZZmoney;
	private String type;
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public int getZZmoney() {
		return ZZmoney;
	}

	public void setZZmoney(int ZZmoney) {
		this.ZZmoney = ZZmoney;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPstudentNo() {
		return pstudentNo;
	}

	public void setPstudentNo(String pstudentNo) {
		this.pstudentNo = pstudentNo;
	}

	public String isSFZK() {
		return SFZK;
	}

	public void setSFZK(String sFZK2) {
		SFZK = sFZK2;
	}

	public String getZZname() {
		return ZZname;
	}

	public void setZZname(String zZname) {
		ZZname = zZname;
	}

	public String getZZtime() {
		return ZZtime;
	}

	public void setZZtime(String zZtime) {
		ZZtime = zZtime;
	}

}
