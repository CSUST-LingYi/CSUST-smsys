package csust.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import csust.bean.PersonKnowledge;
import csust.bean.SummaryAnalyze;

public interface ComparisonAnalyzeMapper {

	List<String> getMajorOrClassNo(@Param("xuenian") String xuenian, @Param("nianji") String nianji,
			@Param("major") String major);

	List<SummaryAnalyze> getFails(@Param("xuenian") String xuenian, @Param("nianji") String nianji,
			@Param("major") String major);

	// 查询专业，或者班级里挂科的人及相关科目
	List<PersonKnowledge> getFailsDetails(@Param("xuenian") String xuenian, @Param("nianji") String nianji,
			@Param("major") String major, @Param("className") int classNo);

	// 统计某个年级各个专业的分数段的人数（或者某年级某专业各个班）
	List<SummaryAnalyze> getScoreSection(@Param("xuenian") String xuenian, @Param("nianji") String nianji,
			@Param("major") String major, @Param("start") int i, @Param("end") int j);
}
