package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.Student;
import csust.mapper.AlertStudentMapper;
import csust.service.AlertStudentService;

@Service
public class AlertStudentServiceImp implements AlertStudentService {

	@Autowired
	AlertStudentMapper alertStudentMapper;

	public void addAlertStudent(Student student) {
		// TODO Auto-generated method stub
		alertStudentMapper.addAlertStudent(student);

	}

	public void deleteAlertStudent(String studentNo) {
		// TODO Auto-generated method stub
		alertStudentMapper.deleteAlertStudent(studentNo);

	}

	public Student selectAlertStudent(String studentNo) {
		// TODO Auto-generated method stub
		return alertStudentMapper.selectAlertStudent(studentNo);
	}

	public List<Student> listAlertStudent(String stuType) {
		// TODO Auto-generated method stub
		return alertStudentMapper.listAlertStudent(stuType);
	}

	public void updateStatus(String studentNo, int status) {
		// TODO Auto-generated method stub
		alertStudentMapper.updateStatus(studentNo, status);
	}

	public void updateAlertStudent(Student student) {
		// TODO Auto-generated method stub
		alertStudentMapper.updateAlertStudent(student);
	}

}
