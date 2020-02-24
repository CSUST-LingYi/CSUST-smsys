import csust.bean.Lecture;
import csust.bean.Xuenian;
import csust.service.LectureService;
import csust.service.StudyDeptService;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;


/**
 * Created by Enzo Cotter on 2020/2/23.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class Ts1 {
//    private static Logger logger = Logger.getLogger(Ts1.class);
    @Autowired
    StudyDeptService studyDeptService;

    @Autowired
    LectureService lectureService;
    @Test
    public void testXuenian(){
        List<Xuenian> xuenians = this.studyDeptService.ListXuenian();
        System.out.println(xuenians);
    }

    @Test
    public void testInsertXuenian(){
        this.studyDeptService.insertXuenian("2021","2022");
    }

    @Test
    public void testgetLectureByPriority(){
        List<Lecture> lectureByPriority = this.lectureService.getLectureByPriority();
        System.out.println(lectureByPriority);
    }
}
