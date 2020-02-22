package csust.mapper;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import csust.bean.BasicInfo;

public interface PermissionMapper {

	// 通过用户名获取权限
	Set<String> listPermissions(@Param("userName") String userName);

	// 通过用户名获取角色
	Set<String> listRoleNames(@Param("userName") String userName);

	boolean needInterceptor(@Param("url") String requestURI);

	// 增加monitor信息
	void addMonitor(BasicInfo b);

	// 删除monitor信息
	void deleteMonitor(@Param("studentNo") String studentNo);

	// 查询班长信息
	List<BasicInfo> getMonitor(@Param("termYear") String nianji, @Param("major") String major);

	// 修改班长信息
	void updateMonitor(BasicInfo b);
}
