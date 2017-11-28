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

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.PersistentRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberRepositoryImpl extends PersistentRepositoryImpl<Member, Long> implements MemberRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public MemberRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public Member selectByEmail(String email) {
        Member member = new Member();
        member.setEmail(email);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByEmail", member);
    }

    @Override
    public Member selectByPassword(String username, String email) {

        Member member = new Member();
        member.setUsername(username);
        member.setEmail(email);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByPassword", member);
    }

    @Override
    public Member selectByUser(String username) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByUser", username);
    }

    @Override
    public int existUsername(String username) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".existUsername", username);
    }

/*    @Override
    public List<Member> selectMembers(Member memberInfo) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectMembers", memberInfo);
    }*/

    @Override
    public List<Member> selectMembers(Map memberInfo) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectMembers", memberInfo);
    }

    @Override
    public int selectEmailCount(String email) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectEmailCount", email);
    }

    @Override
    public int registerMember(Member user) {
        return this.getSqlSessionTemplate().insert(this.getNamespace() + ".registerMember", user);
    }

    @Override
    public int updateMember(Member user) {
        return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateMember", user);
    }

	@Override
	public int updateByLanguage(String username, String language) {
		Member member = new Member();
        member.setUsername(username);
        member.setLanguage(language);
        
		return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateByLanguage", member);
	}

	@Override
	public int existMember(String username, String password) {
		Member member = new Member();
        member.setUsername(username);
        member.setPassword(password);
        
		return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".existMember", member);
	}

	@Override
	public int updateByPassword(String username, String password) {
		Member member = new Member();
        member.setUsername(username);
        member.setPassword(password);
		return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateByPassword", member);
	}

	@Override
	public int updateByLastLogin(String username) {
		Member member = new Member();
        member.setUsername(username);
		return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateByLastLogin", member);
	}
	
    // 2016-06-28 :  query 문 직접실행 함수 ...
	@Override
	public ArrayList<HashMap<String,Object>> select_sql(String sql)
	{
		try {

//			System.out.printf("======> select_sql (%s)\n", sql);
			
			Connection conn = this.getSqlSession().getConnection();

			if(conn==null) return null;
			
			Statement stmt = conn.createStatement();
			
			ResultSet rs = stmt.executeQuery(sql);
			if(rs==null) {
				conn.close();
				return null;
			}
			
			ArrayList<HashMap<String,Object>> rows = new ArrayList<HashMap<String,Object>>();
			ResultSetMetaData meta = null;
			while(rs.next())
			{
				if(meta==null) meta = rs.getMetaData();
				
				HashMap<String,Object> row = new HashMap<String,Object>();
				for(int i=1; i<=meta.getColumnCount(); i++) row.put(meta.getColumnName(i), rs.getString(i));
				rows.add(row);
			}
			rs.close();
//			conn.close();
			return rows;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public int select_cnt_sql(String sql)
	{
		try {
			Connection conn = getSqlSessionTemplate().getConnection();
			
			if(conn==null) return -1;
			Statement stmt = conn.createStatement();
			
			ResultSet rs =  stmt.executeQuery(sql);
//			conn.close();
			rs.next();
			int ret = rs.getInt("count(*)");
			rs.close();
			
			return ret;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return -1;
	}

	@Override
	public int update_sql(String sql)
	{
		try {
			Connection conn = getSqlSessionTemplate().getConnection();
			
			if(conn==null) return -1;
			Statement stmt = conn.createStatement();
			int ret =  stmt.executeUpdate(sql);
//			conn.close();
			return ret;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return -1;
	}

	@Override
	public int insert_sql(String sql)
	{
		try {
			Connection conn = getSqlSessionTemplate().getConnection();
			
			if(conn==null) return -1;
			Statement stmt = conn.createStatement();
			int ret =  stmt.executeUpdate(sql);
			
			if(ret>0)
			{
				ResultSet rs = stmt.executeQuery("SELECT LAST_INSERT_ID()");
				if(rs.next()) {
					int id = (int)rs.getLong(1);
					rs.close();
					return id;
				}
				else rs.close(); return -1;
			}
			
//			conn.close();
			return -1;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public int delete_sql(String sql)
	{
		return update_sql(sql);
	}    

	@Override
	public PreparedStatement prepareStatement(String sql)
	{
		try {
			Connection conn = getSqlSessionTemplate().getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(sql);
			return stmt;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}    
	
	
}