package csust.mapper;

import java.util.List;

import csust.bean.JLView;
import csust.bean.Rewardinfo;

public interface JLViewMapper {

	public List<JLView> getJLByNianji0(String nianji, String time, String stuType);

	public List<JLView> getJLByNianji1(String nianji, String time, String type1, String stuType);

	public List<JLView> getJLByNianji2(String nianji, String time, String type1, String type2, String stuType);

	public List<JLView> getJLByNianji3(String nianji, String time, String type1, String type2, String type3,
			String stuType);

	public List<JLView> getJLByMajor0(String nianji, String major, String time, String stuType);

	public List<JLView> getJLByMajor1(String nianji, String major, String time, String type1, String stuType);

	public List<JLView> getJLByMajor2(String nianji, String major, String time, String type1, String type2,
			String stuType);

	public List<JLView> getJLByMajor3(String nianji, String major, String time, String type1, String type2,
			String type3, String stuType);

	public List<JLView> getJLByClass0(String nianji, String major, String ClassName, String time, String stuType);

	public List<JLView> getJLByClass1(String nianji, String major, String ClassName, String time, String type1,
			String stuType);

	public List<JLView> getJLByClass2(String nianji, String major, String ClassName, String time, String type1,
			String type2, String stuType);

	public List<JLView> getJLByClass3(String nianji, String major, String ClassName, String time, String type1,
			String type2, String type3, String stuType);

	public void addRewardinfo(Rewardinfo rewardinfo);// 增加一条奖励信息

	public List<Rewardinfo> listRewardinfo(String stuType);// 查询所有的奖励信息

	/*
	 * 根据奖励的级别查询 根据奖励的时间查询 根据奖励的级别和时间查询 根据奖励的团队或个人的类别查询 或者之间的组合
	 */
	public List<Rewardinfo> getRewardinfo(Rewardinfo rewardinfo);
}
