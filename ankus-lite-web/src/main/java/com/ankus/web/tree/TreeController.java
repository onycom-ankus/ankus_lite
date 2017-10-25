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
package com.ankus.web.tree;

import com.ankus.model.rest.NodeType;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.Tree;
import com.ankus.model.rest.TreeType;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.security.SessionUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Category를 지원하는 Tree의 공통 기능을 제공하는 Controller.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Controller
@RequestMapping("/tree")
public class TreeController implements InitializingBean {

    /**
     * ExtJS의 Tree의 공통 기능을 지원하는 Tree Service
     */
    @Autowired
    private TreeService treeService;

    /**
     * ROOT 노드의 ID
     */
    private final static String ROOT = "/";

    /**
     * 최초 애플리케이션이 초기화할 때 JOB, WORKFLOW 등과 같은 TREE를 추가한다.
     *
     * @throws Exception Tree를 초기화할 수 없는 경우
     */
    @Override
    public void afterPropertiesSet() throws Exception {
/*
        treeService.createRoot(TreeType.JOB, SessionUtils.getUsername());
        treeService.createRoot(TreeType.WORKFLOW, SessionUtils.getUsername());
*/
    }

    /**
     * 지정한 트리 유형의 특정 노드에 속한 자식 노드 목록을 반환한다.
     *
     * @param type 노드 유형
     * @param node 자식 노드를 탐색할 노드
     * @return HTTP REST Response
     */
    @RequestMapping(value = "get", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response get(@RequestParam String type, @RequestParam String node) {
        Response response = new Response();
        try {
            Tree parent = null;
            if (ROOT.equals(node)) {
                // ROOT 노드라면 Tree Type의 ROOT 노드를 부모 노드로 설정한다.
                parent = treeService.getRoot(TreeType.valueOf(type.trim()), SessionUtils.getUsername());
            } else {
                // ROOT 노드가 아니라면 PK인 Tree Id를 부모 노드로 설정한다.
                parent = treeService.get(Long.parseLong(node));
            }

            // 부모 노드의 자식 노드를 조회한다.
            List<Tree> childs = treeService.getChilds(parent.getId());
            for (Tree tree : childs) {
                Map map = new HashMap();
                map.put("id", tree.getId());
                map.put("cls", NodeType.FOLDER.equals(tree.getNodeType()) ? "folder" : "file");
                map.put("text", tree.getName());
                map.put("leaf", NodeType.FOLDER.equals(tree.getNodeType()) ? false : true);
                response.getList().add(map);
            }
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    /**
     * 새로운 노드를 생성한다. 노드를 생성하기 위해서 필요한 것은 다음과 같다.
     * <ul>
     * <li>부모 노드의 ID</li>
     * <li>생성할 Tree의 유형(예; <tt>JOB, WORKFLOW</tt>)</li>
     * <li>노드의 유형(예; <tt>FOLDER, ITEM</tt>)(</li>
     * <li>노드의 이름(</li>
     * <li>ROOT 노드 여부(기본값은 <tt>false</tt>)(</li>
     * </ul>
     *
     * @param map 노드 생성을 위한 Key Value
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "new", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response newDirectory(@RequestBody Map<String, String> map) {
        Response response = new Response();
        try {
            TreeType treeType = TreeType.valueOf(map.get("treeType").toUpperCase());
            NodeType nodeType = NodeType.valueOf(map.get("nodeType").toUpperCase());

            Tree parent = null;
            if (ROOT.equals(map.get("id"))) {
                // ROOT 노드라면 Tree Type의 ROOT 노드를 부모 노드로 설정한다.
                parent = treeService.getRoot(treeType, SessionUtils.getUsername());
            } else {
                // 새로운 노드를 추가하기 위해서 부모 노드를 먼저 알아낸다.
                long parentId = Long.parseLong(map.get("id"));
                parent = treeService.get(parentId);
            }

            // 부모 노드에 속한 자식 노드를 생성하고 그 결과를 구성한다.
            Tree tree = treeService.create(parent, new Tree(map.get("name")), nodeType);
            response.getMap().put("id", tree.getId());
            response.getMap().put("text", tree.getName());
            response.getMap().put("cls", "folder");
            response.getMap().put("leaf", false);
            response.setSuccess(true);
        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    /**
     * 현재 노드와 Tree 유형을 기준으로 노드를 삭제한다. 노드를 삭제하기 위해 다음의 값이 필요하다.
     * <ul>
     * <li>삭제할 노드의 ID</li>
     * <li>생성할 Tree의 유형(예; <tt>JOB, WORKFLOW</tt>)</li>
     * </ul>
     *
     * @param map 노드 생성을 위한 Key Value
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response deleteDirectory(@RequestBody Map<String, String> map) {
        Response response = new Response();
        try {
            Tree tree = new Tree(Long.parseLong(map.get("id")));
            tree.setTreeType(TreeType.valueOf(map.get("treeType").toUpperCase()));
            treeService.delete(tree.getId());
            response.setSuccess(true);
        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    /**
     * 현재 노드명을 변경한다. 노드명을 변경하기 위해 다음의 값이 필요하다.
     * <ul>
     * <li>이름을 변경할 노드의 ID</li>
     * <li>변경할 노드명</li>
     * </ul>
     *
     * @param map 노드 생성을 위한 Key Value
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "rename", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response renameDirectory(@RequestBody Map<String, String> map) {
        Response response = new Response();
        try {
            Tree tree = new Tree(Long.parseLong(map.get("id")));
            treeService.rename(tree, map.get("name"));
            response.setSuccess(true);
        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    /**
     * 노드를 이동한다.
     * <ul>
     * <li>from - 이동할 노드(노드)</li>
     * <li>to - 최종 목적지 노드(폴더)</li>
     * </ul>
     *
     * @param map from, to를 포함하는 노드
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "move", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response move(@RequestBody Map<String, String> map) {
        Response response = new Response();
        try {
            treeService.move(map.get("from"), map.get("to"), TreeType.valueOf(map.get("type")));
            response.setSuccess(true);
        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }
}
