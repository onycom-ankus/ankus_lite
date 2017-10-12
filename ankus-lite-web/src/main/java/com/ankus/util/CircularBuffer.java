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

import com.google.common.base.Joiner;
import com.google.common.collect.Iterators;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 지정한 길이만큼 아이템을 유지하는 순환 버퍼.
 * 지정한 크기보다 더 많은 아이템을 아이템을 버퍼에 추가하면 오래된 아이템을 덮어씌운다.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class CircularBuffer<T> implements Iterable<T> {

    /**
     * 리스트 기반 버퍼
     */
    private final List<T> buffer;

    /**
     * 버퍼에 넣을 수 있는 아이템의 최대 개수
     */
    private final int size;

    /**
     * 현재 버퍼의 위치
     */
    private int start;

    /**
     * 기본 생성자.
     *
     * @param size 버퍼에 넣을 수 있는 아이템의 최대 개수
     */
    public CircularBuffer(int size) {
        this.buffer = new ArrayList<T>();
        this.size = size;
        this.start = 0;
    }

    /**
     * 아이템을 추가한다.
     *
     * @param item 아이템
     */
    public void append(T item) {
        if (buffer.size() < size) {
            buffer.add(item);
        } else {
            buffer.set(start, item);
            start = (start + 1) % size;
        }
    }

    @Override
    public String toString() {
        return "CircularBuffer [" + Joiner.on(", ").join(buffer) + "]";
    }

    public Iterator<T> iterator() {
        if (start == 0)
            return buffer.iterator();
        else
            return Iterators.concat(buffer.subList(start, buffer.size()).iterator(), buffer.subList(0, start).iterator());
    }

    /**
     * 버퍼에 넣을 수 있는 최대 아이템의 개수를 반환한다.
     *
     * @return 버퍼에 넣을 수 있는 최대 아이템의 개수
     */
    public int getMaxSize() {
        return this.size;
    }

    /**
     * 현재 버퍼에 들어있는 아이템의 개수를 반환한다.
     *
     * @return 현재 버퍼에 들어있는 아이템의 개수
     */
    public int getSize() {
        return this.buffer.size();
    }

}