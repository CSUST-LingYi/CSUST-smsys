package csust.service;

import java.util.HashMap;
import java.util.List;

import csust.bean.PersonKnowledge;
import csust.bean.PersonSummary;
import csust.bean.SummaryAnalyze;

//提供综测分析
public interface ComparisonAnalyzeService {

	/*
	 * 查看专业或班级对应的挂科率
	 * 
	 * @Param 年级，专业（可选）
	 * 
	 * @return 返回专业名称,挂科率（班级名称，挂科率）
	 */
	public List<SummaryAnalyze> getFails(String xuenian, String nianji, String major);

	/*
	 * 查看班级挂科详情*
	 * 
	 * @Param 年级，专业,班级（可选）
	 * 
	 * @return 学号，姓名，挂科的科目及分数
	 */
	public List<PersonKnowledge> getFailsDetails(String xuenian, String nianji, String major, int classNo);

	/*
	 * 各分数段人数统计
	 * 
	 * @Param 年级，专业，班级（可选）
	 * 
	 * @return 专业（班级）-分数段-人数
	 */
	public HashMap<Integer, List<SummaryAnalyze>> getScoresCount(String xuenian, String nianji, String major);

	/*
	 * 各分数段人详情
	 * 
	 * @Param 年级，专业，班级（可选）
	 * 
	 * @return 专业（班级）-学习个人情况汇总
	 */
	public List<PersonSummary> getPersonSummary(String xuenian, String nianji, String major, int classNo);

}
