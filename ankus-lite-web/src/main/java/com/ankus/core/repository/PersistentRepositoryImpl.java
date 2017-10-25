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
package com.ankus.core.repository;

/**
 * Persistence Object의 공통 CRUD를 제공하는 Repository의 구현체.
 *
 * @author Edward KIM
 * @since 1.0
 */
public abstract class PersistentRepositoryImpl<D, P> extends DefaultSqlSessionDaoSupport implements PersistentRepository<D, P> {

    /**
     * MyBatis의 SQL Query를 실행하기 위한 SQLMap의 네임스페이스를 반환한다.
     * 일반적으로 이것의 이름은 Repository의 fully qualifed name을 사용한다.
     *
     * @return SQLMap의 네임스페이스
     */
    public abstract String getNamespace();

    @Override
    public int insert(D object) {
        return this.getSqlSessionTemplate().insert(this.getNamespace() + ".insert", object);
    }

    @Override
    public int update(D object) {
        return this.getSqlSessionTemplate().update(this.getNamespace() + ".update", object);
    }

    @Override
    public int delete(P identifier) {
        return this.getSqlSessionTemplate().delete(this.getNamespace() + ".delete", identifier);
    }

    @Override
    public D select(P identifier) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".select", identifier);
    }

    @Override
    public boolean exists(P identifier) {
        return (Integer) this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".exist", identifier) > 0;
    }

    
}