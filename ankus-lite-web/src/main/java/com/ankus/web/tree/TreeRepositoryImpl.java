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

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import com.ankus.model.rest.NodeType;
import com.ankus.model.rest.Tree;
import com.ankus.model.rest.TreeType;
import com.ankus.web.member.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Hibernate Tree Repository.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Repository
public class TreeRepositoryImpl extends PersistentRepositoryImpl<Tree, Long> implements TreeRepository {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(TreeRepositoryImpl.class);

    /**
     * Hibernate Session Factory
     */
    private SessionFactory sessionFactory;

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public TreeRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<Tree> getChilds(long parentId) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectChilds", parentId);
    }

    @Override
    public List<Tree> getChilds(long parentId, TreeType treeType, NodeType nodeType) {
        Tree parent = select(parentId);
        Session currentSession = sessionFactory.getCurrentSession();
        Criteria criteria = currentSession.createCriteria(Tree.class);
        return criteria
                .add(Restrictions.eq("parent", parent))
                .add(Restrictions.eq("treeType", treeType))
                .add(Restrictions.eq("nodeType", nodeType))
                .add(Restrictions.eq("root", "false"))
                .list();
    }

    @Override
    public boolean existSameChild(Tree current, String name, TreeType treeType, NodeType nodeType) {
        Session currentSession = sessionFactory.getCurrentSession();
        Criteria criteria = currentSession.createCriteria(Tree.class);
        return ((Long) criteria
                .add(Restrictions.eq("parent", current))
                .add(Restrictions.eq("treeType", treeType))
                .add(Restrictions.eq("nodeType", nodeType))
                .add(Restrictions.eq("name", name.trim()))
                .add(Restrictions.eq("root", "false"))
                .setProjection(Projections.rowCount())
                .list().get(0)).longValue() > 0;
    }

    @Override
    public boolean existRoot(TreeType treeType, String username) {
        return getRoot(treeType, username) != null;
    }

    @Override
    public Tree getRoot(TreeType treeType, String username) {
        Tree tree = new Tree();
        tree.setUsername(username);
        tree.setTreeType(treeType);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectRoot", tree);
    }

    @Override
    public List<Tree> selectWorkflowChilds(long parentId, Member member) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectWorkflowChilds", member);
    }

    @Override
    public Tree getParent(Tree child) {
        if (child.getParent() != null) {
            return child.getParent();
        }
        return this.select(child.getId()).getParent();
    }
}
