package csust.service;

import java.util.List;

import csust.bean.ALLfield;
import csust.bean.LeaveTip;
import csust.bean.Project;
import csust.bean.Student;
import csust.bean.XJYD;
import csust.bean.punish;

//已修改一遍未测试
public interface StudentService {

	public List<Student> listAllStudent(String stuType); // 查询所有学生信息 成功

	public int getTotal(String stuType);// 查询学生的总数 成功

	public void deleteByNo(String studentNo);// 通过学号删除学生信息 成功

	public List<ALLfield> getStudent(String studentNoOrName, String stuType);// 通过学号或者姓名查询
																				// 成功

	public List<ALLfield> getStudentByNianji(String nianji, String stuType);// 通过年级查询学生

	public void setPunish(punish punish);

	public Student getStudentByN(String studentNo);

	public void setXJYD(XJYD xjyd);

	public void updateStudent_T(Student student);// 教师端修改学生信息

	public List<LeaveTip> getLeaveTip(String sno, String leavebegin, int status);// 通过学号，请假日期，请假状态查询请假条

	public void addLeaveTip(LeaveTip leavetip);// 增加一条请假条的信息

	public void updateLeaveTip(LeaveTip leavetip);// 更新请假条的信息

	public List<LeaveTip> listLeaveTip(String sno);// 通过学号查询请假信息

	public List<LeaveTip> getLeaveTipBystatus(int i, String stuType);// 通过批准状态查询请假信息
																		// 0-为审核
																		// 1-未批准
																		// 2-已批准

	public void approveLeaveTip(LeaveTip leavetip);// 批准请假信息

	public List<LeaveTip> getLeaveTipByTime(String termYear, String time, String stuType);// 通过时间查询请假信息

	public void updateProject(Project p);

	public void updateStudent_wx(Student student);

}
