package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.PracticeView;
import csust.mapper.PracticeViewMapper;
import csust.service.PracticeViewService;

@Service
public class PracticeViewServiceImp implements PracticeViewService {

	@Autowired
	PracticeViewMapper practiceViewMapper;

	public List<PracticeView> getPracticeViewByNianji0(String nianji, String time, String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByNianji0(nianji, time, stuType);
	}

	public List<PracticeView> getPracticeViewByNianji1(String nianji, String time, String type1, String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByNianji1(nianji, time, type1, stuType);
	}

	public List<PracticeView> getPracticeViewByNianji2(String nianji, String time, String type1, String type2,
			String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByNianji2(nianji, time, type1, type2, stuType);
	}

	public List<PracticeView> getPracticeViewByMajor0(String nianji, String major, String time, String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByMajor0(nianji, major, time, stuType);
	}

	public List<PracticeView> getPracticeViewByMajor1(String nianji, String major, String time, String type1,
			String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByMajor1(nianji, major, time, type1, stuType);
	}

	public List<PracticeView> getPracticeViewByMajor2(String nianji, String major, String time, String type1,
			String type2, String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByMajor2(nianji, major, time, type1, type2, stuType);
	}

	public List<PracticeView> getPracticeViewByClass0(String nianji, String major, String className, String time,
			String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByClass0(nianji, major, className, time, stuType);
	}

	public List<PracticeView> getPracticeViewByClass1(String nianji, String major, String className, String time,
			String type1, String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByClass1(nianji, major, className, time, type1, stuType);
	}

	public List<PracticeView> getPracticeViewByClass2(String nianji, String major, String className, String time,
			String type1, String type2, String stuType) {
		// TODO Auto-generated method stub
		return practiceViewMapper.getPracticeViewByClass2(nianji, major, className, time, type1, type2, stuType);
	}

}
