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
package com.ankus.web.engine;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import com.ankus.model.rest.Engine;
import com.ankus.web.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EngineRepositoryImpl extends PersistentRepositoryImpl<Engine, Long> implements EngineRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public EngineRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<Engine> selectAll(Member member) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectAll", member);
    }

	@Override
	public int addPermission(long engineId, String username) {
		HashMap map = new HashMap();
		map.put("id", engineId);
		map.put("username", username);
		return this.getSqlSessionTemplate().insert(this.getNamespace() + ".insertPermission", map);
	}
	
	@Override
	public int deletePermission(long engineId) {
		return this.getSqlSessionTemplate().delete(this.getNamespace() + ".deletePermission", engineId);
	}


	
	
}
