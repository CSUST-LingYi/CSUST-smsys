package csust.test;


import org.junit.runner.RunWith;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml", "classpath:springMVC.xml" })
public class MVCtest {

	WebApplicationContext context;

	MockMvc mockMvc;

	public void testss() {

		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}

	public void test() {

	}

}
