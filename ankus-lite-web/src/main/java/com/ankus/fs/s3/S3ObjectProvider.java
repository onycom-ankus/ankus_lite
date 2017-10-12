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

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.ClientConfiguration;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.*;

import org.apache.commons.lang.StringUtils;
import com.ankus.core.exception.FileSystemException;
import com.ankus.model.rest.FileInfo;
import com.ankus.provider.fs.FileSystemProvider;
import com.ankus.util.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import java.io.ByteArrayInputStream;
import java.io.DataOutput;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Amazon S3 Object Storage Provider.
 *
 * @author Soryoung KIM
 * @since 0.3
 */
public class S3ObjectProvider implements FileSystemProvider<AmazonS3Client> {

    /**
     * Amazon S3 Client
     */
    private AmazonS3Client awsClient;

    /**
     * File System Audit Service
     */
    private com.ankus.provider.fs.FileSystemAuditService auditService;

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(S3ObjectProvider.class);

    /* 기본 생성자.
     *
     * @param context File System Context Object
     * @see <a href="http://docs.aws.amazon.com/general/latest/gr/rande.html">Amazon Regions and Endpoints</a>
     */
    public S3ObjectProvider(com.ankus.provider.fs.FileSystemAuditService auditService) {
        this.auditService = auditService;

        String accessKey = FileSystemAuthentication.getAccessKey();
        String secretKey = FileSystemAuthentication.getSecretKey();
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);

        if (FileSystemAuthentication.isTestEnvironment()) {
            ClientConfiguration clientConfiguration = new ClientConfiguration();
            clientConfiguration.setProxyHost(FileSystemAuthentication.getProxyAddress());
            clientConfiguration.setProxyPort(Integer.parseInt(FileSystemAuthentication.getProxyPort()));

            this.awsClient = new AmazonS3Client(awsCredentials, clientConfiguration);
        } else {
            this.awsClient = new AmazonS3Client(awsCredentials);
        }
    }

    @Override
    public List<FileInfo> list(String path, boolean directoryOnly) {
        if ("/".equals(path)) {
            List<Bucket> buckets = awsClient.listBuckets();
            List<FileInfo> list = new ArrayList<FileInfo>();
            for (Bucket bucket : buckets) {
                list.add(new S3BucketInfo(bucket));
            }
            return list;
        }

        String relativePath = S3Utils.getObjectKey(path);
        String bucket = S3Utils.getBucket(path + "/");

        try {
            List<FileInfo> filesList = new ArrayList<FileInfo>();
            ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
                .withBucketName(bucket)
                .withPrefix(relativePath)
                .withDelimiter("/");

            ObjectListing objectListing = null;
            if (directoryOnly) {
                do {
                    objectListing = awsClient.listObjects(listObjectsRequest);
                    filesList.add(new S3DirectoryInfo(path, "PREFIX")); // FIXME
                    listObjectsRequest.setMarker(objectListing.getNextMarker());
                } while (objectListing.isTruncated());
            }
            return filesList;
        } catch (Exception ase) {
            logger.warn("Cannot process the Amazon S3.", ase);
//            throw new FileSystemException("파일 시스템에 접근하던 도중 에러가 발생했습니다.", ase);
            throw new FileSystemException("An error has occurred.", ase);
        }
    }

    @Override
    public List<FileInfo> list(String path) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean exists(String path) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    public List<FileInfo> getFiles(String path) {
        String bucket = null;

        if (!"/".equals(path)) {
            bucket = S3Utils.getBucket(path + "/");
        }

        String relativePath = S3Utils.getObjectKey(path);

        List<FileInfo> filesList = new ArrayList<FileInfo>();
        if ("".equals(relativePath)) {
            return filesList;
        }

        try {
            ObjectListing objectListing = awsClient.listObjects(
                new ListObjectsRequest()
                    .withBucketName(bucket)
                    .withPrefix(relativePath)
                    .withDelimiter("/"));

            while (true) {
                List<S3ObjectSummary> summaries = objectListing.getObjectSummaries();
                for (S3ObjectSummary objectSummary : summaries) {
                    if (!objectSummary.getKey().endsWith("/")) {
                        long size = objectSummary.getSize();
                        String filename = FileUtils.getFilename(objectSummary.getKey());
                        String bucketName = objectSummary.getBucketName();
                        long modified = objectSummary.getLastModified().getTime();
                        S3ObjectInfo info = new S3ObjectInfo(bucketName, objectSummary.getKey(), filename, modified, size);
                        filesList.add(info);
                    }
                }

                if (!objectListing.isTruncated()) {
                    break;
                }
                objectListing = awsClient.listNextBatchOfObjects(objectListing);

            }

            return filesList;
        } catch (Exception ase) {
//            throw new FileSystemException("파일 시스템에 접근하던 도중 에러가 발생했습니다.", ase);
            throw new FileSystemException("An error has occurred.", ase);
        }
    }

    @Override
    public int getCount(String path, boolean directoryOnly) {
        throw new UnsupportedOperationException();
    }

    @Override
    public FileInfo getFileInfo(String path) {
        Assert.hasLength(path, "Enter the file or directory.");

        boolean isDir = path.endsWith("/");

        try {
            String bucket = S3Utils.getBucket(path);
            String objectKey = null;
            if (isDir) {
                objectKey = S3Utils.getObjectKey(path);
                if (path.equals("/" + S3Utils.getBucket(path) + "/")) { // Bucket
                    List<Bucket> buckets = awsClient.listBuckets();
                    for (Bucket b : buckets) {
                        if (b.getName().equals(bucket)) {
                            return new S3BucketInfo(b);
                        }
                    }
                } else {
                    S3Object object = awsClient.getObject(bucket, objectKey);
                    return new S3DirectoryInfo(path, object);
                }
            }

            objectKey = "/" + S3Utils.getBucket(path) + "/";
            objectKey = StringUtils.remove(path, objectKey);
            S3Object object = awsClient.getObject(bucket, objectKey);
            return new S3ObjectInfo(object, objectKey);
        } catch (Exception ex) {
//            throw new FileSystemException("지정한 경로 '" + path + "'의 디렉토리 또는 파일 정보를 가져올 수 없습니다.", ex);
            throw new FileSystemException("Cannot get file information.", ex);
        }
    }

    @Override
    public InputStream getContent(String path) {
        Assert.hasLength(path, "Enter the path.");

        try {
            String bucket = S3Utils.getBucket(path);
            String relativePath = StringUtils.remove(path, "/" + bucket + "/");

            return awsClient.getObject(bucket, relativePath).getObjectContent();
        } catch (Exception ex) {
            throw new FileSystemException("The specified path can not get the file input stream file system, please check.", ex);
        }
    }

    @Override
    public boolean delete(String path) {
        Assert.hasLength(path, "Please enter the file path.");

        if (S3Utils.isDirectory(path)) {
            ObjectListing objectListing = awsClient.listObjects(new ListObjectsRequest()
                .withBucketName(S3Utils.getBucket(path))
                .withPrefix(S3Utils.getObjectKey(path)));
            for (S3ObjectSummary objectSummary : objectListing.getObjectSummaries()) {
                awsClient.deleteObject(objectSummary.getBucketName(), objectSummary.getKey());
            }
        } else {
            String bucket = S3Utils.getBucket(path);
            String relativePath = StringUtils.remove(path, "/" + bucket + "/");
            awsClient.deleteObject(bucket, relativePath);
        }
        // auditService.delete(FileSystemType.S3, username, path);
        return true;
    }

    @Override
    public List<String> delete(List<String> paths) {
//        Assert.notEmpty(paths, "삭제할 디렉토리 및 파일 목록 'files'을 입력해 주십시오.");
        Assert.notEmpty(paths, "Please enter the file path");

        List<String> notDeleted = new ArrayList<String>();

        for (String path : paths) {
            try {
                boolean result = !this.delete(path);
/*
                if (result && auditService != null)
                    auditService.delete(FileSystemType.S3, username, path);
*/
                if (result) {
                    notDeleted.add(path);
                }
            } catch (Exception ex) {
                // 삭제중 파일 시스템 에러가 발생하여 삭제할 수 없는 경우 삭제하지 못한 파일 또는 디렉토리를 목록에 추가한다.
                notDeleted.add(path);
            }
        }
        return null;
    }

    @Override
    public List<String> delete(String[] paths) {
        return delete(Arrays.asList(paths));
    }

    @Override
    public DataOutput create(String fileName) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean rename(String from, String name) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean move(String fromPath, String toPath) {
//        Assert.hasLength(fromPath, "이동할 파일 또는 디렉토리의 원본 경로 'from'을 입력해 주십시오.");
        Assert.hasLength(fromPath, "Please enter the source path.");
//        Assert.hasLength(toPath, "이동할 대상 경로 'to'를 입력해 주십시오.");
        Assert.hasLength(toPath, "Please enter the destination path.");

        if (!exists(fromPath)) throw new FileSystemException("Not exist file");

        if (!toPath.endsWith("/")) {
//            throw new FileSystemException("이동할 대상 경로 '" + toPath + "'은 파일이므로 '" + fromPath + "' 이동할 수 없습니다. 이동할 대상 경로에 이미 파일이 존재합니다.");
            throw new FileSystemException("Files can not be moved.");
        }
        // 파일을 옮기기 위해서 옮겨질 위치에 이미 동일한 파일이 있다면 건너뛴다.
        if (exists(toPath))
            throw new FileSystemException("Already exist a file or a directory.");
//            throw new FileSystemException("'" + toPath + "'는 이미 파일 또는 디렉토리가 존재하므로 복사할 수 없습니다. 동일한 이름을 가진 파일 또는 디렉토리는 같은 디렉토리에 복사할 수 없습니다.");

        try {
            boolean copyResult = copy(fromPath, toPath);
            boolean deleteResult = delete(fromPath);
/*
            if (copyResult && deleteResult && auditService != null)
                auditService.move(FileSystemType.S3, username, fromPath, toPath);
*/
            return copyResult;
        } catch (AmazonServiceException ase) {
            throw new FileSystemException("Cannot move the file.", ase);
        } catch (AmazonClientException ace) {
            throw new FileSystemException("Cannot move the file", ace);
        }
    }

    @Override
    public List<String> move(List<String> filesPath, String to) {
        Assert.notEmpty(filesPath, "Please enter the source path.");
        Assert.hasLength(to, "Please enter the destination path.");

        List<String> notMoved = new ArrayList<String>();
        for (String file : filesPath) {
            boolean result = move(file, to);
            if (!result) {
                notMoved.add(file);
            }
            if (result && auditService != null) ;
            // auditService.move(FileSystemType.S3, username, file, to);
        }
        return null;
    }

    @Override
    public boolean copy(String from, String to) {
//        Assert.hasLength(from, "복사할 파일의 원본 경로 'from'을 입력해 주십시오.");
        Assert.hasLength(from, "Please enter the source path.");
//        Assert.hasLength(to, "복사할 대상 경로 'to'를 입력해 주십시오.");
        Assert.hasLength(to, "Please enter the destination path.");

        String fromBucket = S3Utils.getBucket(from);
        String toBucket = S3Utils.getBucket(to);
        String fromKey = StringUtils.remove(from, "/" + fromBucket + "/");
        String toKey = S3Utils.getObjectKey(to);
        String fileName = getFileName(fromKey);

        try {
            CopyObjectRequest copyObjectRequest = new CopyObjectRequest(fromBucket, fromKey, toBucket, toKey + fileName);
            awsClient.copyObject(copyObjectRequest);
            return true;
        } catch (AmazonServiceException ase) {
            System.out.println("Caught an AmazonServiceException, " +
                "which means your request made it " +
                "to Amazon S3, but was rejected with an error " +
                "response for some reason.");
            System.out.println("Error Message:    " + ase.getMessage());
            System.out.println("HTTP Status Code: " + ase.getStatusCode());
            System.out.println("AWS Error Code:   " + ase.getErrorCode());
            System.out.println("Error Type:       " + ase.getErrorType());
            System.out.println("Request ID:       " + ase.getRequestId());

//            throw new FileSystemException("파일을 복사 할 수 없습니다. 파일 시스템을 확인해 주십시오.", ase);
            throw new FileSystemException("Cannot copy the file.", ase);
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, " +
                "which means the client encountered " +
                "an internal error while trying to " +
                " communicate with S3, " +
                "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());
//            throw new FileSystemException("파일을 복사 할 수 없습니다. 파일 시스템을 확인해 주십시오.", ace);
            throw new FileSystemException("Cannot copy the file.", ace);
        }
    }

    /**
     * Object Key에서 파일명을 추출한다.
     *
     * @param fromKey Object Key
     * @return 파일명
     */
    private String getFileName(String fromKey) {
        String fileUnits[] = fromKey.split("/");
        return fileUnits[fileUnits.length - 1];
    }

    @Override
    public boolean mkdir(String path) {
//        Assert.hasLength(path, "디렉토리를 생성할 경로 'path'를 지정해 주십시오.");
        Assert.hasLength(path, "Please enter the path");

        String bucket = S3Utils.getBucket(path);
        String relativePath = S3Utils.getObjectKey(path);

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(0);
            InputStream emptyContent = new ByteArrayInputStream(new byte[0]);
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, relativePath, emptyContent, metadata);
            awsClient.putObject(putObjectRequest);
/*
            auditService.mkdir(FileSystemType.S3, username, path);
*/
            return true;
        } catch (AmazonServiceException ase) {
//            throw new FileSystemException("지정한 버킷에 새로운 디렉토리를 생성할 수 없습니다. 파일 시스템을 확인해 주십시오.", ase);
            throw new FileSystemException("Cannot create the directory.", ase);
        } catch (AmazonClientException ace) {
//            throw new FileSystemException("지정한 버킷에 새로운 디렉토리를 생성할 수 없습니다. 파일 시스템을 확인해 주십시오.", ace);
            throw new FileSystemException("Cannot create the directory.", ace);
        }
    }

    @Override
    public List<String> copy(List<String> files, String to) {
//        Assert.notEmpty(files, "복사할 파일 목록 'files'을 입력해 주십시오.");
        Assert.notEmpty(files, "Please enter the list of files.");
//        Assert.hasLength(to, "파일을 복사할 대상 경로 'to'을 입력해 주십시오.");
        Assert.hasLength(to, "Please enter the destination path.");

        List<String> notCopied = new ArrayList<String>();
        for (String file : files) {
            try {
                boolean result = copy(file, to);
                if (!result) {
                    notCopied.add(file);
                }
/*
                if (result && auditService != null)
                    auditService.copy(FileSystemType.S3, username, file, to);
*/
            } catch (Exception ex) {
                // 복사중 파일 시스템 에러가 발생하여 복사할 수 없는 경우 복사하지 못한 파일 또는 디렉토리를 목록에 추가한다.
                notCopied.add(file);
            }
        }
        return notCopied;
    }

    @Override
    public boolean isMatch(String path, String antPathPattern) {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean save(InputStream is, String path) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean save(String path, byte[] content) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean save2(String path, byte[] content, boolean isfirst) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }
    
    public boolean save(InputStream is, long size, String path) {
//        Assert.notNull(is, "저장할 파일의 입력 스트림 'is'을 입력해 주십시오.");
        Assert.notNull(is, "Please enter the input stream.");
//        Assert.hasLength(path, "파일을 저장할 대상 파일의 경로 'path'을 입력해 주십시오.");
        Assert.hasLength(path, "Please enter the path.");

        try {
            String bucket = S3Utils.getBucket(path);
            String key = StringUtils.remove(path, "/" + bucket + "/");
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setHeader(Headers.CONTENT_LENGTH, size);
            awsClient.putObject(new PutObjectRequest(bucket, key, is, metadata));
            return true;
        } catch (AmazonServiceException ase) {
            System.out.println("Caught an AmazonServiceException, " +
                "which means your request made it " +
                "to Amazon S3, but was rejected with an error " +
                "response for some reason.");
            System.out.println("Error Message:    " + ase.getMessage());
            System.out.println("HTTP Status Code: " + ase.getStatusCode());
            System.out.println("AWS Error Code:   " + ase.getErrorCode());
            System.out.println("Error Type:       " + ase.getErrorType());
            System.out.println("Request ID:       " + ase.getRequestId());

//            throw new FileSystemException("파일을 복사 할 수 없습니다. 파일 시스템을 확인해 주십시오.", ase);
            throw new FileSystemException("Connot copy the file.", ase);
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, " +
                "which means the client encountered " +
                "an internal error while trying to " +
                " communicate with S3, " +
                "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());

//            throw new FileSystemException("파일을 저장할 수 없습니다. 파일 시스템을 확인해주십시오.", ace);
            throw new FileSystemException("Connot copy the file.", ace);
        }
    }

    @Override
    public AmazonS3Client getNativeFileSystem() {
        return awsClient;
    }

    @Override
    public Map<String, Object> getFileSystemStatus(String type) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public long getSize(String path, boolean directoryOnly) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public byte[] load(String path, String filename) {
        throw new UnsupportedOperationException();
    }

    public long size(String path) {
        try {
            String bucket = S3Utils.getBucket(path);
            String relativePath = S3Utils.getObjectKey(path);

            return awsClient.getObjectMetadata(bucket, relativePath).getContentLength();
        } catch (Exception ex) {
//            throw new FileSystemException("'" + path + "'의 크기를 확인할 수 없습니다.", ex);
            throw new FileSystemException("Can not check the size of the file.", ex);
        }
    }

    public boolean isDir(String path) {
        return path.endsWith("/");
    }

    protected boolean isNotRootAndDepth1Path(String path) {
        return !"/".equals(path) && path.startsWith("/") && org.springframework.util.StringUtils.countOccurrencesOf(path, "/") == 1;
    }

	@Override
	public byte[] load(String path, long offset, int len) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String readlines(String path, int linecnt) {
		// TODO Auto-generated method stub
		return null;
	}

}
