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

import com.ankus.core.repository.PersistentRepository;

import java.sql.PreparedStatement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MemberRepository extends PersistentRepository<Member, Long> {

    public static final String NAMESPACE = MemberRepository.class.getName();

    Member selectByEmail(String email);

    Member selectByPassword(String username, String email);

    Member selectByUser(String username);

    int existUsername(String username);

    List<Member> selectMembers(Map memberInfo);

    int selectEmailCount(String email);

    int registerMember(Member user);

    int updateMember(Member user);
    
    int updateByLanguage(String username, String language);
    
    int existMember(String username, String password);
    
    int updateByPassword(String username, String password);
    
    int updateByLastLogin(String username);
 
	ArrayList<HashMap<String,Object>> select_sql(String sql);
	
	int select_cnt_sql(String sql);
 
	int update_sql(String sql);
	
	int insert_sql(String sql);

	int delete_sql(String sql);

	PreparedStatement prepareStatement(String sql);
	
}