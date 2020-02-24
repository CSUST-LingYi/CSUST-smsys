package csust.service.imp;

import java.util.ArrayList;
import java.util.List;

import csust.bean.*;
import csust.mapper.XuenianMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.mapper.StudyDeptMapper;

import csust.mapper.PublicMapper;
import csust.service.StudyDeptService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

@Service
public class StudyDeptServiceImp implements StudyDeptService {

	@Autowired
	StudyDeptMapper studyDeptMapper;

	@Autowired
	PublicMapper publicMapper;

	@Autowired
	XuenianMapper xuenianMapper;

	public void setProportion(Proportion p) {
		// TODO Auto-generated method stub
		if (studyDeptMapper.getProportion(p.getXuenian()) == null) {

			studyDeptMapper.addProportion(p);
		} else {
			studyDeptMapper.updateProportion(p);
		}

	}

	public void setZcStatus_o(String xuenian){
		studyDeptMapper.setZcStatus_o(xuenian);
	}
	public void setZcStatus_c(String xuenian){
		studyDeptMapper.setZcStatus_c(xuenian);
	}
	public Proportion getProportion(String xuenian) {

		return studyDeptMapper.getProportion(xuenian);

	}

	public void addMoral(Moral moral) {
		// TODO Auto-generated method stub

		studyDeptMapper.addMoral(moral);
	}

	public List<Moral> getMoralsByMid(int mid) {
		// TODO Auto-generated method stub
		return studyDeptMapper.getMoralsByMid(mid);
	}

	public Moral getMoralById(int id) {
		// TODO Auto-generated method stub
		return studyDeptMapper.getMoralById(id);
	}

	public String deleteMoralById(int id) {
		// TODO Auto-generated method stub
		if (studyDeptMapper.getMoralsByMid(id).size() != 0) {
			return "有子级不能删除";
		} else {
			studyDeptMapper.deleteMoralById(id);
			return "delete successed";
		}
	}

	public void updateMoralById(Moral moral) {
		// TODO Auto-generated method stub
		studyDeptMapper.updateMoralById(moral);
	}

	public void addDeduction(Deduction deduction) {
		// TODO Auto-generated method stub
		studyDeptMapper.addDuction(deduction);
	}

	public void updateDeduction(Deduction deduction) {
		// TODO Auto-generated method stub
		studyDeptMapper.updateDeduction(deduction);
	}

	public void deleteDeduction(int id) {
		// TODO Auto-generated method stub
		studyDeptMapper.deleteDeduction(id);
	}

	public Deduction getDeduction(int id) {
		// TODO Auto-generated method stub
		return studyDeptMapper.getDeDuction(id);
	}

	public List<Deduction> listDeduction() {
		// TODO Auto-generated method stub
		return studyDeptMapper.listDeDuction();
	}

	public List<ClassInfo> getClassCheckSummary(String xuenian, String termYear, String major) {
		// TODO Auto-generated method stub
		List<Integer> classNames = publicMapper.getClasses(termYear, major);

		List<ClassInfo> classInfos = new ArrayList<ClassInfo>();

		for (int s : classNames) {
			int count = studyDeptMapper.getStudentCountByClass(termYear, major, s);
			int isCheck = studyDeptMapper.getIsCheckCountByClass(xuenian, termYear, major, s);
			ClassInfo c = new ClassInfo();
			c.setClassName(s);
			c.setCount(count);
			c.setIsCheckcount(isCheck);
			classInfos.add(c);
		}

		return classInfos;
	}

	@Transactional
	public Boolean insertXuenian(String startTime, String endTime) {
		String name = startTime+"-"+endTime;
		Xuenian xuenian = new Xuenian();
		xuenian.setXuenian(name);
        List<Xuenian> xuenians = this.xuenianMapper.select(xuenian);
        if (CollectionUtils.isEmpty(xuenians)){
            this.xuenianMapper.insertSelective(xuenian);
            return true;
        }
        return false;

	}

	public List<Xuenian> ListXuenian() {
		return this.xuenianMapper.selectAll();
	}

    //查询综测开启状态
    public Boolean getZcStatusByXuenian(String xuenian){
        Xuenian xuenian1 = new Xuenian();
        xuenian1.setXuenian(xuenian);
        Xuenian xuenian3 = this.xuenianMapper.selectOne(xuenian1);
        Boolean zcSwitch = xuenian3.getZcSwitch();
        return zcSwitch;
    }
}
