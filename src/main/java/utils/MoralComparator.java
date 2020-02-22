package utils;

import java.util.Comparator;

import csust.bean.PersonSummary;

public class MoralComparator implements Comparator<PersonSummary> {

	public int compare(PersonSummary o1, PersonSummary o2) {
		// TODO Auto-generated method stub

		return o1.getKnowledge() > o2.getKnowledge() ? 1 : -1;

	}

}
