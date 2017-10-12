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

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Date Utility.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class DateUtils {

    /**
     * 현재 날짜의 이전 이후날짜를 더할때 사용하는 Enumeration 상수
     */
    public static enum TYPE {
        BEFORE, AFTER
    }

    /**
     * 기본 날짜 변환 포맷
     */
    public static String[] DATE_FORMAT = {"yyyyMMdd", "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyyMMddHHmmss", "yyyyMMdd"};

    /**
     * 매월의 일수
     */
    public static int DAYS_OF_MONTH[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    /**
     * 두 날짜가 같은 날짜인지 확인한다. 이 메소드는 시간은 무시한다.
     *
     * @param date1 비교할 첫번째 날짜
     * @param date2 비교할 두번째 날짜
     * @return 날짝 같으면 <tt>true</tt>
     * @throws IllegalArgumentException 날짜가 <tt>null인 경우</tt>
     */
    public static boolean isSameDay(Date date1, Date date2) {
        return org.apache.commons.lang.time.DateUtils.isSameDay(date1, date2);
    }

    /**
     * 두 날짜가 같은 날짜인지 확인한다. 이 메소드는 시간은 무시한다.
     *
     * @param cal1 비교할 첫번째 날짜
     * @param cal2 비교할 두번째 날짜
     * @return 날짝 같으면 <tt>true</tt>
     * @throws IllegalArgumentException 날짜가 <tt>null인 경우</tt>
     */
    public static boolean isSameDay(Calendar cal1, Calendar cal2) {
        return org.apache.commons.lang.time.DateUtils.isSameDay(cal1, cal2);
    }

    /**
     * 두 날짜 객체가 시간까지 동일한지 확인한다.
     *
     * @param date1 비교할 첫번째 날짜
     * @param date2 비교할 두번째 날짜
     * @return 밀리초까지 동일하면 <tt>true</tt>
     * @throws IllegalArgumentException 날짜가 <tt>null인 경우</tt>
     */
    public static boolean isSameInstant(Date date1, Date date2) {
        return org.apache.commons.lang.time.DateUtils.isSameInstant(date1, date2);
    }

    /**
     * 두 달력 객체가 시간까지 동일한지 확인한다.
     *
     * @param cal1 비교할 첫번째 날짜
     * @param cal2 비교할 두번째 날짜
     * @return true 밀리초까지 동일하면 <tt>true</tt>
     * @throws IllegalArgumentException 날짜가 <tt>null인 경우</tt>
     */
    public static boolean isSameInstant(Calendar cal1, Calendar cal2) {
        return org.apache.commons.lang.time.DateUtils.isSameInstant(cal1, cal2);
    }

    /**
     * 두 달력 객체가 지역 시간까지 동일한지 확인한다. 이 메소드는 밀리초, 초, 분, 시간, 년, 월, 일, ERA 까지 비교 한다.
     *
     * @param cal1 비교할 첫번째 날짜
     * @param cal2 비교할 두번째 날짜
     * @return true 밀리초까지 동일하면 <tt>true</tt>
     * @throws IllegalArgumentException 날짜가 <tt>null인 경우</tt>
     */
    public static boolean isSameLocalTime(Calendar cal1, Calendar cal2) {
        return org.apache.commons.lang.time.DateUtils.isSameLocalTime(cal1, cal2);
    }

    /**
     * 지정한 다양한 파싱 패턴을 이용하여 문자열로 표현되는 날짜를 파싱한다.
     *
     * @param str           파싱할 날짜(<tt>null</tt>이 아님)
     * @param parsePatterns 파싱하는데 사용하는 날짜 형식 패턴. <tt>null</tt>이 아님. {@link java.text.SimpleDateFormat}을 참고.
     * @return 파싱된 날짜
     * @throws IllegalArgumentException 문자열로 된 날짜 또는 패턴이 <tt>null</tt>인 경우
     * @throws java.text.ParseException 패턴이 적합하지 않은 경우
     */
    public static Date parseDate(String str, String[] parsePatterns) throws ParseException {
        return org.apache.commons.lang.time.DateUtils.parseDate(str, parsePatterns);
    }

    /**
     * 날짜에 지정한 만큼의 년수를 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 년수를 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addYears(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addYears(date, amount);
    }

    /**
     * 날짜에 지정한 만큼의 개월수를 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 개월수를 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addMonths(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addMonths(date, amount);
    }

    /**
     * 날짜에 지정한 만큼의 주(week)를 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 주(week)를 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addWeeks(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addWeeks(date, amount);
    }

    /**
     * 날짜에 지정한 만큼의 일수를 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 일수를 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addDays(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addDays(date, amount);
    }

    /**
     * 날짜에 지정한 만큼의 시간을 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 시간을 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addHours(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addHours(date, amount);
    }

    /**
     * 날짜에 지정한 만큼의 분을 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 분을 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addMinutes(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addMinutes(date, amount);
    }

    /**
     * 날짜에 지정한 만큼의 초를 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 초를 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addSeconds(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addSeconds(date, amount);
    }

    /**
     * 날짜에 지정한 만큼의 밀리초를 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date   날짜(<tt>null</tt>이 아님)
     * @param amount 추가할 양(음수도 가능)
     * @return 밀리초 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date addMilliseconds(Date date, int amount) {
        return org.apache.commons.lang.time.DateUtils.addMilliseconds(date, amount);
    }

    /**
     * 날짜에 지정한 필드와 양만큼 추가한다. 원본 객체를 변경되지 않으며 반환값은 새로운 객체다.
     *
     * @param date          날짜(<tt>null</tt>이 아님)
     * @param calendarField {@link java.util.Calendar}의 필드
     * @param amount        추가할 양(음수도 가능)
     * @return 추가한 새로운 날짜 객체
     * @throws IllegalArgumentException 날짜가 <tt>null</tt>인 경우
     */
    public static Date add(Date date, int calendarField, int amount) {
        return org.apache.commons.lang.time.DateUtils.add(date, calendarField, amount);
    }

    /**
     * YYYY-MM-DDTHH:MI:SS 형태의 문자열(예:2007-02-13T10:25:00)로 XMLGregorianCalendar 을 생성한다.
     *
     * @param stringTypeDate YYYY-MM-DDTHH:MI:SS 형태의 문자열(예:2007-02-13T10:25:00)
     * @return XMLGregorianCalendar
     */
    public static XMLGregorianCalendar toXMLGregorianCalendar(String stringTypeDate) throws DatatypeConfigurationException {
        String yyyy = stringTypeDate.substring(0, 4);
        String mm = stringTypeDate.substring(5, 7);
        String dd = stringTypeDate.substring(8, 10);
        String hh = stringTypeDate.substring(11, 13);
        String mi = stringTypeDate.substring(14, 16);
        String ss = stringTypeDate.substring(17, 19);

        int iyyyy = Integer.parseInt(yyyy);
        int imm = Integer.parseInt(mm);
        int idd = Integer.parseInt(dd);
        int ihh = Integer.parseInt(hh);
        int imi = Integer.parseInt(mi);
        int iss = Integer.parseInt(ss);

        DatatypeFactory dataTypeFactory = DatatypeFactory.newInstance();
        return dataTypeFactory.newXMLGregorianCalendar(iyyyy, imm, idd, ihh, imi, iss, 0, 0);
    }

    /**
     * 지정한 날짜의 이전 일수를 뺀 날짜를 반환한다.
     *
     * @param date   기준 날짜
     * @param before 이전 일수
     * @return 지정한 날짜의 이전 일수를 뺀 날짜
     */
    public static Date before(Date date, int before) {
        return org.apache.commons.lang.time.DateUtils.addDays(date, -before);
    }

    /**
     * 지정한 날짜의 다음 일수를 더한 날짜를 반환한다.
     *
     * @param date  기준 날짜
     * @param after 다음 일수
     * @return 지정한 날짜의 다음 일수를 뺀 날짜
     */
    public static Date after(Date date, int after) {
        return org.apache.commons.lang.time.DateUtils.addDays(date, after);
    }

    /**
     * 지정한 날짜에 대해서 지정한 패턴과 일수에 따라서 더하거나 뺀 날짜를 반환한다. 기본 유형은 지정한 날짜에서 뺀다. 유형을 지정하면 지정한 유형대로 처리한다.
     *
     * @param baseDate 기준일
     * @param type     날짜 연산 유형(before, after)
     * @param duration 더하거나 뺄 일수(예;  20)
     * @return 연산된 날짜
     * @throws java.text.ParseException 날짜를 지정한 패턴으로 파싱할 수 없는 경우
     */
    public static Date calculateDate(Date baseDate, TYPE type, int duration) throws ParseException {
        switch (type) {
            case BEFORE:
                return DateUtils.before(baseDate, duration);
            case AFTER:
                return DateUtils.after(baseDate, duration);
            default:
                return DateUtils.before(baseDate, duration);
        }
    }

    /**
     * 지정한 날짜에 대해서 지정한 패턴과 일수에 따라서 더하거나 뺀 날짜를 반환한다.
     *
     * @param date     기준일
     * @param type     날짜 연산 유형(before, after)
     * @param duration 더하거나 뺄 일수(예;  20)
     * @return 연산된 날짜
     * @throws java.text.ParseException 날짜를 지정한 패턴으로 파싱할 수 없는 경우
     */
    public static String calculateDate(String date, TYPE type, int duration) throws ParseException {
        Date baseDate = DateUtils.parseDate(date, DATE_FORMAT);
        Date result = DateUtils.calculateDate(baseDate, type, duration);
        return parseDate(result, DATE_FORMAT[0]);
    }

    /**
     * 지정한 날짜에 대해서 지정한 패턴과 일수에 따라서 더하거나 뺀 날짜를 반환한다.
     *
     * @param date        기준일
     * @param strType     날짜 연산 유형(before, after)
     * @param strDuration 문자열 형태의 더하거나 뺄 일수(예;  "20")
     * @return 연산된 날짜
     * @throws java.text.ParseException 날짜를 지정한 패턴으로 파싱할 수 없는 경우
     */
    public static String calculateDate(String date, String strType, String strDuration) throws ParseException {
        int duration = Integer.parseInt(strDuration);

        if ("BEFORE".equals(strType)) {
            return calculateDate(date, TYPE.BEFORE, duration);
        } else if ("AFTER".equals(strType)) {
            return calculateDate(date, TYPE.AFTER, duration);
        } else {
            return null;
        }

    }

    /**
     * 지정한 날자를 패턴에 맞도록 문자열 날짜로 변환한다.
     *
     * @param date    날짜
     * @param pattern 패턴 (예; YYYYMMDD)
     * @return 문자열 날짜
     */
    public static String parseDate(Date date, String pattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, Locale.US);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return formatter.format(calendar.getTime());
    }

    /**
     * 두 날짜간의 날짜수를 반환한다. 이 메소드는 윤년이 적용하여 계산한다.
     * <p>
     * <pre>
     * long date = DateUtils.getDiffDays("20080501",DateUtils.getCurrentYyyymmdd())
     * </pre>
     * </p>
     *
     * @param startStr 시작 날짜
     * @param endStr   끝 날짜
     * @return 일수
     */
    public static long getDiffDays(String startStr, String endStr) {
        GregorianCalendar start = getGregorianCalendar(startStr);
        GregorianCalendar end = getGregorianCalendar(endStr);
        return (start.getTime().getTime() - end.getTime().getTime()) / 86400000;
    }

    /**
     * 두 날짜간의 차이를 초수를 반환한다. 이 메소드는 윤년을 적용하여 계산한다.
     *
     * @param from 시작 날짜
     * @param to   끝 날짜
     * @return 초수
     */
    public static long getDiffSeconds(Date from, Date to) {
        return (from.getTime() - to.getTime()) / 1000;
    }

    /**
     * "yyyyMMdd" 문자열 형식의 날짜를 {@link java.util.Calendar} 형식으로 변환한다.
     * <p>
     * <pre>
     * Calendar cal = DateUtils.getGregorianCalendar(DateUtil.getCurrentYyyymmdd());
     * </pre>
     * </p>
     *
     * @param yyyymmdd 날짜
     * @return GregorianCalendar
     */
    public static GregorianCalendar getGregorianCalendar(String yyyymmdd) {
        int yyyy = Integer.parseInt(yyyymmdd.substring(0, 4));
        int mm = Integer.parseInt(yyyymmdd.substring(4, 6));
        int dd = Integer.parseInt(yyyymmdd.substring(6, 8));
        GregorianCalendar calendar = new GregorianCalendar(yyyy, mm - 1, dd, 0, 0, 0);
        return calendar;
    }

    /**
     * 지정한 월의 시작일을 포함한 날짜를 반환한다.
     *
     * @param yyyyMM 년월
     * @return 시작일을 포함한 년월일
     */
    public static String getStartMonthDayOfDate(String yyyyMM) {
        return yyyyMM + "01";
    }

    /**
     * 지정한 월의 마지막 일을 포함한 날짜를 반환한다.
     *
     * @param yyyyMM 년월
     * @return 마지막을 포함한 년월일
     */
    public static String getEndMonthDayOfDate(String yyyyMM) {
        int mm = Integer.parseInt(yyyyMM.substring(4, 6));
        return yyyyMM + DAYS_OF_MONTH[mm - 1];
    }

    /**
     * 현재 날짜를 "yyyyMMdd" 형태로 변환한다.
     * <p>
     * <pre>
     * String today = DateUtils.getCurrentYyyymmdd();
     * </pre>
     * </p>
     *
     * @return yyyyMMdd
     */
    public static String getCurrentYyyymmdd() {
        return getCurrentDateTime().substring(0, 8);
    }

    /**
     * 현재 날짜를 "yyyyMM" 형태로 변환한다.
     * <p>
     * <pre>
     * String today = DateUtils.getCurrentYyyymm();
     * </pre>
     * </p>
     *
     * @return yyyyMM
     */
    public static String getCurrentYyyymm() {
        return getCurrentDateTime().substring(0, 6);
    }

    /**
     * 현재 날짜와 시각을 "yyyyMMddhhmmss" 형태로 변환한다.
     * <p>
     * <pre>
     * String today = DateUtils.getCurrentDateTime();
     * </pre>
     * </p>
     *
     * @return yyyyMMddhhmmss 형식의 문자열 날짜
     */
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    /**
     * java.util.Date 를 java.util.GregorianCalendar 로 변환한다.
     *
     * @param date 날짜
     * @return GregorianCalendar
     */
    public static GregorianCalendar dateToGregorianCalendar(Date date) {
        if (date == null) return null;
        GregorianCalendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+09:00"), Locale.KOREAN);
        cal.setTime(date);
        return cal;
    }

    /**
     * java.util.Date 를 javax.xml.datatype.XMLGregorianCalendar 로 변환한다.
     *
     * @param date 날짜
     * @return XMLGregorianCalendar
     * @throws javax.xml.datatype.DatatypeConfigurationException
     */
    public static XMLGregorianCalendar dateToXMLGregorianCalendar(Date date) throws DatatypeConfigurationException {
        if (date == null) return null;
        return DatatypeFactory.newInstance().newXMLGregorianCalendar(dateToGregorianCalendar(date));
    }

    /**
     * 시작 시간과 종료 시간의 차이를 포맷팅한다.
     *
     * @param end   종료 시간
     * @param start 시작 시간
     * @return "H:M:S" 형식의 시간
     */
    public static String formatDiffTime(Date end, Date start) {
        long timeDiff = end.getTime() - start.getTime();
        return formatTime(timeDiff);
    }

    /**
     * 초단위 시간을 "H:M:S" 형식으로 포맷팅한다.
     *
     * @param diffLongTime 시간
     * @return "H:M:S" 형식의 시간
     */
    public static String formatTime(long diffLongTime) {
        StringBuffer buf = new StringBuffer();
        long hours = diffLongTime / (60 * 60 * 1000);
        long rem = (diffLongTime % (60 * 60 * 1000));
        long minutes = rem / (60 * 1000);
        rem = rem % (60 * 1000);
        long seconds = rem / 1000;

        if (hours != 0) {
            buf.append(hours);
            buf.append("시간 ");
        }
        if (minutes != 0) {
            buf.append(minutes);
            buf.append("분 ");
        }
        // 차이가 없다면 0을 반환한다.
        buf.append(seconds);
        buf.append("초");
        return buf.toString();
    }

    /**
     * 두 날짜간의 차이를 반환한다. 이 메소드는 윤년을 적용하여 계산한다.
     *
     * @param from 시작 날짜
     * @param to   끝 날짜
     * @return Long 타입 날짜 차이
     */
    public static long getDiff(Date from, Date to) {
        return (from.getTime() - to.getTime());
    }
}