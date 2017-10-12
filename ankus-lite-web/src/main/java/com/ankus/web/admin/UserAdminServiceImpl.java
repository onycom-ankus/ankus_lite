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
package com.ankus.web.admin;

import com.ankus.core.exception.ServiceException;
import com.ankus.model.rest.ActionHistory;
import com.ankus.model.rest.User;
import com.ankus.model.rest.WorkflowHistory;
import com.ankus.util.FileSystemUtils;
import com.ankus.util.FileUtils;
import com.ankus.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserAdminServiceImpl implements UserAdminService {

    @Autowired
    private UserAdminRepository userAdminRepository;

    @Override
    public List<User> getUsers() {
        return userAdminRepository.selectAll();
    }

    @Override
    public List<User> getUserList(String jobType, String createDate, String username, String email, String enabled, String authority, String orderBy, String desc, int start, int limit) {
        return userAdminRepository.selectByCondition(jobType, createDate, username, email, enabled, authority, orderBy, desc, start, limit);
    }

    @Override
    public boolean exist(User user) {
        return userAdminRepository.selectByName(user.getUsername());
    }

    @Override
    public int updateUser(User user) {
        return userAdminRepository.updateUser(user);
    }

    @Override
    public int deleteUser(User user) {
        return userAdminRepository.deleteUser(user);
    }
    
    @Override
    public int getCount() {
        return userAdminRepository.count();
    }

	@Override
	public int deleteByUsernames(String[] ids) {
		return userAdminRepository.deleteByUsernames(ids);
	}
}
