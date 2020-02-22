package csust.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csust.bean.User;
import csust.mapper.UserMapper;
import csust.service.UserService;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	UserMapper userMapper;

	public boolean isExist(String studentNo) {
		User s = userMapper.getUserByName(studentNo);

		if (s != null) {
			return true;// 存在
		}
		return false; // 不存在
	}

	public List<User> listUser(String userType) {
		// TODO Auto-generated method stub
		return userMapper.listUser(userType);
	}

	public User getUser(String userName, String password) {
		// TODO Auto-generated method stub

		return userMapper.getUser(userName, password);

	}

	public void addUser(User user) {
		// TODO Auto-generated method stub
		userMapper.addUser(user);
	}

	public void updatePassword(String userName, String newpassword) {
		// TODO Auto-generated method stub
		userMapper.updatePassword(userName, newpassword);
	}

	public User getUserByName(String userName) {
		// TODO Auto-generated method stub
		return userMapper.getUserByName(userName);
	}

	public void deleteUser(String userName) {
		// TODO Auto-generated method stub
		userMapper.deleteUser(userName);
	}

}
