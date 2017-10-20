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
package com.ankus.provider.engine;

import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.Pig;
import com.ankus.model.rest.Workflow;

/**
 * Pig Script Execution Job Support.
 *
 * @author Edward KIM
 * @since 0.4
 */
public interface PigSupport {

    /**
     * Pig Script를 실행한다.
     *
     * @param pig           Pig Script
     * @param hadoopCluster Pig Script를 실행할 Hadoop Cluster
     * @param username      Pig Script를 실행하는 사용자
     * @return 워크플로우
     */
    Workflow run(Pig pig, HadoopCluster hadoopCluster, String username);

}
