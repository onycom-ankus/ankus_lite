package MLP;

import java.io.Serializable;
import java.util.HashMap;

public class NN implements Serializable{
	public double hiddenWeight[][];
	public double outputWeight[][];
	
	public HashMap<Integer, Double> minTable;
	public HashMap<Integer, Double> maxTable;
	public HashMap<Integer, Integer> dataType;
	public HashMap<String, Integer> m_attrMap;
	
	public HashMap<Integer, String> m_ClassMap;
	
	public double classMax;
	public double classMin;
	
	public int numInputNodes;
	public int numHiddenNodes;
	public int numOutputNodes; 
}
