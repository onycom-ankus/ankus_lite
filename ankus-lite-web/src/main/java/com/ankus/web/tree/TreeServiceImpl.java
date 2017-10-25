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
import com.ankus.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Tree Service.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Service
public class TreeServiceImpl implements TreeService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(TreeServiceImpl.class);

    /**
     * Tree Repository
     */
    @Autowired
    private TreeRepository treeRepository;
    
    @Override
    public boolean rename(Tree tree, String name) {
        Tree master = treeRepository.select(tree.getId());
        master.setName(name);
        return treeRepository.update(master) > 0;
    }

    @Override
    public boolean delete(long id) {
        return treeRepository.delete(id) > 0;
    }

    @Override
    public Tree create(Tree parent, Tree child, NodeType nodeType) {
        child.setParent(parent);
        child.setNodeType(nodeType);
        child.setTreeType(parent.getTreeType());
        child.setUsername(parent.getUsername());
        child.setRoot(false);
        treeRepository.insert(child);// FIXME
        return child;
    }

    @Override
    public Tree createRoot(TreeType treeType, String username) {
        if (!treeRepository.existRoot(treeType, username)) {
            Tree tree = new Tree("/");
            tree.setTreeType(treeType);
            tree.setNodeType(NodeType.FOLDER);
            tree.setRoot(true);
            tree.setUsername(username);
            int insert = treeRepository.insert(tree);  // FIXME
            return tree;
        }
        return treeRepository.getRoot(treeType, username);
    }

    @Override
    public boolean checkSameNode(Tree parent, Tree child, TreeType treeType, NodeType nodeType) {
        if (nodeType == NodeType.FOLDER) {
            return this.existSubFolder(new Tree(parent.getId()), child.getName(), treeType);
        } else {
            return this.existSubItem(new Tree(parent.getId()), child.getName(), treeType);
        }
    }

    @Override
    public boolean existSubItem(Tree selectedNode, String name, TreeType treeType) {
        return treeRepository.existSameChild(selectedNode, name, treeType, NodeType.ITEM);
    }

    @Override
    public boolean existSubFolder(Tree selectedNode, String name, TreeType treeType) {
        return treeRepository.existSameChild(selectedNode, name, treeType, NodeType.FOLDER);
    }

    @Override
    public Tree getRoot(TreeType treeType, String username) {
        return treeRepository.getRoot(treeType, username);
    }

    @Override
    public List<Tree> getChilds(long parentId) {
        return treeRepository.getChilds(parentId);
    }

    @Override
    public Tree get(long id) {
        return treeRepository.select(id);
    }

    @Override
    public void move(String from, String to, TreeType type) {
        Tree source = treeRepository.select(Long.parseLong(from));
        Tree target;
        if ("/".equals(to)) {
            target = treeRepository.getRoot(type, SessionUtils.getUsername()); // FIXME
        } else {
            target = treeRepository.select(Long.parseLong(to));
        }
        source.setParent(target);
        treeRepository.update(source);
    }

    @Override
    public List<Tree> getWorkflowChilds(long parentId, Member member) { 
        return treeRepository.selectWorkflowChilds(parentId, member);        
    }

    public void setTreeRepository(TreeRepository treeRepository) {
        this.treeRepository = treeRepository;
    }
}
