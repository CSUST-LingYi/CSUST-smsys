package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.JLView;
import csust.bean.Rewardinfo;
import csust.mapper.JLViewMapper;
import csust.service.JLViewService;

@Service
public class JLViewServiceImp implements JLViewService {

	@Autowired
	JLViewMapper jlViewMapper;

	public List<JLView> getJLByNianji0(String nianji, String getTime, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByNianji0(nianji, getTime, stuType);
	}

	public List<JLView> getJLByNianji1(String nianji, String getTime, String type1, String stuType) {
		// TODO.Auto-generated method stub
		return jlViewMapper.getJLByNianji1(nianji, getTime, type1, stuType);
	}

	public List<JLView> getJLByNianji2(String nianji, String getTime, String type1, String type2, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByNianji2(nianji, getTime, type1, type2, stuType);
	}

	public List<JLView> getJLByNianji3(String nianji, String getTime, String type1, String type2, String type3,
			String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByNianji3(nianji, getTime, type1, type2, type3, stuType);
	}

	public List<JLView> getJLByMajor0(String nianji, String major, String getTime, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByMajor0(nianji, major, getTime, stuType);
	}

	public List<JLView> getJLByMajor1(String nianji, String major, String getTime, String type1, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByMajor1(nianji, major, getTime, type1, stuType);
	}

	public List<JLView> getJLByMajor2(String nianji, String major, String getTime, String type1, String type2,
			String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByMajor2(nianji, major, getTime, type1, type2, stuType);
	}

	public List<JLView> getJLByMajor3(String nianji, String major, String getTime, String type1, String type2,
			String type3, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByMajor3(nianji, major, getTime, type1, type2, type3, stuType);
	}

	public List<JLView> getJLByClass0(String nianji, String major, String ClassName, String getTime, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByClass0(nianji, major, ClassName, getTime, stuType);
	}

	public List<JLView> getJLByClass1(String nianji, String major, String ClassName, String getTime, String type1,
			String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByClass1(nianji, major, ClassName, getTime, type1, stuType);
	}

	public List<JLView> getJLByClass2(String nianji, String major, String ClassName, String getTime, String type1,
			String type2, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByClass2(nianji, major, ClassName, getTime, type1, type2, stuType);
	}

	public List<JLView> getJLByClass3(String nianji, String major, String ClassName, String getTime, String type1,
			String type2, String type3, String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.getJLByClass3(nianji, major, ClassName, getTime, type1, type2, type3, stuType);
	}

	public List<Rewardinfo> listRewardinfo(String stuType) {
		// TODO Auto-generated method stub
		return jlViewMapper.listRewardinfo(stuType);
	}

	public List<Rewardinfo> getRewardinfo(Rewardinfo rewardinfo) {
		// TODO Auto-generated method stub
		return jlViewMapper.getRewardinfo(rewardinfo);
	}

	public String addRewardinfo(Rewardinfo rewardinfo) {
		// TODO Auto-generated method stub
		jlViewMapper.addRewardinfo(rewardinfo);
		String mess = "success";

		return mess;
	}

}
