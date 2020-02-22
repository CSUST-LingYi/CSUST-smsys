package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.PsStudentView;
import csust.mapper.PsViewMapper;
import csust.service.PsStudentViewService;

@Service
public class PsViewServiceImp implements PsStudentViewService {

	@Autowired
	PsViewMapper psViewMapper;

	public List<PsStudentView> getPsViewByNianji0(String nianji, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByNianji0(nianji, stuType);
	}

	public List<PsStudentView> getPsViewByNianji1(String nianji, String type1, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByNianji1(nianji, type1, stuType);
	}

	public List<PsStudentView> getPsViewByNianji2(String nianji, String type1, String type2, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByNianji2(nianji, type1, type2, stuType);
	}

	public List<PsStudentView> getPsViewByNianji3(String nianji, String type1, String type2, String type3,
			String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByNianji3(nianji, type1, type2, type3, stuType);
	}

	public List<PsStudentView> getPsViewByMajor0(String nianji, String major, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByMajor0(nianji, major, stuType);
	}

	public List<PsStudentView> getPsViewByMajor1(String nianji, String major, String type1, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByMajor1(nianji, major, type1, stuType);
	}

	public List<PsStudentView> getPsViewByMajor2(String nianji, String major, String type1, String type2,
			String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByMajor2(nianji, major, type1, type2, stuType);
	}

	public List<PsStudentView> getPsViewByMajor3(String nianji, String major, String type1, String type2, String type3,
			String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByMajor3(nianji, major, type1, type2, type3, stuType);
	}

	public List<PsStudentView> getPsViewByClass0(String nianji, String major, String className, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByClass0(nianji, major, className, stuType);
	}

	public List<PsStudentView> getPsViewByClass1(String nianji, String major, String className, String type1,
			String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByClass1(nianji, major, className, type1, stuType);
	}

	public List<PsStudentView> getPsViewByClass2(String nianji, String major, String className, String type1,
			String type2, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByClass2(nianji, major, className, type1, type2, stuType);
	}

	public List<PsStudentView> getPsViewByClass3(String nianji, String major, String className, String type1,
			String type2, String type3, String stuType) {
		// TODO Auto-generated method stub
		return psViewMapper.getPsViewByClass3(nianji, major, className, type1, type2, type3, stuType);
	}

}
