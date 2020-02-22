package csust.bean;

public class Rewardinfo {

	private int rewardId;// 奖励ID
	private String rewardTime;// 奖励的时间
	private String rewardLevel;// 奖励的级别
	private String rewardName;// 奖励名字
	private String sponsor;// 主办方
	private String termOrindividual;// 团队或个人
	private String stuType;// 学生类型：本科生，研究生

	public String getStuType() {
		return stuType;
	}

	public void setStuType(String stuType) {
		this.stuType = stuType;
	}

	public String getTermOrindividual() {
		return termOrindividual;
	}

	public void setTermOrindividual(String termOrindividual) {
		this.termOrindividual = termOrindividual;
	}

	public int getRewardId() {
		return rewardId;
	}

	public void setRewardId(int rewardId) {
		this.rewardId = rewardId;
	}

	public String getRewardTime() {
		return rewardTime;
	}

	public void setRewardTime(String rewardTime) {
		this.rewardTime = rewardTime;
	}

	public String getRewardLevel() {
		return rewardLevel;
	}

	public void setRewardLevel(String rewardLevel) {
		this.rewardLevel = rewardLevel;
	}

	public String getRewardName() {
		return rewardName;
	}

	public void setRewardName(String rewardName) {
		this.rewardName = rewardName;
	}

	public String getSponsor() {
		return sponsor;
	}

	public void setSponsor(String sponsor) {
		this.sponsor = sponsor;
	}

}
