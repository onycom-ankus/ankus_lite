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

import java.io.ByteArrayOutputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import com.ankus.core.exception.ParsingException;
import com.ankus.core.exception.PersistenceException;
import com.ankus.core.exception.WorkflowException;
import com.ankus.model.opengraph.Opengraph;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.Error;
import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.NodeType;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.State;
import com.ankus.model.rest.Tree;
import com.ankus.model.rest.TreeType;
import com.ankus.model.rest.Visualization;
import com.ankus.model.rest.VisualizationHistory;
import com.ankus.model.rest.Workflow;
import com.ankus.model.rest.WorkflowHistory;
import com.ankus.model.rest.WorkflowStatusType;
import com.ankus.provider.engine.HistoryService;
import com.ankus.provider.engine.JobService;
//import com.ankus.provider.engine.VisualizationJobService;
import com.ankus.util.DateUtils;
import com.ankus.util.ExceptionUtils;
import com.ankus.util.JVMIDUtils;
import com.ankus.util.JaxbUtils;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.engine.EngineService;
import com.ankus.web.member.Member;
import com.ankus.web.member.MemberService;
import com.ankus.web.security.SessionUtils;
import com.ankus.web.tree.TreeService;
//import com.ankus.web.visualization.VisualRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Service;

@Service
public class DesignerServiceImpl extends LocaleSupport implements DesignerService {
    
    private Logger logger = LoggerFactory.getLogger(DesignerServiceImpl.class);   
    //Jackson JSON Object Mapper
    private static ObjectMapper objectMapper = new ObjectMapper();   
    //ankus Site XML의 JAXB Object 패키지명
    public static String WORKFLOW_JAXB_PACKAGE_NAME = "com.ankus.model.workflow";
    //OpenGraph XML의 JAXB Package.
    public static String OPENGRAPH_JAXB_PACKAGE = "com.ankus.model.opengraph";

    //워크플로우 디자이너의 워크플로우 목록 관리 기능을 제공하는 트리 서비스.    
    @Autowired
    private TreeService treeService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private EngineService engineService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Autowired
    private DesignerRepository designerRepository;
    //private VisualRepository visualizationRepository;
    
    @Autowired
    private OpenGraphMarshaller openGraphMarshaller;

    @Override
    public Workflow getWorkflow(long workflowId) {
        return designerRepository.select(workflowId);
    }

    public String load(long id) {
        Workflow workflow = designerRepository.select(id);
        
        if (workflow == null) {
            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_EXIST_WORKFLOW"));
        }
        
        //String workflow_org = workflow.getDesignerXml().replace("&lt;", "<").replace("amp;", "").replace("&gt", ">");
        //return workflow_org;
        return workflow.getDesignerXml();
    }

    @Override
    public void run(Long id, Long engineId) 
    {
    	try
    	{
		        Engine engine = engineService.getEngine(engineId);
		        if (engine == null) 
		        {
		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
		        }
		        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
		        JobService job = getJobService(engine);
		        
		        Workflow workflow = designerRepository.select(id);//SELECT QUERY CALL

		        Member minfo = memberService.getMemberByUser(workflow.getUsername());
		        String authority = "ROLE_ADMIN";
		        if(minfo!=null) authority = minfo.getAuthority();
		        
		        job.run(workflow, hadoopCluster, authority);
		        
		        System.out.printf("run=============>%s\n", authority);
		                     	
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
       
    }
    
    @Override
    public void delete(Long treeId, Long workflowId) {
        treeService.delete(treeId);
        designerRepository.delete(workflowId);
    }
    
    @Override
    //저장(수정)
    public Workflow regist(String parentTreeId, String openGraphXml, String username) {
        try {
            Opengraph opengraph = (Opengraph) JaxbUtils.unmarshal(OPENGRAPH_JAXB_PACKAGE, openGraphXml);
            com.ankus.model.workflow.Workflow wf = openGraphMarshaller.unmarshal(openGraphXml);

            Workflow workflow = new Workflow();
            workflow.setWorkflowName(wf.getWorkflowName());
            workflow.setDescription(wf.getDescription().getValue());
            workflow.setUsername(username);
            workflow.setCreate(new Timestamp(System.currentTimeMillis()));
            workflow.setStatus(WorkflowStatusType.REGISTERED);
            workflow.setDesignerXml(injectIdentifier(opengraph, workflow));
            workflow.setWorkflowXml(JaxbUtils.marshal(WORKFLOW_JAXB_PACKAGE_NAME, wf));
            //2015.08.19.tkkim
            
            String workflow_org = workflow.getWorkflowXml();
            //String str_workflow = workflow_org.replace("&lt;", "<").replace("amp;", "").replace("&gt", ">");            		
            workflow.setWorkflowXml(workflow_org);
           
            if (regist(workflow, parentTreeId, username)) {
                workflow.setDesignerXml(injectIdentifier(opengraph, workflow));
                designerRepository.update(workflow);

                String message = message("S_DESIGNER", "REGIST_WORKFLOW_REQ", workflow.getId(), workflow.getWorkflowName());
                logger.info(message);
                return workflow;
            } else {
                throw new PersistenceException(message("S_DESIGNER", "DO_NOT_SAVE_WORKFLOW"));
            }
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_REGIST_WORKFLOW2", ex.getMessage());
            logger.warn("{}", message, ex);
            throw new WorkflowException(message("S_DESIGNER", "CANNOT_REGIST_WORKFLOW_MSG"), ex);
        }
    }
    @Override
    //저장.
    public Workflow update(Long treeId, Long id, String openGraphXml, String username) {
        try {
            Opengraph opengraph = (Opengraph) JaxbUtils.unmarshal(OPENGRAPH_JAXB_PACKAGE, openGraphXml);
            com.ankus.model.workflow.Workflow wf = openGraphMarshaller.unmarshal(openGraphXml);

            Workflow workflow = designerRepository.select(id);
            workflow.setWorkflowName(wf.getWorkflowName());
            workflow.setDescription(wf.getDescription().getValue());
            workflow.setWorkflowXml(JaxbUtils.marshal(WORKFLOW_JAXB_PACKAGE_NAME, wf));
            workflow.setDesignerXml(injectIdentifier(opengraph, workflow));
            workflow.setUsername(SessionUtils.getUsername());
            
            //2015.08.19.tkkim            
            String workflow_org = workflow.getWorkflowXml();
            //String str_workflow = workflow_org.replace("&lt;", "<").replace("amp;", "").replace("&gt", ">");            		
            workflow.setWorkflowXml(workflow_org);

            designerRepository.update(workflow);

            Tree tree = treeService.get(treeId);
            treeService.rename(tree, wf.getWorkflowName());

            String message = message("S_DESIGNER", "REGIST_WORKFLOW_UPD", workflow.getId(), workflow.getWorkflowName());
            logger.info(message);
            return workflow;
        } catch (Exception ex) {
            throw new WorkflowException(ExceptionUtils.getMessage(message("S_DESIGNER", "CANNOT_REGIST_WORKFLOW_MSG")), ex);
        }
    }
    /**
     * OpenGraph의 커스텀 데이터 영역에 워크플로우의 식별자 정보를 주입한다.
     *
     * @param opengraph OpenGraph JAXB  Object
     * @param workflow  Workflow Domain Object
     * @return OpenGraph XML
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	private String injectIdentifier(Opengraph opengraph, Workflow workflow) {
        try {
            Map map = objectMapper.readValue(OpenGraphMarshaller.unescape(opengraph.getData()), Map.class);

            Map wf = (Map) map.get("workflow");
            wf.put("id", workflow.getId());
            wf.put("tree_id", workflow.getWorkflowTreeId());
            wf.put("instance_id", workflow.getWorkflowId());

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            objectMapper.writeValue(baos, map);
            opengraph.setData(OpenGraphMarshaller.escape(new String(baos.toByteArray())));
            String openGraphXml = JaxbUtils.marshal(OPENGRAPH_JAXB_PACKAGE, opengraph);

            logger.debug(message("S_DESIGNER", "OPENGRAPH_XML_INJECT", openGraphXml));
            return openGraphXml;
        } catch (Exception ex) {
            throw new ParsingException(message("S_DESIGNER", "DO_NOT_INJECT_WORKFLOW_ID"), ex);
        }
    }

    private boolean regist(Workflow workflow, String parentTreeId, String username) {
        Tree parent = null;
        if ("/".equals(parentTreeId)) {
            parent = treeService.getRoot(TreeType.WORKFLOW, username);
        } else {
            parent = treeService.get(Long.parseLong(parentTreeId));
        }
        Tree child = treeService.create(parent, new Tree(workflow.getWorkflowName()), NodeType.ITEM);
        workflow.setWorkflowTreeId(child.getId());
        workflow.setWorkflowId(MessageFormatter.arrayFormat("WF_{}_{}", new String[]{
                DateUtils.getCurrentYyyymmdd(), JVMIDUtils.generateUUID()
        }).getMessage());
        return designerRepository.insert(workflow) > 0;
    }
    
    public void ankus_cache_put(Long engineId, String filename, byte[] data)
    {
    	try
    	{
    			Engine engine = engineService.getEngine(engineId);
    			if (engine == null) {
  		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
  		        }    				        
		      
		        JobService job = getCacheService(engine);
		        
		        job.ankus_cache_put(filename, data);
		                     	
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
    }
    
    public HashMap<String, Object> ankus_cache_list(Long engineId)
    {
    	try
    	{
    			Engine engine = engineService.getEngine(engineId);
    			if (engine == null) {
  		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
  		        }    				        
		      
		        JobService job = getCacheService(engine);
		        
		        return job.ankus_cache_list();
		                     	
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return null;
    }
    
    
    public String getCacheClear(Long engineId) 
    {
    	try
    	{
    			Engine engine = engineService.getEngine(engineId);
    			if (engine == null) {
  		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
  		        }    				        
		      
		        JobService job = getCacheService(engine);
		        
		        String returnIP = job.cacheClear(engineId);
		        
		       System.out.println("returnIP: " + returnIP);
		                     	
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return null;
       
    }

    

    private JobService getJobService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (JobService) factoryBean.getObject();
    }
   
    private JobService getJobService(Engine engine) {
        return getJobService(getJobServiceUrl(engine));
    }
   
    private String getJobServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/job", engine.getIp(), engine.getPort()).getMessage();
    }
    
    private JobService getCacheService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (JobService) factoryBean.getObject();
    }
   
    private JobService getCacheService(Engine engine) {
        return getJobService(getCacheServiceUrl(engine));
    }
   
    private String getCacheServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/cache", engine.getIp(), engine.getPort()).getMessage();
    }

	@Override
	public List<Workflow> getList(String username) {
		List<Workflow> workflows = null;
		if(username == null){
			workflows = designerRepository.getList();
		}else{
			workflows = designerRepository.getList(username);
		}
		return workflows;
	}  

}
