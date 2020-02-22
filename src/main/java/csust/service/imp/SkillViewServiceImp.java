package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.SkillView;
import csust.mapper.SkillViewMapper;
import csust.service.SkillViewService;

@Service
public class SkillViewServiceImp implements SkillViewService {

	@Autowired
	SkillViewMapper skillViewMapper;

	public List<SkillView> getSkillViewByNianji0(String nianji, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByNianji0(nianji, stuType);
	}

	public List<SkillView> getSkillViewByNianji1(String nianji, String type1, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByNianji1(nianji, type1, stuType);
	}

	public List<SkillView> getSkillViewByNianji2(String nianji, String type1, String type2, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByNianji2(nianji, type1, type2, stuType);
	}

	public List<SkillView> getSkillViewByNianji3(String nianji, String type1, String type2, String type3,
			String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByNianji3(nianji, type1, type2, type3, stuType);
	}

	public List<SkillView> getSkillViewByMajor0(String nianji, String major, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByMajor0(nianji, major, stuType);
	}

	public List<SkillView> getSkillViewByMajor1(String nianji, String major, String type1, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByMajor1(nianji, major, type1, stuType);
	}

	public List<SkillView> getSkillViewByMajor2(String nianji, String major, String type1, String type2,
			String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByMajor2(nianji, major, type1, type2, stuType);
	}

	public List<SkillView> getSkillViewByMajor3(String nianji, String major, String type1, String type2, String type3,
			String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByMajor3(nianji, major, type1, type2, type3, stuType);
	}

	public List<SkillView> getSkillViewByClass0(String nianji, String major, String className, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByClass0(nianji, major, className, stuType);
	}

	public List<SkillView> getSkillViewByClass1(String nianji, String major, String className, String type1,
			String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByClass1(nianji, major, className, type1, stuType);
	}

	public List<SkillView> getSkillViewByClass2(String nianji, String major, String className, String type1,
			String type2, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByClass2(nianji, major, className, type1, type2, stuType);
	}

	public List<SkillView> getSkillViewByClass3(String nianji, String major, String className, String type1,
			String type2, String type3, String stuType) {
		// TODO Auto-generated method stub
		return skillViewMapper.getSkillViewByClass3(nianji, major, className, type1, type2, type3, stuType);
	}

}
