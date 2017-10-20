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
package com.ankus.fs.hdfs;

import java.io.IOException;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import com.ankus.model.rest.HadoopCluster;
import org.springframework.util.Assert;

public class HdfsHelper {

    /**
     * Hadoop Configuration을 생성한다.
     *
     * @param hadoopCluster Hadoo Cluster Information
     * @return Hadoop Configuration
     */
    public static Configuration getConfiguration(HadoopCluster hadoopCluster) {
        Assert.notNull(hadoopCluster.getHdfsUrl(), "HDFS URL is null");

        
        System.out.printf("getConfiguration====>[%s]\n", hadoopCluster.getHdfsUrl());
        
        Configuration configuration = new Configuration();
//        configuration.set("fs.default.name", hadoopCluster.getHdfsUrl());
      configuration.set("fs.default.name", hadoopCluster.getHdfsUrl());

/*      configuration.set("fs.defaultFS", hadoopCluster.getHdfsUrl());
        try {
			FileSystem dfs = FileSystem.get(configuration);
			
			FileStatus[] flist = dfs.listStatus(new Path("/"));
			
	        System.out.printf("getConfiguration_rootcnt====>[%d]\n", flist.length);
			
			
		} catch (IOException e) {
	        System.out.printf("getConfiguration_error====>[%s]\n", e.getMessage());
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
*/        
        System.out.printf("end_getConfiguration====>[%s, %s]\n", hadoopCluster.getHdfsUrl(), configuration);
        return configuration;
    }
}
