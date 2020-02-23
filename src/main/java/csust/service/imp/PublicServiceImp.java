package csust.service.imp;

import java.util.List;
import java.util.Stack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import csust.bean.BasicInfo;
import csust.bean.Feedback;
import csust.bean.Moral;
import csust.bean.MoralSummary;
import csust.bean.PersonDeduction;
import csust.bean.PersonKnowledge;
import csust.bean.PersonMoral;
import csust.bean.PersonSports;
import csust.bean.PersonSummary;
import csust.bean.Student;

import csust.mapper.PublicMapper;
import csust.service.PublicService;

@Service
public class PublicServiceImp implements PublicService {

	@Autowired
	PublicMapper publicMapper;



	public void checkOneStudent(String xuenian, String studentNo, boolean status) {

		publicMapper.checkOneStudent(xuenian, studentNo, status);
	};
	
	public void checkOneStudentT(String xuenian, String studentNo, boolean status) {
	
		publicMapper.checkOneStudentT(xuenian, studentNo, status);
	}
	public int getTban(String xuenian,String studentNo) {
		return publicMapper.getTban(xuenian, studentNo);
	}
	public List<Integer> getClasses(String nianji, String major) {
		// TODO Auto-generated method stub
		return publicMapper.getClasses(nianji, major);
	}

	public List<Student> getStudentsByClass(String nianji, String major, int classNo) {
		// TODO Auto-generated method stub
		return publicMapper.getStudentsByClass(nianji, major, classNo);
	}

	public List<PersonSummary> getSummaryByClass(String xuenian, String nianji, String major, int classNo) {
		// TODO Auto-generated method stub
		return publicMapper.getSummaryByClass(xuenian, nianji, major, classNo);
	}

	public PersonSummary getPersonSummaryBySno(String xuenian, String sno) {
		// TODO Auto-generated method stub
		//System.out.println(publicMapper.isExistsPersonSummary(xuenian, sno));
		if (publicMapper.isExistsPersonSummary(xuenian, sno) == false) {

			try {
				publicMapper.addPersonSummary(xuenian, sno);
			} catch (Exception e) {
				return publicMapper.getPersonSummaryBySno(xuenian, sno);
			}
		}
		publicMapper.updatePersonSummary(xuenian, sno);
		return publicMapper.getPersonSummaryBySno(xuenian, sno);
	}

	public List<PersonMoral> getPersonMoralBySno(String xuenian, String sno) {
		// TODO Auto-generated method stub
		List<PersonMoral> list = publicMapper.getPersonMoralsBySno(xuenian, sno);

		for (PersonMoral pm : list) {
			String type = "";

			Moral p = new Moral();
			p.setMid(pm.getMid());

			Stack<String> stack = new Stack<String>();

			while (true) {
				p = publicMapper.getMoralTypeById(p.getMid());

				stack.push(p.getName());

				if (p.getMid() == 0) {
					break;
				}
			}
			while (!stack.empty()) {
				type += stack.pop() + "-----";
			}

			pm.setType(type);
		}

		return list;
	}

	public void addPersonMoral(PersonMoral personMoral) {
		// TODO Auto-generated method stub
		publicMapper.addPersonMoral(personMoral);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(personMoral.getXuenian(), personMoral.getStudentNo());
	}

	public void updatePersonMoral(PersonMoral personMoral) {
		// TODO Auto-generated method stub
		publicMapper.updatePersonMoral(personMoral);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(personMoral.getXuenian(), personMoral.getStudentNo());

	}

	public void deletePersonMoral(String xuenian, String studentNo, int id) {
		// TODO Auto-generated method stub
		publicMapper.deletePersonMoral(id);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(xuenian, studentNo);
	}

	public List<PersonKnowledge> getPersonKnowledgeBySno(String xuenian, String sno) {
		// TODO Auto-generated method stub

		return publicMapper.getPersonKnowlwdgesBySno(xuenian, sno);
	}

	public void addPersonKnowledge(PersonKnowledge pk) {
		// TODO Auto-generated method stub
		publicMapper.addPersonKnowledge(pk);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(pk.getXuenian(), pk.getStudentNo());
	}

	public void updatePersonKnowledge(PersonKnowledge pk) {
		// TODO Auto-generated method stub
		publicMapper.updatePersonKnowledge(pk);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(pk.getXuenian(), pk.getStudentNo());
	}

	public void deletePersonKnowledge(String xuenian, String studentNo, int id) {
		// TODO Auto-generated method stub
		publicMapper.deletePersonKnowledge(id);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(xuenian, studentNo);
	}

	public PersonKnowledge getKnowledgeBySnoAndCourseId(String xuenian, String sno, int id) {
		// TODO Auto-generated method stub
		return publicMapper.getKnowledgeBySnoAndCourseId(xuenian, sno, id);
	}

	public PersonSports getPersonSportsBySno(String xuenian, String sno) {
		// TODO Auto-generated method stub
		return publicMapper.getPersonSports(xuenian, sno);
	}

	public void addPersonSports(PersonSports ps) {
		// TODO Auto-generated method stub
		publicMapper.addPersonSports(ps);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(ps.getXuenian(), ps.getStudentNo());
	}

	public void updatePersonSports(PersonSports ps) {
		// TODO Auto-generated method stub
		publicMapper.updatePersonSports(ps);
		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(ps.getXuenian(), ps.getStudentNo());
	}

	public void deletePersonSports(int id) {
		// TODO Auto-generated method stub
		publicMapper.deletePersonSports(id);
	}

	public void addMoralSummary(MoralSummary ms) {
		// TODO Auto-generated method stub

		publicMapper.addMoralSummary(ms);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(ms.getXuenian(), ms.getStudentNo());
	}

	@Transactional
	public void updateMoralSummary(MoralSummary ms) {
		// TODO Auto-generated method stub

		if (publicMapper.isExistsMoralSummary(ms.getXuenian(), ms.getStudentNo()) == true) {

			publicMapper.updateMoralSummary(ms);

		} else {

			publicMapper.addMoralSummary(ms);
		}

		// 因为德育分总分变了，所以也要修改汇总里面的德育分总分
		publicMapper.updatePersonSummary(ms.getXuenian(), ms.getStudentNo());
	}

	public MoralSummary getMoralSummary(String xuenian, String studentNo) {
		// TODO Auto-generated method stub
		// 如果德育分汇总不存在那就新增一个
		if (publicMapper.getMoralSummary(xuenian, studentNo) == null) {
			MoralSummary ms = new MoralSummary();
			ms.setXuenian(xuenian);
			ms.setStudentNo(studentNo);
			ms.setSelfEvaluation(100);
			ms.setClassEvaluation(0);
			ms.setTeacherEvaluation(0);
			publicMapper.addMoralSummary(ms);
		}
		return publicMapper.getMoralSummary(xuenian, studentNo);
	}

	public void addPersonDeduction(PersonDeduction pd) {
		// TODO Auto-generated method stub
		publicMapper.addPersonDeduction(pd);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(pd.getXuenian(), pd.getStudentNo());
	}

	public void updatePersonDeduction(PersonDeduction pd) {
		// TODO Auto-generated method stub
		publicMapper.updatePersonDeduction(pd);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(pd.getXuenian(), pd.getStudentNo());
	}

	public void deletePersonDeduction(String xuenian, String studentNo, int id) {
		// TODO Auto-generated method stub
		publicMapper.deletePersonDeduction(id);

		// 实时更新综测汇总汇总
		publicMapper.updatePersonSummary(xuenian, studentNo);
	}

	public List<PersonDeduction> listPersonDeduction(String xuenian, String studentNo) {
		// TODO Auto-generated method stub

		return publicMapper.listPersonDeduction(xuenian, studentNo);
	}

	public PersonDeduction getPersonOneDeduction(String xuenian, String studentNo, int did) {
		// TODO Auto-generated method stub
		return publicMapper.getPersonOneDeduction(xuenian, studentNo, did);
	}

	public BasicInfo getStuInfo(String userName) {
		// TODO Auto-generated method stub
		return publicMapper.getStuInfo(userName);
	}

	public PersonSummary getIsUpload(String studentNo) {
		// TODO 自动生成的方法存根
		return publicMapper.getIsUpload(studentNo);
	}

	/*public void insertFeedback(String monitorNo, String studentNo, String P_moral, String D_moral) {
		// TODO 自动生成的方法存根
		publicMapper.insertFeedback(monitorNo, studentNo, P_moral, D_moral);
	}*/

	public void insertFeedback(Feedback fb) {
		// TODO 自动生成的方法存根
		publicMapper.insertFeedback(fb);
	}

	public void updateFeedbackStatus(String studentNo, int isRead) {
		// TODO 自动生成的方法存根
		publicMapper.updateFeedbackStatus(studentNo,isRead);
	}

	public void resetStatus(String xuenian, String studentNo) {
		// TODO 自动生成的方法存根
		publicMapper.resetStatus(xuenian,studentNo);
	}



}
