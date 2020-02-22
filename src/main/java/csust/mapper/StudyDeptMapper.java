package csust.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import csust.bean.Deduction;
import csust.bean.Moral;
import csust.bean.Proportion;

public interface StudyDeptMapper {

	// 新建一个学年的综测，设置智，德，育分的比例
	public void addProportion(Proportion p);

	public void setZcStatus_o(@Param("xuenian") String xuenian);
	public void setZcStatus_c(@Param("xuenian") String xuenian);

	// 根据学年查询综测比例
	public Proportion getProportion(@Param("xuenian") String xuenian);

	// 根据学年修改综测比例
	public void updateProportion(Proportion p);

	// 增加德育项目
	public void addMoral(Moral moral);

	// 根据mid查询德育分项
	public List<Moral> getMoralsByMid(@Param("mid") int mid);

	// 根据id查询德育分项
	public Moral getMoralById(@Param("id") int id);

	// 删除德育分项目
	public void deleteMoralById(@Param("id") int id);

	// 更新德育分项目
	public void updateMoralById(Moral moral);

	/********************* 扣分项 ********************************/
	// 增加扣分项
	public void addDuction(Deduction deduction);

	// 更新德育分项
	public void updateDeduction(Deduction deduction);

	// 删除德育分项
	public void deleteDeduction(@Param("id") int id);

	// 查询一个扣分项
	public Deduction getDeDuction(@Param("id") int id);

	// 查询所有的扣分项
	public List<Deduction> listDeDuction();

	public int getStudentCountByClass(@Param("termYear") String termYear, @Param("major") String major,
			@Param("classNo") int parseInt);

	public int getIsCheckCountByClass(@Param("xuenian") String xuenian, @Param("termYear") String termYear,
			@Param("major") String major, @Param("classNo") int parseInt);

}
