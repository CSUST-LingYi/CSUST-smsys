package csust.service;

import java.util.List;

import csust.bean.PsStudentView;

//已修改一遍未测试
public interface PsStudentViewService {

	public List<PsStudentView> getPsViewByNianji0(String nianji, String stuType);

	public List<PsStudentView> getPsViewByNianji1(String nianji, String type1, String stuType);

	public List<PsStudentView> getPsViewByNianji2(String nianji, String type1, String type2, String stuType);

	public List<PsStudentView> getPsViewByNianji3(String nianji, String type1, String type2, String type3,
			String stuType);

	public List<PsStudentView> getPsViewByMajor0(String nianji, String major, String stuType);

	public List<PsStudentView> getPsViewByMajor1(String nianji, String major, String type1, String stuType);

	public List<PsStudentView> getPsViewByMajor2(String nianji, String major, String type1, String type2,
			String stuType);

	public List<PsStudentView> getPsViewByMajor3(String nianji, String major, String type1, String type2, String type3,
			String stuType);

	public List<PsStudentView> getPsViewByClass0(String nianji, String major, String className, String stuType);

	public List<PsStudentView> getPsViewByClass1(String nianji, String major, String className, String type1,
			String stuType);

	public List<PsStudentView> getPsViewByClass2(String nianji, String major, String className, String type1,
			String type2, String stuType);

	public List<PsStudentView> getPsViewByClass3(String nianji, String major, String className, String type1,
			String type2, String type3, String stuType);
}
