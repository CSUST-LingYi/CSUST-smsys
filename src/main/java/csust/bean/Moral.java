package csust.bean;

//德育
public class Moral {

	private int id;
	private String name;
	private int mid;// 对应的父节点的id
	private double score;// 分值

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "Moral [id=" + id + ", " + (name != null ? "name=" + name + ", " : "") + "mid=" + mid + ", score="
				+ score + "]";
	}

}
