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
package com.ankus.web.lite.userMgr;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMgrServiceImpl implements UserMgrService {

    @Autowired
    private UserMgrRepository userMgrRepository;

    @Override
    public List<UserMgr> selectByCondition(UserMgr userMgr) {
        return userMgrRepository.selectByCondition(userMgr);
    }
    
    @Override
    public int selectByConditionCnt(UserMgr userMgr) {
    	return userMgrRepository.selectByConditionCnt(userMgr);
    }

    @Override
    public int update(UserMgr userMgr) {
        return userMgrRepository.update(userMgr);
    }

	@Override
	public int delete(UserMgr userMgr) {
		return userMgrRepository.delete(userMgr);
	}
}
