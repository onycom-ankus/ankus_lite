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
package com.ankus.locale;

import com.ankus.core.exception.ParsingException;
import com.ankus.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 로케일 및 리소스 번들 관련 메시지 서비스를 제공하는 로케일 서비스.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
@Service
public class LocaleServiceImpl implements LocaleService {

    /**
     * 로케일 및 리소스 번들 관련 메시지를 관리하는 Locale Repository
     */
    @Autowired
    private LocaleRepository localeRepository;

    @Override
    public Map getMessage(Locale locale) {
        List<Message> messages = localeRepository.selectMessageByLocale(locale);
        Map<String, String> msgs = new HashMap<String, String>();
        for (Message msg : messages) {
            msgs.put(msg.getGroupKey() + "_" + msg.getMessageKey(), msg.getMessage());
        }
        return msgs;
    }

    @Override
    public List<Locale> getLocales() {
        return localeRepository.selectAll();
    }

    @Override
    public String getMessageJson(Locale locale) {
        try {
            return JsonUtils.format(getMessage(locale));
        } catch (IOException ex) {
            throw new ParsingException(ex);
        }
    }

    @Override
    public String getMessageJson(java.util.Locale locale) {
        Locale loc = new Locale(locale.getLanguage(), locale.getCountry());
        return getMessageJson(loc);
    }

    ////////////////////////////////////////////////
    // Spring Framework Setter Injection
    ////////////////////////////////////////////////

    /**
     * 로케일 및 리소스 번들 관련 메시지를 관리하는 Locale Repository를 설정한다.
     *
     * @param localeRepository 로케일 및 리소스 번들 관련 메시지를 관리하는 Locale Repository
     */
    public void setLocaleRepository(LocaleRepository localeRepository) {
        this.localeRepository = localeRepository;
    }
}
