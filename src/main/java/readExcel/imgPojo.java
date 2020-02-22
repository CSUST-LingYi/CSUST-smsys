package readExcel;

import org.springframework.web.multipart.MultipartFile;

public class imgPojo {

	MultipartFile image;

	public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
		this.image = image;
	}
}
