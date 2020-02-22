package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.PunishView;
import csust.mapper.PunishViewMapper;
import csust.service.PunishViewService;

@Service
public class PunishViewServiceImp implements PunishViewService {

	@Autowired
	PunishViewMapper punishViewMapper;

	public List<PunishView> getPunishViewNianji0(String nianji, String time, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewNianji0(nianji, time, stuType);
	}

	public List<PunishView> getPunishViewNianji1(String nianji, String time, String type1, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewNianji1(nianji, time, type1, stuType);
	}

	public List<PunishView> getPunishViewNianji2(String nianji, String time, String type1, String type2,
			String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewNianji2(nianji, time, type1, type2, stuType);
	}

	public List<PunishView> getPunishViewNianji3(String nianji, String time, String type1, String type2, String type3,
			String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewNianji3(nianji, time, type1, type2, type3, stuType);
	}

	public List<PunishView> getPunishViewNianji4(String nianji, String time, String type1, String type2, String type3,
			String type4, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewNianji4(nianji, time, type1, type2, type3, type4, stuType);
	}

	public List<PunishView> getPunishViewNianji5(String nianji, String time, String type1, String type2, String type3,
			String type4, String type5, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewNianji5(nianji, time, type1, type2, type3, type4, type5, stuType);
	}

	public List<PunishView> getPunishViewMajor0(String nianji, String major, String time, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewMajor0(nianji, major, time, stuType);
	}

	public List<PunishView> getPunishViewMajor1(String nianji, String major, String time, String type1,
			String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewMajor1(nianji, major, time, type1, stuType);
	}

	public List<PunishView> getPunishViewMajor2(String nianji, String major, String time, String type1, String type2,
			String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewMajor2(nianji, major, time, type1, type2, stuType);
	}

	public List<PunishView> getPunishViewMajor3(String nianji, String major, String time, String type1, String type2,
			String type3, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewMajor3(nianji, major, time, type1, type2, type3, stuType);
	}

	public List<PunishView> getPunishViewMajor4(String nianji, String major, String time, String type1, String type2,
			String type3, String type4, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewMajor4(nianji, major, time, type1, type2, type3, type4, stuType);
	}

	public List<PunishView> getPunishViewMajor5(String nianji, String major, String time, String type1, String type2,
			String type3, String type4, String type5, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewMajor5(nianji, major, time, type1, type2, type3, type4, type5, stuType);
	}

	public List<PunishView> getPunishViewClass0(String nianji, String major, String className, String time,
			String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewClass0(nianji, major, className, time, stuType);
	}

	public List<PunishView> getPunishViewClass1(String nianji, String major, String className, String time,
			String type1, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewClass1(nianji, major, className, time, type1, stuType);
	}

	public List<PunishView> getPunishViewClass2(String nianji, String major, String className, String time,
			String type1, String type2, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewClass2(nianji, major, className, time, type1, type2, stuType);
	}

	public List<PunishView> getPunishViewClass3(String nianji, String major, String className, String time,
			String type1, String type2, String type3, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewClass3(nianji, major, className, time, type1, type2, type3, stuType);
	}

	public List<PunishView> getPunishViewClass4(String nianji, String major, String className, String time,
			String type1, String type2, String type3, String type4, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewClass4(nianji, major, className, time, type1, type2, type3, type4,
				stuType);
	}

	public List<PunishView> getPunishViewClass5(String nianji, String major, String className, String time,
			String type1, String type2, String type3, String type4, String type5, String stuType) {
		// TODO Auto-generated method stub
		return punishViewMapper.getPunishViewClass5(nianji, major, className, time, type1, type2, type3, type4, type5,
				stuType);
	}

}
