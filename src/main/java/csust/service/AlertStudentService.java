package csust.service;

//已修改一遍未测试
import java.util.List;

import csust.bean.Student;

/*
 * 修改所有的方法：
 *      如果传入参数为学号的方法不用修改，能唯一的标识某个学生
 *      如果传入参数为一个对象的方法接口处不用修改，只需要修改 *mapper.xml文件里面的sql语句
 *      如果传入参数为id的方法也不用修改，id能唯一的标识某一条数据库里面的记录
 *      如果传入的参数为空的的方法，需要添加一个参数区分是本科生和研究生        （stuType）
 *      如果传入的参数既不是学号也不是id这种能唯一的标识数据库某一条记录的参数，也需要添加一个参数区分本科生和研究生
 * */

//此Service为学生信息保存的基本表的操作的接口
public interface AlertStudentService {

	public void addAlertStudent(Student student); // 把学生基本信息保存在中间表里

	public void deleteAlertStudent(String studentNo);// 根据学号删除在中间表里的学生基本信息

	public Student selectAlertStudent(String studentNo);// 根据学号查询中间表里的某一个学生的信息

	public List<Student> listAlertStudent(String stuType);// 查询所有在中间表里面的学生

	public void updateStatus(String studentNo, int status);// 更新学生申请修改的的信息的状态（未审核，已审核未批准，已审核已批准）

	public void updateAlertStudent(Student student);// 更新中间表里的信息

}
