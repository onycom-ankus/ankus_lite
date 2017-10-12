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

import com.ankus.core.repository.PersistentRepository;
import com.ankus.model.rest.AuditHistory;

import java.util.List;

/**
 * Audit Log Repository Interface.
 *
 * @author Byoung Gon, Kim`
 * @since 1.0
 */
public interface AuditLogRepository extends PersistentRepository<AuditHistory, Long> {

    public static final String NAMESPACE = AuditLogRepository.class.getName();

    /**
     * 지정한 조건의 파일 시스템 처리 이력을 조회한다.
     *
     * @param startDate 시작날짜
     * @param endDate   종료 날짜
     * @param path      조회할 경로
     * @param type      파일 처리 유형
     * @param start     시작 페이지
     * @param limit     페이지당 건수
     * @param orderBy   정렬할 컬럼명
     * @param desc      정렬 방식(ASC, DESC)
     * @param username  사용자명
     * @return 파일 시스템 처리 이력 목록
     */
    List<AuditHistory> selectByCondition(String startDate, String endDate, String path, String type, int start, int limit, String orderBy, String desc, String username);

    /**
     * 지정한 사용자의 파일 시스템 처리 이력의 개수룰 반환한다.
     *
     * @param startDate 시작날짜
     * @param endDate   종료 날짜
     * @param path      조회할 경로
     * @param type      파일 처리 유형
     * @param username  사용자명
     * @return 파일 시스템 처리 이력의 개수
     */
    int getTotalCountByCondition(String startDate, String endDate, String path, String type, String username);

}
