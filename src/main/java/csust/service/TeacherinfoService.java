package csust.service;

import java.util.List;

import csust.bean.TeacherInfo;

public interface TeacherinfoService {

	public List<TeacherInfo> listTeacherinfo();// 查询所有的教师信息

	public String addTeacherinfo(TeacherInfo teacherInfo);// 增加一个教师信息

	public String deleteTeacherinfo(int teacherId);// 删除一个教师信息

	public String updateTeacherinfo(TeacherInfo teacherInfo);// 修改一个教师信息

}
