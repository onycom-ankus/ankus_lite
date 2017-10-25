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
package com.ankus.web.menu;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MenuRepositoryImpl extends DefaultSqlSessionDaoSupport implements MenuRepository {

    @Autowired
    public MenuRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<Menu> selectTopMenu() {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectTopMenu");
    }

    @Override
    public List<Menu> selectSubMenu(int parentId) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectSubMenu", parentId);
    }

    @Override
    public List<Menu> selectUserMenu() {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectUserMenu");
    }

    @Override
    public Menu selectMenu(int menuID) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectMenu", menuID);
    }

    @Override
    public Menu selectMenuByLabel(String label) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectMenuByLabel", label);
    }

    @Override
    public Menu selectMenuByCode(String topCode, String subCode) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("topCode", topCode);
        param.put("subCode", subCode);

        return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectMenuByCode", param);
    }

    @Override
    public int insertMenu(Menu menu) {
        return getSqlSessionTemplate().insert(NAMESPACE + ".insertMenu", menu);
    }

    @Override
    public int updateMenu(Menu menu) {
        return getSqlSessionTemplate().update(NAMESPACE + ".updateMenu", menu);
    }

    @Override
    public int deleteMenu(int menuID) {
        return getSqlSessionTemplate().delete(NAMESPACE + ".deleteMenu", menuID);
    }
}
