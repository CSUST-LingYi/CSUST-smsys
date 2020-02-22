package csust.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import csust.bean.User;

public interface UserMapper {

	/******** 对user表操作（不含学生用户表） **********/

	// 按用户类型查询
	public List<User> listUser(@Param("userType") String userType);

	// 按账号，密码，用户类型查询
	public User getUser(@Param("userName") String userName, @Param("password") String password);

	// 新增用户
	public void addUser(User user);

	// 修改用户密码
	public void updatePassword(@Param("userName") String userName, @Param("password") String newpassword);// 修改用户登陆密码

	// 通过账号查询用户
	public User getUserByName(@Param("userName") String userName);

	// 通过用户名删除一个用户
	public void deleteUser(@Param("userName") String userName);

	// 更改用户类型
	public void changeUserType(@Param("userName") String userName, @Param("userType") String userType);

}
