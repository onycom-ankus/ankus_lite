package com.ankus.web.lite.innerDataFault;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.ConfigurationHelper;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.lite.expantion.util.DataMap;
import com.ankus.web.lite.expantion.util.ExcelUtil;
import com.ankus.web.lite.expantion.util.GetUserInfo;
import com.ankus.web.member.MemberService;



import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * Assign REST Controller.
 *
 * @author 
 * @since 1.0
 */
@Controller
@RequestMapping("/innerDataFault")
public class InnerDataFaultController extends LocaleSupport {

    @Autowired
    private InnerDataFaultService innerDataFaultService;
    @Autowired
    private MemberService memberService;
    
    static HSSFRow row;
	static HSSFCell cell;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(InnerDataFault innerDataFault) {
        Response response = new Response();
        try {
        	if (innerDataFault.isPaging()) {
        		innerDataFault.setStartRow((innerDataFault.getPage() - 1) * innerDataFault.getRows() + 1); 
        		innerDataFault.setEndRow(innerDataFault.getPage() * innerDataFault.getRows());
        		int records = innerDataFaultService.selectByConditionCnt(innerDataFault);
        		
        		response.getMap().put("page", innerDataFault.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)innerDataFault.getRows()));
        	}
        	
        	List<InnerDataFault> list = innerDataFaultService.selectByCondition(innerDataFault);
        	
            response.getList().addAll(list);
            response.setTotal(list.size());
            response.setSuccess(true);
            
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
    
    
    @RequestMapping(value = "insert")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response insert(@RequestBody InnerDataFault innerDataFault) throws Exception {
    	Response response = new Response();
    	try {
//    		if (0 < innerDataFaultService.exist(innerDataFault)) {
//    			response.setSuccess(false);
//    			response.getError().setMessage("[" + innerDataFault.getDate() + " / " + innerDataFault.getPrdt_cd() + "] 항목은 이미 등록되었습니다.");
//    			return response;
//    		}
    		
    		int cnt = innerDataFaultService.insert(innerDataFault);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + innerDataFault.getDate() + " / " + innerDataFault.getPrdt_cd() + "] 항목이 정상적으로 등록되지 않았습니다.");
    		}
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage(ex.getMessage());
    		if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
    		response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
    @RequestMapping(value = "update")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response update(@RequestBody InnerDataFault innerDataFault) throws Exception {
    	Response response = new Response();
    	
    	//System.out.printf("update=[%s]", innerDataFault.toString());
    	
    	try {
    		int cnt = innerDataFaultService.update(innerDataFault);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + innerDataFault.getDate() + " / " + innerDataFault.getPrdt_cd() + "] 항목이 정상적으로 수정되지 않았습니다.");
    		}
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage(ex.getMessage());
    		if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
    		response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
	@RequestMapping(value = "deleteItems", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Response delete(@RequestBody String[] items) throws Exception {
		Response response = new Response();
		try {
			int cnt = innerDataFaultService.deleteList(items);
			response.setSuccess(true);
			response.getMap().put("cnt", items.length);
			response.getMap().put("delCnt", cnt);
		} catch (Exception ex) {
			response.setSuccess(false);
			response.getError().setMessage(ex.getMessage());
			if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
			response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
	    }
	    return response;
	}
	
	@RequestMapping(value = "excelExport")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response excelExport(InnerDataFault innerDataFault) {		
        Response response = new Response();
        
        Map<String,Object> map = new HashMap<String,Object>();  
        ArrayList<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        
        try {
        	
        	List<InnerDataFault> plist = innerDataFaultService.selectByExcelCondition(innerDataFault);
        	
        	XSSFWorkbook workbook=new XSSFWorkbook();
        	XSSFSheet sheet=workbook.createSheet("시트명");
        	XSSFRow row=null;
            XSSFCell cell=null;
        	
        	if(list !=null &&list.size() >0){
        		int i=0;
        		for(Map<String,Object>mapobject : list){
        			row=sheet.createRow((short)i);
        	        i++;
        	        if(plist !=null &&plist.size() >0){
        	            for(int j=0;j<plist.size();j++){
        	                //생성된 row에 컬럼을 생성한다
        	                cell=row.createCell(j);
        	                //map에 담긴 데이터를 가져와 cell에 add한다
        	                cell.setCellValue(String.valueOf(mapobject.get(plist.get(j))));
        	            }
        	        }
        		}
        		System.out.println(cell.getRow());
        	}
                	
            response.setSuccess(true);
            
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
	
	@RequestMapping(value = "excelImport")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response excelImport(MultipartHttpServletRequest request) {
		Response response = new Response();
		 
		String msg = "OK";
		Map<String, MultipartFile> fileMap = request.getFileMap();
		MultipartFile mfile = null;
		
		if((mfile = fileMap.get("file")) != null) {
			
			byte[] fileData = null;			
			File file = null;
			
			try {
				fileData = mfile.getBytes();
				
				String tmpCache = ConfigurationHelper.getHelper().get("innerData.cache.path", "/tmp/innerDataCache");
				
				file = new File(tmpCache, "innerDataFault.csv");
				
				File dir = new File(tmpCache);
				if(!dir.isDirectory()) {
					dir.mkdirs();
				}
				
				FileCopyUtils.copy(fileData, file);
			
			} catch (IOException e) {
				response.setSuccess(false);
	            response.getError().setMessage(e.getMessage());
	            if (e.getCause() != null) response.getError().setCause(e.getCause().getMessage());
	            response.getError().setException(ExceptionUtils.getFullStackTrace(e));
			}
			
			BufferedReader br = null;
					
			try {
				br = new BufferedReader(new InputStreamReader(new FileInputStream(file),"utf-8"));
				String nextLine;
				nextLine = br.readLine();
				String query = "";
				int total = 0;
				
				while((nextLine = br.readLine()) != null) {
					String [] str_val = new String[15];
					if(nextLine.isEmpty()) continue;
					str_val = getcsvtokens(nextLine);
														
					String date = str_val[0];
					String prdt_cd  = str_val.length < 2 ? "" : str_val[1];					
					String prdt_nm  = str_val.length < 3 ? "" : str_val[2];					
					String imp_prdt_stat = str_val.length < 4 ? "" : str_val[3];					
					String brand = str_val.length < 5 ? "" : str_val[4];					
					String item = str_val.length < 6 ? "" : str_val[5];					
					String std = str_val.length < 7 ? "" : str_val[6];					
					String pack = str_val.length < 8 ? "" : str_val[7];					
					String ddc = str_val.length < 9 ? "" : str_val[8];					
					String sale_type = str_val.length < 10 ? "" : str_val[9];					
					String dpsl_cnt = str_val.length < 11 ? "" : str_val[10];					
					String ocrc = str_val.length < 12 ? "" : str_val[11];					
					String bad_item = str_val.length < 13 ? "" : str_val[12];					
					String bad_kwrd = str_val.length < 14 ? "" : str_val[13];
					String bad_ctnt = str_val.length < 15 ? "" : str_val[14];
					
					query = "INSERT INTO INNER_DATA_FAULT ([DATE],PRDT_CD,PRDT_NM,IMP_PRDT_STAT,BRAND,ITEM,STD,PACK,DDC,SALE_TYPE,DPSL_CNT,OCRC,BAD_ITEM,BAD_KWRD,BAD_CTNT) VALUES ('";
					query += date + "','"+ prdt_cd + "','"+ prdt_nm + "','"+ imp_prdt_stat + "','"+ brand + "','"+ item + "','"+ std + "','";
					query += pack + "','" + ddc + "','" + sale_type + "','" + dpsl_cnt + "','" + ocrc + "','" + bad_item + "','"; 
					query += bad_kwrd + "','" + bad_ctnt + "')";
					
					memberService.insert_sql(query);
					total++;					
				}
				br.close();
				file.delete();
				response.setSuccess(true);
				response.setTotal(total);
				
				
			} catch (FileNotFoundException e) {
				response.setSuccess(false);
	            response.getError().setMessage(e.getMessage());
	            if (e.getCause() != null) response.getError().setCause(e.getCause().getMessage());
	            response.getError().setException(ExceptionUtils.getFullStackTrace(e));
			} catch (IOException ex) {
				response.setSuccess(false);
	            response.getError().setMessage(ex.getMessage());
	            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
	            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
			}
			
		}
		return response;
	}
	
	/**
	* csv 파일의 각 레코드의 토큰 분리
	*/
   public String[] getcsvtokens(String line)
   {
      ArrayList<String> t = new ArrayList<String>();

      line = line.replaceAll("\"\"", "\"").trim();
      
      int sp = 0, ep;
      while(!line.isEmpty() && sp<line.length())
      {
         if(line.charAt(sp)=='"') ep = line.indexOf("\",", sp);
         else ep = line.indexOf(",",sp);
         if(ep<0) {
            t.add(line.substring(sp));
            break;
         }
         else
         {
            if(line.charAt(sp)=='"')
            {
               t.add(line.substring(sp+1, ep));
               sp = ep+2;
            }
            else 
            {
               t.add(line.substring(sp, ep));
               sp = ep+1;
            }
         }
      }
      
      return t.toArray(new String[0]);
   }

}
