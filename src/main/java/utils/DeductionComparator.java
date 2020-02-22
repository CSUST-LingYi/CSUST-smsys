package utils;

import java.util.Comparator;

import csust.bean.PersonSummary;

public class DeductionComparator implements Comparator<PersonSummary>{

	public int compare(PersonSummary o1, PersonSummary o2) {
		// TODO Auto-generated method stub
		return o1.getDeduction() > o2.getDeduction() ? 1 : -1;

	}
}
