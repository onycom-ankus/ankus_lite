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
package com.ankus.web.jar;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.VisualizationHistory;
import com.ankus.provider.fs.FileSystemService;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.RemoteService;
import com.ankus.web.engine.EngineService;
import com.ankus.web.job.JobService;
import com.ankus.web.member.Member;
import com.ankus.web.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.ankus.model.rest.Engine;
import com.ankus.web.jar.JarService;
/**
 * 인덱스 페이지 및 기본적인 페이지 이동 기능을 제공하는 컨트롤러.
 */
@Controller
@RequestMapping("/")
public class JarController {
    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(JarController.class);
    
    @Autowired
    private JarService jarService;
    
    @Autowired
    private EngineService engineService;
    
    @Autowired
    private RemoteService lookupService;
    
    @Autowired
    private MemberService memberService;
    
	// 2016-03-08 algorithm meta info load from jar file 
	@RequestMapping(value = "getmoduleinfos1", method = RequestMethod.POST)
	public void getmoduleinfos(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "path", required=false) String path
	  	, @RequestParam(defaultValue = "6") long engineId
  		) throws Exception{
		
		String metainfos = "";
		
		System.out.printf("============>getmoduleinfos1\n");		
		
		if(path==null) path = "/tmp/cache/jar";
		
		 metainfos = jarService.getModuleInfos(engineId, path);
		 System.out.println("metainfos------>" + metainfos);
		 PrintWriter out = null;
		 out = resp.getWriter();
		 out.write(metainfos);
	}
	
	// 2016-03-08 get resource from jar file 
	@RequestMapping(value = "getmoduleresource1", method = RequestMethod.GET)
	public void getmoduleresource(HttpServletRequest req, HttpServletResponse resp
		, @RequestParam(value = "jarfile", required=true) String jarfile
		, @RequestParam(value = "resource", required=true) String resource
		, @RequestParam(defaultValue = "") String username
		, @RequestParam(defaultValue = "6") long engineId
  		) throws Exception {
		
		Member member = memberService.getMemberByUser(username);
        List<Engine> engines = engineService.getEngines(member);
		
		Engine engine = engineService.getEngine(engineId);
		
		//FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.MODULE, engine);
		
		System.out.printf("============>getmoduleresource\n");
		
		String zipFilePath = jarfile;
		String fname = resource;
		
		//byte[] data = fileSystemService.getReadfile(zipFilePath, fname);
		
		byte[] data = jarService.getReadfile(engineId, zipFilePath, fname);
			      
		System.out.println("--------> : 222" + data.toString());
	    BufferedOutputStream output = new BufferedOutputStream(resp.getOutputStream());   
	      
	    output.write(data);
	    output.close();
        		
	}	
}
