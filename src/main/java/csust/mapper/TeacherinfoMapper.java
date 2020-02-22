package csust.mapper;

import java.util.List;

import csust.bean.TeacherInfo;

public interface TeacherinfoMapper {

	public List<TeacherInfo> listTeacherinfo();// 查询所有的教师信息

	public void addTeacherinfo(TeacherInfo teacherInfo);// 增加一个教师信息

	public void deleteTeacherinfo(int teacherId);// 删除一个教师信息

	public void updateTeacherinfo(TeacherInfo teacherInfo);// 修改一个教师信息

}
