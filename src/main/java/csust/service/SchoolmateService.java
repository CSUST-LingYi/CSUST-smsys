package csust.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import csust.bean.Alumni;
import csust.bean.Schoolmate;

public interface SchoolmateService {

	/*********** 校友信息 ***********/
	// 查询校友信息
	public List<Schoolmate> getSchoolmates(HashMap<String, String> map);

	// 增加校友信息
	public void addSchoolmate(Schoolmate sm);

	// 根据id修改校友信息
	public void updateSchoolmate(Schoolmate sm);

	// 根据id删除校友信息
	public void deleteSchoolmate(int id);

	// 前端四个下拉框的值（需前端去重）
	public List<Schoolmate> listcondition();

	// 模糊查询
	public List<Schoolmate> getSchoolmatesByLike(String condition);

	// 按所在地区统计
	public HashMap<String, Integer> groupByArea();

	// 按所属校友会统计
	public HashMap<String, Integer> groupByAlumniAssociation();

	// 按院系统计
	public HashMap<String, Integer> groupByMajor();

	// excel导入校友信息
	public StringBuffer readExcelFile(MultipartFile file);

	/*********** 校友风采事迹 ***********/
	// 增加校友风采事迹
	public String addAlumni(Alumni al);

	// 修改校友风采事迹
	public void updateAlumni(Alumni al);

	// 删除校友风采事迹
	public void deleteAlumni(int sid);

	// 查找校友风采事迹
	public Alumni getAlumni(int sid);

	// 列出添加了校友风采的人
	public List<Alumni> listAlumniName();
}
