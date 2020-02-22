package csust.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import csust.bean.BasicInfo;
import csust.bean.Lecture;
import csust.bean.Registration;

public interface LectureMapper {

	/*************** 讲座信息的操作 ***************************/
	// 发布一条讲座信息
	public void addLecture(Lecture lecture);

	// 查询某一条讲座的详细信息
	public Lecture getLectureById(@Param("id") int id);

	// 修改某条讲座信息
	public void updateLecture(Lecture lecture);

	// 删除某条讲座信息
	public void deleteLectureById(int id);

	// 查询多条讲座信息的导航信息
	public List<Lecture> listLecture(@Param("start") int start, @Param("end") int end);

	// 通过优先级排序搜索（查优先级最高的两个）
	public List<Lecture> getLectureByPriority();

	// 通过主讲人查询讲座（最近的两个）
	public List<Lecture> getLectureBySpeaker(@Param("speaker") String speaker);

	// 设定讲座的优先级
	public void setLecturePriority(@Param("id") int id, @Param("priority") int priority);

	/************** 学生报名 ******************************/

	// 学生报名
	public void addRegistration(Registration registration);

	// 学生查看报名
	public void getRegistrationBySno(@Param("studentNo") String studentNo);

	// 学生取消报名
	public void deleteRegistrarionById(@Param("id") int id);

	/*****************
	 * 报名名单操作
	 * 
	 * @return
	 ************************/

	// 查询某次讲座报名名单
	public List<Registration> getRegistraTionByLid(@Param("lid") int lid);

	// 对学生进行签到
	public void changeStatusByLidAndSno(Registration registration);

	public List<Lecture> getLectureByKeyWord(@Param("keyWord") String keyWord);

	public List<Lecture> gerLecturesBySno(@Param("studentNo") String sno);

	public Registration getRegistraTionByLidAndSno(@Param("lid") int lid, @Param("studentNo") String studentNo);

	// 报名表的id，用于辅助判断是否过了报名截止时间
	public Lecture getLectureByRid(@Param("rid") int id);

	// 统计学生报名的次数
	public List<BasicInfo> registraTionConut(@Param("xuenian") String xuenian, @Param("nianji") String nianji,
			@Param("major") String major, @Param("className") int classNo);

	public void addRegistration_wx(Registration registration);

}
