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
package com.ankus.el;

import org.apache.hadoop.util.StringUtils;
import com.ankus.core.exception.SystemException;
import com.ankus.util.DateUtils;

import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 기본으로 제공하는 EL 상수 및 함수
 */
public class ELConstantsFunctions {

    /**
     * KiloByte constant (1024). Defined for EL as 'KB'.
     */
    public static final long KB = 1024;

    /**
     * MegaByte constant (1024 KB). Defined for EL as 'MB'.
     */
    public static final long MB = KB * 1024;

    /**
     * GigaByte constant (1024 MB). Defined for EL as 'GB'.
     */
    public static final long GB = MB * 1024;

    /**
     * TeraByte constant (1024 GB). Defined for EL as 'TB'.
     */
    public static final long TB = GB * 1024;

    /**
     * PetaByte constant (1024 TB). Defined for EL as 'PB'.
     */
    public static final long PB = TB * 1024;

    /**
     * 1분을 표현하는 상수.
     */
    public static final int MINUTES = 1;

    /**
     * 1시간을 표현하는 상수.
     */
    public static final int HOURS = 60;

    /**
     * 1일을 표현하는 상수.
     */
    public static final int DAYS = 24 * 60;

    /**
     * 첫번째 값이 <tt>null</tt>이 아니면 해당값을 사용하고 <tt>null</tt>이면 두번째 값을 사용한다.
     *
     * @param o1 첫번째 값
     * @param o2 두번째 값
     * @return 첫번째 값이 <tt>null</tt>이면 두번째 값을 반환한다. 둘다 <tt>null</tt>이면 <tt>null</tt>을 반환한다.
     */
    public static Object firstNotNull(Object o1, Object o2) {
        return (o1 != null) ? o1 : o2;
    }

    /**
     * 두 문자열을 결합한다. 문자열이 <tt>null</tt>인 경우 빈 문자여롤 처리한다.
     *
     * @param s1 첫번째 문자열
     * @param s2 두번째 문자열
     * @return 첫번째 문자열과 두번째 문자열을 합친 문자열
     */
    public static String concat(String s1, String s2) {
        StringBuilder sb = new StringBuilder();
        if (s1 != null) {
            sb.append(s1);
        }
        if (s2 != null) {
            sb.append(s2);
        }
        return sb.toString();
    }

    /**
     * 주어진 문자열을 trim 처리한다.
     *
     * @param input trim 처리할 문자열
     * @return trim 처리한 문자열. 입력으로 사용한 문자열이 <tt>null</tt>이라면 빈 문자열을 반환한다.
     */
    public static String trim(String input) {
        return (input == null) ? "" : input.trim();
    }

    /**
     * Java의 Simple Date Format Pattern을 적용하여 현재 시간으로 포맷팅한다.
     *
     * @param pattern Simple Date Format Pattern
     * @return 날짜 포맷이 적용된 문자열 날짜
     */
    public static String dateFormat(String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(new Date());
    }

    /**
     * 호스트명을 반환한다.
     *
     * @return 호스트명
     */
    public static String hostname() {
    	
    	try {
			return ""+InetAddress.getLocalHost()+"";
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			return "";
//			e.printStackTrace();
		}
    }

    /**
     * 입력 문자열을 escape 처리한다.
     *
     * @param input 입력 문자열
     * @return escape 처리한 문자열
     */
    public static String escapeString(String input) {
        return StringUtils.escapeString(input);
    }

    /**
     * 지정한 날짜 패턴에 대해서 어제 날짜를 문자열로 반환한다.
     *
     * @param pattern Simple Date Format Pattern
     * @return 어제를 표현하는 문자열 날짜
     */
    public static String yesterday(String pattern) {
        return day(pattern, -1);
    }

    /**
     * 지정한 날짜 패턴에 대해서 내일 날짜를 문자열로 반환한다.
     *
     * @param pattern Simple Date Format Pattern
     * @return 내일을 표현하는 문자열 날짜
     */
    public static String tommorow(String pattern) {
        return day(pattern, 1);
    }

    /**
     * 지정한 날짜 패턴에 대해서 오늘 날짜를 기준으로 + 또는 - nMonth를 계산하여 문자열로 반환한다.
     *
     * @param pattern Simple Date Format Pattern
     * @param diff    + - nMonth
     * @return 문자열 날짜
     */
    public static String month(String pattern, int diff) {
        Date date = DateUtils.addMonths(new Date(), diff);
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * 지정한 날짜 패턴에 대해서 오늘 날짜를 기준으로 + 또는 - nDay를 계산하여 문자열로 반환한다.
     *
     * @param pattern Simple Date Format Pattern
     * @param diff    + - nDay
     * @return 문자열 날짜
     */
    public static String day(String pattern, int diff) {
        Date date = DateUtils.addDays(new Date(), diff);
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * 지정한 날짜 패턴에 대해서 오늘 날짜를 기준으로 + 또는 - nHour를 계산하여 문자열로 반환한다.
     *
     * @param pattern Simple Date Format Pattern
     * @param diff    + - nHour
     * @return 문자열 날짜
     */
    public static String hour(String pattern, int diff) {
        Date date = DateUtils.addHours(new Date(), diff);
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * 지정한 날짜 패턴에 대해서 오늘 날짜를 기준으로 + 또는 - nMinutes를 계산하여 문자열로 반환한다.
     *
     * @param pattern Simple Date Format Pattern
     * @param diff    + - nMinutes
     * @return 문자열 날짜
     */
    public static String minute(String pattern, int diff) {
        Date date = DateUtils.addMinutes(new Date(), diff);
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * 지정한 날짜 패턴에 대해서 오늘 날짜를 기준으로 + 또는 - nSeconds를 계산하여 문자열로 반환한다.
     *
     * @param pattern Simple Date Format Pattern
     * @param diff    + - nSeconds
     * @return 문자열 날짜
     */
    public static String second(String pattern, int diff) {
        Date date = DateUtils.addSeconds(new Date(), diff);
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * Translates a string into <code>application/x-www-form-urlencoded</code> format using UTF-8 encoding scheme.
     * Bytes for unsafe characters are also obtained using UTF-8 scheme.
     *
     * @param input string to be encoded
     * @return the encoded <code>String</code>
     */
    public static String urlEncode(String input) {
        try {
            return (input == null) ? "" : URLEncoder.encode(input, "UTF-8");
        } catch (UnsupportedEncodingException uee) {
            throw new SystemException("Cannot encode", uee);
        }
    }
}