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
package com.ankus.fs.audit;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import com.ankus.model.rest.AuditHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ankus.util.StringUtils.isEmpty;

@Repository
public class AuditLogRepositoryImpl extends PersistentRepositoryImpl<AuditHistory, Long> implements AuditLogRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public AuditLogRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<AuditHistory> selectByCondition(String startDate, String endDate, String path, String type, int start, int limit, String orderBy, String desc, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("path")) params.put("path", path);
        if (!isEmpty("auditType")) params.put("auditType", type);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        params.put("start", start);
        params.put("limit", limit);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }

    @Override
    public int getTotalCountByCondition(String startDate, String endDate, String path, String type, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("path")) params.put("path", path);
        if (!isEmpty("auditType")) params.put("auditType", type);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".getTotalCountByUsername", params);
    }
}