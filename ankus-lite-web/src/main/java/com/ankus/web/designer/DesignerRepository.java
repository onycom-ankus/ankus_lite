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
package com.ankus.web.designer;

import java.util.List;
import java.util.Map;

import com.ankus.core.repository.PersistentRepository;
import com.ankus.model.rest.Workflow;
import com.ankus.web.member.Member;

public interface DesignerRepository extends PersistentRepository<Workflow, Long> {

    public static final String NAMESPACE = DesignerRepository.class.getName();

    List<Workflow> getList();
    
    List<Workflow> getList(String username);
}
