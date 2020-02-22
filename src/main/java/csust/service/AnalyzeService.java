package csust.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import csust.bean.FileName;
import csust.bean.StudentGrade;

//已修改一遍未测试
public interface AnalyzeService {

	/*
	 * 修改所有的方法： 如果传入参数为学号的方法不用修改，能唯一的标识某个学生 如果传入参数为一个对象的方法接口处不用修改，只需要修改
	 * *mapper.xml文件里面的sql语句 如果传入参数为id的方法也不用修改，id能唯一的标识某一条数据库里面的记录
	 * 如果传入的参数为空的的方法，需要添加一个参数区分是本科生和研究生 （stuType）
	 * 如果传入的参数既不是学号也不是id这种能唯一的标识数据库某一条记录的参数，也需要添加一个参数区分本科生和研究生
	 */

	public List<Double> stuAnalyze(String studentNo);

	public FileName getFileName(String fileName, String stuType);// 获取文件的名字

	public void addFilleName(String fileName, String stuType);// 增加一个文件名字

	public List<FileName> listFileName(String stuType);// 查询所有的文件名字

	public void deleteFileName(String fileName, String stuType);// 删除文件名字

	// 此方法未修改，初步不打算给研究生做分析的板块
	public StringBuffer uploadStudentGradeExcel(MultipartFile file, String xuenian, String xueqi, String nianji,
			String major);// 上传学生成绩的Excle
	// 此方法未修改，初步不打算给研究生做分析的板块

	public List<String> getClassName(String nianji, String major);// 通过年级也专业查询班级名字

	// 此方法未修改，初步不打算给研究生做分析的板块
	public List<StudentGrade> selectStudentGrade(StudentGrade sg);// 多条件查询学生的成绩

	public List<Object[]> jlAnalyze(String xuenian, String nianji, String stuType);// 奖励统计

	// 此方法未修改，初步不打算给研究生做分析的板块
	public List<double[]> compareStudentGrade(StudentGrade sg);// 成绩分析
}
