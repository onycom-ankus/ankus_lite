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

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.ankus.model.rest.FileInfo;
import com.ankus.util.DateUtils;
import com.ankus.util.FileUtils;
import com.ankus.util.StringUtils;

import java.util.*;

/**
 * Amazon S3 Utility.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class S3Utils {

    /**
     * Bucket 및 Object Key를 포함하는 Fully Qualified Path가 디렉토리인지 확인한다.
     *
     * @param path Fully Qualified Path
     * @return 디렉토리인 경우 <tt>true</tt>
     */
    public static boolean isDirectory(String path) {
        return path.endsWith("/");
    }

    /**
     * Fully Qualified Path에서 Bucket을 추출하여 반환한다.
     *
     * @param path Fully Qualified Path
     * @return Bucket
     */
    public static String getBucket(String path) {
        if ("/".equals(path)) return "";
        String pathUnits[] = org.apache.commons.lang.StringUtils.split(path, "/");
        return pathUnits[0];
    }

    /**
     * S3 Object Key를 반환한다. <b>본 메소드는 Bucket과 Directory의 Object Key를 확인할 떄에만 사용한다.</b>
     *
     * @param path Path
     * @return Object Key
     */
    public static String getObjectKey(String path) {
        String pathUnits[] = org.apache.commons.lang.StringUtils.split(path, "/");
        StringBuffer relativePath = new StringBuffer();

        for (int i = 1; i < pathUnits.length; i++) {
            relativePath.append(pathUnits[i] + "/");
        }
        return relativePath.toString();
    }

    /**
     * Bucket 정보를 반환한다.
     *
     * @param client     Amazon S3 Client
     * @param bucketName Bucket Name
     */
    public static Map<String, String> getBucketInfo(AmazonS3Client client, String bucketName) {
        Bucket bucket = getBucket(client, bucketName);
        if (bucket == null) {
            return null;
        }

        ObjectMetadata objectMetadata = client.getObjectMetadata(bucketName, "");

        Map<String, String> map = new HashMap<String, String>();
        map.put("name", bucket.getName());
        map.put("ownerName", bucket.getOwner().getDisplayName());
        map.put("ownerId", bucket.getOwner().getId());
        setValue("create", bucket.getCreationDate(), map);
        setValue("location", client.getBucketLocation(bucketName), map);
        setValue("version", objectMetadata.getVersionId(), map);
        setValue("contentDisposition", objectMetadata.getContentDisposition(), map);
        setValue("contentType", objectMetadata.getContentType(), map);
        setValue("etag", objectMetadata.getETag(), map);
        setValue("contentEncoding", objectMetadata.getContentEncoding(), map);
        setValue("contentLength", objectMetadata.getContentLength(), map);
        setValue("lastModified", objectMetadata.getLastModified(), map);

        return map;
    }

    /**
     * Object 정보를 반환한다.
     *
     * @param client     Amazon S3 Client
     * @param bucketName Bucket Name
     */
    public static Map<String, String> getObject(AmazonS3Client client, String bucketName, String objectKey) {
        S3Object object = client.getObject(bucketName, objectKey);
        ObjectMetadata objectMetadata = object.getObjectMetadata();

        Map<String, String> map = new HashMap<String, String>();

        if (!object.getKey().endsWith("/")) {
            String qualifiedPath = "/" + bucketName + "/" + object.getKey();
            map.put("bucketName", object.getBucketName());
            map.put("name", FileUtils.getFilename(qualifiedPath));
            map.put("path", qualifiedPath);
        } else {
            map.put("bucketName", object.getBucketName());
            map.put("name", object.getKey());
            map.put("name", "/" + bucketName + "/" + object.getKey());
        }

        setValue("redirectionLocation", object.getRedirectLocation(), map);
        setValue("version", objectMetadata.getVersionId(), map);
        setValue("contentDisposition", objectMetadata.getContentDisposition(), map);
        setValue("contentType", objectMetadata.getContentType(), map);
        setValue("etag", objectMetadata.getETag(), map);
        setValue("contentEncoding", objectMetadata.getContentEncoding(), map);
        setValue("contentLength", objectMetadata.getContentLength(), map);
        setValue("lastModified", objectMetadata.getLastModified(), map);
        return map;
    }

    /**
     * Object 정보를 반환한다.
     *
     * @param client     Amazon S3 Client
     * @param bucketName Bucket Name
     */
    public static Map<String, String> getDirectory(AmazonS3Client client, String bucketName, String objectKey) {
        S3Object object = client.getObject(bucketName, objectKey);
        ObjectMetadata objectMetadata = object.getObjectMetadata();

        List<FileInfo> filesList = new ArrayList<FileInfo>();
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest()
            .withBucketName(object.getBucketName())
            .withPrefix(objectKey)
            .withDelimiter("/");

        ObjectListing objectListing = null;

        do {
            objectListing = client.listObjects(listObjectsRequest);
            List<String> commonPrefixes = objectListing.getCommonPrefixes();
            List<S3ObjectSummary> summary = objectListing.getObjectSummaries();
            listObjectsRequest.setMarker(objectListing.getNextMarker());
        } while (objectListing.isTruncated());

        Map<String, String> map = new HashMap<String, String>();

        map.put("bucketName", object.getBucketName());
        map.put("name", object.getKey());
        map.put("redirectionLocation", object.getRedirectLocation());

        setValue("version", objectMetadata.getVersionId(), map);
        setValue("contentDisposition", objectMetadata.getContentDisposition(), map);
        setValue("contentType", objectMetadata.getContentType(), map);
        setValue("etag", objectMetadata.getETag(), map);
        setValue("contentEncoding", objectMetadata.getContentEncoding(), map);
        setValue("contentLength", objectMetadata.getContentLength(), map);
        setValue("lastModified", objectMetadata.getLastModified(), map);
        return null;
    }

    /**
     * 값 설정시 NULL 처리 및 빈값을 처리한다.
     *
     * @param key   Map에 추가할 Key
     * @param value Map에 추가할 Key의 값
     * @param map   Map
     */
    public static void setValue(String key, Object value, Map<String, String> map) {
        if (value == null) return;
        if (value instanceof String) {
            String msg = (String) value;
            if (!StringUtils.isEmpty(msg)) map.put(key, msg);
        }

        if (value instanceof Date) {
            Date d = (Date) value;
            map.put(key, DateUtils.parseDate(d, "yyyy-MM-dd HH:mm:ss"));
        }

        if (value instanceof Number) {
            map.put(key, "" + value);
        }
    }

    /**
     * Bucket 정보를 반환한다.
     *
     * @param client     Amazon S3 Client
     * @param bucketName Bucket Name
     * @return Bucket이 존재하는 경우 Bucket 정보를, 그렇지 않은 경우 <tt>null</tt>을 반환
     */
    public static Bucket getBucket(AmazonS3Client client, String bucketName) {
        List<Bucket> buckets = client.listBuckets();
        for (Bucket bucket : buckets) {
            if (bucketName.equals(bucket.getName())) {
                return bucket;
            }
        }
        return null;
    }

    /**
     * 지정한 Region의 Amazon S3 Client를 생성한다.
     *
     * @param region    Amazon S3 Region
     * @param accessKey Amazon S3 Access Key
     * @param secretKey Amazon S3 Secret Key
     * @return Amazon S3 Client
     */
    public static AmazonS3Client getAmazonS3Client(String region, String accessKey, String secretKey) {
        Region awsRegion = Region.getRegion(Regions.valueOf(region));
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3Client awsClient = new AmazonS3Client(awsCredentials);
        awsClient.setRegion(awsRegion);
        return awsClient;
    }
}
