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

import java.util.HashMap;
import java.util.List;

import com.ankus.model.rest.Workflow;

public interface DesignerService {

    /**
     * Workflow Id로 Workflow를
     *
     * @param id Workflow의 식별자
     * @return Workflow
     */
    Workflow getWorkflow(long id);

    /**
     * 신규로 Workflow를 등록한다.
     *
     * @param parentTreeId 부모 Tree의 식별자
     * @param xml          Designer XML
     * @param username     Username
     * @return 새로 저장한 Workflow
     */
    Workflow regist(String parentTreeId, String xml, String username);

    /**
     * 이미 등록되어 있는 Workflow를 업데이트한다.
     *
     * @param treeId   Tree의 식별자
     * @param id       Workflow의 식별자
     * @param xml      Designer XML
     * @param username Username
     * @return 업데이트한 Workflow
     */
    Workflow update(Long treeId, Long id, String xml, String username);

    /**
     * 워크플로우를 로딩한다.
     *
     * @param id Workflow의 식별자
     * @return 로딩한 Workflow
     */
    String load(long id);

    /**
     * 워크플로우를 실행한다.
     *
     * @param id       Workflow의 식별자
     * @param engineId Workflow Engine의 식별자
     */
    void run(Long id, Long engineId);

  //  String visulization_run(Long id, Long engineId, String jarparams);    

    /**
     * 지정한 워크플로우를 삭제한다.
     *
     * @param treeId     삭제할 워크플로우의 Tree 식별자
     * @param workflowId 삭제할 워크플로우의 식별자
     */
    void delete(Long treeId, Long workflowId);

    //void getCacheClear(Long engineId);

    public void ankus_cache_put(Long engine, String filename, byte[] data);
    
    public HashMap<String, Object> ankus_cache_list(Long engine);
    
    String getCacheClear(Long engineId);
    
    /**
     * 워크플로우 목록을 가져온다.
     * @param username
     * @return
     */
    List<Workflow> getList(String username);
    
}
