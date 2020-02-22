package csust.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import csust.service.UserService;

public class Teacherfilter implements Filter {

	@Autowired
	UserService userService;

	public void destroy() {

	}
	
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;

		String uri = request.getRequestURI();
		if (uri.endsWith("index") || uri.endsWith("listTeacherInfo") || uri.endsWith("to_login")) {
			chain.doFilter(request, response);
			return;
		} else {

			String userName = (String) request.getSession().getAttribute("name");
			//System.out.println(userName);
			if (null == userName) {
				response.sendRedirect("index.html");
				return;
			}
			if (uri.endsWith("a")) {

			}
		}

		chain.doFilter(request, response);
	}

	public void init(FilterConfig arg0) throws ServletException {

	}

}
