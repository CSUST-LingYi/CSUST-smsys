package csust.Listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import utils.SessionContainer;

public class SessionListener implements HttpSessionListener {

	public static SessionContainer sessionContainer = SessionContainer.getInstance();

	public void sessionCreated(HttpSessionEvent httpSessionEvent) {

	}

	public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
		sessionContainer.DelSession(httpSessionEvent.getSession());
	}

}
