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
package com.ankus.model.rest;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Map;

/**
 * Visualization Domain Object.
 *
 * @author Jaesung Ahn
 */
public class Visualization implements Serializable {
	
	private static final long serialVersionUID = 1;
	
			private long engine;
	
    private String jar;

    private String chartType;

    private String input;

    private String useFirstRecord;

    private String delimiter;

    private String title;

    private Map chartParam;


    public Visualization() {
    }

    




public long getEngine() {
		return engine;
	}






	public void setEngine(long engine) {
		this.engine = engine;
	}






public String getJar() {
		return jar;
	}


	public void setJar(String jar) {
		this.jar = jar;
	}


	public String getChartType() {
		return chartType;
	}


	public void setChartType(String chartType) {
		this.chartType = chartType;
	}


	public String getInput() {
		return input;
	}


	public void setInput(String input) {
		this.input = input;
	}




	public String getUseFirstRecord() {
		return useFirstRecord;
	}






	public void setUseFirstRecord(String useFirstRecord) {
		this.useFirstRecord = useFirstRecord;
	}






	public String getDelimiter() {
		return delimiter;
	}


	public void setDelimiter(String delimiter) {
		this.delimiter = delimiter;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public Map getChartParam() {
		return chartParam;
	}


	public void setChartParam(Map chartParam) {
		this.chartParam = chartParam;
	}

	@Override
	public String toString() {
		return "Visualization [jar=" + jar + ", chartType=" + chartType
				+ ", input=" + input + ", useFirstRecord=" + useFirstRecord
				+ ", delimiter=" + delimiter + ", title=" + title
				+ ", chartParam=" + chartParam + "]";
	}



}