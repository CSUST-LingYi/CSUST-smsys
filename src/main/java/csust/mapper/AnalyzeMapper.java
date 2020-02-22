package csust.mapper;

import java.util.List;

import csust.bean.FileName;
import csust.bean.StudentGrade;
import csust.bean.view_count_reward;

public interface AnalyzeMapper {

	public double getPunishCount(String studentNo);

	public double getAwardCount(String studentNo);

	public double getSkillCount(String studentNo);

	public double getActiveCount(String studentNo);

	public double getSchoolCount(String studentNo);

	public double getAvgCPA(String studentNo);

	public FileName getFileName(String fileName, String stuType);// 获取文件的名字

	public void addFilleName(String fileName, String stuType);// 增加一个文件名字

	public List<FileName> listFileName(String stuType);// 查询所有的文件名字

	public void deleteFileName(String fileName, String stuType);// 删除文件名字

	public void addStudentGrade(StudentGrade studentGrade);// 保存上传的Excel里面的学生成绩

	public List<String> getClassName(String nianji, String major);// 通过年级也专业查询班级名字

	public List<StudentGrade> selectStudentGrade(StudentGrade sg);// 多条件查询学生的成绩

	public List<view_count_reward> getRewardByXuenianAndMajor(String xuenian, String nianji, String major, String level,
			String stuType);// 统计学年和某专业的奖励的数量

	public int getFails(String xuenian, String xueqi, String nianji, String major);// 求挂科的人数
}
