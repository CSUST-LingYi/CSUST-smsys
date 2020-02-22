package utils;

import java.util.Comparator;

import csust.bean.Student;

public class StudentNoComparator implements Comparator<Student> {

	public int compare(Student o1, Student o2) {
		// TODO Auto-generated method stub
		return o1.getStudentNo().compareTo(o2.getStudentNo());
	}

}
