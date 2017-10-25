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
 * Persistence Object의 공통 CRUD를 정의한 Repository.
 *
 * @author Edward KIM
 * @since 0.3
 */
public interface PersistentRepository<D, P> {

    /**
     * 새로운 객체를 저장한다.
     *
     * @param object 저장할 객체
     * @param  
     * @param runcase 
     * @return 저장한 건수
     */
    int insert(D object);

    /**
     * 지정한 객체의 정보를 업데이트한다.
     *
     * @param object 업데이트할 객객체
     * @param runcase 
     * @return 업데이트 건수
     */
    int update(D object);

    /**
     * 지정한 식별자에 해당하는 객체를 삭제한다.
     *
     * @param identifier 식별자
     * @return 삭제한 건수
     */
    int delete(P identifier);

    /**
     * 지정한 식별자에 해당하는 객체를 조회한다.
     *
     * @param identifier 식별자
     * @return 식별자로 식별하는 객체
     */
    D select(P identifier);

    /**
     * 지정한 식별자에 해당하는 객체가 존재하는지 확인한다.
     *
     * @param identifier 식별자
     * @return 존재하는 경우 <tt>true</tt>
     */
    boolean exists(P identifier);
  

    
}