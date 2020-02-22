package csust.service;

import java.util.List;

import csust.bean.BasicInfo;
import csust.bean.Feedback;
import csust.bean.MoralSummary;
import csust.bean.PersonDeduction;
import csust.bean.PersonKnowledge;
import csust.bean.PersonMoral;
import csust.bean.PersonSports;
import csust.bean.PersonSummary;
import csust.bean.Student;

/*次方法中所有增加，更新，修改数据都会在imp层调用一次更新综测汇总的接口*/
public interface PublicService {

	//获取综测开启状态
	public  Integer getZcStatus(String xuenian);
	// 获取学生的基础信息
	public BasicInfo getStuInfo(String userName);

	/*************** 查询到人 ***************************/

	// 班长审核一个学生
	public void checkOneStudent(String xuenian, String studentNo, boolean status);

	//学习部 审核一个学生
	public void checkOneStudentT(String xuenian, String studentNo, boolean status);
	//查询用户是否上传分数
	public PersonSummary getIsUpload(String studentNo);
	
	public int getTban(String xuenian,String studentNo);
	
	// 通过年级专业查询班级
	public List<Integer> getClasses(String nianji, String major);

	// 通过年级专业班级查询该班级的学生
	public List<Student> getStudentsByClass(String nianji, String major, int classNo);

	// 查询一个班级的汇总情况
	public List<PersonSummary> getSummaryByClass(String xuenian, String nianji, String major, int classNo);

	// 通过学号在个人综测汇总表查询综测汇总情况
	public PersonSummary getPersonSummaryBySno(String xuenian, String studentNO);

	/************** 个人德育 ****************************/
	// 通过学年，学号查询个人的全部的德育情况
	public List<PersonMoral> getPersonMoralBySno(String xuenian, String sno);

	// 增加一项个人的德育项
	public void addPersonMoral(PersonMoral personMoral);

	// 修改一项个人的德育情况
	public void updatePersonMoral(PersonMoral personMoral);

	// 删除一项个人的德育情况
	// 传id用来删除记录
	// 传学年和学号用来更新综测汇总的数据
	public void deletePersonMoral(String xuenian, String studentNo, int id);

	/**************
	 * 个人智育
	 * 
	 * @param sno2
	 ****************************/
	// 通过学年，学号查询个人的全部的智育情况
	public List<PersonKnowledge> getPersonKnowledgeBySno(String xuenian, String sno);

	// 增加一项个人的德育情况
	public void addPersonKnowledge(PersonKnowledge pk);

	// 修改一项个人的智育情况
	public void updatePersonKnowledge(PersonKnowledge pk);

	// 删除一项个人的智育情况
	// 传id用来删除记录
	// 传学年和学号用来更新综测汇总的数据
	public void deletePersonKnowledge(String xuenian, String studentNo, int id);

	// 通过学年，学号，课程id查看一项个人智育
	public PersonKnowledge getKnowledgeBySnoAndCourseId(String xuenian, String sno, int id);

	/************** 个人体育 ****************************/
	// 通过学年，学号查询个人的体育情况
	public PersonSports getPersonSportsBySno(String xuenian, String sno);

	// 增加一项个人的体育情况
	public void addPersonSports(PersonSports ps);

	// 修改个人的体育情况
	public void updatePersonSports(PersonSports ps);

	// 删除一项个人的体育
	public void deletePersonSports(int id);

	/************** 个人德育汇总 ****************************/

	// 增加个人德育汇总
	public void addMoralSummary(MoralSummary ms);

	// 修改个人德育汇总
	public void updateMoralSummary(MoralSummary ms);

	// 查看个人德育汇总
	public MoralSummary getMoralSummary(String xuenian, String studentNo);

	/************** 个人扣分项 **********************************/

	// 增加个人扣分项
	public void addPersonDeduction(PersonDeduction pd);

	// 修改个人扣分项
	public void updatePersonDeduction(PersonDeduction pd);

	// 删除个人扣分项
	// 传id用来删除记录
	// 传学年和学号用来更新综测汇总的数据
	public void deletePersonDeduction(String xuenian, String studentNo, int id);

	// 列出个人所有的扣分项
	public List<PersonDeduction> listPersonDeduction(String xuenian, String studentNo);

	// 查询一个人一项的扣分项
	public PersonDeduction getPersonOneDeduction(String xuenian, String studentNo, int did);
	
	//添加学习部反馈信息
	//public void insertFeedback(String monitorNo,String studentNo,String P_moral,String D_moral);
		
	public void insertFeedback(Feedback fb);
	

	public void updateFeedbackStatus(String studentNo, int isRead);

	public void resetStatus(String xuenian, String studentNo);
		
	

}
