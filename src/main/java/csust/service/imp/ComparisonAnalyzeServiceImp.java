package csust.service.imp;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.PersonKnowledge;
import csust.bean.PersonSummary;
import csust.bean.SummaryAnalyze;
import csust.mapper.ComparisonAnalyzeMapper;
import csust.service.ComparisonAnalyzeService;

@Service
public class ComparisonAnalyzeServiceImp implements ComparisonAnalyzeService {

	@Autowired
	ComparisonAnalyzeMapper comparisonAnalyzeMapper;

	public List<SummaryAnalyze> getFails(String xuenian, String nianji, String major) {
		// TODO Auto-generated method stub

		return comparisonAnalyzeMapper.getFails(xuenian, nianji, major);
	}

	public List<PersonKnowledge> getFailsDetails(String xuenian, String nianji, String major, int classNo) {
		// TODO Auto-generated method stub
		return comparisonAnalyzeMapper.getFailsDetails(xuenian, nianji, major, classNo);
	}

	public HashMap<Integer, List<SummaryAnalyze>> getScoresCount(String xuenian, String nianji, String major) {
		// TODO Auto-generated method stub

		// x坐标标专业或者班级
		// y坐标是分数段
		// z坐标是人数
		int[] score = { 0, 60, 70, 80, 90, 100 };
		HashMap<Integer, List<SummaryAnalyze>> map = new HashMap<Integer, List<SummaryAnalyze>>();

		for (int i = 0; i < score.length - 1; i++) {
			map.put(score[i], comparisonAnalyzeMapper.getScoreSection(xuenian, nianji, major, score[i], score[i + 1]));
		}

		return map;
	}

	public List<PersonSummary> getPersonSummary(String xuenian, String nianji, String major, int classNo) {
		// TODO Auto-generated method stub
		return null;
	}

}
