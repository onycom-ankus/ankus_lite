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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/menu")
public class MenuController {

    private Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private MenuService menuService;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView build(HttpServletRequest request, HttpServletResponse response) {
        String topCode = getTopCode(request);
        String subCode = getSubCode(request);

        Menu menu = menuService.getMenu(topCode, subCode);

        ModelAndView view = new ModelAndView(menu.getUrl());
        String menuLabel = menu.getLabel();

        logger.debug("Menu :: Label = {}, Top = {}, Sub = {}", new String[]{
                menuLabel, topCode, subCode
        });

        view.addObject("menuMap", menuService.getMenu(menu));
        view.addObject("currentTopMenu", menuService.getMenu(topCode, ""));
        view.addObject("currentSubMenu", menuService.getMenu(topCode, subCode));
        view.addObject("menu", menu);
        view.addObject("topCode", topCode);
        view.addObject("subCode", subCode);

        return view;
    }

    String getTopCode(HttpServletRequest request) {
        if (StringUtils.isEmpty(request.getParameter("T"))) {
            throw new IllegalArgumentException("Menu Parameter 'T' are required.");
        }
        return request.getParameter("T");
    }

    String getSubCode(HttpServletRequest request) {
        if (StringUtils.isEmpty(request.getParameter("S"))) {
            return "";
        }
        return request.getParameter("S");
    }
}
