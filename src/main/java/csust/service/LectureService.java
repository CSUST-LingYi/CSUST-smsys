package csust.service;

import java.util.List;

import csust.bean.BasicInfo;
import csust.bean.Lecture;
import csust.bean.Registration;

public interface LectureService {

	/*************** 讲座信息的操作 ***************************/
	// 发布一条讲座信息
	public void addLecture(Lecture lecture);

	// 查询某一条讲座的详细信息
	public Lecture getLectureById(int id);

	// 修改某条讲座信息
	public void updateLecture(Lecture lecture);

	// 删除某条讲座信息
	public void deleteLectureById(int id);

	// 查询多条讲座信息的导航信息
	public List<Lecture> listLecture(int start, int end);

	// 关键词搜索（讲座题目、报告人，地点）
	public List<Lecture> getLectureByKeyWord(String keyWorld);

	// 通过优先级排序搜索（查有优先级最高的两个）
	public List<Lecture> getLectureByPriority();

	// 通过主讲人查询讲座（最近的两个）
	public List<Lecture> getLectureBySpeaker(String speaker);

	// 设定讲座的优先级
	public void setLecturePriority(int id, int priority);

	/************** 学生报名 ******************************/

	// 学生报名
	public String addRegistration(Registration registration);

	// 学生取消报名
	public String deleteRegistrarion(int id);

	/***************** 报名名单操作 ************************/

	// 查询某次讲座报名名单
	public List<Registration> getRegistraTionByLid(int lid);

	// 打印某次讲座报名名单

	// 对学生进行签到
	public void changeStatusByLidAndSno(Registration registration);

	// 查看个人已报名的讲座
	public List<Lecture> gerLecturesBySno(String sno);

	// 统计学生报名的次数
	public List<BasicInfo> registraTionConut(String xuenian, String nianji, String major, int classNo);
	
	public String addRegistration_wx(Registration registration);

}
