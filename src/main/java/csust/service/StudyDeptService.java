package csust.service;

import java.util.List;

import csust.bean.ClassInfo;
import csust.bean.Deduction;
import csust.bean.Moral;
import csust.bean.Proportion;

//综测service
public interface StudyDeptService {

	// 新建或者修改一个学年的综测，设置智，德，育分的比例
	public void setProportion(Proportion p);
	//设置综测状态

	public void setZcStatus_o(String xuenian);
	public void setZcStatus_c(String xuenian);
	// 查询一个学年的综测比例设置
	public Proportion getProportion(String xuenian);

	// 增加德育项目
	public void addMoral(Moral moral);

	// 根据mid查询德育分项
	public List<Moral> getMoralsByMid(int mid);

	// 根据id查询德育分项
	public Moral getMoralById(int id);

	// 删除德育分项目
	public String deleteMoralById(int id);

	// 更新德育分项目
	public void updateMoralById(Moral moral);

	/********************* 扣分项 ********************************/
	// 增加扣分项
	public void addDeduction(Deduction deduction);

	// 更新德育分项
	public void updateDeduction(Deduction deduction);

	// 删除德育分项
	public void deleteDeduction(int id);

	// 查询一个扣分项
	public Deduction getDeduction(int id);

	// 查询所有的扣分项
	public List<Deduction> listDeduction();

	/************************************************/
	// 通过学年，年级，专业查询该班名称，该班的人数，已经审核的人数
	public List<ClassInfo> getClassCheckSummary(String xuenian, String termYear, String major);
}
