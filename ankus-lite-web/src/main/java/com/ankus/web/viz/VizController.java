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
package com.ankus.web.viz;

import com.ankus.model.rest.*;
import com.ankus.provider.fs.FileSystemService;
import com.ankus.util.FileUtils;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.engine.EngineService;
import com.ankus.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import static org.apache.commons.lang.StringUtils.splitPreserveAllTokens;
import static org.slf4j.helpers.MessageFormatter.format;

@Controller
@RequestMapping("/viz")
public class VizController {

    private Logger logger = LoggerFactory.getLogger(VizController.class);

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Autowired
    private EngineService engineService;

    @RequestMapping(value = "file", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getFile(@RequestParam String path, @RequestParam String params) {
        Response response = new Response();

        if (StringUtils.isEmpty(params) || StringUtils.isEmpty(path)) {
            response.setSuccess(false);
            response.getError().setMessage("Invalid Parameter. 'path' and 'params' parameters is required.");
            return response;
        }

        try {
            response.setSuccess(true);

            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", path);
            command.putObject("filename", FileUtils.getFilename(path));

            String[] names = splitPreserveAllTokens(params, ",");

            Engine engine = engineService.getEngine(1L);
            Context context = getContext(engine);
            byte[] bytes = getFileSystemService(engine.getIp(), engine.getPort()).load(context, command);
            String file = new String(bytes);

            String[] rows = splitPreserveAllTokens(file, "\n");
            for (int i = 0; i < rows.length; i++) {
                String row = rows[i];
                if (!StringUtils.isEmpty(row)) {
                    String[] columns = splitPreserveAllTokens(row, ",");
                    if (columns.length != 0 && columns.length != names.length) {
                        response.setSuccess(false);
                        response.getError().setMessage("Invalid File Structure");
                        return response;
                    }

                    HashMap map = new HashMap();
                    for (int j = 0; j < columns.length; j++) {
                        try {
                            map.put(names[j].trim(), Integer.parseInt(columns[j].trim()));
                        } catch (Exception ex) {
                            map.put(names[j].trim(), columns[j].trim());
                        }
                    }
                    response.getList().add(map);
                }
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage("Cannot load a file on HDFS");
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    //////////////////////////////////////////////////////////////////////////////


    private Context getContext() {
        Engine engine = new Engine();
        engine.setId(new Long(1));
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        logger.debug("접근할 Hadoop Cluster는 '{}'입니다.", hadoopCluster.getName());

        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority(SessionUtils.getUsername(), SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        return context;
    }

    private Context getContext(Engine engine) {
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority(SessionUtils.getUsername(), SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        return context;
    }

    /**
     * Remote File System Service를 가져온다.
     *
     * @param ip   Workflow Engine의 IP
     * @param port Workflow Engine의 Port
     * @return Remote File System Service
     */
    private FileSystemService getFileSystemService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getFileSystemService(getFileSystemServiceUrl(engine));
    }

    /**
     * Remote File System Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private FileSystemService getFileSystemService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(FileSystemService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (FileSystemService) factoryBean.getObject();
    }

    /**
     * Remote File System URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote File System의 URL
     */
    private String getFileSystemServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/hdfs", engine.getIp(), engine.getPort()).getMessage();
    }

}