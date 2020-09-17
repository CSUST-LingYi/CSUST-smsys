package csust.mapper;

import csust.bean.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PublicMapper {

	// 获取学生的基础信息
	public BasicInfo getStuInfo(@Param("userName") String userName);

	/*************** 查询到人 ***************************/
	// 审核一个学生
	public void checkOneStudent(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo,
			@Param("status") boolean status);
	// 学习部审核一个学生
	public void checkOneStudentT(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo,
				@Param("status") boolean status);
	
	//检查学习部是否审核
	public int getTban(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo);
		

	
	// 通过年级专业查询班级
	public List<Integer> getClasses(@Param("nianji") String nianji, @Param("major") String major);

	// 通过年级专业班级查询该班级的学生
	public List<Student> getStudentsByClass(@Param("nianji") String nianji, @Param("major") String major,
			@Param("classNo") int classNo);

	// 查询一个班级的汇总情况
	public List<PersonSummary> getSummaryByClass(@Param("xuenian") String xuenian, @Param("nianji") String nianji,
			@Param("major") String major, @Param("classNo") int classNo);

	// 通过学号在个人综测汇总表查询综测汇总情况
	public PersonSummary getPersonSummaryBySno(@Param("xuenian") String xuenian, @Param("studentNo") String sno);

	/*********** 个人德育分操作 ***********/

	//查询用户是否上传综测分数
	public PersonSummary getIsUpload(@Param("xuenian") String xuenian,@Param("studentNo") String studentNo);
		
	
	// 增加一项个人德育分项
	public void addPersonMoral(PersonMoral pm);
	
	
	// 删除一项个人德育分项
	public void deletePersonMoral(@Param("id") int id);

	// 修改一项个人德育分项
	public void updatePersonMoral(PersonMoral personMoral);

	// 查找一项个人德育分项
	public PersonMoral getPersonMoral(@Param("id") int id);

	// 查找一个学生所有的德育分项
	public List<PersonMoral> getPersonMoralsBySno(@Param("xuenian") String xuenian, @Param("studentNo") String sno);

	// 判断个人德育分汇总是否存在
	public boolean isExistsMoralSummary(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo);

	// 增加个人德育分汇总
	public void addMoralSummary(MoralSummary ms);

	// 修改个人德育分汇总
	public void updateMoralSummary(MoralSummary ms);

	// 删除个人德育分汇总
	public void deleteMoralSummary(@Param("id") int id);

	// 查看个人德育分汇总
	public MoralSummary getMoralSummary(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo);

	/*********** 个人智育分操作 ***********/

	// 增加一项个人智育分项
	public void addPersonKnowledge(PersonKnowledge p);

	// 修改一项个人智育分项
	public void updatePersonKnowledge(PersonKnowledge pk);

	// 删除一项个人智育分项
	public void deletePersonKnowledge(@Param("id") int id);

	// 查找一项个人智育分项
	public PersonKnowledge getPersonKnowlwdge(@Param("id") int id);

	// 通过学年，学号，课程id查看一项个人智育
	public PersonKnowledge getKnowledgeBySnoAndCourseId(@Param("xuenian") String xuenian,
			@Param("studentNo") String sno, @Param("id") int id);

	// 查找一个学生所有的智育分项
	public List<PersonKnowledge> getPersonKnowlwdgesBySno(@Param("xuenian") String xuenian,
			@Param("studentNo") String sno);

	/*********** 个人体育分操作 ***********/

	// 增加一个人的体育分
	public void addPersonSports(PersonSports ps);

	// 修改一个人的体育分项
	public void updatePersonSports(PersonSports ps);

	// 删除一个人的体育分项
	public void deletePersonSports(@Param("id") int id);

	// 查找一个人的体育分项
	public PersonSports getPersonSports(@Param("xuenian") String xuenian, @Param("studentNo") String sno);

	/*************** 个人综测汇总 **********/

	// 判断个人汇总信息是否存在
	public boolean isExistsPersonSummary(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo);

	// 初始化个人综测分数汇总
	public void addPersonSummary(@Param("xuenian") String xuenian, @Param("studentNo") String sno);

	// 修改个人汇总
	public void updatePersonSummary(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo);

	/************** 个人扣分项 **********************************/
	// 增加个人扣分项
	public void addPersonDeduction(PersonDeduction pd);

	// 修改个人扣分项
	public void updatePersonDeduction(PersonDeduction pd);

	// 删除个人扣分项
	public void deletePersonDeduction(@Param("id") int id);

	// 列出个人所有的扣分项
	public List<PersonDeduction> listPersonDeduction(@Param("xuenian") String xuenian,
			@Param("studentNo") String studentNo);

	public Moral getMoralTypeById(@Param("id") int id);

	public PersonDeduction getPersonOneDeduction(@Param("xuenian") String xuenian, @Param("studentNo") String studentNo,
			@Param("did") int did);
	//public void insertFeedback(@Param("monitorNo") String monitorNo,@Param("studentNo") String studentNo,@Param("P_moral") String P_moral, @Param("D_moral") String D_moral);
	public void insertFeedback(Feedback fb);


	public void updateFeedbackStatus(@Param(value = "studentNo") String studentNo,@Param(value = "isRead") int isRead);

	public void resetStatus(@Param(value = "xuenian") String xuenian,@Param(value = "studentNo") String studentNo);
}
