package csust.mapper;

import java.util.List;

import csust.bean.PunishView;

public interface PunishViewMapper {

	public List<PunishView> getPunishViewNianji0(String nianji, String time, String stuType);

	public List<PunishView> getPunishViewNianji1(String nianji, String time, String type1, String stuType);

	public List<PunishView> getPunishViewNianji2(String nianji, String time, String type1, String type2,
			String stuType);

	public List<PunishView> getPunishViewNianji3(String nianji, String time, String type1, String type2, String type3,
			String stuType);

	public List<PunishView> getPunishViewNianji4(String nianji, String time, String type1, String type2, String type3,
			String type4, String stuType);

	public List<PunishView> getPunishViewNianji5(String nianji, String time, String type1, String type2, String type3,
			String type4, String type5, String stuType);

	public List<PunishView> getPunishViewMajor0(String nianji, String major, String time, String stuType);

	public List<PunishView> getPunishViewMajor1(String nianji, String major, String time, String type1, String stuType);

	public List<PunishView> getPunishViewMajor2(String nianji, String major, String time, String type1, String type2,
			String stuType);

	public List<PunishView> getPunishViewMajor3(String nianji, String major, String time, String type1, String type2,
			String type3, String stuType);

	public List<PunishView> getPunishViewMajor4(String nianji, String major, String time, String type1, String type2,
			String type3, String type4, String stuType);

	public List<PunishView> getPunishViewMajor5(String nianji, String major, String time, String type1, String type2,
			String type3, String type4, String type5, String stuType);

	public List<PunishView> getPunishViewClass0(String nianji, String major, String className, String time,
			String stuType);

	public List<PunishView> getPunishViewClass1(String nianji, String major, String className, String time,
			String type1, String stuType);

	public List<PunishView> getPunishViewClass2(String nianji, String major, String className, String time,
			String type1, String type2, String stuType);

	public List<PunishView> getPunishViewClass3(String nianji, String major, String className, String time,
			String type1, String type2, String type3, String stuType);

	public List<PunishView> getPunishViewClass4(String nianji, String major, String className, String time,
			String type1, String type2, String type3, String type4, String stuType);

	public List<PunishView> getPunishViewClass5(String nianji, String major, String className, String time,
			String type1, String type2, String type3, String type4, String type5, String stuType);

}
