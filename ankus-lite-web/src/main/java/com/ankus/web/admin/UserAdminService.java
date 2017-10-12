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

import com.ankus.model.rest.User;

import java.util.List;

public interface UserAdminService {

    List<User> getUsers();

    List<User> getUserList(String jobType, String createDate,  String username, String email, String enabled, String authority, String orderBy, String desc, int start, int limit);

    boolean exist(User user);

    int updateUser(User user);

    int deleteUser(User user);
    
    int deleteByUsernames(String[] ids);
    
    int getCount();

}
