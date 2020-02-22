package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import csust.bean.ALLfield;

import csust.bean.Grade;
import csust.bean.JL;
import csust.bean.Practice;
import csust.bean.Project;
import csust.bean.Skill;
import csust.bean.Student;
import csust.bean.Submission;
import csust.bean.User;
import csust.bean.XJYD;
import csust.bean.XJYDView;
import csust.bean.XJZC;
import csust.bean.psStudent;
import csust.bean.punish;
import csust.mapper.QueryMapper;
import csust.service.QueryService;
import csust.service.UserService;
import readExcel.ReadExcel;

@Service
public class QueryServiceImp implements QueryService {

	@Autowired
	QueryMapper queryMapper;
	
	@Autowired
	UserService userService;

	public List<punish> getPunishByType(String s, String stuType) {
		return queryMapper.getPunishByType(s, stuType);
	};// 通过惩罚类型查询

	public List<psStudent> getPS(String studentNo) {
		return queryMapper.getPS(studentNo);
	};

	public List<punish> getPunish(String studentNo) {
		return queryMapper.getPunish(studentNo);
	}

	public List<ALLfield> getByNianjiAndMajor(String nianji, String major, String stuType) { // 通过年级专业查询学生
		return queryMapper.getByNianjiAndMajor(nianji, major, stuType);
	};

	public List<ALLfield> getStudentByNianji(String nianji, String stuType) {// 通过年级查询所有学生
		return queryMapper.getStudentByNianji(nianji, stuType);
	};

	public List<Grade> getGrade(String studentNo) {
		return queryMapper.getGrade(studentNo);
	}

	public List<JL> getJL(String studentNo) {
		// TODO Auto-generated method stub
		return queryMapper.getJL(studentNo);
	}

	public String getMajor(String studentNo) {
		// TODO Auto-generated method stub
		return queryMapper.getMajor(studentNo);
	}

	public List<Practice> getPractice(String studentNo, String type) {
		// TODO Auto-generated method stub
		return queryMapper.getPractice(studentNo, type);
	}

	public List<Skill> getSkill(String studentNo) {
		// TODO Auto-generated method stub
		return queryMapper.getSkill(studentNo);
	}

	public List<ALLfield> getStudentByClassName(String nianji, String major, int className, String stuType) { // 通过班级查询学生
		return queryMapper.getStudentByClassName(nianji, major, className, stuType);
	}

	public List<String> getClassByMajorAndTerm(String year, String major, String stuType) {
		return queryMapper.getClassByMajorAndTerm(year, major, stuType);
	}

	public List<ALLfield> SelectAllField(String stuType) {
		return queryMapper.SelectAllField(stuType);
	}

	@Transactional
	public StringBuffer readExcelFile(MultipartFile file, String stuType) {
		StringBuffer result = new StringBuffer();

		// 创建处理EXCEL的类
		ReadExcel readExcel = new ReadExcel();
		// 解析excel，获取上传的事件单
		List<Student> list = readExcel.getExcelInfo(file);

		Student test = null;
		// 至此已经将excel中的数据转换到list里面了,接下来就可以操作list,可以进行保存到数据库,或者其他操作,
		int n = 0;
		User user = new User();
		for (int i = 0; i < list.size(); i++) {
			if(list.get(i)==null || list.get(i).getStudentNo()==null)
				break;
			test = list.get(i);		
			String id = test.getStudentNo();
			Student s = queryMapper.getStudentByNo(id);
			if (s == null) {
				test.setStuType(stuType);
				queryMapper.insertTest(test);
				
				//相应的在用户表插一条数据
				user.setUserName(test.getStudentNo());
				user.setPassword("123456");
				user.setUserType("student");
				userService.addUser(user);
				System.out.println(user);
			} else {
				n++;
				result.append(test.getStudentNo() + test.getStudentName() + ",  ");
				continue;
			}
		}

		if (n != 0) {
			result.append(n + "条记录重复或者已存在。");
		}

		// 和你具体业务有关,这里不做具体的示范
		if (list != null && !list.isEmpty()) {

			result.append("上传成功");
		} else {
			result.append("上传失败");
		}
		return result;
	}

	public List<ALLfield> getStudentBySexAndNianji(String nianji, String sex, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentBySexAndNianji(nianji, sex, stuType);
	}

	public List<ALLfield> getStudentBySexAndMajor(String nianji, String major, String sex, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentBySexAndMajor(nianji, major, sex, stuType);
	}

	public List<ALLfield> getStudentBySexAndClass(String nianji, String major, String className, String sex,
			String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentBySexAndClass(nianji, major, className, sex, stuType);
	}

	public List<ALLfield> getStudentByMZAndNianji(String nianji, String mz, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByMZAndNianji(nianji, mz, stuType);
	}

	public List<ALLfield> getStudentByMZAndMajor(String nianji, String major, String mz, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByMZAndMajor(nianji, major, mz, stuType);
	}

	public List<ALLfield> getStudentByMZAndClass(String nianji, String major, String className, String mz,
			String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByMZAndClass(nianji, major, className, mz, stuType);
	}

	public List<ALLfield> getStudentByZZMMAndNianji(String nianji, String zzmm, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByZZMMAndNianji(nianji, zzmm, stuType);
	}

	public List<ALLfield> getStudentByZZMMAndMajor(String nianji, String major, String zzmm, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByZZMMAndMajor(nianji, major, zzmm, stuType);
	}

	public List<ALLfield> getStudentByZZMMAndClass(String nianji, String major, String className, String zzmm,
			String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByZZMMAndClass(nianji, major, className, zzmm, stuType);
	}

	public List<ALLfield> getStudentByBuildingAndNianji(String nianji, String building, String room, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByBuildingAndNianji(nianji, building, room, stuType);
	}

	public List<ALLfield> getStudentByBuildingAndMajor(String nianji, String major, String building, String room,
			String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByBuildingAndMajor(nianji, major, building, room, stuType);
	}

	public List<ALLfield> getStudentByBuildingAndClass(String nianji, String major, String className, String building,
			String room, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByBuildingAndClass(nianji, major, className, building, room, stuType);
	}

	public List<ALLfield> getStudentByBuildingAndNianji(String nianji, String building, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByBuildingAndNianji1(nianji, building, stuType);
	}

	public List<ALLfield> getStudentByBuildingAndMajor(String nianji, String major, String buliding, String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByBuildingAndMajor1(nianji, major, buliding, stuType);
	}

	public List<ALLfield> getStudentByBuildingAndClass(String nianji, String major, String className, String building,
			String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getStudentByBuildingAndClass1(nianji, major, className, building, stuType);
	}

	public List<XJYDView> getXjydView(String stuType) {
		// TODO Auto-generated method stub
		return queryMapper.getXjydView(stuType);
	}

	public void addXJYD(XJYD xjyd) {
		queryMapper.addXJYD(xjyd);
	}

	public Boolean isExistXJYD(String studentNo, String YDtime, String YDreason, String BZ) {
		XJYD x = queryMapper.isExistXJYD(studentNo, YDtime, YDreason, BZ);
		if (x == null)
			return false;
		else
			return true;
	}

	public void addXJZC(XJZC xjzc) { // 学籍注册登记
		queryMapper.addXJZC(xjzc);
	}

	public Boolean isExistXJZC(String studentNo, String ZCyear, String term, boolean ZCorNot) {
		XJZC x = queryMapper.isExistXJZC(studentNo, ZCyear, term, ZCorNot);
		if (x == null)
			return false;
		else
			return true;
	}

	public void addPunish(punish punish) {
		queryMapper.addPunish(punish);
	}

	public void addJL(JL jl) {
		queryMapper.addJL(jl);
	}

	public boolean isExistJL(String studentNo, String JLname, String JLlevel, String getTime) {
		JL j = queryMapper.isExistJL(studentNo, JLname, JLlevel, getTime);
		if (j == null)
			return false;
		else
			return true;
	}

	public void addSkill(Skill skill) { // 技能信息录入 测试成功
		queryMapper.addSkill(skill);
	}

	public boolean isExistSkill(String studentNo, String skillName, String getTime) { // 根据详细信息判断技能信息是否存在
		Skill s = queryMapper.isExistSkill(studentNo, skillName, getTime);
		if (s == null)
			return false;
		else
			return true;
	}

	public void addPractice(Practice practice) { // 实践信息录入
		queryMapper.addPractice(practice);
	}

	public boolean isExistPractice(String studentNo, String practiceName, String type, String startTime,
			String endTime) {
		Practice p = queryMapper.isExistPractice(studentNo, practiceName, type, startTime, endTime);
		if (p == null)
			return false;
		else
			return true;
	}

	public void addPstudent(psStudent pstudent) { // 资助信息录入
		queryMapper.addPstudent(pstudent);
	}

	public boolean isExistPstudent(String pstudentNo, String SFZK, String ZZname, String ZZtime) {
		psStudent p = queryMapper.isExistPstudent(pstudentNo, SFZK, ZZname, ZZtime);
		if (p == null)
			return false;
		else
			return true;
	}

	public void addGrade(Grade grade) { // 成绩录入
		queryMapper.addGrade(grade);
	}

	public Boolean isExistGrade(String studentNo, String termNo) {
		// TODO Auto-generated method stub
		Grade g = queryMapper.isExistGrade(studentNo, termNo);
		if (g == null)
			return false;
		else
			return true;
	}

	public Student selectStudent(String studentNo) { // 通过学号查询学生基本信息
		return queryMapper.selectStudent(studentNo);
	}

	public List<Grade> selectGrade(String studentNo) { // 通过学号查询学生成绩
		return queryMapper.selectGrade(studentNo);
	}

	public List<JL> selectJL(String studentNo) { // 通过学号查询学生奖励信息
		return queryMapper.selectJL(studentNo);
	}

	public List<Skill> selectSkill(String studentNo) { // 通过学号查询学生技能信息
		return queryMapper.selectSkill(studentNo);
	}

	public List<Practice> selectPractice(String studentNo) { // 通过学号查询学生实践信息
		return queryMapper.selectPractice(studentNo);
	}

	public List<psStudent> selectPstudent(String studentNo) { // 通过学号查询学生资助信息
		return queryMapper.selectPstudent(studentNo);
	}

	public List<XJYD> selectXJYD(String studentNo) { // 通过学号查询学生学籍异动信息
		return queryMapper.selectXJYD(studentNo);
	}

	public List<XJZC> selectXJZC(String studentNo) { // 学籍信息查询
		return queryMapper.selectXJZC(studentNo);
	}

	public void updateGrade(String studentNo, String termNo, String avgGrade, String avgCPA) {
		// TODO Auto-generated method stub
		queryMapper.updateGrade(studentNo, termNo, avgGrade, avgCPA);
	}

	public void deleteGrade(String studentNo, String termNo) {
		// TODO Auto-generated method stub
		queryMapper.deleteGrade(studentNo, termNo);
	}

	public void updatePractice(String studentNo, String update_practiceName, String update_practiceType,
			String update_startPTime, String update_endPTime, String practiceName, String type, String startTime,
			String endTime) {
		// TODO Auto-generated method stub
		queryMapper.updatePractice(studentNo, update_practiceName, update_practiceType, update_startPTime,
				update_endPTime, practiceName, type, startTime, endTime);
	}

	public void deletePractice(String studentNo, String practiceName, String type, String startTime, String endTime) {
		// TODO Auto-generated method stub
		queryMapper.deletePractice(studentNo, practiceName, type, startTime, endTime);
	}

	// 修改资助信息
	public void updatePstudent(String studentNo, String update_ZZname, String update_ZZtime, String update_zz_Type,
			String ZZname, String ZZtime) {
		queryMapper.updatePstudent(studentNo, update_ZZname, update_ZZtime, update_zz_Type, ZZname, ZZtime);
		System.out.println("aaa");
	}

	public boolean isExistStudent(String studentNo) { // 通过学号判断是否存在该学生
		Student s = queryMapper.isExistStudent(studentNo);
		boolean ms = false;
		if (s != null) {
			ms = true;
			return ms;
		} else
			return ms;
	}

	public boolean isExistStudent2(String studentNo, String studentName, String termYear, String major,
			String className, String sex, String MZ, String ZZMM) { // 通过详细信息判断是否存在该学生，防止前端重复保存
		Student s = queryMapper.isExistStudent2(studentNo, studentName, termYear, major, className, sex, MZ, ZZMM);
		if (s == null)
			return false;
		else
			return true;
	}

	public void updateStudent(Student student) { // 增加学生基本信息
		queryMapper.updateStudent(student);
	}

	public void deleteJL(int sid) {
		// TODO Auto-generated method stub
		queryMapper.deleteJL(sid);
	}

	public void deleteSkill(int skillId) {
		// TODO Auto-generated method stub
		queryMapper.deleteSkill(skillId);
	}

	public boolean isExistPunish(String studentNo, String Time, String punishReason, String result) {
		// TODO Auto-generated method stub
		if (queryMapper.isExistPunish(studentNo, Time, punishReason, result) != null)
			return true;
		return false;
	}

	public boolean isExistProject(Project p) {
		// TODO Auto-generated method stub
		if (queryMapper.selectProject(p) == null) {
			return false;
		}
		return true;
	}

	public void addProject(Project p) {
		// TODO Auto-generated method stub
		queryMapper.addProject(p);
	}

	public List<Project> selectProject(String studentNo) {
		// TODO Auto-generated method stub
		return queryMapper.selectProject0000(studentNo);
	}

	public boolean isExistSubmission(Submission s) {
		// TODO Auto-generated method stub
		if (queryMapper.selectSubmission(s) == null) {
			return false;
		}

		return true;
	}

	public void addSubmission(Submission s) {
		// TODO Auto-generated method stub
		queryMapper.addSubmission(s);
	}

	public List<Project> selectLWFB(String studentNo) {
		// TODO Auto-generated method stub
		return queryMapper.selectLWFB(studentNo);
	}

	public List<ALLfield> getStudentByCommonQuery(String nianji, String major, Integer className, String zzmm,
			String mingzu, String sex, String stuType) {
		// TODO 自动生成的方法存根
		return queryMapper.getStudentByCommonQuery(nianji,major,className,zzmm,mingzu,sex,stuType);
	}

	public String[] getMonitorByStudent(String nianji, String major, int className) {
		// TODO 自动生成的方法存根
		return queryMapper.getMonitorByStudent(nianji, major, className);
	}

	/*public String getMonitorByClass(String nianji, String major, int className) {
		// TODO 自动生成的方法存根
		return queryMapper.getMonitorByClass(nianji,major,className);
	}*/

}
