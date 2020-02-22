package utils;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

public class SessionContainer {
	private volatile static SessionContainer instance = null;
	private int num = 0;

	private HashMap<String, HttpSession> sessionMap;

	public static SessionContainer getInstance() {
		if (instance == null) {
			synchronized (SessionContainer.class) {
				if (instance == null) {
					instance = new SessionContainer();
				}
			}
		}
		return instance;
	}

	private SessionContainer() {
		sessionMap = new HashMap<String, HttpSession>();
	}

	public synchronized void AddSession(HttpSession session) {
		if (session != null) {
			sessionMap.put(session.getId(), session);
		}
	}

	public synchronized void DelSession(HttpSession session) {
		if (session != null) {
			sessionMap.remove(session.getId());
			if (session.getAttribute("name") != null) {
				sessionMap.remove(session.getAttribute("name").toString());
				// session.invalidate();
			}
		}
	}

	public synchronized HttpSession getSession(String session_id) {
		if (session_id == null)
			return null;
		return (HttpSession) sessionMap.get(session_id);
	}

	public HashMap<String, HttpSession> getSessionMap() {
		return sessionMap;
	}

	public void setMymap(HashMap<String, HttpSession> sessionMap) {
		this.sessionMap = sessionMap;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

}
