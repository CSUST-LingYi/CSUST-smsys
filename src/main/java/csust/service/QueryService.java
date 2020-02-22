package csust.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import csust.bean.ALLfield;
import csust.bean.Grade;
import csust.bean.JL;
import csust.bean.Practice;
import csust.bean.Project;
import csust.bean.Skill;
import csust.bean.Student;
import csust.bean.Submission;
import csust.bean.XJYD;
import csust.bean.XJYDView;
import csust.bean.XJZC;
import csust.bean.psStudent;
import csust.bean.punish;

//已修改一遍未测试
public interface QueryService {

	/*
	 * 修改所有的方法： 如果传入参数为学号的方法不用修改，能唯一的标识某个学生 如果传入参数为一个对象的方法接口处不用修改，只需要修改
	 * *mapper.xml文件里面的sql语句 如果传入参数为id的方法也不用修改，id能唯一的标识某一条数据库里面的记录
	 * 如果传入的参数为空的的方法，需要添加一个参数区分是本科生和研究生 （stuType）
	 * 如果传入的参数既不是学号也不是id这种能唯一的标识数据库某一条记录的参数，也需要添加一个参数区分本科生和研究生
	 */

	public List<Grade> getGrade(String studentNo);// 通过学号查成绩 成功

	public List<JL> getJL(String studentNo);// 通过学号查奖励 成功

	public String getMajor(String studentNo);// 通过学号查专业 成功

	public List<Practice> getPractice(String studentNo, String type);// 通过学号查社会实践信息
																		// 成功

	public List<Skill> getSkill(String studentNo);// 通过学号查职业技能 成功

	public List<ALLfield> getStudentByClassName(String nianji, String major, int classNo, String stuType); // 通过班级查询学生
																											// 成功

	public List<String> getClassByMajorAndTerm(String year, String major, String stuType); // 通过年级和专业查询班级
																							// 成功

	public List<ALLfield> SelectAllField(String stuType); // 查询所有字段的信息

	public String[] getMonitorByStudent(String nianji,String major,int className);
		
	// 此方法暂时未修改
	public StringBuffer readExcelFile(MultipartFile file, String stuType);// 处理上传的Excel

	public List<ALLfield> getStudentByNianji(String nianji, String stuType); // 查询一个年级的所有学生

	public List<ALLfield> getByNianjiAndMajor(String nianji, String major, String stuType);// 查询一个年级一个专业的所有学生

	public List<csust.bean.punish> getPunish(String studentNo);// 通过学号查询惩罚

	public List<psStudent> getPS(String studentNo);// 查询贫困生

	public List<punish> getPunishByType(String s, String stuType);// 通过惩罚类型查询

	public List<ALLfield> getStudentBySexAndNianji(String nianji, String sex, String stuType);// 通过年级性别查询

	public List<ALLfield> getStudentBySexAndMajor(String nianji, String major, String sex, String stuType);// 通过年级专业性别查询

	public List<ALLfield> getStudentBySexAndClass(String nianji, String major, String className, String sex,
			String stuType);// 通过年级专业班级性别查询

	public List<ALLfield> getStudentByMZAndNianji(String nianji, String mz, String stuType);// 通过年级民族查询

	public List<ALLfield> getStudentByMZAndMajor(String nianji, String major, String mz, String stuType);// 通过年级专业民族擦查询

	public List<ALLfield> getStudentByMZAndClass(String nianji, String major, String className, String mz,
			String stuType);// 通过年级专业班级民族查询

	public List<ALLfield> getStudentByZZMMAndNianji(String nianji, String zzmm, String stuType);// 通过年级政治面貌查询

	public List<ALLfield> getStudentByZZMMAndMajor(String nianji, String major, String zzmm, String stuType);// 通过年级专业政治面貌查询

	public List<ALLfield> getStudentByZZMMAndClass(String nianji, String major, String className, String zzmm,
			String stuType);// 通过年级专业班级政治面貌查询
	public List<ALLfield> getStudentByCommonQuery(String nianji, String major, Integer className, String zzmm, String mingzu,String sex,
			String stuType);// 通过一般条件查询
	public List<ALLfield> getStudentByBuildingAndNianji(String nianji, String building, String room, String stuType);// 通过年级寝室楼栋和宿舍号

	public List<ALLfield> getStudentByBuildingAndMajor(String nianji, String major, String building, String room,
			String stuType);// 通过年级专业寝室楼栋和宿舍号

	public List<ALLfield> getStudentByBuildingAndClass(String nianji, String major, String className, String building,
			String room, String stuType);// 通过年级专业班级寝室楼栋宿舍号

	public List<ALLfield> getStudentByBuildingAndNianji(String nianji, String buliding, String stuType);// 通过年级寝室楼栋

	public List<ALLfield> getStudentByBuildingAndMajor(String nianji, String major, String buliding, String stuType);// 通过年级专业寝室楼栋

	public List<ALLfield> getStudentByBuildingAndClass(String nianji, String major, String className, String building,
			String stuType);// 通过年级专业班级寝室楼栋

	public List<XJYDView> getXjydView(String stuType);

	public void updateStudent(Student student); // 增加学生基本信息 成功

	public void addXJYD(XJYD xjyd); // 学籍异动登记

	public Boolean isExistXJYD(String studentNo, String YDtime, String YDreason, String BZ); // 判断学籍异动信息是否存在

	public void addXJZC(XJZC xjzc); // 学籍注册登记

	public Boolean isExistXJZC(String studentNo, String ZCyear, String term, boolean ZCorNot); // 判断是否存在学籍注册信息

	public void addPunish(punish punish); // 违规信息录入

	public boolean isExistPunish(String studentNo, String Time, String punishReason, String result);

	public void addJL(JL jl); // 奖励信息录入 测试成功

	public boolean isExistJL(String studentNo, String JLname, String JLlevel, String getTime); // 根据详细信息判断是否已存在奖励信息

	public void addSkill(Skill skill); // 技能信息录入 测试成功

	public boolean isExistSkill(String studentNo, String skillName, String getTime); // 根据详细信息判断技能信息是否存在

	public void addPractice(Practice practice); // 实践信息录入 测试成功

	public boolean isExistPractice(String studentNo, String practiceName, String type, String startTime,
			String endTime); // 根据详细信息判断实践信息是否存在

	public void addPstudent(psStudent pstudent); // 资助信息录入 测试成功

	public boolean isExistPstudent(String pstudentNo, String SFZK, String ZZname, String ZZtime); // 判断资助信息是否存在

	public void addGrade(Grade grade); // 成绩录入 测试成功

	public Boolean isExistGrade(String studentNo, String termNo); // 判断学生对应学期是否已存在成绩

	public Student selectStudent(String studentNo); // 通过学号查询学生基本信息 测试成功

	public List<Grade> selectGrade(String studentNo); // 通过学号查询学生成绩 测试成功

	public List<JL> selectJL(String studentNo); // 通过学号查询学生奖励信息 测试成功

	public List<Skill> selectSkill(String studentNo); // 通过学号查询学生技能信息 测试成功

	public List<Practice> selectPractice(String studentNo); // 通过学号查询学生实践信息 测试成功

	public List<psStudent> selectPstudent(String studentNo); // 通过学号查询学生资助信息
																// 测试成功

	public List<XJYD> selectXJYD(String studentNo); // 通过学号查询学生学籍异动信息 测试成功

	public List<XJZC> selectXJZC(String studentNo); // 学籍信息查询 测试成功

	public void updateGrade(String studentNo, String termNo, String avgGrade, String avgCPA); // 修改学生成绩信息

	public void deleteGrade(String studentNo, String termNo); // 根据学号和学期删除学生成绩

	public void updatePractice(String studentNo, String update_practiceName, String update_practiceType,
			String update_startPTime, String update_endPTime, String practiceName, String type, String startTime,
			String endTime); // 修改实践信息

	public void deletePractice(String studentNo, String practiceName, String type, String startTime, String endTime); // 删除实践信息

	public void updatePstudent(String studentNo, String update_ZZname, String update_ZZtime, String update_zz_Type,
			String ZZname, String ZZtime); // 修改资助信息

	public boolean isExistStudent(String studentNo); // 通过学号判断是否存在该学生

	// 通过详细信息判断是否存在该学生，防止前端重复保存
	public boolean isExistStudent2(String studentNo, String studentName, String termYear, String major,
			String className, String sex, String MZ, String ZZMM);

	public void deleteJL(int sid);

	public void deleteSkill(int skillId);

	public boolean isExistProject(Project p);

	public void addProject(Project p); // 添加一个课题项目

	public List<Project> selectProject(String studentNo);

	public boolean isExistSubmission(Submission s);

	public void addSubmission(Submission s);

	public List<Project> selectLWFB(String studentNo);

	//public String getMonitorByClass(String nianji, String major, int className);
	
}
