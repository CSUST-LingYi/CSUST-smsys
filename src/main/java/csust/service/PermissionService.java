package csust.service;

import java.util.List;
import java.util.Set;

import csust.bean.BasicInfo;

//用于用户权限管理
public interface PermissionService {

	// 判断url是否需要拦截
	boolean needInterceptor(String requestURI);

	// 用来获取某个用户所拥有的权限地址集合
	// 通过用户名获取权限
	Set<String> listPermissions(String userName);

	// 通过用户名获取角色
	Set<String> listRoleNames(String userName);

	// 添加班长的权限
	public String addMonitor(BasicInfo b);

	// 删除班长权限
	public String deleteMonitor(String studentNo);

	// 查询班长信息
	List<BasicInfo> getMonitor(String nianji, String major);

	// 修改班长信息
	void updateMonitor(BasicInfo b);

}
