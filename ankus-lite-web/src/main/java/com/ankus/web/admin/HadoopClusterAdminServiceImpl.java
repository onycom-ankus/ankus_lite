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

import com.ankus.model.rest.HadoopCluster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HadoopClusterAdminServiceImpl implements HadoopClusterAdminService {

    @Autowired
    private HadoopClusterAdminRepository adminRepository;

    @Override
    public boolean exist(HadoopCluster hadoopCluster) {
        return adminRepository.exists(hadoopCluster.getId());
    }

    @Override
    public boolean deleteHadoopCluster(long hadoopClusterId) {
        return adminRepository.delete(hadoopClusterId) > 0;
    }

    @Override
    public boolean addHadoopCluster(HadoopCluster hadoopCluster) {
        hadoopCluster.setHdfsUrl(org.slf4j.helpers.MessageFormatter.arrayFormat("{}{}:{}", new Object[]{
                hadoopCluster.getNamenodeProtocol(), hadoopCluster.getNamenodeIP(), hadoopCluster.getNamenodePort()
        }).getMessage());
        return adminRepository.insert(hadoopCluster) > 0;
    }

    @Override
    public HadoopCluster getHadoopCluster(long hadoopClusterId) {
        return adminRepository.select(hadoopClusterId);
    }

    @Override
    public List<HadoopCluster> getHadoopClusters() {
        return adminRepository.selectAll();
    }
}
