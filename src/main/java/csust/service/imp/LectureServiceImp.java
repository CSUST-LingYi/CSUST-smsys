package csust.service.imp;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.BasicInfo;
import csust.bean.Lecture;
import csust.bean.Registration;
import csust.mapper.LectureMapper;
import csust.service.LectureService;

@Service
public class LectureServiceImp implements LectureService {

	@Autowired
	LectureMapper lectureMapper;

	public void addLecture(Lecture lecture) {
		// TODO Auto-generated method stub
		lectureMapper.addLecture(lecture);
	}

	public Lecture getLectureById(int id) {
		// TODO Auto-generated method stub
		return lectureMapper.getLectureById(id);
	}

	public void updateLecture(Lecture lecture) {
		// TODO Auto-generated method stub
		lectureMapper.updateLecture(lecture);
	}

	public void deleteLectureById(int id) {
		// TODO Auto-generated method stub

		lectureMapper.deleteLectureById(id);

	}

	public List<Lecture> listLecture(int start, int end) {
		// TODO Auto-generated method stub
		return lectureMapper.listLecture(start, end);
	}

	public String addRegistration(Registration registration) {
		// TODO Auto-generated method stub

		if (lectureMapper.getRegistraTionByLidAndSno(registration.getLid(), registration.getStudentNo()) == null) {

			Date nowTime = new Date();

			if (lectureMapper.getLectureById(registration.getLid()).getDeadlineTime().getTime() < nowTime.getTime()) {
				return "已过报名期限";
			} else {
				lectureMapper.addRegistration(registration);
				return "success";
			}

		}

		return "请勿重复报名";
	}

	public String deleteRegistrarion(int id) {
		// TODO Auto-generated method stub
		// 用于判断是否过了报名截止时间
		Lecture L = lectureMapper.getLectureByRid(id);
		Date d = new Date();
		if (L.getDeadlineTime().getTime() < d.getTime()) {
			return "已过报名期限";
		} else {
			lectureMapper.deleteRegistrarionById(id);
			return "success";
		}

	}

	public List<Registration> getRegistraTionByLid(int lid) {
		// TODO Auto-generated method stub
		return lectureMapper.getRegistraTionByLid(lid);
	}

	public void changeStatusByLidAndSno(Registration registration) {
		// TODO Auto-generated method stub
		lectureMapper.changeStatusByLidAndSno(registration);
	}

	public List<Lecture> getLectureByKeyWord(String keyWord) {
		// TODO Auto-generated method stub
		return lectureMapper.getLectureByKeyWord(keyWord);
	}

	public List<Lecture> gerLecturesBySno(String sno) {
		// TODO Auto-generated method stub
		return lectureMapper.gerLecturesBySno(sno);
	}

	public List<Lecture> getLectureByPriority() {
		// TODO Auto-generated method stub
		return lectureMapper.getLectureByPriority();
	}

	public List<Lecture> getLectureBySpeaker(String speaker) {
		// TODO Auto-generated method stub
		return lectureMapper.getLectureBySpeaker(speaker);
	}

	public void setLecturePriority(int id, int priority) {
		// TODO Auto-generated method stub
		lectureMapper.setLecturePriority(id, priority);
	}

	public List<BasicInfo> registraTionConut(String xuenian, String nianji, String major, int classNo) {
		// TODO Auto-generated method stub
		return lectureMapper.registraTionConut(xuenian, nianji, major, classNo);
	}

	public String addRegistration_wx(Registration registration) {
		if (lectureMapper.getRegistraTionByLidAndSno(registration.getLid(), registration.getStudentNo()) == null) {

			Date nowTime = new Date();

			if (lectureMapper.getLectureById(registration.getLid()).getDeadlineTime().getTime() < nowTime.getTime()) {
				return "已过报名期限";
			} else {
				lectureMapper.addRegistration_wx(registration);
				return "success";
			}

		}

		return "请勿重复报名";
		
	}

}
