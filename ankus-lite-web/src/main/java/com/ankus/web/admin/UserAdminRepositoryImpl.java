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
package com.ankus.web.admin;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import com.ankus.model.rest.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ankus.util.StringUtils.isEmpty;

@Repository
public class UserAdminRepositoryImpl extends PersistentRepositoryImpl<User, Long> implements UserAdminRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public UserAdminRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<User> selectAll() {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectAll");
    }

    @Override
    public List<User> selectByCondition(String jobType, String createDate, String username, String email, String enabled, String authority, String orderBy, String desc, int start, int limit) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("createDate")) params.put("createDate", createDate);
        if (!isEmpty("email")) params.put("email", email);
        if (!isEmpty("enabled")) params.put("enabled", enabled);
        if (!isEmpty("authority")) params.put("authority", authority);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        params.put("start", start);
        params.put("limit", limit);

        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }

    @Override
    public boolean selectByName(String username) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByName", username);
    }

    @Override
    public int updateUser(User user) {
        return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateUser", user);
    }

    @Override
    public int deleteUser(User user) {
        return this.getSqlSessionTemplate().delete(this.getNamespace() + ".deleteUser", user);
    }
    
    @Override
    public int deleteByUsernames(String[] ids) {
    	Map params = new HashMap();
    	params.put("usernames", ids);
        return this.getSqlSessionTemplate().delete(this.getNamespace() + ".deleteByUsernames", params);
    }

	@Override
	public int count() {
		return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".count");
	}

}
