package utils;

public enum UserType {

	student(0, "student"), teacher(1, "teacher"), studyDept(2, "studyDept"), monitor(3, "monitor");

	private int value;
	private String desc;

	UserType(int value, String desc) {
		this.value = value;
		this.desc = desc;
	}

	public int getValue() {
		return value;
	}

	public String getDesc() {
		return desc;
	}

	/**
	 * 通过value取枚举
	 * 
	 * @param value
	 * @return
	 */

	public static UserType getTypeByValue(String value) {
		if (value == null) {
			return null;
		}
		int valueKey = Integer.parseInt(value);
		for (UserType enums : UserType.values()) {
			if (enums.getValue() == valueKey) {
				return enums;
			}
		}
		return null;
	}

	/**
	 * 通过value取描述
	 * 
	 * @param value
	 * @return
	 */
	public static String getDescByValue(int value) {
		for (UserType enums : UserType.values()) {
			if (enums.getValue() == value) {
				return enums.getDesc();
			}
		}
		return "";
	}

}
