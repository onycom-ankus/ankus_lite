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
package com.ankus.locale;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocaleRepositoryImpl extends PersistentRepositoryImpl<Locale, Long> implements LocaleRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public LocaleRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<Locale> selectAll() {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectAll");
    }

    @Override
    public List<Message> selectMessageByLocale(Locale locale) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectMessageByLocale", locale);
    }
}
