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

package com.ankus.web.designer;

import com.ankus.model.opengraph.Opengraph;
import com.ankus.model.workflow.*;
import com.ankus.util.StringUtils;

import java.util.Map;

import static org.apache.commons.lang.StringUtils.splitPreserveAllTokens;
import static com.ankus.util.StringUtils.isEmpty;

/**
 * Shell Script
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class ShellBinder implements Binder<Shell> {

    /**
     * OpenGraph Cell의 Properties
     */
    private Map properties;

    /**
     * OpenGraph Cell의 Action Type
     */
    private ActionType actionType;

    /**
     * Workflow의 Shell
     */
    private Shell shell = new Shell();

    /**
     * 기본 생성자.
     *
     * @param cell       OpenGraph Cell
     * @param cellMap    OpenGraph Cell ID와 Cell Map
     * @param metadata   OpenGraph Cell의 Metadata
     * @param properties OpenGraph Cell의 Properties
     * @param actionType OpenGraph Cell의 Action Type
     */
    public ShellBinder(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap,
                       Map metadata, Map properties, ActionType actionType) {
        this.properties = properties;
        this.actionType = actionType;
    }

    @Override
    public Shell bind() {
        bindPath();
        bindWorking();
        bindScript();
        bindCommand();
        bindEnvironment();
        bindArgs();

        actionType.getShell().add(shell);

        return shell;
    }

    private void bindCommand() {
        Command command = new Command();

        String commandlineValues = (String) properties.get("commandlineValues");
        if (!StringUtils.isEmpty(commandlineValues) && splitPreserveAllTokens(commandlineValues, ",").length > 0) {
            String[] values = splitPreserveAllTokens(commandlineValues, ",");
            for (String value : values) {
                Variable variable = new Variable();
                variable.setValue(value);
                command.getVariable().add(variable);
            }
        }

        shell.setCommand(command);
    }

    private void bindEnvironment() {
        if (!StringUtils.isEmpty((String) properties.get("environmentKeys"))) {
            String[] keys = splitPreserveAllTokens((String) properties.get("environmentKeys"), ",");
            String[] values = splitPreserveAllTokens((String) properties.get("environmentValues"), ",");

            if (keys.length != values.length) {
                throw new IllegalArgumentException("Must be same environment's keys and environemnt's values.");
            }

            shell.setEnvs(new Envs());

            for (int i = 0; i < keys.length; i++) {
                Variable variable = new Variable();
                variable.setName(keys[i]);
                variable.setValue(values[i]);
                shell.getEnvs().getVariable().add(variable);
            }
        }
    }

    private void bindArgs() {
        if (!StringUtils.isEmpty((String) properties.get("variableNames"))) {
            String[] keys = splitPreserveAllTokens((String) properties.get("variableNames"), ",");
            String[] values = splitPreserveAllTokens((String) properties.get("variableValues"), ",");

            if (keys.length != values.length) {
                throw new IllegalArgumentException("Must be same environment's keys and environemnt's values.");
            }

            shell.setArgs(new Args());

            for (int i = 0; i < keys.length; i++) {
                Variable variable = new Variable();
                variable.setName(keys[i]);
                variable.setValue(values[i]);
                shell.getArgs().getVariable().add(variable);
            }
        }
    }

    public void bindPath() {
        if (!isEmpty("" + properties.get("path"))) {
            shell.setPath("" + properties.get("path"));
        } else {
            throw new IllegalArgumentException("Must be specify a interpreter path.");
        }
    }

    public void bindWorking() {
        if (!isEmpty("" + properties.get("working"))) {
            shell.setWorking("" + properties.get("working"));
        }
    }

    public void bindScript() {
        if (!isEmpty("" + properties.get("script"))) {
            shell.setScript("" + properties.get("script"));
        } else {
            throw new IllegalArgumentException("Must be specify a script.");
        }
    }

    public void cleanup() {
    }
}
