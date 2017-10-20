/**
 * This file is part of ankus.
 *
 * ankus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ankus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ankus.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.ankus.web.designer;

import static org.slf4j.helpers.MessageFormatter.format;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import com.ankus.fs.hdfs.HdfsHelper;
import com.ankus.model.rest.Authority;
import com.ankus.model.rest.Context;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.FileSystemCommand;
import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.NodeType;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.SecurityLevel;
import com.ankus.model.rest.Tree;
import com.ankus.model.rest.TreeType;
import com.ankus.model.rest.Workflow;
import com.ankus.model.workflow.PreviewFile;
import com.ankus.provider.engine.HistoryService;
import com.ankus.provider.fs.FileSystemService;
import com.ankus.util.ExceptionUtils;
import com.ankus.util.FileUtils;
import com.ankus.util.StringUtils;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.core.ConfigurationHelper;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.core.RemoteService;
import com.ankus.web.engine.EngineService;
import com.ankus.web.member.Member;
import com.ankus.web.member.MemberService;
import com.ankus.web.security.SessionUtils;
import com.ankus.web.tree.TreeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

/**
 * Workflow Designer Controller.
 *
 * @author Edward KIM
 * @version ankus 0.2.1
 * @modify Suhyun Jeon
 */
@Controller
@RequestMapping("/designer")
public class DesignerController extends LocaleSupport {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(DesignerController.class);

    /**
     * ROOT 노드의 ID
     */
    private final static String ROOT = "/";

    /**
     * Workflow Tree Service
     */
    @Autowired
    private TreeService treeService;
    
    @Autowired
    private RemoteService lookupService;

    /**
     * Designer Service
     */
    @Autowired
    private DesignerService designerService;

    @Autowired
    private EngineService engineService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;
    
    @Autowired
    private MemberService memberService;
    
    @Value("${jdbc.driver}")
	public String jdbc_driver;

	@Value("${jdbc.url}")
	public String jdbc_url;

	@Value("${jdbc.username}")
	public String jdbc_username;

	@Value("${jdbc.password}")
	public String jdbc_password;

    /**
     * 워크플로우를 등록한다.
     *
     * @param workflowId   워크플로우 식별자 ID
     * @param treeId       트리 노드의 ID
     * @param parentTreeId 부모 트리 노드의 ID
     * @param clusterId    Hadoop Cluster의 ID
     * @param xml          OpenGraph XML
     * @return HTTP Response
     */
    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response save(@RequestParam(defaultValue = "-1") Long id,
    					 @RequestParam(value = "username") String user_name, //2015.01.30 whitepoo@onycom.com
    					 @RequestParam(value = "workflowName") String workflowName,
                         @RequestParam(defaultValue = "") String workflowId,
                         @RequestParam(defaultValue = "-1") Long treeId,
                         @RequestParam(defaultValue = "/") String parentTreeId,
                         @RequestParam(defaultValue = "0") Long clusterId,
                         @RequestBody String xml) {

        if (logger.isDebugEnabled()) {
            logger.debug("Request OpenGraph XML is \n{}", xml);
        }
        
        SessionUtils.setUsername(user_name);//2015.01.30 whitepoo@onycom.com
        
        Response response = new Response();
        
        try {
            Workflow workflow = null;               
                        
            if (id > -1) {
               	workflow = designerService.update(treeId, id, xml, user_name); 
            }else{	
                workflow = designerService.regist(parentTreeId, xml, user_name);
            }

            response.getMap().put("instance_id", workflow.getWorkflowId());
            response.getMap().put("cluster", clusterId); // FIXME
            response.getMap().put("id", String.valueOf(workflow.getId()));
            response.getMap().put("tree_id", String.valueOf(workflow.getWorkflowTreeId()));
            response.getMap().put("name", String.valueOf(workflow.getWorkflowName()));
            response.getMap().put("desc", String.valueOf(workflow.getDescription()));
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_REGIST_WORKFLOW", workflowId, ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }
    
    /**
     * 워크플로우를 로딩한다. 만약 OpenGraph 기반 워크플로우가 존재하지 않는다면 CLI를 통해서 등록했다는 가정을 할 수 있으므로
     * 클라이언트에게 에러 코드를 전달한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "load", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> load(@RequestParam Long id) {
        MultiValueMap headers = new HttpHeaders();
        try {
            String designerXml = designerService.load(id);
            headers.set("Content-Type", "text/plain; charset=UTF-8");
            return new ResponseEntity<String>(designerXml, headers, HttpStatus.OK);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_LOAD_WORKFLOW", id.toString(), ex.getMessage());
            logger.warn("{}", message, ex);
            headers.set("Content-Type", "text/plain; charset=UTF-8");
            return new ResponseEntity<String>(ex.getMessage(), headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  
    private Context getContext(Engine engine, HttpServletRequest req) {
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        Context context = new Context();
        
        String username = "";
        String authority = "";
        Cookie[] cs = req.getCookies();
        
        for(Cookie c: cs)
        {
        	if(c.getName().equals("authenticate"))
        	{
        		String auth = c.getValue();
        		if(auth.indexOf("/")>0)
        		{
        			String[] auths = auth.split("/");
        			username = auths[0];
        			authority = auths[1];
        		}
        	}
        }

        context.putObject(Context.AUTORITY, new Authority(username, authority.equals("ROLE_ADMIN")? SecurityLevel.SUPER : SecurityLevel.LEVEL1));
        
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        context.putString("username", username);
        return context;
    }      

    /**
     * 워크플로우를 로딩한다. 만약 OpenGraph 기반 워크플로우가 존재하지 않는다면 CLI를 통해서 등록했다는 가정을 할 수 있으므로
     * 클라이언트에게 에러 코드를 전달한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "previewHDFSFile", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile(HttpServletRequest req, @RequestParam String inputPath, String delimiter, long engineId) {
        Response response = new Response();
        
        
        try {
            String filename = FileUtils.getFilename(inputPath);
        	
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", inputPath);
            command.putObject("filename", filename);
            command.putObject("linecnt", 5);
            
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            
        	Context context = getContext(engine, req);
            
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            
            byte[] reads = fileSystemService.load(context, command);
        
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(reads)));
                                    
            String lines;
            int count = 0;
            int keyNumber = -1;
            
            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            Map map = new HashMap();
            String[] splits = {};

            while ((lines = bufferedReader.readLine()) != null) {
                count++;
                
                /*20140917 안재성 수정 ###############*/
                keyNumber++;
                splits = lines.split(delimiter);
                map.put(keyNumber, lines);
                if (count > 5) { break; }
                /*############### 20140917 안재성 수정*/
            }
            
            //Closed bufferedReader
            bufferedReader.close();
            
            int columnLength = splits.length;
            System.out.println("columnLength : " + columnLength);
            StringBuffer stringBuffer = new StringBuffer();

            for (int i = 0; i <= columnLength - 1; i++) {
                columnIndexList.add(i);
                for (Object line : map.values()) {
//                    stringBuffer.append(splits[i]).append(","); /*20140917 안재성 수정*/                	
                    stringBuffer.append(line.toString().split(delimiter)[i]).append(","); /*20140917 안재성 수정*/                   
                }
                stringBuffer.append("::");
            }
            
             for (String row : stringBuffer.toString().split(",::")) {      
            	 
            	int val_count = row.split(",").length;
            	if(val_count < 6){
            		rowDataList.add(row);
            	}else{
            		 rowDataList.add(row + "...");
            	}               
            }

            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);

            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getCause().toString());
            response.getError().setException(ex.getClass().getSimpleName());
            response.setSuccess(false);
            return response;
        }
    }
    
    /**
     * 워크플로우를 로딩한다. 만약 OpenGraph 기반 워크플로우가 존재하지 않는다면 CLI를 통해서 등록했다는 가정을 할 수 있으므로
     * 클라이언트에게 에러 코드를 전달한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "previewHDFSFile_FP", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile_FP(HttpServletRequest req, @RequestParam String inputPath, String delimiter, long engineId) {
        Response response = new Response();
        
        try {
            String filename = FileUtils.getFilename(inputPath);
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", inputPath);
            command.putObject("filename", filename);
            command.putObject("linecnt", 5);
            
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            
        	Context context = getContext(engine, req);
            
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            
            byte[] reads = fileSystemService.load(context, command);
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(reads)));
                                    
            String lines;
            int count = 0;

            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            String[] splits = {};
            
            StringBuffer stringBuffer = new StringBuffer();
            int columnLength = 0;
            
            while ((lines = bufferedReader.readLine()) != null) {
            	count++; 
                splits = lines.split(delimiter);                
                columnIndexList.add(count);    
                
                columnLength = splits.length;
                for (int i = 0; i <= columnLength - 1; i++) {    
                	stringBuffer.append(lines.toString().split(delimiter)[i]).append(",");                 
                }
                stringBuffer.append("::");
                columnLength = 0;
                
                if (count > 4) { break; }
            }              

            bufferedReader.close();
            columnLength = splits.length;
          
            
            for (String row : stringBuffer.toString().split(",::")) {
            	int val_count = row.length();
            	System.out.println("val_count" + val_count);
            	if(val_count < 75){
            		rowDataList.add(row);  
            	}else{
            		rowDataList.add(row.substring(0,75) + "...");            		
            	}                           
            }
            
			
            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);

            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getCause().toString());
            response.getError().setException(ex.getClass().getSimpleName());
            response.setSuccess(false);
            return response;
        }
    }
    
    @RequestMapping(value = "previewHDFSFile_tab", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile_tab(HttpServletRequest req, @RequestParam String inputPath, String delimiter, long engineId, String limit) {
        Response response = new Response();
        
        int readlinecnt = 50;
        
        if(limit!=null) readlinecnt = Integer.parseInt(limit);
        
        try {
            String filename = FileUtils.getFilename(inputPath);
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", inputPath);
            command.putObject("filename", filename);
            command.putObject("linecnt", readlinecnt);
            
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            
        	Context context = getContext(engine, req);
            
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            
            byte[] reads = fileSystemService.load(context, command);
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(reads),"UTF-8"));
                                    
            String lines;
            int count = 0;

            List<Integer> columnIndexList = new ArrayList<Integer>();            
            ArrayList<String> rowDataList = new ArrayList<String>();
            
//            String[] splits = {};
//            StringBuffer stringBuffer = new StringBuffer();
//            int columnLength = 0;
            
            while ((lines = bufferedReader.readLine()) != null) {

            	count++; 
            	rowDataList.add(lines);
            	
            	if(count==0)
            	{
            		String[] splits = lines.split(delimiter);
//            		columnLength = splits.length;
            		for(int i=0; i<splits.length; i++) columnIndexList.add(i);
            	}
            	
            	if (count > readlinecnt) break;
            }

/*            	
            	//System.out.println("lines : "+ lines);
            	
                splits = lines.split(delimiter);
                
                columnIndexList.add(count);    
                
                System.out.println("splits : "+ splits.toString());
                
                columnLength = splits.length;
                for (int i = 0; i < columnLength; i++) {    
                	if(i != columnLength - 1){
                		stringBuffer.append(lines.toString().split(delimiter)[i]).append('#'); 
                	}else{
                		stringBuffer.append(lines.toString().split(delimiter)[i]); 
                	}              
                }
                stringBuffer.append("::");
                
                //System.out.println("stringBuffer : "+ stringBuffer);
                columnLength = 0;
                
                if (count > 50) { break; }
            }              
*/
            bufferedReader.close();
//            columnLength = splits.length;
          
            
/*            for (String row : stringBuffer.toString().split("::")) {
            	//int val_count = row.length();
            	
            	//if(val_count < 75){
            		rowDataList.add(row);  
            	//}else{
            	//	rowDataList.add(row.substring(0,75) + "...");            		
            	//}                           
            }
*/            
			
            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnIndexList.size());
            response.setSuccess(true);

            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getCause().toString());
            response.getError().setException(ex.getClass().getSimpleName());
            response.setSuccess(false);
            return response;
        }
    }
    
    /**
     * 하둡 파일을 읽어서 프리뷰에 표시할 형태로 가져온다.<br>
     * TAJO사용
     * @param inputPath 파일위치
     * @param delimiter 구분자
     * @param engineId 엔진ID
     * @param maxLine 최대 라인수
     * @param maxColumn 최대 컬럼수
     * @return
     */
    @RequestMapping(value = "previewHDFSFile_FP_ORIGINAL", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile_FP_ORIG(HttpServletRequest req, @RequestParam String inputPath, String delimiter, long engineId
    		, @RequestParam(value = "maxLine", required=false, defaultValue="-1") int maxLine
    		, @RequestParam(value = "maxColumn", required=false, defaultValue="-1") int maxColumn
    		) {
        Response response = new Response();
        
        try {
            String filename = FileUtils.getFilename(inputPath);
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", inputPath);
            command.putObject("filename", filename);
            command.putObject("linecnt", maxLine);
            
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            
        	Context context = getContext(engine, req);
            
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            
            byte[] reads = fileSystemService.load(context, command);
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(reads),"UTF-8"));
            String lines;
            int count = 0;

            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            String[] splits = {};
            
            
            StringBuffer stringBuffer = new StringBuffer();
            int columnLength = 0;
            
            while ((lines = bufferedReader.readLine()) != null) {
            	if(maxLine != -1){ // 라인수 제한인 경우
            		if (count >= maxLine){ // 라인 수 제한
            			break;
            		}
            	}
            	
                splits = lines.split(delimiter, maxColumn);                
                columnIndexList.add(count);    
                
                columnLength = splits.length;
                for (int i = 0; i <= columnLength - 1; i++) {    
                	stringBuffer.append(lines.toString().split(delimiter)[i]).append(",");                 
                }
                stringBuffer.append("::");
                
                count++; 
            }              

            bufferedReader.close();
            
            for (String row : stringBuffer.toString().split(",::")) {
        		rowDataList.add(row);  
            } 
            
			
            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);
            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getMessage());
            response.setSuccess(false);
            return response;
        }
    }

    /**
     * 워크플로우를 로딩한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "get", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response get(@RequestParam Long id) {
        Response response = new Response();
        try {
            Workflow workflow = designerService.getWorkflow(id);
            response.setSuccess(true);
            response.setObject(workflow);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_LOAD_WORKFLOW", id.toString(), ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    @RequestMapping(value = "run", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response run(@RequestBody Map<String, String> params) {
        long id = Long.parseLong(params.get("id"));
        Response response = new Response();
        try {
        	long engineid = Long.parseLong(params.get("engineId"));
        	
            System.out.printf("cache update...\n");

        	// cache...
        	HashMap<String, Object>  cached = designerService.ankus_cache_list(engineid);
        	
        	String cachePath = ConfigurationHelper.getHelper().get("artifact.cache.path", "/tmp/cache");
            
        	File f = new File(cachePath);
        	
        	if(f.exists() && f.isDirectory())
        	{
        		for(File fi:f.listFiles())
        		{

                    System.out.printf("update check===%s\n", fi.getName());
        			Long sz = (Long)cached.get(fi.getName());
        			if(sz==null || sz!=fi.length())
        			{
                        System.out.printf("update put===%s:%d\n", fi.getName(), sz);
        	    		FileInputStream fis = new FileInputStream(fi);
        	    		byte[] data = new byte[(int) fi.length()];
        	    		fis.read(data);
        				
        				designerService.ankus_cache_put(engineid, fi.getName(), data);
        			}
        			
        		}
        	}
        	
            designerService.run(id, engineid);
            
            
            Workflow workflow = designerService.getWorkflow(id);
            
            response.getMap().put("instance_id", workflow.getWorkflowId());
            response.getMap().put("id", String.valueOf(workflow.getId()));
            response.getMap().put("tree_id", String.valueOf(workflow.getWorkflowTreeId()));
            response.getMap().put("name", String.valueOf(workflow.getWorkflowName()));
            response.getMap().put("desc", String.valueOf(workflow.getDescription()));
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", Long.toString(id), ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    private Context getContext(Engine engine) {
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority(SessionUtils.getUsername(), SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        context.putString("username", SessionUtils.getUsername());
        return context;
    }
    
    /**
     * 워크플로우의 상태코드를 확인한다.
     *
     * @param workflowId 워크플로우의 식별자
     * @return 워크플로우의 상태코드
     */
    @RequestMapping(value = "status", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getWorkflowStatus(@RequestParam(defaultValue = "-1") long workflowId) {
        Response response = new Response();
        response.setSuccess(true);
        if (workflowId < 0) {
            response.getMap().put("count", "0");
            return response;
        }
        try {
            Workflow workflow = designerService.getWorkflow(workflowId);
            response.getMap().put("status", workflow.getStatus());
            response.getMap().put("id", workflow.getId());
            response.getMap().put("instance_id", workflow.getWorkflowId());
            response.getMap().put("tree_id", workflow.getWorkflowTreeId());
            response.getMap().put("name", workflow.getWorkflowName());
            // response.getMap().put("count", jobService.getScheduledCountByWorkflowId(workflow.getId()));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /*
    //whitpeootest
    @SuppressWarnings("unused")
	@RequestMapping(value = "visualization_run", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response visualization_run(@RequestParam(defaultValue = "") long engineId, long id, String driver, String jar, String input, 
    		String delimiter, String firstRecord, String titlename, String xIndex, String xLabel, String printValue, String yIndexList, String yMax) 
    {
    	Response response = new Response();    
    	String output= "/Test_barplot_output";
    	
    	
    	String visual_run_code = jar +" ";
    	visual_run_code += driver;
    	visual_run_code += " -input ";
    	visual_run_code += input;
    	visual_run_code += " -output ";
    	visual_run_code += output;
    	visual_run_code += " -delimiter ";
    	visual_run_code += delimiter;
    	visual_run_code += " -firstRecord ";
    	visual_run_code += firstRecord;
    	
    	visual_run_code += " -xIndex ";
    	visual_run_code += xIndex;
    	visual_run_code += " -xLabel ";
    	visual_run_code += xLabel;
    	visual_run_code += " -printValue ";
    	visual_run_code += printValue;
    	visual_run_code += " -yIndexList ";
    	visual_run_code += yIndexList;
    	visual_run_code += " -yMax ";
    	visual_run_code += yMax;
    	
        try
        {
        	String[] vcode = visual_run_code.split(" ");
        	
        	List<String> cmdList = new ArrayList<String>(Arrays.asList(vcode));
        	
        	//remote call
        	String Visual_jobId = designerService.visulization_run(id, engineId, visual_run_code); //시각화 실행.
        	System.out.println("jobId:" + Visual_jobId);
        	
        	Thread.sleep(1000);
            Engine engine = engineService.getEngine(engineId);
            //remote call
            HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
           
            int delay_count = 0;
            Thread.sleep(1000);
            while(true)
            {
            	String state = historyService.getVisualStatus(Visual_jobId, "admin");
            	Thread.sleep(1000);
            	delay_count ++;
             	if(delay_count > 10)
             	{
             		break;//강제 종료 
             	}
             	 System.out.println("STATE:" + state);
            	if(state.equals("success") == true)
            	{
		            try 
		            {
		                FileSystemCommand command = new FileSystemCommand();
		                int outputIndex = cmdList.indexOf("-output") + 1;
		                
		                String path = cmdList.get(outputIndex) + "/bar_result.html";
		                
		                String contents = HDFS_FullView(engineId, path);
		                System.out.println("D3 RESULT:" + contents);
		                response.getMap().put("name", contents);
		                response.setSuccess(true);
		                return response;
		            } catch (Exception ex) {
		                response.setSuccess(false);
		                response.getError().setMessage(ex.getMessage());
		                if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
		                response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		                return response;
		            }
            	}
            	else if(state.equals("faile") == true)
                {
            		response.getMap().put("name", "fail");
	                response.setSuccess(true);
	                return response;
                }
            	
            	else if(state.equals("ready") == true)
            	{
            		//Thread.sleep(100);
            		continue;
            	}
            	else 
            	{
            		//Thread.sleep(100);
            		continue;
            	}
	            
            }
            
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", Long.toString(id), ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }
    */
    private HistoryService getHistoryService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getHistoryService(getHistoryServiceUrl(engine));
    }
    private HistoryService getHistoryService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(HistoryService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (HistoryService) factoryBean.getObject();
    }
    private String getHistoryServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/history", engine.getIp(), engine.getPort()).getMessage();
    }

    private String HDFS_FullView(long engineId, String path)
    {
    	String fileContents = "";
    	try {
        	
            // Get hadoop cluster
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
            String hdfsUrl = hadoopCluster.getHdfsUrl();
            Configuration configuration = HdfsHelper.getConfiguration(hadoopCluster);  /*20140917 안재성 추가*/
            
            FileSystem fileSystem = FileSystem.get(configuration);
            Path file_path = new Path(hdfsUrl + path);
                        
            if (fileSystem.isFile(file_path)==false) {
              
            	 FileStatus [] statuses = fileSystem.listStatus(file_path);
            	 file_path = statuses[0].getPath();
             }
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileSystem.open(file_path)));
                                    
            String lines;
            int count = 0;
            int keyNumber = -1;

            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            Map map = new HashMap();
            String[] splits = {};

            while ((lines = bufferedReader.readLine()) != null) {
            	fileContents += lines;
            }
            
            bufferedReader.close();
            /*
            int columnLength = splits.length;
            StringBuffer stringBuffer = new StringBuffer();

            for (int i = 0; i <= columnLength - 1; i++) {
                columnIndexList.add(i);
                for (Object line : map.values()) 
                {
                    stringBuffer.append(line.toString().split(delimiter)[i]).append(","); 
                }
                stringBuffer.append("::");
            }

            for (String row : stringBuffer.toString().split(",::")) {
                rowDataList.add(row + "...");
            }

            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);

            return response;
            */
            return fileContents;
            
        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            return ex.toString();
        }
    }
    /**
     * 워크플로우 XML을 HTML로 변환한다.
     *
     * @param id 워크플로우의 식별자
     * @return 워크플로우 XML
     */
    @RequestMapping(value = "xml", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getWorkflowXml(@RequestParam(defaultValue = "-1") long id) {
        Response response = new Response();
        try {
            Workflow workflow = designerService.getWorkflow(id);
            
            //String xml = workflow.getWorkflowXml();
            String xml = workflow.getWorkflowXml().replace("&lt;", "<").replace("amp;", "").replace("&gt", ">");
            
            response.setSuccess(true);
            response.getMap().put("xml", OpenGraphMarshaller.escape(xml));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /**
     * 워크플로우 목록을 확인한다.
     *
     * @param type 트리 노드의 유형
     * @param node 워크플로우 노드
     * @return HTTP REST Response JAXB Object
     */
    @RequestMapping(value = "tree/get", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response get(@RequestParam String type,
			    		@RequestParam String node,
			    		@RequestParam(value = "username") String user_name)//2015.01.30 whitepoo@onycom.com
    {
        logger.debug("[WF][TREE][GET] Type '{}' Path '{}'", type, node);

        Response response = new Response();
        SessionUtils.setUsername(user_name);//2015.01.30 whitepoo@onycom.com
        Tree treeNode = null;
        if (ROOT.equals(node)) {
            // if root, return root node
            treeNode = treeService.getRoot(TreeType.valueOf(type.trim()), SessionUtils.getUsername());

            // if root does not exist, create root.
            if (treeNode == null) {
                treeNode = treeService.createRoot(TreeType.valueOf(type.trim()), SessionUtils.getUsername());
            }
        } else {
            // ROOT 노드가 아니라면 PK인 Tree Id를 부모 노드로 설정한다.
            treeNode = treeService.get(Long.parseLong(node));
        }

        Member member = memberService.getMemberByUser(user_name);
        
        // Get childs from parent.
        List<Tree> childs = treeService.getWorkflowChilds(treeNode.getId(), member);
        for (Tree tree : childs) {
            Map map = new HashMap();
            map.put("id", tree.getId());
            if (NodeType.FOLDER.equals(tree.getNodeType())) {
                map.put("cls", "folder");
            } else {
                setStatus(tree.getId(), map);
            }
            map.put("text", tree.getName());
            map.put("workflowId", tree.getReferenceId());
            map.put("leaf", NodeType.FOLDER.equals(tree.getNodeType()) ? false : true);
            response.getList().add(map);
        }
        response.setSuccess(true);
        return response;
    }

    
    /**
     * 지정한 워크플로우를 삭제한다. 삭제는 워크플로우의 식별자를 기준으로 하지 않고
     * TREE의 식별자를 기준으로 한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response deleteWorkflow(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            String nodeType = params.get("nodeType");
            if ("folder".equals(nodeType)) {
                treeService.delete(Long.parseLong(params.get("id")));
            } else {
                designerService.delete(Long.parseLong(params.get("id")), Long.parseLong(params.get("workflowId")));
            }
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_DELETE_SELECTION", params.get("text"), ex.getMessage());
            logger.warn("{}", message, ex);

            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /**
     * 지정한 워크플로우의 상태 코드의 CSS와 해당 워크플로우의 배치 개수를 설정한다.
     *
     * @param treeId 워크플로우의 상태 코드를 확인할 Tree ID
     */
    private void setStatus(long treeId, Map map) {
/*
        Workflow workflow = jobService.getWorkflowByTeeId(treeId);
        Long count = jobService.getCountByWorkflowId(workflow.getId());
        map.put("job", count);
        if (StringUtils.isEmpty(workflow.getDesignerXml())) {
            map.put("iconCls", "designer_not_load");
            map.put("qtip", "CLI를 통해 등록한 워크플로우 (" + workflow.getWorkflowId() + ")");
            return;
        }
        if (count > 0) {
            map.put("iconCls", "designer_not_remove");
            map.put("qtip", "등록되어 있는 배치 작업의 개수 :: " + count + "개 (" + workflow.getWorkflowId() + ")");
            return;
        }
        map.put("iconCls", "designer_load");
        map.put("qtip", workflow.getWorkflowId());
*/

        map.put("iconCls", "status-blue");
    }
    
    /**
     * Cache Clear
     *
     * @param params cacheClear 삭제하는 경로 및 Engine
     * @return REST Response JAXB Object
     */ 
    @RequestMapping(value = "cacheClear", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response cacheClear(Long engineId) {
        Response response = new Response();
        long clear_cnt =0;
        try {
        	Engine engine = engineService.getEngine(engineId);        	
        	 System.out.println("engine:" + engine.getIp());        	 
        	designerService.getCacheClear(engineId);
        	response.setSuccess(true);	
        	
        } catch (Exception ex) {
            String message = message("Cache Clear", "Fail Clear Cache",  ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }
    
    /**
     * 워크플로우 목록 정보
     * @return
     */
    @RequestMapping(value = "getWorkflow", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getWorkflow(@RequestParam(value = "username", required=true) String user_name) {
        Response response = new Response();
        try {
        	// 권한에 따른 전체,개인별 목록을 가져오기 위한 권한 체크
            if(StringUtils.isEmpty(user_name) == false){
            	Member member = memberService.getMemberByUser(user_name);
            	List<Workflow> workflows = new ArrayList<Workflow>();
            	if(member.getAuthority().equals("ROLE_ADMIN")){ // 사용자가 전체 권한인 경우
            		workflows = designerService.getList(null);
            	}else{
            		workflows = designerService.getList(user_name);
            	}
            	if(workflows != null){
            		response.getList().addAll(workflows);
            		response.setTotal(workflows.size());
            	}
            	response.setSuccess(true);
            }
        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage());

            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
    
    /**
     * 워크플로우 Export
     * @return
     */
    @RequestMapping(value = "export", method = RequestMethod.GET)
    @ResponseBody
    public void exportXML(HttpServletRequest req, HttpServletResponse resp,
    		@RequestParam(value = "id", required=true) long id) {
    	try {
    		
    		Workflow workflow = designerService.getWorkflow(id);
    		if(workflow != null){
    			
    			String wfXml = workflow.getWorkflowXml();
    			String dsXml = workflow.getDesignerXml();
    			String str = wfXml + "xx_srt_workflow_xx" + dsXml;
    			
		        String fileName = workflow.getWorkflowName() + ".xml";
		        String docName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");  
		        InputStream is = new ByteArrayInputStream(str.getBytes());
		        
		        resp.setContentLength(str.getBytes().length);  
		        resp.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");  
		        resp.setHeader("Content-Transfer-Encoding", "binary;");  
		        resp.setHeader("Pragma", "no-cache;");  
		        resp.setHeader("Expires", "-1;");   
		        // get output stream of the response  
		        OutputStream outStream = resp.getOutputStream();  
		   
		        byte[] buffer = new byte[4096];  
		        int bytesRead = -1;  
		   
		        // write bytes read from the input stream into the output stream  
		        while ((bytesRead = is.read(buffer)) != -1) {  
		            outStream.write(buffer, 0, bytesRead);  
		        }  
		   
		        is.close();  
		        outStream.close();  
    		}
    	} catch (Exception ex) {
    	}
    }
    
    /**
     * 워크플로우 import
     * @return
     */
    @RequestMapping(value = "import", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response importXML(HttpServletRequest req, HttpServletResponse resp){
//    		@RequestParam(value = "file", required=true) File file,
//    		@RequestParam(value = "username", required=true) String user_name){
    	Response response = new Response();
    	try {
    		MultipartRequest multipartReq = (MultipartRequest)req;
    		String user_name = req.getParameter("username");
    		MultipartFile multipartFile = multipartReq.getFile("file");    		
    		
    		if(multipartFile.isEmpty() == false){    			
    			File file = new File( multipartFile.getOriginalFilename());
    			
    			multipartFile.transferTo(file);
    			String str_name = file.getName();
    			str_name = str_name.substring(0, str_name.lastIndexOf("."));
    	    	String str_tree_id = "";	
    	    	String str_tree_parent_id = "";	
    	    	String str_wf_id = "";	
    	    	String str_wfxml = "";
    			String str_dsxml = "";
    	    	
    	    	Connection conn = null;  
    			
    			String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
    	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
    	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
    	
    	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
    	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
    	    	java.sql.Statement st = null;
    	    	PreparedStatement pstmt = null;
    	    	ResultSet rs = null;
    			st = conn.createStatement();					
    						
    			StringBuilder sb=new StringBuilder();
    			BufferedReader bfr=new BufferedReader(new InputStreamReader(multipartFile.getInputStream()));  
    			String str = null;
    			
    			 while ((str = bfr.readLine())!= null) {
    				 sb.append(str);
    				 sb.append("\n");				 
      	         }		
    			 
    			 if(sb != null){
    				 
    				 if(sb.length() > 0){
    					
    					 if(sb.indexOf("xx_srt_workflow_xx") > 0){
    						 String [] str_xml = sb.toString().split("xx_srt_workflow_xx");
    						 str_wfxml = str_xml[0];	
    						 str_dsxml = str_xml[1];    						 
    						
    						 /*
    						// 트리 ID 구하기
    		    			 rs = st.executeQuery("SELECT MAX(ID)+1 AS ID FROM TREE");
    		    			
    		    			 while (rs.next ()){
    		    				 str_tree_id = rs.getString("ID");					
    		    			 }
    		    			 */
    		    			
    		    			 // 트리 부모 ID 구하기
    		    			 rs = st.executeQuery("SELECT ID FROM TREE WHERE USERNAME = '" + user_name + "' AND NAME = '/'" );
    		    			 while (rs.next ()){
    		    				 str_tree_parent_id = rs.getString("ID");					
    		    			 } 
    		    			 
    		    			 pstmt = conn.prepareStatement("INSERT INTO TREE ([NAME], TREE, NODE, ROOT, USERNAME, PARENT_ID ) VALUES (?, 'WORKFLOW','ITEM', 0, ?, ? )");
    		    			 //pstmt.setString(1, str_tree_id);
    		    			 pstmt.setString(1, str_name);
    		    			 pstmt.setString(2, user_name);
    		    			 pstmt.setString(3, str_tree_parent_id);
    		    			 pstmt.executeUpdate();
    		    			 
    		    			 rs = st.executeQuery("SELECT LAST_INSERT_ID() as tree_id, MAX(ID)+1 AS ID FROM WORKFLOW");    		    			 
    		    			
    		    			 if (rs.next ()){
    		    				 str_wf_id = rs.getString("ID");
    		    				 str_tree_id = rs.getString("tree_id");
    		    			 }
    		    			 
    		    			 pstmt = conn.prepareStatement("INSERT INTO WORKFLOW ( ID, WORKFLOW_ID, [NAME], DESCRIPTION, [VARIABLE], WORKFLOW_XML, DESIGNER_XML, CREATE_DT, [STATUS], TREE_ID, USERNAME ) VALUES ( ?, CONCAT('WF_',DATE_FORMAT(CURRENT_DATE,'%Y%m%d'),'_',FLOOR(DRAND()*1000000000)), ?,'',NULL, ?, ?, NOW(), 'REGISTERED',?, ? )" );
    		    			 pstmt.setString(1, str_wf_id);
    		    			 pstmt.setString(2, str_name);
    		    			 pstmt.setString(3, str_wfxml);
    		    			 pstmt.setString(4, str_dsxml);
    		    			 pstmt.setString(5, str_tree_id);
    		    			 pstmt.setString(6, user_name);
    		    			 pstmt.executeUpdate();    		    			 
    		    			 response.setSuccess(true);
    					 }
    				 }
    			 }
    			 
    			 rs.close();
		         st.close();
		         conn.close();
    		  }
    	} catch (Exception ex) {
    		response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
}
