package csust.bean;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Enzo Cotter on 2020/2/23.
 */
@Table(name = "zc_control")
public class Xuenian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String xuenian;
    private Boolean zcSwitch;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getXuenian() {
        return xuenian;
    }

    public void setXuenian(String xuenian) {
        this.xuenian = xuenian;
    }

    public Boolean getZcSwitch() {
        return zcSwitch;
    }

    public void setZcSwitch(Boolean zcSwitch) {
        this.zcSwitch = zcSwitch;
    }

    @Override
    public String toString() {
        return "Xuenian{" +
                "id=" + id +
                ", xuenian='" + xuenian + '\'' +
                ", zcSwitch=" + zcSwitch +
                '}';
    }
}
