package csust.bean;

//用来统计上传的成绩Excel里面的学生成绩
public class StudentGrade {

	private int id;// id
	private int ranking;// 排名
	private String studentNo;// 学号
	private String studentName;// 姓名
	private String sex;// 性别
	private String xuenian;// 学年
	private String xueqi;// 学期
	private String nianji;// 年级
	private String major;// 专业
	private String Class;// 班级
	private int courseCount;// 课程数
	private int fail;// 挂科数
	private float credit;// 修读学分
	private float getCredit;// 获得学分
	private float GPA;// 绩点
	private float creditGPA;// 学分绩点
	private float avgCreditGPA;// 平均学分绩点
	private float avgGrade;// 平均成绩

	// 这四个属性数据库的表并无对应的字段，专门用来便于查询的
	private float minGrade; // 最小分数
	private float maxGrade;// 最大分数
	private float minGPA;// 最小绩点
	private float maxGPA;// 最大绩点

	public float getMinGrade() {
		return minGrade;
	}

	public void setMinGrade(float minGrade) {
		this.minGrade = minGrade;
	}

	public float getMaxGrade() {
		return maxGrade;
	}

	public void setMaxGrade(float maxGrade) {
		this.maxGrade = maxGrade;
	}

	public float getMinGPA() {
		return minGPA;
	}

	public void setMinGPA(float minGPA) {
		this.minGPA = minGPA;
	}

	public float getMaxGPA() {
		return maxGPA;
	}

	public void setMaxGPA(float maxGPA) {
		this.maxGPA = maxGPA;
	}

	public String getXueqi() {
		return xueqi;
	}

	public void setXueqi(String xueqi) {
		this.xueqi = xueqi;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRanking() {
		return ranking;
	}

	public void setRanking(int ranking) {
		this.ranking = ranking;
	}

	public String getStudentNo() {
		return studentNo;
	}

	public void setStudentNo(String studentNo) {
		this.studentNo = studentNo;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getClassName() {
		return Class;
	}

	public void setClass(String class1) {
		Class = class1;
	}

	public int getCourseCount() {
		return courseCount;
	}

	public void setCourseCount(int courseCount) {
		this.courseCount = courseCount;
	}

	public int getFail() {
		return fail;
	}

	public void setFail(int fail) {
		this.fail = fail;
	}

	public float getCredit() {
		return credit;
	}

	public void setCredit(float credit) {
		this.credit = credit;
	}

	public float getGetCredit() {
		return getCredit;
	}

	public void setGetCredit(float getCredit) {
		this.getCredit = getCredit;
	}

	public float getGPA() {
		return GPA;
	}

	public void setGPA(float gPA) {
		GPA = gPA;
	}

	public float getCreditGPA() {
		return creditGPA;
	}

	public void setCreditGPA(float creditGPA) {
		this.creditGPA = creditGPA;
	}

	public float getAvgCreditGPA() {
		return avgCreditGPA;
	}

	public void setAvgCreditGPA(float avgCreditGPA) {
		this.avgCreditGPA = avgCreditGPA;
	}

	public float getAvgGrade() {
		return avgGrade;
	}

	public void setAvgGrade(float avgGrade) {
		this.avgGrade = avgGrade;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public String getNianji() {
		return nianji;
	}

	public void setNianji(String nianji) {
		this.nianji = nianji;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

}
