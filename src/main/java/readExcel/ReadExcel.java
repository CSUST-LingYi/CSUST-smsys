package readExcel;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import csust.bean.Student;

public class ReadExcel {
	// 总行数
	private int totalRows = 0;
	// 总条数
	private int totalCells = 0;
	// 错误信息接收器
	private String errorMsg;

	// 构造方法
	public ReadExcel() {
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
	public List<Student> getExcelInfo(MultipartFile mFile) {
		String fileName = mFile.getOriginalFilename();// 获取文件名
		List<Student> userList = null;
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
	public List<Student> createExcel(InputStream is, boolean isExcel2003) throws IOException {
		List<Student> userList = null;

		byte[] buf = org.apache.commons.io.IOUtils.toByteArray(is);
		ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(buf);

		try {
			Workbook wb = null;
			if (isExcel2003) {// 当excel是2003时,创建excel2003

				wb = new HSSFWorkbook(byteArrayInputStream);
			} else {// 当excel是2007时,创建excel2007
				wb = new XSSFWorkbook(byteArrayInputStream);
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
	private List<Student> readExcelValue(Workbook wb) {
		// 得到第一个shell
		Sheet sheet = wb.getSheetAt(0);
		// 得到Excel的行数
		this.totalRows = sheet.getPhysicalNumberOfRows();
		// 得到Excel的列数(前提是有行数)
		if (totalRows > 1 && sheet.getRow(0) != null) {
			this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();
		}
		List<Student> userList = new ArrayList<Student>();
		// 循环Excel行数
		for (int r = 1; r < totalRows; r++) {
			Row row = sheet.getRow(r);
			if (row == null) {
				continue;
			}
			Student user = new Student();
			// 循环Excel的列
			for (int c = 0; c < this.totalCells; c++) {
				Cell cell = row.getCell(c);
				if (null != cell) {
					if (c == 0) {
						// 如果是纯数字,比如你写的是25,cell.getNumericCellValue()获得是25.0,通过截取字符串去掉.0获得25
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							String sdutentNo = cell.getStringCellValue();
							if(sdutentNo==null ||sdutentNo.equals(""))break;
							if (sdutentNo.length() < 11 || sdutentNo.length() > 12) {
								break;
							}
							if (sdutentNo.isEmpty()) {
								break;
							}
							String termYear = null;
							if (sdutentNo.length() == 12) {
								termYear = (String) sdutentNo.substring(0, 4);
							} else {
								termYear = (String) sdutentNo.substring(0, 2);
							}
							user.setStudentNo(sdutentNo);// 名称
							user.setTermYear(termYear);
						} else {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							String sdutentNo = cell.getStringCellValue();
							if(sdutentNo==null ||sdutentNo.equals(""))break;
							if (sdutentNo.length() < 11 || sdutentNo.length() > 12) {
								break;
							}
							if (sdutentNo.isEmpty()) {
								break;
							}
							user.setStudentNo(cell.getStringCellValue());// 学号

							String termYear = null;
							if (sdutentNo.length() == 12) {
								termYear = (String) sdutentNo.substring(0, 4).toString();
								;
							} else {
								termYear = (String) sdutentNo.substring(0, 2).toString();
								;
							}
							user.setTermYear(termYear);
						}
					} else if (c == 1) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String name = String.valueOf(cell.getNumericCellValue());
							user.setStudentName(name.substring(0, name.length() - 2 > 0 ? name.length() - 2 : 1));// 姓名

						} else {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							user.setStudentName(cell.getStringCellValue());// 姓名
						}
					} else if (c == 2) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String major = String.valueOf(cell.getNumericCellValue());
							user.setMajor(major.substring(0, major.length() - 2 > 0 ? major.length() - 2 : 1));// 专业
						} else {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							user.setMajor(cell.getStringCellValue());// 专业
						}
					} else if (c == 3) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {

							if (String.valueOf(cell.getNumericCellValue()).length() != 0) {
								String classN = String.valueOf(cell.getNumericCellValue());
								int className = Integer.parseInt(
										classN.substring(0, classN.length() - 2 > 0 ? classN.length() - 2 : 1));
								user.setClass(className);// 专业
							}

						} else {
							if (cell.getStringCellValue().length() != 0) {
								user.setClass(Integer.parseInt(cell.getStringCellValue()));
							}

						}
					} else if (c == 4) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String sex = String.valueOf(cell.getNumericCellValue());
							user.setSex(sex.substring(0, sex.length() - 2 > 0 ? sex.length() - 2 : 1));// 专业
						} else {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							user.setSex(cell.getStringCellValue());//
						}
					} else if (c == 5) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String MZ = String.valueOf(cell.getNumericCellValue());
							user.setMZ(MZ.substring(0, MZ.length() - 2 > 0 ? MZ.length() - 2 : 1));// 专业
						} else {
							user.setMZ(cell.getStringCellValue());// 名族
						}
					} else if (c == 6) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String address = String.valueOf(cell.getNumericCellValue());
							user.setAddress(address.substring(0, address.length() - 2 > 0 ? address.length() - 2 : 1));// 专业
						} else {
							user.setAddress(cell.getStringCellValue());// 专业
						}
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
