package utils;

import java.util.Comparator;

import csust.bean.PersonSummary;

public class SportsComparator implements Comparator<PersonSummary> {

	public int compare(PersonSummary o1, PersonSummary o2) {
		// TODO Auto-generated method stub
		return o1.getSports() > o2.getSports() ? 1 : -1;
	}

}
