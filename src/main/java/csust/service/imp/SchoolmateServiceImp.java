/**
 * 
 */
package csust.service.imp;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import csust.bean.Alumni;
import csust.bean.Schoolmate;

import csust.mapper.SchoolmateMapper;
import csust.service.SchoolmateService;

import readExcel.ReadSchoolmateExcel;

/**
 * @author 朱伟彰
 *
 */
@Service
public class SchoolmateServiceImp implements SchoolmateService {

	@Autowired
	SchoolmateMapper schoolmateMapper;

	public List<Schoolmate> getSchoolmates(HashMap<String, String> map) {
		// TODO Auto-generated method stub

		return schoolmateMapper.getSchoolmates(map);
	}

	public void addSchoolmate(Schoolmate sm) {
		// TODO Auto-generated method stub
		schoolmateMapper.addSchoolmate(sm);
	}

	public void updateSchoolmate(Schoolmate sm) {
		// TODO Auto-generated method stub
		schoolmateMapper.updateSchoolmate(sm);
	}

	public void deleteSchoolmate(int id) {
		// TODO Auto-generated method stub
		schoolmateMapper.deleteSchoolmate(id);
	}

	public List<Schoolmate> getSchoolmatesByLike(String condition) {
		// TODO Auto-generated method stub
		return schoolmateMapper.getSchoolmatesByLike(condition);
	}

	public HashMap<String, Integer> groupByArea() {
		// TODO Auto-generated method stub
		HashMap<String, Integer> map = new HashMap<String, Integer>();

		List<HashMap<String, Integer>> list = schoolmateMapper.groupByArea();

		for (HashMap<String, Integer> m : list) {
			map.put(String.valueOf(m.get("area")), Integer.parseInt(String.valueOf(m.get("count"))));
		}

		return map;
	}

	public HashMap<String, Integer> groupByAlumniAssociation() {
		// TODO Auto-generated method stub

		HashMap<String, Integer> map = new HashMap<String, Integer>();

		List<HashMap<String, Integer>> list = schoolmateMapper.groupByAlumniAssociation();

		for (HashMap<String, Integer> m : list) {
			map.put(String.valueOf(m.get("alumniAssociation")), Integer.parseInt(String.valueOf(m.get("count"))));
		}

		return map;
	}

	public HashMap<String, Integer> groupByMajor() {
		// TODO Auto-generated method stub
		HashMap<String, Integer> map = new HashMap<String, Integer>();

		List<HashMap<String, Integer>> list = schoolmateMapper.groupByMajor();

		for (HashMap<String, Integer> m : list) {
			map.put(String.valueOf(m.get("major")), Integer.parseInt(String.valueOf(m.get("count"))));
		}

		return map;
	}

	public List<Schoolmate> listcondition() {
		// TODO Auto-generated method stub
		return schoolmateMapper.listcondition();
	}

	public String addAlumni(Alumni al) {
		// TODO Auto-generated method stub
		String mess = null;
		if (schoolmateMapper.getAlumni(al.getSid()) != null) {
			mess = "已存在该校友的优秀事迹";
		} else {
			schoolmateMapper.addAlumni(al);
			mess = "success";
		}
		return mess;
	}

	public void updateAlumni(Alumni al) {
		// TODO Auto-generated method stub
		schoolmateMapper.updateAlumni(al);
	}

	public void deleteAlumni(int sid) {
		// TODO Auto-generated method stub
		schoolmateMapper.deleteAlumni(sid);
	}

	public Alumni getAlumni(int sid) {
		// TODO Auto-generated method stub
		return schoolmateMapper.getAlumni(sid);
	}

	@Transactional
	public StringBuffer readExcelFile(MultipartFile file) {
		StringBuffer result = new StringBuffer();

		// 创建处理EXCEL的类
		ReadSchoolmateExcel readExcel = new ReadSchoolmateExcel();
		// 解析excel，获取上传的事件单
		List<Schoolmate> list = readExcel.getExcelInfo(file);

		// 至此已经将excel中的数据转换到list里面了,接下来就可以操作list,可以进行保存到数据库,或者其他操作,
		for (int i = 0; i < list.size(); i++) {

			if (list.get(i).getName() != null) {
				try {

				} catch (Exception e) {
					// 事务回滚
					TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
					result.append("上传失败");
				}
				schoolmateMapper.addSchoolmate(list.get(i));
			} else {
				break;
			}

		}

		// 和你具体业务有关,这里不做具体的示范
		if (list != null && !list.isEmpty()) {

			result.append("上传成功");
		} else {
			result.append("上传失败");
		}
		return result;
	}

	public List<Alumni> listAlumniName() {
		// TODO Auto-generated method stub
		return schoolmateMapper.listAlumniName();
	}

}
