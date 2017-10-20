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
package com.ankus.web.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Member의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Myeong Ha, Kim
 * @since 1.0.1
 */
@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public Member getMemberByEmail(String email) {
        return memberRepository.selectByEmail(email);
    }

    @Override
    public Member getMemberByPassword(String username, String email) {
        return memberRepository.selectByPassword(username, email);
    }

    @Override
    public Member getMemberByUser(String username) {
        return memberRepository.selectByUser(username);
    }

    @Override
    public int existUsername(String username) {
        return memberRepository.existUsername(username);
    }

    @Override
    public List<Member> getMembers(Map memberInfo) {
        return memberRepository.selectMembers(memberInfo);
    }

/*    @Override
    public List<Member> getMembers(Member memberInfo) {
        return memberRepository.selectMembers(memberInfo);
    }*/

    @Override
    public int getEmailCount(String email) {
        return memberRepository.selectEmailCount(email);
    }

    @Override
    public int registerMember(Member user) {
        return memberRepository.registerMember(user);
    }

    @Override
    public int updateMember(Member user) {
        return memberRepository.updateMember(user);
    }

	@Override
	public int updateByLanguage(String username, String language) {
		return memberRepository.updateByLanguage(username, language);
	}

	@Override
	public int existMember(String username, String password) {
		return memberRepository.existMember(username, password);
	}

	@Override
	public int updateByPassword(String username, String password) {
		return memberRepository.updateByPassword(username, password);
	}

	@Override
	public int updateByLastLogin(String username) {
		return memberRepository.updateByLastLogin(username);
	}
	
	@Override
	public ArrayList<HashMap<String,Object>> select_sql(String sql) {
		return memberRepository.select_sql(sql);
	}
	 
	@Override
	public int update_sql(String sql) {
		return memberRepository.update_sql(sql);
	}
	
	@Override
	public int insert_sql(String sql) {
		return memberRepository.insert_sql(sql);
	}

	@Override
	public int delete_sql(String sql) {
		return memberRepository.delete_sql(sql);
	}

	@Override
	public PreparedStatement prepareStatement(String sql) {
		return memberRepository.prepareStatement(sql);
	}
	
}

