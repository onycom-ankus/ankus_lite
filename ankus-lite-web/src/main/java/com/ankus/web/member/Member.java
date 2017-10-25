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
package com.ankus.web.member;


import java.sql.Timestamp;

/**
 * User의 각종 기능을 제공하기 위한 객체
 *
 * @author Myeong Ha, Kim
 * @since 1.0.1
 */
public class Member {

    private String username;
    private String password;
    private String name;
    private String email;
    private boolean enabled;
    private boolean ac_non_expired;
    private boolean ac_non_locked;
    private boolean cr_non_expired;
    private Timestamp create_dt;
    private String authority;
    private String language;

    public Member() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isAc_non_expired() {
        return ac_non_expired;
    }

    public void setAc_non_expired(boolean ac_non_expired) {
        this.ac_non_expired = ac_non_expired;
    }

    public boolean isAc_non_locked() {
        return ac_non_locked;
    }

    public void setAc_non_locked(boolean ac_non_locked) {
        this.ac_non_locked = ac_non_locked;
    }

    public boolean isCr_non_expired() {
        return cr_non_expired;
    }

    public void setCr_non_expired(boolean cr_non_expired) {
        this.cr_non_expired = cr_non_expired;
    }

    public Timestamp getCreate_dt() {
        return create_dt;
    }

    public void setCreate_dt(Timestamp create_dt) {
        this.create_dt = create_dt;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	@Override
    public String toString() {
        return "Member{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", enabled=" + enabled +
                ", ac_non_expired=" + ac_non_expired +
                ", ac_non_locked=" + ac_non_locked +
                ", cr_non_expired=" + cr_non_expired +
                ", create_dt=" + create_dt +
                ", authority='" + authority + '\'' +
                ", language='" + language + '\'' +
                '}';
    }
}