package TFIDF;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;

import CorePackage.Attribute;
import CorePackage.Instance;
import CorePackage.Instances;
import FPGrowth.Transaction;

public class TFIDFCore {
	private static Instances mData = null;
	public TFIDFCore(Instances mInstances) {
		
		this.mData = mInstances;
		
		// TODO Auto-generated constructor stub
	}

	public void calculate() {
		// TODO Auto-generated method stub
		ArrayList<Transaction> dList = convertInstacesToTransaction();
		
		ArrayList<HashMap<String, Integer>> tfList = getTF(dList);
		HashMap<String, Integer> kdfMap = getIDF(dList);
		
		getTFIDF(kdfMap, tfList);
	}
	
	private void getTFIDF(HashMap<String, Integer> kdfMap, ArrayList<HashMap<String, Integer>> tfList){		
		ArrayList<HashMap<String, Double>> tfidfList = new ArrayList<HashMap<String, Double>>();
		
		int docSize = tfList.size();
		
		for(int i = 0 ; i < docSize; i++){
			HashMap<String, Integer> tMap = tfList.get(i);
			HashMap<String, Double> tfIdfMap = new HashMap<String, Double>();
			
			Object[] keyList = tMap.keySet().toArray();
			for(int j = 0; j < keyList.length; j++){
				int kdf = kdfMap.get((String)keyList[j]);
				int tf = tMap.get((String)keyList[j]);
				
				double tfIdf = calculateTFIDF(tf, kdf, docSize);
				tfIdfMap.put((String)keyList[j], tfIdf);
			}
			tfidfList.add(tfIdfMap);
		}
	}
	
	private double calculateTFIDF(int tf, int kdf, int docSize) {
		// TODO Auto-generated method stub
		double tfIdf = tf * Math.log((docSize)/(double)kdf);
		
		return tfIdf;
	}

	private ArrayList<HashMap<String, Integer>> getTF(ArrayList<Transaction> dList){
		ArrayList<HashMap<String, Integer>> tfList = new ArrayList<HashMap<String, Integer>>();
				
		int docSize = dList.size();
		
		for(int i = 0; i < docSize; i++){
			Transaction tran = dList.get(i);
			HashMap<String, Integer> tMap = new HashMap<String, Integer>();
			
			int tSize = tran.transaction.size();
			
			for(int j = 0; j < tSize; j++){
				if(!tMap.containsKey(tran.transaction.get(j))){
					tMap.put(tran.transaction.get(j), 1);
				} else {
					tMap.put(tran.transaction.get(j), tMap.get(tran.transaction.get(j))+1);
				}
			}
			
			tfList.add(tMap);
		}
		return tfList;
	}
	
	private HashMap<String, Integer> getIDF(ArrayList<Transaction> dList){
		HashMap<String, Integer> dKeyword = new HashMap<String, Integer>();
		
		int docSize = dList.size();
		
		for(int i = 0; i < docSize; i++){
			Transaction tran = dList.get(i);
			HashMap<String, Integer> tMap = new HashMap<String, Integer>();
			
			int tSize = tran.transaction.size();
			
			for(int j = 0; j < tSize; j++){
				if(!tMap.containsKey(tran.transaction.get(j))){
					if(dKeyword.containsKey(tran.transaction.get(j))){
						dKeyword.put(tran.transaction.get(j), dKeyword.get(tran.transaction.get(j))+1);
					} else {
						dKeyword.put(tran.transaction.get(j), 1);
					}
					
					tMap.put(tran.transaction.get(j), 1);
				}
			}
		}
		
		return dKeyword;
	}
	
	private ArrayList<Transaction> convertInstacesToTransaction() {
		// TODO Auto-generated method stub
		int size = mData.getNumData();
		
		ArrayList<Transaction> tList = new ArrayList<Transaction>();
		
		Hashtable<Integer, Attribute> attrTable = mData.getAttributeObjs();
		int attrSize = attrTable.size();
		
		for(int i = 0 ; i < size; i++){
			Instance instance = mData.getInstance(i);
			Transaction tran = new Transaction();
			String val = new String();
			
			for(int j = 0; j < attrSize; j++){
				Attribute attr = attrTable.get(j);
				val = attr.getNominalValue(instance.getValue(j));
				tran.transaction.add(val);
			}
			
			tList.add(tran);
		}
		
		return tList;
	}
}
