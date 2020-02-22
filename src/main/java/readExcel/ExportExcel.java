package readExcel;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import csust.bean.ALLfield;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFComment;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.formula.functions.T;

import csust.bean.PersonSummary;
import csust.bean.Registration;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

@SuppressWarnings({ "hiding", "deprecation" })
public class ExportExcel<T> {
	public static void generateExcel(String sheetName, List<String> header, List<List<String>> body, OutputStream out) {
		// 新建excel报表
		Workbook excel = new HSSFWorkbook();
		// 添加一个sheet
		Sheet hssfSheet = excel.createSheet(sheetName);
		// 往excel表格创建一行，excel的行号是从0开始的
		// 设置表头
		Row firstRow = hssfSheet.createRow(0);
		for (int columnNum = 0; columnNum < header.size(); columnNum++) {
			// 创建单元格
			Cell hssfCell = firstRow.createCell(columnNum);
			// 设置单元格的值
			hssfCell.setCellValue(header.size() < columnNum ? "-" : header.get(columnNum));
		}
		// 手动设置列宽。第一个参数表示要为第几列设；，第二个参数表示列的宽度，n为列高的像素数。
		for (int i = 0; i < body.size() + 7; i++) {
			hssfSheet.setColumnWidth((short) i, (short) (28 * 200));
		}

		// 设置主体数据
		for (int rowNum = 0; rowNum < body.size(); rowNum++) {
			// 往excel表格创建一行，excel的行号是从0开始的
			Row hssfRow = hssfSheet.createRow(rowNum + 1);
			List<String> data = body.get(rowNum);
			for (int columnNum = 0; columnNum < data.size(); columnNum++) {
				// 创建单元格
				Cell hssfCell = hssfRow.createCell(columnNum);
				// 设置单元格的值
				hssfCell.setCellValue(data.size() < columnNum ? "-" : data.get(columnNum));
			}
		}
		try {
			excel.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// Excel名字，表头，数据
	@SuppressWarnings({ "unchecked" })
	public void exportExcel(String sheetname, String[] headers, Collection<T> dataset, OutputStream out) {

		// 声明一个工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 声明一个表格
		HSSFSheet sheet = workbook.createSheet(sheetname);

		sheet.setDefaultColumnWidth((short) 20);

		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setColor(HSSFColor.VIOLET.index);
		font.setFontHeightInPoints((short) 12);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);

		// 生成并设置另一个样式
		HSSFCellStyle style2 = workbook.createCellStyle();
		style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
		style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 生成另一个字体
		HSSFFont font2 = workbook.createFont();
		font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style2.setFont(font2);

		// 声明一个画图的顶级管理器
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		// 定义注释的大小和位置,详见文档
		HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
		// 设置注释内容
		comment.setString(new HSSFRichTextString("可以在POI中添加注释！"));

		// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.
		comment.setAuthor("xxxxx");

		HSSFRow row = sheet.createRow(0);

		for (short i = 0; i < headers.length; i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(style);
			HSSFRichTextString text = new HSSFRichTextString(headers[i]);
			cell.setCellValue(text);
		}

		// 遍历集合数据，产生数据行
		Iterator<T> it = dataset.iterator();
		int index = 0;
		while (it.hasNext()) {
			index++;
			row = sheet.createRow(index);
			T t = (T) it.next();

			// 利用反射，根据javabean属性的先后顺序，动态调用getXxx()得到属性值
			Field[] fields = t.getClass().getDeclaredFields();
			for (short i = 0; i < fields.length; i++) {
				HSSFCell cell = row.createCell(i);
				cell.setCellStyle(style2);
				Field field = fields[i];
				String fieldName = field.getName();
				String getMethodName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);

				try {
					@SuppressWarnings("rawtypes")
					Class tCls = t.getClass();
					Method getMethod = tCls.getMethod(getMethodName, new Class[] {});
					Object value = getMethod.invoke(t, new Object[] {});

					String textValue = null;

					if (null == value) {
						textValue = "";
					} else {
						textValue = value.toString();
					}

					if (textValue != null) {
						HSSFRichTextString richString = new HSSFRichTextString(textValue);
						HSSFFont font3 = workbook.createFont();
						font3.setColor(HSSFColor.BLUE.index);
						richString.applyFont(font3);
						cell.setCellValue(richString);

					}
				} catch (SecurityException e) {
					e.printStackTrace();
				} catch (NoSuchMethodException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				} finally {
					// 清理资源

				}

			}

		}
		try {
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	/***
	 * @category 下载excel文件公共方法
	 * 
	 * @param path
	 *            文件所在路径
	 * @param response
	 */

	public void download(String path, HttpServletResponse response) {
		try {
			// path是指欲下载的文件的路径。
			File file = new File(path);
			System.out.println(file);
			// 取得文件名。
			String name = file.getName();
			String filename = URLEncoder.encode(name, "UTF-8");
			// 以流的形式下载文件。
			InputStream fis = new BufferedInputStream(new FileInputStream(path));
			byte[] buffer = new byte[fis.available()];
			fis.read(buffer);
			fis.close();
			// 清空response
			response.reset();
			// 设置response的Header
			response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()));
			response.addHeader("Content-Length", "" + file.length());
			OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
			response.setContentType("application/vnd.ms-excel;charset=UTF-8");
			toClient.write(buffer);
			toClient.flush();
			toClient.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	public void exportQuestionnaireExcel(String sheetname, List<List<String>> list, OutputStream out) {

		// 声明一个工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 声明一个表格
		HSSFSheet sheet = workbook.createSheet(sheetname);

		sheet.setDefaultColumnWidth((short) 20);

		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setColor(HSSFColor.VIOLET.index);
		font.setFontHeightInPoints((short) 12);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);

		// 生成并设置另一个样式
		HSSFCellStyle style2 = workbook.createCellStyle();
		style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
		style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 生成另一个字体
		HSSFFont font2 = workbook.createFont();
		font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style2.setFont(font2);

		// 声明一个画图的顶级管理器
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		// 定义注释的大小和位置,详见文档
		HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
		// 设置注释内容
		comment.setString(new HSSFRichTextString("可以在POI中添加注释！"));

		// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.
		comment.setAuthor("xxxxx");

		HSSFRow row = sheet.createRow(0);

		for (short i = 0; i < list.get(0).size(); i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(style);
			HSSFRichTextString text = new HSSFRichTextString(list.get(0).get(i));
			cell.setCellValue(text);
		}

		// 遍历集合数据，产生数据行
		String textValue = null;

		for (int i = 1; i < list.size(); i++) {
			row = sheet.createRow(i);
			for (int j = 0; j < list.get(i).size(); j++) {

				textValue = list.get(i).get(j);

				HSSFCell cell = row.createCell(j);
				HSSFRichTextString richString = new HSSFRichTextString(textValue);
				HSSFFont font3 = workbook.createFont();
				font3.setColor(HSSFColor.BLUE.index);
				richString.applyFont(font3);
				cell.setCellValue(richString);
			}
		}

		try {
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public void exportRegistrationExcel(String sheetname, String[] headers, List<Registration> list,
			FileOutputStream out) {
		// TODO Auto-generated method stub
		// 声明一个工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 声明一个表格
		HSSFSheet sheet = workbook.createSheet(sheetname);

		sheet.setDefaultColumnWidth((short) 20);

		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setColor(HSSFColor.VIOLET.index);
		font.setFontHeightInPoints((short) 12);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);

		// 生成并设置另一个样式
		HSSFCellStyle style2 = workbook.createCellStyle();
		style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
		style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 生成另一个字体
		HSSFFont font2 = workbook.createFont();
		font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style2.setFont(font2);

		// 声明一个画图的顶级管理器
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		// 定义注释的大小和位置,详见文档
		HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
		// 设置注释内容
		comment.setString(new HSSFRichTextString("可以在POI中添加注释！"));

		// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.
		comment.setAuthor("xxxxx");

		HSSFRow row = sheet.createRow(0);

		for (short i = 0; i < headers.length; i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(style);
			HSSFRichTextString text = new HSSFRichTextString(headers[i]);
			cell.setCellValue(text);
		}

		// 遍历集合数据，产生数据行
		String textValue = null;

		for (int i = 0; i < list.size(); i++) {
			// 年级
			row = sheet.createRow(i + 1);
			textValue = list.get(i).getTermYear();
			HSSFCell cell = row.createCell(0);
			HSSFRichTextString richString = new HSSFRichTextString(textValue);
			HSSFFont font3 = workbook.createFont();
			font3.setColor(HSSFColor.BLUE.index);
			richString.applyFont(font3);
			cell.setCellValue(richString);
			// 专业
			textValue = list.get(i).getMajor();
			HSSFCell cell1 = row.createCell(1);
			HSSFRichTextString richString1 = new HSSFRichTextString(textValue);
			HSSFFont font31 = workbook.createFont();
			font31.setColor(HSSFColor.BLUE.index);
			richString1.applyFont(font31);
			cell1.setCellValue(richString1);
			// 班级
			textValue = String.valueOf(list.get(i).getClassName());
			HSSFCell cell2 = row.createCell(2);
			HSSFRichTextString richString2 = new HSSFRichTextString(textValue);
			HSSFFont font32 = workbook.createFont();
			font32.setColor(HSSFColor.BLUE.index);
			richString2.applyFont(font32);
			cell2.setCellValue(richString2);
			// 姓名
			textValue = list.get(i).getStudentNo();
			HSSFCell cell3 = row.createCell(3);
			HSSFRichTextString richString3 = new HSSFRichTextString(textValue);
			HSSFFont font33 = workbook.createFont();
			font33.setColor(HSSFColor.BLUE.index);
			richString3.applyFont(font33);
			cell3.setCellValue(richString3);
			// 学号
			textValue = list.get(i).getStudentName();
			HSSFCell cell34 = row.createCell(4);
			HSSFRichTextString richString34 = new HSSFRichTextString(textValue);
			HSSFFont font34 = workbook.createFont();
			font34.setColor(HSSFColor.BLUE.index);
			richString34.applyFont(font34);
			cell34.setCellValue(richString34);
			//
			textValue = list.get(i).getPhone();
			HSSFCell cell35 = row.createCell(5);
			HSSFRichTextString richString35 = new HSSFRichTextString(textValue);
			HSSFFont font35 = workbook.createFont();
			font34.setColor(HSSFColor.BLUE.index);
			richString35.applyFont(font35);
			cell35.setCellValue(richString35);
			// 学号
			textValue = list.get(i).getStatus();
			HSSFCell cell36 = row.createCell(6);
			HSSFRichTextString richString36 = new HSSFRichTextString(textValue);
			HSSFFont font36 = workbook.createFont();
			font34.setColor(HSSFColor.BLUE.index);
			richString35.applyFont(font36);
			cell36.setCellValue(richString36);

		}

		try {
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void exportNormalSearchExcel(String sheetname, String[] headers, List<ALLfield> list,
										FileOutputStream out) {
		// TODO Auto-generated method stub
		// 声明一个工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 声明一个表格
		HSSFSheet sheet = workbook.createSheet(sheetname);

		sheet.setDefaultColumnWidth((short) 20);

		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setColor(HSSFColor.VIOLET.index);
		font.setFontHeightInPoints((short) 12);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);

		// 生成并设置另一个样式
		HSSFCellStyle style2 = workbook.createCellStyle();
		style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
		style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 生成另一个字体
		HSSFFont font2 = workbook.createFont();
		font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style2.setFont(font2);

		// 声明一个画图的顶级管理器
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		// 定义注释的大小和位置,详见文档
		HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
		// 设置注释内容
		comment.setString(new HSSFRichTextString("可以在POI中添加注释！"));

		// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.
		comment.setAuthor("xxxxx");

		HSSFRow row = sheet.createRow(0);

		for (short i = 0; i < headers.length; i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(style);
			HSSFRichTextString text = new HSSFRichTextString(headers[i]);
			cell.setCellValue(text);
		}

		// 遍历集合数据，产生数据行
		String textValue = null;

		for (int i = 0; i < list.size(); i++) {
			// 学号
			row = sheet.createRow(i + 1);
			textValue = list.get(i).getStudentNo();
			HSSFCell cell = row.createCell(0);
			HSSFRichTextString richString = new HSSFRichTextString(textValue);
			HSSFFont font3 = workbook.createFont();
			font3.setColor(HSSFColor.BLUE.index);
			richString.applyFont(font3);
			cell.setCellValue(richString);
			// 姓名
			textValue = list.get(i).getStudentName();
			HSSFCell cell1 = row.createCell(1);
			HSSFRichTextString richString1 = new HSSFRichTextString(textValue);
			HSSFFont font31 = workbook.createFont();
			font31.setColor(HSSFColor.BLUE.index);
			richString1.applyFont(font31);
			cell1.setCellValue(richString1);
			// 性别
			textValue = list.get(i).getSex();
			HSSFCell cell2 = row.createCell(2);
			HSSFRichTextString richString2 = new HSSFRichTextString(textValue);
			HSSFFont font32 = workbook.createFont();
			font32.setColor(HSSFColor.BLUE.index);
			richString2.applyFont(font32);
			cell2.setCellValue(richString2);
			// 专业
			textValue = list.get(i).getMajor();
			HSSFCell cell3 = row.createCell(3);
			HSSFRichTextString richString3 = new HSSFRichTextString(textValue);
			HSSFFont font33 = workbook.createFont();
			font33.setColor(HSSFColor.BLUE.index);
			richString3.applyFont(font33);
			cell3.setCellValue(richString3);
			// 班级
			textValue = String.valueOf(list.get(i).getClassName());
			HSSFCell cell34 = row.createCell(4);
			HSSFRichTextString richString34 = new HSSFRichTextString(textValue);
			HSSFFont font34 = workbook.createFont();
			font34.setColor(HSSFColor.BLUE.index);
			richString34.applyFont(font34);
			cell34.setCellValue(richString34);
			//电话
			textValue = list.get(i).getPhone();
			HSSFCell cell35 = row.createCell(5);
			HSSFRichTextString richString35 = new HSSFRichTextString(textValue);
			HSSFFont font35 = workbook.createFont();
			font34.setColor(HSSFColor.BLUE.index);
			richString35.applyFont(font35);
			cell35.setCellValue(richString35);


		}

		try {
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void exportComparisonExcel(String sheetname, String[] top, String[] headers, List<PersonSummary> list,
			FileOutputStream out) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		// 声明一个工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();

		// 声明一个表格
		HSSFSheet sheet = workbook.createSheet(sheetname);

		sheet.setDefaultColumnWidth((short) 20);

		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		// style.setFillForegroundColor(HSSFColor..index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setColor(HSSFColor.BLACK.index);
		font.setFontHeightInPoints((short) 12);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);

		// 生成并设置另一个样式
		HSSFCellStyle style2 = workbook.createCellStyle();
		style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
		style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 生成另一个字体
		HSSFFont font2 = workbook.createFont();
		font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style2.setFont(font2);

		// 声明一个画图的顶级管理器
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		// 定义注释的大小和位置,详见文档
		HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
		// 设置注释内容
		comment.setString(new HSSFRichTextString("可以在POI中添加注释！"));

		// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.
		comment.setAuthor("xxxxx");
		HSSFRow r = sheet.createRow(0);
		String s = "";
		CellRangeAddress callRangeAddress = new CellRangeAddress(0, 0, 0, 9);
		for (short i = 0; i < top.length; i++) {
			s = s + top[i];
		}
		HSSFCell ce = r.createCell(0);
		ce.setCellStyle(style);
		HSSFRichTextString te = new HSSFRichTextString(s);
		ce.setCellValue(te);
		sheet.addMergedRegion(callRangeAddress);
		HSSFRow row = sheet.createRow(1);
		for (short i = 0; i < headers.length; i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(style);
			HSSFRichTextString text = new HSSFRichTextString(headers[i]);
			cell.setCellValue(text);
		}

		// 遍历集合数据，产生数据行
		String textValue = null;
		int mingci = 0;

		for (int i = 0; i < list.size(); i++) {
			// 序号
			row = sheet.createRow(i + 2);
			textValue = String.valueOf(i + 1);
			HSSFCell cell = row.createCell(0);
			HSSFRichTextString richString = new HSSFRichTextString(textValue);
			HSSFFont font3 = workbook.createFont();
			richString.applyFont(font3);
			cell.setCellValue(richString);
			// 学号
			textValue = list.get(i).getStudentNo();
			HSSFCell cell1 = row.createCell(1);
			HSSFRichTextString richString1 = new HSSFRichTextString(textValue);
			HSSFFont font31 = workbook.createFont();
			richString1.applyFont(font31);
			cell1.setCellValue(richString1);
			// 姓名
			textValue = list.get(i).getStudentName();
			HSSFCell cell3 = row.createCell(2);
			HSSFRichTextString richString3 = new HSSFRichTextString(textValue);
			HSSFFont font33 = workbook.createFont();
			richString3.applyFont(font33);
			cell3.setCellValue(richString3);
			// 智育分
			textValue = String.valueOf(list.get(i).getKnowledge());
			HSSFCell cell4 = row.createCell(3);
			HSSFRichTextString richString4 = new HSSFRichTextString(textValue);
			HSSFFont font34 = workbook.createFont();
			richString4.applyFont(font34);
			cell4.setCellValue(richString4);
			// 德育分
			textValue = String.valueOf(list.get(i).getMoral());
			HSSFCell cell5 = row.createCell(4);
			HSSFRichTextString richString5 = new HSSFRichTextString(textValue);
			HSSFFont font35 = workbook.createFont();
			richString5.applyFont(font35);
			cell5.setCellValue(richString5);
			// 体育分
			textValue = String.valueOf(list.get(i).getSports());
			HSSFCell cell6 = row.createCell(5);
			HSSFRichTextString richString6 = new HSSFRichTextString(textValue);
			HSSFFont font36 = workbook.createFont();
			richString6.applyFont(font36);
			cell6.setCellValue(richString6);
			// 扣分
			textValue = String.valueOf(list.get(i).getDeduction());
			HSSFCell cell7 = row.createCell(6);
			HSSFRichTextString richString7 = new HSSFRichTextString(textValue);
			HSSFFont font37 = workbook.createFont();
			richString7.applyFont(font37);
			cell7.setCellValue(richString7);
			// 挂科数
			textValue = String.valueOf(list.get(i).getFails());
			HSSFCell cell8 = row.createCell(7);
			HSSFRichTextString richString8 = new HSSFRichTextString(textValue);
			HSSFFont font38 = workbook.createFont();
			richString8.applyFont(font38);
			cell8.setCellValue(richString8);
			// 总分
			textValue = String.valueOf(list.get(i).getSum());
			HSSFCell cell9 = row.createCell(8);
			HSSFRichTextString richString9 = new HSSFRichTextString(textValue);
			HSSFFont font39 = workbook.createFont();
			richString9.applyFont(font39);
			cell9.setCellValue(richString9);
			// 排名
			if (i > 0 && Math.abs(list.get(i).getSum() - list.get(i - 1).getSum()) < 0.001) {
				textValue = String.valueOf(mingci);
			} else {
				mingci = i + 1;
				textValue = String.valueOf(mingci);

			}
			HSSFCell cell10 = row.createCell(9);
			HSSFRichTextString richString10 = new HSSFRichTextString(textValue);
			HSSFFont font310 = workbook.createFont();
			richString10.applyFont(font310);
			cell10.setCellValue(richString10);

		}

		try {
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
