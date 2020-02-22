package csust.bean;

public class User {

	private int id;// 数据库自动生成的id
	private String userName;// 用户名
	private String password;// 密码
	private String userType;// 用户类型

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", " + (userName != null ? "userName=" + userName + ", " : "")
				+ (password != null ? "password=" + password + ", " : "")
				+ (userType != null ? "userType=" + userType : "") + "]";
	}

}
