package readExcel;

import java.io.IOException;
import java.io.InputStream;
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

import csust.bean.StudentGrade;

public class ReadStudentGradeExcel {
	// 总行数
	private int totalRows = 0;
	// 总条数
	private int totalCells = 0;
	// 错误信息接收器
	private String errorMsg;

	// 构造方法
	public ReadStudentGradeExcel() {
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
	public List<StudentGrade> getExcelInfo(MultipartFile mFile) {
		String fileName = mFile.getOriginalFilename();// 获取文件名
		List<StudentGrade> userList = null;
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
	public List<StudentGrade> createExcel(InputStream is, boolean isExcel2003) {
		List<StudentGrade> userList = null;
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
	private List<StudentGrade> readExcelValue(Workbook wb) {
		// 得到第一个shell
		Sheet sheet = wb.getSheetAt(0);
		// 得到Excel的行数
		this.totalRows = sheet.getPhysicalNumberOfRows();
		// 得到Excel的列数(前提是有行数)
		if (totalRows > 1 && sheet.getRow(0) != null) {
			this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();
		}
		List<StudentGrade> userList = new ArrayList<StudentGrade>();
		// 循环Excel行数

		for (int r = 1; r < totalRows; r++) {
			Row row = sheet.getRow(r);
			if (row == null) {
				continue;
			}
			StudentGrade user = new StudentGrade();
			// 循环Excel的列
			for (int c = 0; c < this.totalCells; c++) {
				Cell cell = row.getCell(c);
				if (null != cell) {
					if (c == 0) {
						// 如果是纯数字,比如你写的是25,cell.getNumericCellValue()获得是25.0,通过截取字符串去掉.0获得25
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String ranking = String.valueOf(cell.getNumericCellValue());
							int ran = Integer.parseInt(
									ranking.substring(0, ranking.length() - 2 > 0 ? ranking.length() - 2 : 1));
							user.setRanking(ran);// 排名
						} else {
							String ranking = String.valueOf(cell.getStringCellValue());
							if (ranking.length() == 0) {
								break;
							}
							int ran = Integer.parseInt(ranking);
							user.setRanking(ran);// 排名

						}
					} else if (c == 1) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String studentNo = String.valueOf(cell.getNumericCellValue());
							if (studentNo.length() == 0) {
								break;
							}
							user.setStudentNo(studentNo);// 学号
						} else {
							if (cell.getStringCellValue().length() == 0) {
								break;
							}
							user.setStudentNo(cell.getStringCellValue());// 学号

						}
					} else if (c == 2) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String studentName = String.valueOf(cell.getNumericCellValue());
							user.setStudentName(studentName);// 姓名
						} else {
							user.setStudentName(cell.getStringCellValue());// 姓名
						}
					} else if (c == 3) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String sex = String.valueOf(cell.getNumericCellValue());
							user.setSex(sex);
						} else {
							user.setSex(cell.getStringCellValue());// 性别
						}
					} else if (c == 4) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String className = String.valueOf(cell.getNumericCellValue());
							user.setClass(className);
						} else {
							user.setClass(cell.getStringCellValue());// 班级
						}
					} else if (c == 5) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String courseCount = String.valueOf(cell.getNumericCellValue());
							int Num = Integer.parseInt(courseCount.substring(0,
									courseCount.length() - 2 > 0 ? courseCount.length() - 2 : 1));
							user.setCourseCount(Num);
						} else {
							String courseCount = String.valueOf(cell.getStringCellValue());
							int Num = Integer.parseInt(courseCount);
							user.setCourseCount(Num);
							// 课程数
						}
					} else if (c == 6) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String fail = String.valueOf(cell.getNumericCellValue());
							int Num = Integer
									.parseInt(fail.substring(0, fail.length() - 2 > 0 ? fail.length() - 2 : 1));
							user.setFail(Num);
						} else {
							String fail = String.valueOf(cell.getStringCellValue());
							int Num = Integer.parseInt(fail);
							user.setFail(Num);// 挂科数
						}
					} else if (c == 7) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String fail = String.valueOf(cell.getNumericCellValue());
							float Num = Float.parseFloat(fail);
							user.setCredit(Num);
						} else {
							String fail = String.valueOf(cell.getStringCellValue());
							float Num = Float.parseFloat(fail);
							user.setCredit(Num);// 修读学分
						}
					} else if (c == 8) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String getCredit = String.valueOf(cell.getNumericCellValue());
							float Num = Float.parseFloat(getCredit);
							user.setGetCredit(Num);
						} else {
							String getCredit = String.valueOf(cell.getStringCellValue());
							float Num = Float.parseFloat(getCredit);
							user.setGetCredit(Num);// 获得学分
						}
					} else if (c == 9) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String GPA = String.valueOf(cell.getNumericCellValue());
							float Num = Float.parseFloat(GPA);
							user.setGPA(Num);
						} else {
							String GPA = String.valueOf(cell.getStringCellValue());
							float Num = Float.parseFloat(GPA);
							user.setGPA(Num);// 绩点
						}
					} else if (c == 10) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String creditGPA = String.valueOf(cell.getNumericCellValue());
							float Num = Float.parseFloat(creditGPA);
							user.setCreditGPA(Num);
						} else {
							String creditGPA = String.valueOf(cell.getStringCellValue());
							float Num = Float.parseFloat(creditGPA);
							user.setCreditGPA(Num);// 学分绩点
						}
					} else if (c == 11) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String avgCreditGPA = String.valueOf(cell.getNumericCellValue());
							float Num = Float.parseFloat(avgCreditGPA);
							user.setAvgCreditGPA(Num);
						} else {
							String avgCreditGPA = String.valueOf(cell.getStringCellValue());
							float Num = Float.parseFloat(avgCreditGPA);
							user.setAvgCreditGPA(Num);// 平均学分绩点
						}
					} else if (c == 12) {
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							String avgGrade = String.valueOf(cell.getNumericCellValue());
							float Num = Float.parseFloat(avgGrade);
							user.setAvgGrade(Num);
						} else {
							String avgGrade = String.valueOf(cell.getStringCellValue());
							float Num = Float.parseFloat(avgGrade);
							user.setAvgGrade(Num);// 平均成绩
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
