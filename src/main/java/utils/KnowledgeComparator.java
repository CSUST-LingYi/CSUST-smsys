package utils;

import java.util.Comparator;

import csust.bean.PersonSummary;

public class KnowledgeComparator implements Comparator<PersonSummary> {

	public int compare(PersonSummary o1, PersonSummary o2) {
		// TODO Auto-generated method stub
		return o1.getSum() > o2.getSum() ? 1 : -1;

	}

}
