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
package com.ankus.util;

import com.ankus.core.exception.WorkflowException;
import org.quartz.CronExpression;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Cron Expression Utility.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class CronExpressionUtils {

    /**
     * 지정한 Cron Expression이 유효한 Cron Expression인지 확인한다.
     *
     * @param cronExpression 확인할 Cron Expression
     * @return 유효한 Cron Expression인지 여부. 유효하다면 <tt>true</tt>
     */
    public static boolean isValidExpression(String cronExpression) {
        return CronExpression.isValidExpression(cronExpression);
    }

    /**
     * 지정한 Cron Expression이 실행할 다음 예정 시간 목록을 반환한다.
     *
     * @param expression Cron Expression
     * @param dateFormat 시간 표기법법
     * @param count      다음 예정 시간 목록의 개수
     * @return 다음 예정 시간 목록
     */
    public static List<String> getNextValidTimeAfter(String expression, String dateFormat, int count) {
        try {
            CronExpression cronExpression = new CronExpression(expression);
            Date current = cronExpression.getNextValidTimeAfter(new Date());
            List<String> dates = new ArrayList<String>();
            dates.add(DateUtils.parseDate(current, dateFormat));
            count--;
            for (int i = 0; i < count; i++) {
                current = cronExpression.getNextValidTimeAfter(current);
                dates.add(DateUtils.parseDate(current, dateFormat));
            }
            return dates;
        } catch (Exception ex) {
            throw new WorkflowException("Cannot parse cron expression : " + expression, ex);
        }
    }

}
