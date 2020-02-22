package csust.service;

import java.util.List;

import csust.bean.User;

public interface UserService {

	// 按用户类型查询
	public List<User> listUser(String userType);

	// 按账号，密码，用户类型查询
	public User getUser(String userName, String password);

	// 新增用户
	public void addUser(User user);

	// 修改用户密码
	public void updatePassword(String userName, String newpassword);// 修改用户登陆密码

	// 判断用户是否已经存在
	public boolean isExist(String userName);

	// 通过账号查询用户
	public User getUserByName(String userName);

	// 通过用户名删除一个用户
	public void deleteUser(String userName);

}
