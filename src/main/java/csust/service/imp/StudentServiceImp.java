package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.ALLfield;
import csust.bean.LeaveTip;
import csust.bean.Project;
import csust.bean.Student;
import csust.bean.XJYD;
import csust.bean.punish;
import csust.mapper.StudentMapper;
import csust.service.StudentService;

@Service
public class StudentServiceImp implements StudentService {

	@Autowired
	StudentMapper studentMapper;

	public void setXJYD(XJYD xjyd) {
		studentMapper.setXJYD(xjyd);
	};

	public Student getStudentByN(String studentNo) {
		return studentMapper.getStudentByN(studentNo);
	};

	public List<Student> listAllStudent(String stuType) {
		return studentMapper.listAllStudent(stuType);
	}

	public int getTotal(String stuType) {
		return studentMapper.getTotal(stuType);
	};// 查询学生用户的总数

	public void deleteByNo(String studentNo) {
		studentMapper.deleteByNo(studentNo);
	};// 通过学号删除学生用户

	public List<ALLfield> getStudent(String studentNoOrName, String stuType) {
		// TODO Auto-generated method stub

		boolean result = studentNoOrName.matches("[0-9]+");// 判断是不是纯数字
		if (result == true)
			return studentMapper.getStudentByNo(studentNoOrName);// 纯数字通过学号查询
		else
			return studentMapper.getStudentByName(studentNoOrName, stuType);// 否者通过名字查询

	}

	// 通过年级查询所有学生
	public List<ALLfield> getStudentByNianji(String nianji, String stuType) {
		return studentMapper.getStudentByNianji(nianji, stuType);
	}

	// 添加一个处分
	public void setPunish(punish punish) {
		studentMapper.setPunish(punish);
	}

	public void updateStudent_T(Student student) {
		// TODO Auto-generated method stub
		studentMapper.updateStudent_T(student);
	}

	public List<LeaveTip> getLeaveTip(String sno, String leavebegin, int status) {
		// TODO Auto-generated method stub
		return studentMapper.getLeaveTip(sno, leavebegin, status);
	}

	public void addLeaveTip(LeaveTip leavetip) {
		// TODO Auto-generated method stub
		studentMapper.addLeaveTip(leavetip);
	}

	public void updateLeaveTip(LeaveTip leavetip) {
		// TODO Auto-generated method stub
		studentMapper.updateLeaveTip(leavetip);
	}

	public List<LeaveTip> listLeaveTip(String sno) {
		// TODO Auto-generated method stub
		return studentMapper.listLeaveTip(sno);
	}

	public List<LeaveTip> getLeaveTipBystatus(int i, String stuType) {
		// TODO Auto-generated method stub
		return studentMapper.getLeaveTipBystatus(i, stuType);
	}

	public void approveLeaveTip(LeaveTip leavetip) {
		// TODO Auto-generated method stub
		studentMapper.approveLeaveTip(leavetip);
	}

	public List<LeaveTip> getLeaveTipByTime(String termYear, String time, String stuType) {
		// TODO Auto-generated method stub
		return studentMapper.getLeaveTipByTime(termYear, time, stuType);
	}

	public void updateProject(Project p) {
		// TODO Auto-generated method stub
		studentMapper.updateProject(p);
	}

	public void updateStudent_wx(Student student) {
		// TODO 自动生成的方法存根
		studentMapper.updateStudent_wx(student);
	};

}
