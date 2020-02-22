package csust.bean;

public class ClassInfo {

	private int className;
	private int count;
	private int isCheckcount;

	public int getClassName() {
		return className;
	}

	public void setClassName(int className) {
		this.className = className;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getIsCheckcount() {
		return isCheckcount;
	}

	public void setIsCheckcount(int isCheckcount) {
		this.isCheckcount = isCheckcount;
	}

	@Override
	public String toString() {
		return "ClassInfo [className=" + className + ", count=" + count + ", isCheckcount=" + isCheckcount + "]";
	}

}
