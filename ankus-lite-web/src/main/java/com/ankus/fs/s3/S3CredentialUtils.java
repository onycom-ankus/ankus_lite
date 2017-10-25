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

import org.slf4j.helpers.MessageFormatter;
import org.w3c.dom.Document;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

/**
 * Amazon S3 Credential Utility.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class S3CredentialUtils {

    /**
     * 지정한 조건에 따른 Credential를 확인하고 허가 여부를 반환한다.
     *
     * @param document Credential DOM Object
     * @param bucket   Bucket Name (RAW)
     * @param role     Role Name (MEMBER)
     * @param type     Permission Name (file)
     * @param detail   Action Name (copy)
     * @return 접근 가능 여부
     * @throws javax.xml.xpath.XPathExpressionException XPath Expression 오류시
     */
    public static Boolean lookup(Document document, String bucket, String role, String type, String detail) throws XPathExpressionException {
        String xpathString = MessageFormatter.arrayFormat("/security/s3/regions/region/regionKey/role[@type='{}']/permission/{}[@{}='true']",
            new String[]{
                bucket, role, type, detail
            }
        ).getMessage().toString();
        XPath xpath = XPathFactory.newInstance().newXPath();
        Boolean b = (Boolean) xpath.evaluate(xpathString, document, XPathConstants.BOOLEAN);
        return b == null ? Boolean.valueOf(false) : b;
    }
}
