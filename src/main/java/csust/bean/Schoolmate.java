package csust.bean;

//校友bean
public class Schoolmate {

	private int id;// 数据库自动生成的id
	private String name;// 姓名
	private String termYear;// 年级
	private String major;// 专业
	private String graduationYear;// 毕业年份
	private String area;// 所在地区
	private String alumniAssociation;// 所属的校友会
	private String alu_position;// 校友会职务
	private String workUnit;// 工作单位
	private String position;// 职位
	private String phone;// 电话
	private String email;// 邮件
	private String QQ;// QQ
	private String wechatId;// 微信
	private String bz;// 备注
	private int count;// 此字段为了分别统计时记录数量

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

	public String getTermYear() {
		return termYear;
	}

	public void setTermYear(String termYear) {
		this.termYear = termYear;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getGraduationYear() {
		return graduationYear;
	}

	public void setGraduationYear(String graduationYear) {
		this.graduationYear = graduationYear;
	}

	public String getWorkUnit() {
		return workUnit;
	}

	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWechatId() {
		return wechatId;
	}

	public void setWechatId(String wechatId) {
		this.wechatId = wechatId;
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	public String getQQ() {
		return QQ;
	}

	public void setQQ(String qQ) {
		QQ = qQ;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAlumniAssociation() {
		return alumniAssociation;
	}

	public void setAlumniAssociation(String alumniAssociation) {
		this.alumniAssociation = alumniAssociation;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getAlu_position() {
		return alu_position;
	}

	public void setAlu_position(String alu_position) {
		this.alu_position = alu_position;
	}

	@Override
	public String toString() {
		return "Schoolmate [id=" + id + ", " + (name != null ? "name=" + name + ", " : "")
				+ (termYear != null ? "termYear=" + termYear + ", " : "")
				+ (major != null ? "major=" + major + ", " : "")
				+ (graduationYear != null ? "graduationYear=" + graduationYear + ", " : "")
				+ (area != null ? "area=" + area + ", " : "")
				+ (alumniAssociation != null ? "alumniAssociation=" + alumniAssociation + ", " : "")
				+ (alu_position != null ? "alu_position=" + alu_position + ", " : "")
				+ (workUnit != null ? "workUnit=" + workUnit + ", " : "")
				+ (position != null ? "position=" + position + ", " : "")
				+ (phone != null ? "phone=" + phone + ", " : "") + (email != null ? "email=" + email + ", " : "")
				+ (QQ != null ? "QQ=" + QQ + ", " : "") + (wechatId != null ? "wechatId=" + wechatId + ", " : "")
				+ (bz != null ? "bz=" + bz + ", " : "") + "count=" + count + "]";
	}

}
