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
package com.ankus.web.job;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.ankus.model.rest.Engine;
import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.engine.EngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/job")
public class JobController {

    /**
     * ankus Engine Management Remote Service
     */
    @Autowired
    private EngineService engineService;

    @Autowired
    private JobService jobService;
    
    @Autowired
    private MessageSource pMSG;

    @RequestMapping(value = "valid", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response isValidCronExpression(@RequestParam String cronExpression, Locale locale) {
        Response response = new Response();
        try {
            CronExpression.isValidExpression(cronExpression);
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(pMSG.getMessage("JAVA_JOB_CONTR_NOT_EXPRESSION", null, locale));
            if (ex.getCause() != null) response.getError().setCause(ex.getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    @RequestMapping(value = "regist", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response regist(@RequestBody Map<String, String> params, Locale locale) {
        Response response = new Response();
        try {
            String jobId = jobService.regist(Long.parseLong(params.get("engineId")), params.get("jobName"), Long.parseLong(params.get("wid")), params.get("cron"), new HashMap());
            response.setSuccess(true);
            response.getMap().put("jobId", jobId);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(pMSG.getMessage("JAVA_JOB_CONTR_NOT_REGIST_BAT", null, locale));
            if (ex.getCause() != null) response.getError().setCause(ex.getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(@RequestParam(defaultValue = "") String startDate, @RequestParam(defaultValue = "") String endDate,
                         @RequestParam(defaultValue = "") String jobName,
                         @RequestParam(defaultValue = "WORKFLOW") String jobType,
                         @RequestParam(defaultValue = "0") long engineId,
                         @RequestParam(defaultValue = "ALL") String status,
                         @RequestParam(defaultValue = "ID") String sort,
                         @RequestParam(defaultValue = "DESC") String dir,
                         @RequestParam(defaultValue = "0") int start, @RequestParam(defaultValue = "16") int limit,
                         Locale locale) {

        Response response = new Response();
        try {
            Engine engine = engineService.getEngine(engineId);
            List<Map> jobs = jobService.getJobs(engine);
            response.getList().addAll(jobs);
            response.setTotal(jobs.size());
            response.getMap().put("current", jobService.getCurrentDate(engine));
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(pMSG.getMessage("JAVA_JOB_CONTR_NOT_SEARCH_BAT", null, locale));
            if (ex.getCause() != null) response.getError().setCause(ex.getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
}
