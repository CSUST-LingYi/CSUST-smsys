package csust.service.imp;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import csust.bean.FileName;

import csust.bean.StudentGrade;
import csust.bean.view_count_reward;
import csust.mapper.AnalyzeMapper;
import csust.mapper.QueryMapper;
import csust.service.AnalyzeService;

import readExcel.ReadStudentGradeExcel;

@Service
public class AnalyzeServiceImp implements AnalyzeService {

	@Autowired
	AnalyzeMapper analyzeMapper;

	@Autowired
	QueryMapper queryMapper;

	public List<Double> stuAnalyze(String studentNo) {
		// TODO Auto-generated method stub
		double pubishCount = (double) analyzeMapper.getPunishCount(studentNo);
		double awardCount = (double) analyzeMapper.getAwardCount(studentNo);
		double skillCount = (double) analyzeMapper.getSkillCount(studentNo);
		double activeCount = (double) analyzeMapper.getActiveCount(studentNo);
		double schoolCount = (double) analyzeMapper.getSchoolCount(studentNo);
		double avgCPA = 0;
		if (queryMapper.getGrade(studentNo).size() != 0) {
			avgCPA = (double) analyzeMapper.getAvgCPA(studentNo);
		}
		DecimalFormat df = new DecimalFormat("0.00");
		df.format(avgCPA);
		List<Double> analyzeData = new ArrayList<Double>();
		analyzeData.add(pubishCount);
		analyzeData.add(awardCount);
		analyzeData.add(skillCount);
		analyzeData.add(activeCount);
		analyzeData.add(schoolCount);
		analyzeData.add(avgCPA);
		return analyzeData;
	}

	public FileName getFileName(String fileName, String stuType) {
		// TODO Auto-generated method stub
		return analyzeMapper.getFileName(fileName, stuType);
	}

	public void addFilleName(String fileName, String stuType) {
		// TODO Auto-generated method stub
		analyzeMapper.addFilleName(fileName, stuType);
	}

	public List<FileName> listFileName(String stuType) {
		// TODO Auto-generated method stub
		return analyzeMapper.listFileName(stuType);
	}

	public void deleteFileName(String fileName, String stuType) {
		// TODO Auto-generated method stub
		analyzeMapper.deleteFileName(fileName, stuType);
	}

	public StringBuffer uploadStudentGradeExcel(MultipartFile file, String xuenian, String xueqi, String nianji,
			String major) {
		// TODO Auto-generated method stub
		StringBuffer result = new StringBuffer();

		// 创建处理EXCEL的类
		ReadStudentGradeExcel readExcel = new ReadStudentGradeExcel();
		// 解析excel，获取上传的事件单
		List<StudentGrade> list = readExcel.getExcelInfo(file);

		// 至此已经将excel中的数据转换到list里面了,接下来就可以操作list,可以进行保存到数据库,或者其他操作,
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getStudentNo() == null || list.get(i).getStudentNo().equals("")) {
				break;
			}
			list.get(i).setXuenian(xuenian);
			list.get(i).setXueqi(xueqi);
			list.get(i).setNianji(nianji);
			list.get(i).setMajor(major);
			analyzeMapper.addStudentGrade(list.get(i));
		}

		// 和你具体业务有关,这里不做具体的示范
		if (list != null && !list.isEmpty()) {

			result.append("上传成功");
		} else {
			result.append("上传失败");
		}
		return result;
	}

	public List<String> getClassName(String nianji, String major) {
		// TODO Auto-generated method stub
		return analyzeMapper.getClassName(nianji, major);
	}

	public List<StudentGrade> selectStudentGrade(StudentGrade sg) {
		// TODO Auto-generated method stub
		return analyzeMapper.selectStudentGrade(sg);
	}

	public List<Object[]> jlAnalyze(String xuenian, String nianji, String stuType) {
		// TODO Auto-generated method stub
		String majors[] = new String[9];
		majors[0] = "信息管理与信息系统";
		majors[1] = "财务管理";
		majors[2] = "会计";
		majors[3] = "人力资源管理";
		majors[4] = "金融";
		majors[5] = "国际经济与贸易";
		majors[6] = "ACCA";
		majors[7] = "卓越会计";
		majors[8] = "市场营销";

		String[] levels = new String[4];
		levels[0] = "院级";
		levels[1] = "校级";
		levels[2] = "省级";
		levels[3] = "国家级";
		String major = null;
		String level = null;
		List<view_count_reward> cr = null;// 作为从数据库查询出来的东西的集合
		List<Object[]> list = new ArrayList<Object[]>();// 作为返回到Service层的数据的集合

		for (int i = 0; i < majors.length; i++) {
			Object[] ob = new Object[5];// 专业，院级，校级，省级，国家级
			major = majors[i];
			ob[0] = major;
			for (int j = 0; j < levels.length; j++) {
				level = levels[j];

				// 从数据库里面查处满足学年，年级，专业，奖状级别的数据
				cr = analyzeMapper.getRewardByXuenianAndMajor(xuenian, nianji, major, level, stuType);

				// 把查出来的数量放进数组里面
				ob[j + 1] = cr.size();
			}
			list.add(ob);// 把数组添加进集合里面
		}

		return list;
	}

	public List<double[]> compareStudentGrade(StudentGrade sg) {
		String majors[] = new String[9];
		majors[0] = "信息管理与信息系统";
		majors[1] = "财务管理";
		majors[2] = "会计";
		majors[3] = "人力资源管理";
		majors[4] = "金融";
		majors[5] = "国际经济与贸易";
		majors[6] = "ACCA";
		majors[7] = "卓越会计";
		majors[8] = "市场营销";

		StudentGrade s0 = new StudentGrade();
		s0.setMinGrade(0);
		s0.setMaxGrade(100);
		s0.setMinGPA(0);
		s0.setMaxGPA(4);
		s0.setXuenian(sg.getXuenian());
		s0.setXueqi(sg.getXueqi());
		s0.setNianji(sg.getNianji());

		String major = null;
		List<double[]> list = new ArrayList<double[]>();
		double[] rate = new double[9];// 普通分数段的比例
		double[] fail = new double[9];// 挂科率
		for (int i = 0; i < majors.length; i++) {
			major = majors[i];
			sg.setMajor(major);
			s0.setMajor(major);
			List<StudentGrade> s = analyzeMapper.selectStudentGrade(sg);// 该专业该分数段的人的数量
			List<StudentGrade> s0s = analyzeMapper.selectStudentGrade(s0);// 该专业的总人数
			int f = analyzeMapper.getFails(sg.getXuenian(), sg.getXueqi(), sg.getNianji(), major);// 该专业的挂科人数
			float sl = s.size();
			float s0sl = s0s.size();
			if (s.size() != 0) {
				double r = sl / s0sl;
				double r1 = f / s0sl;
				BigDecimal bd = new BigDecimal(r);
				r = bd.setScale(2, RoundingMode.HALF_UP).doubleValue();
				rate[i] = r;
				BigDecimal bds = new BigDecimal(r1);
				r1 = bds.setScale(2, RoundingMode.HALF_UP).doubleValue();
				fail[i] = r1;
			} else {
				double r = 0;
				rate[i] = r;
				double r1 = 0;
				fail[i] = r1;
			}
		}
		list.add(rate);
		list.add(fail);

		return list;
	};
}
