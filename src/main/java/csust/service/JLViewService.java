package csust.service;

import java.util.List;

import csust.bean.JLView;
import csust.bean.Rewardinfo;

//已修改一遍未测试
public interface JLViewService {

	/*
	 * 修改所有的方法： 如果传入参数为学号的方法不用修改，能唯一的标识某个学生 如果传入参数为一个对象的方法接口处不用修改，只需要修改
	 * *mapper.xml文件里面的sql语句 如果传入参数为id的方法也不用修改，id能唯一的标识某一条数据库里面的记录
	 * 如果传入的参数为空的的方法，需要添加一个参数区分是本科生和研究生 （stuType）
	 * 如果传入的参数既不是学号也不是id这种能唯一的标识数据库某一条记录的参数，也需要添加一个参数区分本科生和研究生
	 */

	public List<JLView> getJLByNianji0(String nianji, String getTime, String stuType);

	public List<JLView> getJLByNianji1(String nianji, String getTime, String type1, String stuType);

	public List<JLView> getJLByNianji2(String nianji, String getTime, String type1, String type2, String stuType);

	public List<JLView> getJLByNianji3(String nianji, String getTime, String type1, String type2, String type3,
			String stuType);

	public List<JLView> getJLByMajor0(String nianji, String major, String getTime, String stuType);

	public List<JLView> getJLByMajor1(String nianji, String major, String getTime, String type1, String stuType);

	public List<JLView> getJLByMajor2(String nianji, String major, String getTime, String type1, String type2,
			String stuType);

	public List<JLView> getJLByMajor3(String nianji, String major, String getTime, String type1, String type2,
			String type3, String stuType);

	public List<JLView> getJLByClass0(String nianji, String major, String ClassName, String getTime, String stuType);

	public List<JLView> getJLByClass1(String nianji, String major, String ClassName, String getTime, String type1,
			String stuType);

	public List<JLView> getJLByClass2(String nianji, String major, String ClassName, String getTime, String type1,
			String type2, String stuType);

	public List<JLView> getJLByClass3(String nianji, String major, String ClassName, String getTime, String type1,
			String type2, String type3, String stuType);

	public String addRewardinfo(Rewardinfo rewardinfo);// 增加一条奖励信息

	public List<Rewardinfo> listRewardinfo(String stuType);// 查询所有的奖励信息

	/*
	 * 根据奖励的级别查询 根据奖励的时间查询 根据奖励的级别和时间查询 根据奖励的团队或个人的类别查询
	 */
	public List<Rewardinfo> getRewardinfo(Rewardinfo rewardinfo);

}
