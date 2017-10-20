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
package com.ankus.fs.audit;

import com.ankus.model.rest.*;
import com.ankus.provider.fs.FileSystemAuditService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * File System Audit Service Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Service
public class FileSystemAuditServiceImpl implements FileSystemAuditService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(FileSystemAuditServiceImpl.class);

    @Autowired
    private AuditLogRepository repository;

    @Override
    public List<AuditHistory> getAuditHistories(String startDate, String endDate, String path, String username, String type, String orderBy, String desc, int start, int limit) {
        return repository.selectByCondition(startDate, endDate, path, type, start, limit, orderBy, desc, username);
    }

    @Override
    public int getTotalCountOfAuditHistories(String startDate, String endDate, String path, String type, String username) {
        return repository.getTotalCountByCondition(startDate, endDate, path, type, username);
    }

    @Override
    public void log(Context context, FileSystemType fileSystemType, AuditType auditType, FileType fileType, String from, String to, long length) {
        try {
            String username = context.getString("username");

            AuditHistory history = new AuditHistory();
            history.setUsername(username);
            HadoopCluster hadoopCluster = (HadoopCluster) context.getObject(Context.HADOOP_CLUSTER);
            if (hadoopCluster != null) {
                history.setClusterName(hadoopCluster.getName());
                history.setClusterId(hadoopCluster.getId());
            }
            history.setWorkDate(new Date());
            history.setFileSystemType(fileSystemType);
            history.setAuditType(auditType);
            history.setFileType(fileType);
            history.setFrom(from);
            history.setTo(to);
            history.setLength(length);
            repository.insert(history);
        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
        }
    }

}
