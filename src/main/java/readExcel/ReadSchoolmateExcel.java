package readExcel;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import csust.bean.Schoolmate;

public class ReadSchoolmateExcel {
	// 总行数
	private int totalRows = 0;
	// 总条数
	private int totalCells = 0;
	// 错误信息接收器
	private String errorMsg;

	// 构造方法
	public ReadSchoolmateExcel() {
	}

	// 获取总行数
	public int getTotalRows() {
		return totalRows;
	}

	// 获取总列数
	public int getTotalCells() {
		return totalCells;
	}

	// 获取错误信息
	public String getErrorInfo() {
		return errorMsg;
	}

	/**
	 * 读EXCEL文件，获取信息集合
	 * 
	 * @param fielName
	 * @return
	 */
	public List<Schoolmate> getExcelInfo(MultipartFile mFile) {
		String fileName = mFile.getOriginalFilename();// 获取文件名
		List<Schoolmate> userList = null;
		try {
			if (!validateExcel(fileName)) {// 验证文件名是否合格
				return null;
			}
			boolean isExcel2003 = true;// 根据文件名判断文件是2003版本还是2007版本
			if (isExcel2007(fileName)) {
				isExcel2003 = false;
			}
			userList = createExcel(mFile.getInputStream(), isExcel2003);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userList;
	}

	/**
	 * 根据excel里面的内容读取客户信息
	 * 
	 * @param is
	 *            输入流
	 * @param isExcel2003
	 *            excel是2003还是2007版本
	 * @return
	 * @throws IOException
	 */
	public List<Schoolmate> createExcel(InputStream is, boolean isExcel2003) {
		List<Schoolmate> userList = null;
		try {
			Workbook wb = null;
			if (isExcel2003) {// 当excel是2003时,创建excel2003
				wb = new HSSFWorkbook(is);
			} else {// 当excel是2007时,创建excel2007
				wb = new XSSFWorkbook(is);
			}
			userList = readExcelValue(wb);// 读取Excel里面客户的信息
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userList;
	}

	/**
	 * 读取Excel里面客户的信息
	 * 
	 * @param wb
	 * @return
	 */
	private List<Schoolmate> readExcelValue(Workbook wb) {
		// 得到第一个shell
		Sheet sheet = wb.getSheetAt(0);
		// 得到Excel的行数
		this.totalRows = sheet.getPhysicalNumberOfRows();
		// 得到Excel的列数(前提是有行数)
		if (totalRows > 1 && sheet.getRow(0) != null) {
			this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();
		}
		List<Schoolmate> userList = new ArrayList<Schoolmate>();
		// 循环Excel行数

		for (int r = 1; r < totalRows; r++) {
			Row row = sheet.getRow(r);
			if (row == null) {
				continue;
			}
			Schoolmate user = new Schoolmate();
			// 循环Excel的列
			for (int c = 0; c < this.totalCells; c++) {
				Cell cell = row.getCell(c);
				if (null != cell) {
					if (c == 0) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String name = String.valueOf(cell.getStringCellValue());
						if (name.length() == 0) {
							break;
						}
						user.setName(name);// 姓名

					} else if (c == 1) {

						cell.setCellType(Cell.CELL_TYPE_STRING);
						user.setTermYear(cell.getStringCellValue());// 年级

					} else if (c == 2) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						user.setMajor(cell.getStringCellValue());// 专业

					} else if (c == 3) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						user.setGraduationYear(cell.getStringCellValue());// 毕业年级

					} else if (c == 4) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String workUnit = String.valueOf(cell.getStringCellValue());

						user.setWorkUnit(workUnit);// 工作单位

					} else if (c == 5) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String position = String.valueOf(cell.getStringCellValue());

						user.setPosition(position);// 职位

					} else if (c == 6) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String phone = String.valueOf(cell.getStringCellValue());

						user.setPhone(phone);// 电话

					} else if (c == 7) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String email = String.valueOf(cell.getStringCellValue());

						user.setEmail(email);// 邮件

					} else if (c == 8) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String QQ = String.valueOf(cell.getStringCellValue());

						user.setQQ(QQ);// QQ

					} else if (c == 9) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String wechatId = String.valueOf(cell.getStringCellValue());

						user.setWechatId(wechatId);// 微信

					} else if (c == 10) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String area = String.valueOf(cell.getStringCellValue());

						user.setArea(area);// 所在地区

					} else if (c == 11) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String alumniAssociation = String.valueOf(cell.getStringCellValue());

						user.setAlumniAssociation(alumniAssociation);// 所属校友会

					} else if (c == 12) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						String alu_position = String.valueOf(cell.getStringCellValue());

						user.setAlu_position(alu_position);// 校友会职务

					} else if (c == 13) {

						cell.setCellType(Cell.CELL_TYPE_STRING);
						String bz = String.valueOf(cell.getStringCellValue());

						user.setBz(bz);// 备注

					}
				}
			}
			// 添加到list
			userList.add(user);
		}
		return userList;
	}

	/**
	 * 验证EXCEL文件
	 * 
	 * @param filePath
	 * @return
	 */
	public boolean validateExcel(String filePath) {
		if (filePath == null || !(isExcel2003(filePath) || isExcel2007(filePath))) {
			errorMsg = "文件名不是excel格式";
			return false;
		}
		return true;
	}

	// @描述：是否是2003的excel，返回true是2003
	public static boolean isExcel2003(String filePath) {
		return filePath.matches("^.+\\.(?i)(xls)$");
	}

	// @描述：是否是2007的excel，返回true是2007
	public static boolean isExcel2007(String filePath) {
		return filePath.matches("^.+\\.(?i)(xlsx)$");
	}
}
