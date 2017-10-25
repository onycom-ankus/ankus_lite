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

public class Menu {

    public int menuId;
    public String icon;
    public String label;
    public String url;
    public String topCode;
    public String subCode;
    public String title;
    public String description;
    public int depth;
    public int parentId;
    public int order;

    public Menu() {
    }

    public Menu(int menuId, String icon, String label, String topCode, String subCode, String url, String title, String description, int depth, int parentID, int order) {
        this.menuId = menuId;
        this.icon = icon;
        this.label = label;
        this.topCode = topCode;
        this.subCode = subCode;
        this.url = url;
        this.title = title;
        this.description = description;
        this.depth = depth;
        this.parentId = parentID;
        this.order = order;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getDepth() {
        return depth;
    }

    public void setDepth(int depth) {
        this.depth = depth;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTopCode() {
        return topCode;
    }

    public void setTopCode(String topCode) {
        this.topCode = topCode;
    }

    public String getSubCode() {
        return subCode;
    }

    public void setSubCode(String subCode) {
        this.subCode = subCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Menu menu = (Menu) o;

        if (menuId != menu.menuId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return menuId;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "menuId=" + menuId +
                ", icon='" + icon + '\'' +
                ", label='" + label + '\'' +
                ", url='" + url + '\'' +
                ", topCode='" + topCode + '\'' +
                ", subCode='" + subCode + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", depth=" + depth +
                ", parentId=" + parentId +
                ", order=" + order +
                '}';
    }
}
