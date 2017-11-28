package com.ankus.web.lite.innerDataDemand;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.ConfigurationHelper;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.member.MemberService;

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
@RequestMapping("/innerDataDemand")
public class InnerDataDemandController extends LocaleSupport {

    @Autowired
    private InnerDataDemandService innerDataDemandService;
    
    @Autowired
    private MemberService memberService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(InnerDataDemand innerDataDemand) {
        Response response = new Response();
        try {
        	if (innerDataDemand.isPaging()) {
        		innerDataDemand.setStartRow((innerDataDemand.getPage() - 1) * innerDataDemand.getRows() + 1); 
        		innerDataDemand.setEndRow(innerDataDemand.getPage() * innerDataDemand.getRows());
        		int records = innerDataDemandService.selectByConditionCnt(innerDataDemand);
        		
        		response.getMap().put("page", innerDataDemand.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)innerDataDemand.getRows()));
        	}
        	
        	List<InnerDataDemand> list = innerDataDemandService.selectByCondition(innerDataDemand);
        	
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
    public Response insert(@RequestBody InnerDataDemand innerDataDemand) throws Exception {
    	Response response = new Response();
    	try {
    		if (0 < innerDataDemandService.exist(innerDataDemand)) {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + innerDataDemand.getDate() + " / " + innerDataDemand.getPrdt_cd() + "] 항목은 이미 등록되었습니다.");
    			return response;
    		}
    		
    		int cnt = innerDataDemandService.insert(innerDataDemand);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + innerDataDemand.getDate() + " / " + innerDataDemand.getPrdt_cd() + "] 항목이 정상적으로 등록되지 않았습니다.");
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
    public Response update(@RequestBody InnerDataDemand innerDataDemand) throws Exception {
    	Response response = new Response();
    	
    	//System.out.printf("update=[%s]", innerDataDemand.toString());
    	
    	try {
    		int cnt = innerDataDemandService.update(innerDataDemand);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + innerDataDemand.getDate() + " / " + innerDataDemand.getPrdt_cd() + "] 항목이 정상적으로 수정되지 않았습니다.");
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
			int cnt = innerDataDemandService.deleteList(items);
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
				
				file = new File(tmpCache, "innerDataDemand.csv");
				
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
				int dup_cnt = 0;
				
				while((nextLine = br.readLine()) != null) {
					String [] str_val = new String[15];
					if(nextLine.isEmpty()) continue;										
					str_val = getcsvtokens(nextLine);
															
					String date = str_val[0];
					String prdt_cd = str_val[1];					
					String prdt_nm  = str_val.length < 3 ? "" : str_val[2];					
					String imp_prdt_stat = str_val.length < 4 ? "" : str_val[3];					
					String brand = str_val.length < 5 ? "" : str_val[4];					
					String item = str_val.length < 6 ? "" : str_val[5];					
					String std = str_val.length < 7 ? "" : str_val[6];					
					String pack = str_val.length < 8 ? "" : str_val[7];					
					String ddc = str_val.length < 9 ? "" : str_val[8];					
					String sale_type = str_val.length < 10 ? "" : str_val[9];					
					String sale_cnt = str_val.length < 11 ? "" : str_val[10];					
					String supply_cnt = str_val.length < 12 ? "" : str_val[11];					
					String sale_on_mkt_cnt = str_val.length < 13 ? "" : str_val[12];					
					String sale_on_home_cnt = str_val.length < 14 ? "" : str_val[13];
					String sale_on_bmkt_cnt = str_val.length < 15 ? "" : str_val[14];
					String sale_on_dpt_cnt = str_val.length < 16 ? "" : str_val[15];
					String sale_on_mall_cnt = str_val.length < 17 ? "" : str_val[16];
					String sale_on_etc_cnt = str_val.length < 18 ? "" : str_val[17];
					String sale_off_mkt_cnt = str_val.length < 19 ? "" : str_val[18];
					String sale_off_24mkt_cnt = str_val.length < 20 ? "" : str_val[19];
					String sale_off_rmkt_cnt = str_val.length < 21 ? "" : str_val[20];
					String sale_off_md_cnt = str_val.length < 22 ? "" : str_val[21];
					String sale_off_bmkt_cnt = str_val.length < 23 ? "" : str_val[22];
					String sale_off_rt_cnt = str_val.length < 24 ? "" : str_val[23];
					String sale_off_dpt_cnt = str_val.length < 25 ? "" : str_val[24];
					String sale_off_etc_cnt = str_val.length < 26 ? "" : str_val[25];
					String sale_etc_emp_cnt = str_val.length < 27 ? "" : str_val[26];
					String sale_etc_agcy_cnt = str_val.length < 28 ? "" : str_val[27];
					String sale_etc_deal_cnt = str_val.length < 29 ? "" : str_val[28];
					String sale_etc_imp_cnt = str_val.length < 30 ? "" : str_val[29];
					
					query = "INSERT INTO INNER_DATA_DEMAND ([DATE], PRDT_CD, PRDT_NM, IMP_PRDT_STAT, BRAND, ITEM, STD, PACK, DDC, SALE_TYPE";
					query += ", SALE_CNT, SUPPLY_CNT, SALE_ON_MKT_CNT, SALE_ON_HOME_CNT, SALE_ON_BMKT_CNT, SALE_ON_DPT_CNT, SALE_ON_MALL_CNT, SALE_ON_ETC_CNT, SALE_OFF_MKT_CNT, SALE_OFF_24MKT_CNT";
					query += ", SALE_OFF_RMKT_CNT, SALE_OFF_MD_CNT, SALE_OFF_BMKT_CNT, SALE_OFF_RT_CNT, SALE_OFF_DPT_CNT, SALE_OFF_ETC_CNT, SALE_ETC_EMP_CNT, SALE_ETC_AGCY_CNT, SALE_ETC_DEAL_CNT, SALE_ETC_IMP_CNT";
					query += ") VALUES ('";
					query += date + "','"+ prdt_cd + "','"+ prdt_nm + "','"+ imp_prdt_stat + "','"+ brand + "','"+ item + "','";
					query += std + "','" + pack + "','" + ddc + "','" + sale_type + "','" + sale_cnt + "','" + supply_cnt + "','";
					query += sale_on_mkt_cnt + "','" + sale_on_home_cnt + "','" + sale_on_bmkt_cnt + "','" + sale_on_dpt_cnt + "','" + sale_on_mall_cnt + "','"; 
					query += sale_on_etc_cnt + "','" + sale_off_mkt_cnt + "','" + sale_off_24mkt_cnt + "','" + sale_off_rmkt_cnt + "','" + sale_off_md_cnt + "','";
					query += sale_off_bmkt_cnt + "','" + sale_off_rt_cnt + "','" + sale_off_dpt_cnt + "','" + sale_off_etc_cnt + "','" + sale_etc_emp_cnt + "','";
					query += sale_etc_agcy_cnt + "','" + sale_etc_deal_cnt + "','" + sale_etc_imp_cnt;
					query += "')";
					
					int cnt = memberService.select_cnt_sql("SELECT COUNT(*) FROM INNER_DATA_DEMAND WHERE [DATE]='" + date + "' AND PRDT_CD='" + prdt_cd + "'");
					
					if(cnt > 0){
						dup_cnt++;
						continue;
					}else{
						memberService.insert_sql(query);
						total++;
					}
										
				}
				br.close();
				file.delete();
				response.setSuccess(true);
				response.setTotal(total);
				response.setLimit(dup_cnt);
				
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
