package csust.bean;

import java.util.Date;

public class Lecture {

	private int id;
	private String xuenian;
	private String title;// 主题
	private String introduction;// 介绍
	private String holdTime;// 举办时间
	private String location;// 地点
	private String speaker;// 主讲人
	private String speakerIntroduction;// 简介
	private Date deadlineTime;// 截止报名时间
	private int limitNumber;// 限制人数
	private int number;// 已报人数
	private String publisher;// 发布人
	private Date releaseTime;// 发布时间
	private String imagePath;// 图片路径
	private int priority;// 讲座的优先级

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getXuenian() {
		return xuenian;
	}

	public void setXuenian(String xuenian) {
		this.xuenian = xuenian;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getHoldTime() {
		return holdTime;
	}

	public void setHoldTime(String holdTime) {
		this.holdTime = holdTime;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSpeaker() {
		return speaker;
	}

	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public Date getDeadlineTime() {
		return deadlineTime;
	}

	public void setDeadlineTime(Date deadlineTime) {
		this.deadlineTime = deadlineTime;
	}

	public int getLimitNumber() {
		return limitNumber;
	}

	public void setLimitNumber(int limitNumber) {
		this.limitNumber = limitNumber;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public Date getReleaseTime() {
		return releaseTime;
	}

	public void setReleaseTime(Date releaseTime) {
		this.releaseTime = releaseTime;
	}

	@Override
	public String toString() {
		return "Lecture [id=" + id + ", " + (xuenian != null ? "xuenian=" + xuenian + ", " : "")
				+ (title != null ? "title=" + title + ", " : "")
				+ (holdTime != null ? "holdTime=" + holdTime + ", " : "")
				+ (location != null ? "location=" + location + ", " : "")
				+ (speaker != null ? "speaker=" + speaker + ", " : "")
				+ (introduction != null ? "introduction=" + introduction + ", " : "")
				+ (deadlineTime != null ? "deadlineTime=" + deadlineTime + ", " : "")
				+ (limitNumber != 0 ? "limitNumber=" + limitNumber + ", " : "")
				+ (publisher != null ? "publisher=" + publisher + ", " : "")
				+ (releaseTime != null ? "releaseTime=" + releaseTime : "") + "]";
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getSpeakerIntroduction() {
		return speakerIntroduction;
	}

	public void setSpeakerIntroduction(String speakerIntroduction) {
		this.speakerIntroduction = speakerIntroduction;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

}
