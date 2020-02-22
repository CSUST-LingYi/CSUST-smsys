package csust.mapper;

import java.util.List;

import csust.bean.XjzcView;

public interface XjzcViewMapper {

	public List<XjzcView> getXjzcViewByNianjiAll(String nianji, String zcyear, String term, String stuType);

	public List<XjzcView> getXjzcViewByNianjiYes(String nianji, String zcyear, String term, String stuType);

	public List<XjzcView> getXjzcViewByNianjiNot(String nianji, String zcyear, String term, String stuType);

	public List<XjzcView> getXjzcViewByMajorAll(String nianji, String major, String zcyear, String term,
			String stuType);

	public List<XjzcView> getXjzcViewByMajorYes(String nianji, String major, String zcyear, String term,
			String stuType);

	public List<XjzcView> getXjzcViewByMajorNot(String nianji, String major, String zcyear, String term,
			String stuType);

	public List<XjzcView> getXjzcViewByClassAll(String nianji, String major, String className, String zcyear,
			String term, String stuType);

	public List<XjzcView> getXjzcViewByClassYes(String nianji, String major, String className, String zcyear,
			String term, String stuType);

	public List<XjzcView> getXjzcViewByClassNot(String nianji, String major, String className, String zcyear,
			String term, String stuType);
}
