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

package com.ankus.web.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public Map<String, List<Menu>> getMenu(Menu menu) {
        Map<String, List<Menu>> menuMap = new HashMap<String, List<Menu>>();
        if (menu.depth == 2)
            menu = menuRepository.selectMenu(menu.parentId);

        menuMap.put("userMenu", menuRepository.selectUserMenu());
        menuMap.put("topMenu", menuRepository.selectTopMenu());
        menuMap.put("subMenu", menuRepository.selectSubMenu(menu.menuId));

        return menuMap;
    }

    @Override
    public Menu getMenu(String topCode, String subCode) {
        return menuRepository.selectMenuByCode(topCode, subCode);
    }
}
