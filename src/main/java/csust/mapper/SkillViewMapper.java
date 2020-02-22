package csust.mapper;

import java.util.List;

import csust.bean.SkillView;

public interface SkillViewMapper {

	public List<SkillView> getSkillViewByNianji0(String nianji, String stuType);

	public List<SkillView> getSkillViewByNianji1(String nianji, String type1, String stuType);

	public List<SkillView> getSkillViewByNianji2(String nianji, String type1, String type2, String stuType);

	public List<SkillView> getSkillViewByNianji3(String nianji, String type1, String type2, String type3,
			String stuType);

	public List<SkillView> getSkillViewByMajor0(String nianji, String major, String stuType);

	public List<SkillView> getSkillViewByMajor1(String nianji, String major, String type1, String stuType);

	public List<SkillView> getSkillViewByMajor2(String nianji, String major, String type1, String type2,
			String stuType);

	public List<SkillView> getSkillViewByMajor3(String nianji, String major, String type1, String type2, String type3,
			String stuType);

	public List<SkillView> getSkillViewByClass0(String nianji, String major, String className, String stuType);

	public List<SkillView> getSkillViewByClass1(String nianji, String major, String className, String type1,
			String stuType);

	public List<SkillView> getSkillViewByClass2(String nianji, String major, String className, String type1,
			String type2, String stuType);

	public List<SkillView> getSkillViewByClass3(String nianji, String major, String className, String type1,
			String type2, String type3, String stuType);
}
