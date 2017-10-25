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
package com.ankus.web.visualization;

import com.ankus.model.rest.Response;
import com.ankus.model.rest.Visualization;
import com.ankus.model.rest.VisualizationHistory;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Visualization Controller.
 *
 * @author Jaesung Ahn
 */
@Controller
@RequestMapping("/visualization")
public class VisualizationController extends LocaleSupport {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(VisualizationController.class);

    /**
     * Designer Service
     */
    @Autowired
    private VisualizationService visualizationService;

    @RequestMapping(value = "run", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response run(@RequestBody Visualization visualization) {
        Response response = new Response();
        
        try {
        	VisualizationHistory visualizationHistory = visualizationService.run(visualization, visualization.getEngine());
 
        	response.setObject(visualizationHistory);
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", "visualization", ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    } 

    @RequestMapping(value = "visualization", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getVisualizationHistory(@RequestParam(defaultValue = "0") String jobStringId, @RequestParam(defaultValue = "0") long engineId) {
    	Response response = new Response();
    	
    	try {
    		VisualizationHistory visualizationHistory = visualizationService.getVisualizationHistoryByJobStringId(jobStringId, engineId);
    		
    		response.setObject(visualizationHistory);
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
