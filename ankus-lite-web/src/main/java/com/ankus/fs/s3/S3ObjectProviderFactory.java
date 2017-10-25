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
package com.ankus.fs.s3;

import com.ankus.provider.fs.FileSystemAuditService;
import com.ankus.provider.fs.FileSystemProvider;

/**
 * Amazon S3 Object Provider Factory.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class S3ObjectProviderFactory {

    /**
     * Amazon Region 정보를 기반으로 {@link com.ankus.provider.fs.FileSystemProvider}를 생성한다.
     *
     * @param auditService File System Audit Service Implemention
     * @return {@link com.ankus.provider.fs.FileSystemProvider}
     */
    public static FileSystemProvider getFileSystemProvider(FileSystemAuditService auditService) {
        return new S3ObjectProvider(auditService);
    }

}
