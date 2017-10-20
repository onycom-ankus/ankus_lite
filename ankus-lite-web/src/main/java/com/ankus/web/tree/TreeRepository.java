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

import com.ankus.core.repository.PersistentRepository;
import com.ankus.model.rest.NodeType;
import com.ankus.model.rest.Tree;
import com.ankus.model.rest.TreeType;
import com.ankus.web.member.Member;

/**
 * Tree Repository.
 *
 * @author Edward KIM
 * @since 0.1
 */
public interface TreeRepository extends PersistentRepository<Tree, Long> {

    public static final String NAMESPACE = TreeRepository.class.getName();

    /**
     * 지정한 부모 노드의 자식 노드들을 반환한다.
     *
     * @param parentId 부모 노드의 ID
     * @return 자식 노드
     */
    List<Tree> getChilds(long parentId);

    /**
     * 지정한 부모 노드의 자식 노드들을 반환한다.
     *
     * @param parentId 부모 노드의 ID
     * @param treeType Tree의 유형
     * @param nodeType 노드의 유형
     * @return 자식 노드
     */
    List<Tree> getChilds(long parentId, TreeType treeType, NodeType nodeType);

    /**
     * 지정한 부모 노드의 자식 노드 중에서 같은 이름을 가진 노드가 있는지 확인한다.
     * Tree에서 동일한 레벨에서 같은 이름을 가진 노드를 허용하지 않는다면
     * 이 값이 <tt>true</tt> 경우 저장을 하지 않도록 한다.
     *
     * @param current  현재 노드
     * @param name     이름
     * @param treeType Tree의 유형
     * @param nodeType 노드의 유형
     * @return 같은 이름을 가진 노드가 있다면 <tt>true</tt>
     */
    boolean existSameChild(Tree current, String name, TreeType treeType, NodeType nodeType);

    /**
     * 지정한 자식 노드의 Child 노드를 반환한다.
     * 현재 지정한 자식 노드에 이미 부모 노드가 있다면 그대로 반환하고 그렇지 않다면 부모 노드를 조회한다.
     *
     * @param child 자식 노드
     * @return 부모 노드
     */
    Tree getParent(Tree child);

    /**
     * 지정한 Tree의 ROOT 노드가 존재하는지 확인한다.
     *
     * @param treeType Tree의 유형
     * @param username Username
     * @return 존재하는 경우 <tt>true</tt>
     */
    boolean existRoot(TreeType treeType, String username);

    /**
     * Tree의 ROOT 노드를 반환한다.
     *
     * @param treeType Tree의 유형
     * @param username Username
     * @return ROOT 노드
     */
    Tree getRoot(TreeType treeType, String username);

    List<Tree> selectWorkflowChilds(long parentId, Member member);
}
