package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.XjzcView;
import csust.mapper.XjzcViewMapper;
import csust.service.XJZCViewService;

@Service
public class XJZCViewServiceImp implements XJZCViewService {

	@Autowired
	XjzcViewMapper xjzcViewMapper;

	public List<XjzcView> getXjzcViewByNianjiAll(String nianji, String zcyear, String term, String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByNianjiAll(nianji, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByNianjiYes(String nianji, String zcyear, String term, String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByNianjiYes(nianji, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByNianjiNot(String nianji, String zcyear, String term, String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByNianjiNot(nianji, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByMajorAll(String nianji, String major, String zcyear, String term,
			String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByMajorAll(nianji, major, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByMajorYes(String nianji, String major, String zcyear, String term,
			String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByMajorYes(nianji, major, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByMajorNot(String nianji, String major, String zcyear, String term,
			String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByMajorNot(nianji, major, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByClassAll(String nianji, String major, String className, String zcyear,
			String term, String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByClassAll(nianji, major, className, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByClassYes(String nianji, String major, String className, String zcyear,
			String term, String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByClassYes(nianji, major, className, zcyear, term, stuType);
	}

	public List<XjzcView> getXjzcViewByClassNot(String nianji, String major, String className, String zcyear,
			String term, String stuType) {
		// TODO Auto-generated method stub
		return xjzcViewMapper.getXjzcViewByClassNot(nianji, major, className, zcyear, term, stuType);
	}

}
