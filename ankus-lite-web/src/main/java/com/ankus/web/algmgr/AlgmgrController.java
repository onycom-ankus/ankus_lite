package com.ankus.web.algmgr;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ankus.model.rest.Context;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.FileSystemCommand;
import com.ankus.model.rest.Response;
import com.ankus.provider.fs.FileSystemService;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.configuration.ConfigurationManager;
import com.ankus.web.core.ConfigurationHelper;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.core.RemoteService;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

/**
 * Algmgr REST Controller.
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Controller
@RequestMapping("/main/algmgr")
public class AlgmgrController extends LocaleSupport {
    
    public static final String FILE_SEPARATOR = "/";
    
    /**
     * 알고리즘을 업로드한다.
     *
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "fileUpload", method = RequestMethod.POST,
            consumes = {"multipart/form-data"}
    )
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> upload(HttpServletRequest req) throws IOException {
        Response response = new Response();
       
        DefaultMultipartHttpServletRequest request = (DefaultMultipartHttpServletRequest) req;        
        java.util.Iterator<String> fileNames = request.getFileNames();   
        while(fileNames.hasNext()){       
        	String fileName = fileNames.next();
        	MultipartFile mFile = request.getFile(fileName);
        	String cachePath = ConfigurationHelper.getHelper().get("artifact.cache.path", "/tmp/cache");
        	File file = new File(cachePath + File.separator + mFile.getOriginalFilename());
        
        	if(mFile.getSize()!=0){
        		if(! file.exists()){
        			if(file.getParentFile().mkdirs()){
        				try {
        					file.createNewFile();
        				} catch (IOException e) {
        					e.printStackTrace();
        				}
        			}
        		} 
        		
        		try {
        			mFile.transferTo(file);
        		} catch (Exception ex) {
        	        	response.setSuccess(false);
        				response.getError().setMessage(ex.getMessage());
        				if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
        				response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        	    }
        	}	
        }
        response.setSuccess(true);
        String json = new ObjectMapper().writeValueAsString(response);
        return new ResponseEntity(json, HttpStatus.OK);
    }
    
    /**
     * 알고리즘을 삭제한다.
     *
     * @param params path 삭제하는 경로 
     * @return REST Response JAXB Object
     */ 
    @RequestMapping(value = "fileDelete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody   
    public Response delete(@RequestBody String[] path) throws Exception {	
        Response response = new Response();
        try {
        	if(path.length > 0){        		
        		for(int i = 0; i < path.length ; i++){
        			path[i] = path[i].replace("\\", File.separator);
        			System.out.println(path[i]);
        			File file = new File(path[i]);
        			file.delete();
        		}
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
    
}
