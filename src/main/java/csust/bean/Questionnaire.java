package csust.bean;

import java.util.Date;

public class Questionnaire {

	int qnid;// 问卷的id
	int uid;// 发布问卷的用户的id
	String uname;// 发布问卷的用户的账户名
	Date releaseTime;// 回答问卷的人数
	String questionnaireName;// 问卷的名字
	String termYear;// 问卷的年级对象
	String bz;// 对问卷的介绍

	public Questionnaire() {

	}

	public Questionnaire(int uid, String questionnaireName, String termYear, String bz) {
		this.uid = uid;
		this.questionnaireName = questionnaireName;
		this.termYear = termYear;
		this.bz = bz;
	}

	public int getQnid() {
		return qnid;
	}

	public void setQnid(int id) {
		this.qnid = id;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getQuestionnaireName() {
		return questionnaireName;
	}

	public void setQuestionnaireName(String questionnaireName) {
		this.questionnaireName = questionnaireName;
	}

	public String getTermYear() {
		return termYear;
	}

	public void setTermYear(String termYear) {
		this.termYear = termYear;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public Date getReleaseTime() {
		return releaseTime;
	}

	public void setReleaseTime(Date releaseTime) {
		this.releaseTime = releaseTime;
	}

	@Override
	public String toString() {
		return "Questionnaire [qnid=" + qnid + ", uid=" + uid + ", uname=" + uname + ", releaseTime=" + releaseTime
				+ ", questionnaireName=" + questionnaireName + ", termYear=" + termYear + "]";
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

}
