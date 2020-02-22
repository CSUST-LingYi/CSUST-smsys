package csust.bean;

import java.util.List;

public class Summary {

	private List<PersonKnowledge> list;
	private MoralSummary moralSummary;
	private PersonSports personSports;
	private PersonSummary personSummary;
	private List<PersonDeduction> deductions;

	public List<PersonKnowledge> getList() {
		return list;
	}

	public void setList(List<PersonKnowledge> list) {
		this.list = list;
	}

	public PersonSports getPersonSports() {
		return personSports;
	}

	public void setPersonSports(PersonSports personSports) {
		this.personSports = personSports;
	}

	public MoralSummary getMoralSummary() {
		return moralSummary;
	}

	public void setMoralSummary(MoralSummary moralSummary) {
		this.moralSummary = moralSummary;
	}

	public PersonSummary getPersonSummary() {
		return personSummary;
	}

	public void setPersonSummary(PersonSummary personSummary) {
		this.personSummary = personSummary;
	}

	public List<PersonDeduction> getDeductions() {
		return deductions;
	}

	public void setDeductions(List<PersonDeduction> deductions) {
		this.deductions = deductions;
	}

}
