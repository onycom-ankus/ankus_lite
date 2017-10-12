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

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import com.ankus.model.rest.Workflow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DesignerRepositoryImpl extends PersistentRepositoryImpl<Workflow, Long> implements DesignerRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public DesignerRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

	@Override
	public List<Workflow> getList() {
		return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectAll");
	}

	@Override
	public List<Workflow> getList(String username) {
		return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByUsername", username);
	}

}