package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.TeacherInfo;
import csust.mapper.TeacherinfoMapper;
import csust.service.TeacherinfoService;

@Service
public class TeacherinfoServiceImp implements TeacherinfoService {

	@Autowired
	TeacherinfoMapper teacherinfoMapper;

	public List<TeacherInfo> listTeacherinfo() {
		// TODO Auto-generated method stub
		return teacherinfoMapper.listTeacherinfo();
	}

	public String addTeacherinfo(TeacherInfo teacherInfo) {
		// TODO Auto-generated method stub
		teacherinfoMapper.addTeacherinfo(teacherInfo);

		String mess = "success";
		return mess;
	}

	public String deleteTeacherinfo(int teacherId) {
		// TODO Auto-generated method stub
		teacherinfoMapper.deleteTeacherinfo(teacherId);
		String mess = "success";
		return mess;
	}

	public String updateTeacherinfo(TeacherInfo teacherInfo) {
		// TODO Auto-generated method stub
		teacherinfoMapper.updateTeacherinfo(teacherInfo);
		String mess = "success";
		return mess;
	}

}
