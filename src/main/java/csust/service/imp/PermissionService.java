package csust.service.imp;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import csust.bean.BasicInfo;
import csust.bean.User;
import csust.mapper.PermissionMapper;
import csust.mapper.UserMapper;

@Service
public class PermissionService implements csust.service.PermissionService {

	@Autowired
	PermissionMapper permissionMapper;

	@Autowired
	UserMapper userMapper;

	public boolean needInterceptor(String requestURI) {
		// TODO Auto-generated method stub
		return permissionMapper.needInterceptor(requestURI);
	}

	public Set<String> listPermissions(String userName) {
		// TODO Auto-generated method stub
		return permissionMapper.listPermissions(userName);
	}

	public Set<String> listRoleNames(String userName) {
		// TODO Auto-generated method stub
		return permissionMapper.listRoleNames(userName);
	}

	@Transactional
	public String addMonitor(BasicInfo b) {
		// TODO Auto-generated method stub
		User m = userMapper.getUserByName(b.getStudentNo());
		if (m != null) {
			if (m.getUserType().equals("monitor")) {
				return "该账号已经是班级管理员权限";
			} else {
				// 改变用户类型为monitor
				userMapper.changeUserType(b.getStudentNo(), "monitor");
				// 在monitor信息表里面增加
				permissionMapper.addMonitor(b);
				return "增加成功";
			}

		} else {
			return "该用户不存在";
		}

	}

	@Transactional
	public String deleteMonitor(String studentNo) {
		// TODO Auto-generated method stub
		userMapper.changeUserType(studentNo, "student");
		permissionMapper.deleteMonitor(studentNo);

		return "success";
	}

	public List<BasicInfo> getMonitor(String nianji, String major) {
		// TODO Auto-generated method stub
		return permissionMapper.getMonitor(nianji, major);
	}

	public void updateMonitor(BasicInfo b) {
		// TODO Auto-generated method stub
		permissionMapper.updateMonitor(b);
	}

}
