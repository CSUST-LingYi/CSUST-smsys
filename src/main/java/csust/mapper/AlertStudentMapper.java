package csust.mapper;

import java.util.List;

import csust.bean.Student;

public interface AlertStudentMapper {

	public void addAlertStudent(Student student); // 把学生基本信息保存在中间表里

	public void deleteAlertStudent(String studentNo);// 根据学号删除在中间表里的学生基本信息

	public Student selectAlertStudent(String studentNo);// 根据学号查询中间表里的某一个学生的信息

	public List<Student> listAlertStudent(String stuType);// 查询所有在中间表里面的学生

	public void updateStatus(String studentNo, int status);// 更新学生申请修改的的信息的状态（未审核，已审核未批准，已审核已批准）

	public void updateAlertStudent(Student student);// 更新中间表里的信息
}
