package csust.service;

import java.util.List;

import csust.bean.PracticeView;

//已修改一遍未测试
public interface PracticeViewService {

	public List<PracticeView> getPracticeViewByNianji0(String nianji, String time, String stuType);

	public List<PracticeView> getPracticeViewByNianji1(String nianji, String time, String type1, String stuType);

	public List<PracticeView> getPracticeViewByNianji2(String nianji, String time, String type1, String type2,
			String stuType);

	public List<PracticeView> getPracticeViewByMajor0(String nianji, String major, String time, String stuType);

	public List<PracticeView> getPracticeViewByMajor1(String nianji, String major, String time, String type1,
			String stuType);

	public List<PracticeView> getPracticeViewByMajor2(String nianji, String major, String time, String type1,
			String type2, String stuType);

	public List<PracticeView> getPracticeViewByClass0(String nianji, String major, String className, String time,
			String stuType);

	public List<PracticeView> getPracticeViewByClass1(String nianji, String major, String className, String time,
			String type1, String stuType);

	public List<PracticeView> getPracticeViewByClass2(String nianji, String major, String className, String time,
			String type1, String type2, String stuType);

}
