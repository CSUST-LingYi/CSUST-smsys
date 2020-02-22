package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.BasicInfo;
import csust.bean.Course;
import csust.bean.Feedback;
import csust.mapper.MonitorMapper;
import csust.service.MonitorService;

@Service
public class MonitorServiceImp implements MonitorService {

	@Autowired
	MonitorMapper monitorMapper;

	public void addCourse(Course course) {
		// TODO Auto-generated method stub

		monitorMapper.addCourse(course);
	}

	public void deleteCourse(int id) {
		// TODO Auto-generated method stub
		monitorMapper.deleteCourse(id);
	}

	public void updateCourse(Course course) {
		// TODO Auto-generated method stub
		monitorMapper.updateCourse(course);
	}

	public List<Course> getCourseByclass(Course c) {
		// TODO Auto-generated method stub
		return monitorMapper.getCourseByclass(c);
	}

	public BasicInfo getMonitorInfo(String userName) {
		
		return monitorMapper.getMonitorInfo(userName);
	}

	public List<Feedback> getFeedbacks(String monitorNo) {
		
		return monitorMapper.getFeedbacks(monitorNo);
	}

	public int countUnreadMsg(String monitorNo) {
		
		return monitorMapper.countUnreadMsg(monitorNo);
	}

}
