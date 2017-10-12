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
package com.ankus.web.engine;

import java.util.List;

import com.ankus.core.exception.SystemException;
import com.ankus.model.rest.Engine;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EngineServiceImpl extends LocaleSupport implements EngineService {

    @Autowired
    private EngineRepository engineRepository;

    @Override
    public boolean removeEngine(Long id) {
        boolean deleted = engineRepository.delete(id) > 0;
        if (!deleted) {
            throw new SystemException(message("S_ENGINE", "CANNOT_REMOVE", null));
        }else{ // 삭제 성공
        	// 엔진에 설정된 권한 삭제
        	engineRepository.deletePermission(id);
        }
        return deleted;
    }

    @Override
    public List<Engine> getEngines(Member member) {
        return engineRepository.selectAll(member);
    }

    @Override
    public boolean addEngine(Engine engine) {
        boolean inserted = engineRepository.insert(engine) > 0;
        if (!inserted) {
            throw new SystemException(message("S_ENGINE", "CANNOT_INSERT", null));
        }else{
        	addPermissions(engine);
        }
        return inserted;
    }

    @Override
    public Engine getEngine(Long serverId) {
        Engine selected = engineRepository.select(serverId);
        if (selected == null) {
            throw new SystemException(message("S_ENGINE", "NOT_FOUND_ENGINE", null));
        }
        return selected;
    }
    
    @Override
    public boolean updateEngine(Engine engine) {
        boolean updated = engineRepository.update(engine) > 0;
        if (!updated) {
            throw new SystemException("updateEngine Error");
        }else{ // 삭제 성공
        	// 엔진에 설정된 권한 삭제
        	engineRepository.deletePermission(engine.getId());
        	addPermissions(engine);
        }
        return updated;
    }
    
    /**
     * 엔진에서 사용자별 권한인 경우 권한에 사용자 추가
     * @param engine
     */
    private void addPermissions(Engine engine){
    	if(engine.getIsPublic() == 0){ // 권한 선택 공개이면 엔진에 대한 권한 추가
    		String permission = engine.getPermission();
    		if(permission != null){
    			String[] userNames = permission.split("\\,");
    			for(int i=0; i<userNames.length; i++){ // 엔진과 권한사용자를 매핑해서 DB에 Add한다.
    				engineRepository.addPermission(engine.getId(), userNames[i]);
    			}
    		}
    	}
    }
    
}
