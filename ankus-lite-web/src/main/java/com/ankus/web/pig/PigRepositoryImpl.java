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
package com.ankus.web.pig;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class PigRepositoryImpl extends PersistentRepositoryImpl<Pig, Long> implements PigRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public PigRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public int selectTotalCountByCondition(Map params) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectTotalCountByCondition", params);
    }

    @Override
    public List<Pig> selectByCondition(Map params) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }
}