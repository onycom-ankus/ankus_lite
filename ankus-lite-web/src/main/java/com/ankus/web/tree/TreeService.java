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

import java.util.List;

import com.ankus.model.rest.NodeType;
import com.ankus.model.rest.Tree;
import com.ankus.model.rest.TreeType;
import com.ankus.web.member.Member;

/**
 * Tree Service Interface.
 *
 * @author Edward KIM
 * @since 0.1
 */
public interface TreeService {

    /**
     * 지정한 노드의 이름을 변경한다.
     *
     * @param node 이름을 변경할 노드
     * @param name 변경할 이름
     * @return 이름 변경 여부
     */
    boolean rename(Tree node, String name);

    /**
     * 지정한 노드를 삭제한다.
     *
     * @param id 삭제할 노드의 ID
     * @return 삭제 여부
     */
    boolean delete(long id);

    /**
     * 새로운 노드를 부모 노드의 자식 노드로 생성한다.
     *
     * @param parent   자식 노드의 부모 노드(UI상에서 선택한 노드)
     * @param child    생성할 자식 노드
     * @param nodeType Node의 유형
     * @return Primary Key를 가진 자식 노드
     */
    Tree create(Tree parent, Tree child, NodeType nodeType);

    /**
     * 새로운 Tree 구성을 위한 루트 노드를 생성한다.
     * 이미 존재한다면 다시 생성하지 않는다.
     *
     * @param treeType Tree의 유형
     * @param username Username
     * @return Primary Key를 가진 자식 노드
     */
    Tree createRoot(TreeType treeType, String username);

    /**
     * 동일한 이름을 가진 자식 노드가 존재하는지 확인한다.
     *
     * @param parent   자식 노드의 부모 노드(UI상에서 선택한 노드)
     * @param child    확인할 자식 노드
     * @param treeType Tree의 유형
     * @param nodeType Node의 유형
     * @return 같은 노드가 존재하는 경우 <tt>true</tt>
     */
    boolean checkSameNode(Tree parent, Tree child, TreeType treeType, NodeType nodeType);

    /**
     * Tree에서 현재 선택한 노드의 자식 노드에 같은 이름을 가진 노드가 있는지 확인한다.
     *
     * @param selectedNode Tree에서 선택한 노드
     * @param name         자식 노드의 이름
     * @param treeType     Tree의 유형
     * @return 같은 이름이 존재하는 경우 <tt>true</tt>
     */
    boolean existSubItem(Tree selectedNode, String name, TreeType treeType);

    /**
     * Tree에서 현재 선택한 노드의 자식 노드에 같은 이름을 가진 폴더가 있는지 확인한다.
     *
     * @param selectedNode Tree에서 선택한 노드
     * @param name         자식 폴더의 이름
     * @param treeType     Tree의 유형
     * @return 같은 이름이 존재하는 경우 <tt>true</tt>
     */
    boolean existSubFolder(Tree selectedNode, String name, TreeType treeType);

    /**
     * Tree의 ROOT 노드를 반환한다.
     *
     * @param treeType Tree의 유형
     * @param username Username
     * @return ROOT 노드
     */
    Tree getRoot(TreeType treeType, String username);

    /**
     * 지정한 부모 노드의 자식 노드들을 반환한다.
     *
     * @param parentId 부모 노드의 ID
     * @return 자식 노드
     */
    List<Tree> getChilds(long parentId);

    /**
     * 지정한 Tree를 반환한다.
     *
     * @param id Tree의 ID
     * @return 존재하지 않는 경우 <tt>null</tt>
     */
    Tree get(long id);

    /**
     * 노드를 이동한다.
     *
     * @param from Source 노드
     * @param to   Target 노드
     * @param type Tree 노드의 유형
     */
    void move(String from, String to, TreeType type);

    /**
     * 
     * @param id
     * @param username
     * @return
     */
    List<Tree> getWorkflowChilds(long id, Member member);
}
