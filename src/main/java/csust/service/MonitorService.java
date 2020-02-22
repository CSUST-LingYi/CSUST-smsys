package csust.service;

import java.util.List;

import csust.bean.BasicInfo;
import csust.bean.Course;
import csust.bean.Feedback;

public interface MonitorService {

	// 新增智育课程科目
	public void addCourse(Course course);

	// 删除智育科目
	public void deleteCourse(int id);

	// 修改智育科目
	public void updateCourse(Course course);

	// 查询智育科目,年级，专业，班级
	public List<Course> getCourseByclass(Course c);

	// 获取班长的信息
	public BasicInfo getMonitorInfo(String userName);
	
	//查看反馈信息	
	public List<Feedback> getFeedbacks(String monitorNo);

	//检查是否有未读信息
	public int countUnreadMsg(String monitorNo);
}
