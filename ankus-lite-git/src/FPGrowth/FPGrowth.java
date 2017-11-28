package FPGrowth;

import java.awt.List;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.TreeMap;

import CorePackage.Attribute;
import CorePackage.Instance;
import CorePackage.Instances;

public class FPGrowth {
	private Instances mData;
	private ArrayList<FPHeaderTable> mHeaderTable;
	private FPTree fpt;
	private int minSup;
	private double minConf;
	
	public FPGrowth(Instances data, double minSup, double minConf){
		this.mData = data;
		this.mHeaderTable = new ArrayList<FPHeaderTable>();
		
		//minSup is double, convert To Integer min count
		this.minSup = minSupToMinCount(minSup);
		this.minConf = minConf;
		
		System.out.println("Minimum Support:\t"+this.minSup);
		this.fpt = new FPTree(this.minSup);
	}
	
	private String conditionItem;
	private int conditionSup;
	
	public FPGrowth(String item, int support, int minSup, double minConf){
		this.mHeaderTable = new ArrayList<FPHeaderTable>();
		
		this.conditionItem = item;
		this.conditionSup = support;
		
		
		this.minConf = minConf;
		this.minSup = minSup;
		this.fpt = new FPTree(minSup);
	}
	
	private int minSupToMinCount(double minSup){
		return (int) (mData.getNumData() * minSup);
	}
	
	public void buildTree(){
		//convert transaction from Instances
		ArrayList<Transaction> tList = convertInstacesToTransaction();
		//sort transaction & make HeaderTable
		makeHaderTable(tList);
		buildFPTree(tList);
		//input transaction to tree
		System.out.println();
		generateCFP();
	}
	
	public HashMap<String, ArrayList<PatternBase>> buildSubTree(ArrayList<Transaction> tList){
//		System.out.println("sub transaction Size:\t"+tList.size());
		
		makeHaderTable(tList);
		buildFPTree(tList);
		HashMap<String, ArrayList<PatternBase>> retMap = generateAR();
		
		return retMap;
	}
	
	private HashMap<String, ArrayList<PatternBase>> generateAR(){
		// TODO Auto-generated method stub
		int size = mHeaderTable.size();
		HashMap<String, ArrayList<PatternBase>> retMap = new HashMap<String, ArrayList<PatternBase>>();
//		System.out.println(size);
		if(size > 1){
			for(int i = size - 1; i > -1; i--){
				FPHeaderTable tableItem = mHeaderTable.get(i);
//				System.out.println("GAR:\t"+tableItem.item);
				ArrayList<PatternBase> pbList = fpt.generateAR(tableItem, conditionItem, conditionSup, this.minConf);
				retMap.put(tableItem.item, pbList);
				printAR(tableItem.item, pbList);
			}
		}
		
		return retMap;
	}
	
	private void printAR(String baseItem, ArrayList<PatternBase> pbList){
		int ruleBaseSize = pbList.size();
		for(int i = 0; i < ruleBaseSize; i++){
			int baseSize = pbList.get(i).base.size();
			
			boolean isPrint = false;
			
			StringBuffer sb = new StringBuffer();
			
			sb.append(baseItem+"("+conditionSup+") -> ");
//			System.out.print(baseItem+"("+conditionSup+") -> ");
			for(int j = 0; j < baseSize; j++){
				
				isPrint = true;
				sb.append(pbList.get(i).base.get(j)+"("+(pbList.get(i).confidence/(double)conditionSup)+") ");
//				sb.append(subTList.get(i).base.get(j)+"("+(subTList.get(i).confidence)+") ");
			}
			
			if(isPrint && (pbList.get(i).confidence/(double)conditionSup) >= minConf){
				System.out.println(sb.toString());
			}
		}
	}

	private void generateCFP() {
		// TODO Auto-generated method stub
		int size = mHeaderTable.size();
		
		for(int i = size - 1; i > -1; i--){
			FPHeaderTable tableItem = mHeaderTable.get(i);
			
//			System.out.print(tableItem.item+"\t");
			fpt.searchTree(tableItem, minConf); 
		}
		
	}

	private void makeHaderTable(ArrayList<Transaction> tList) {
		// TODO Auto-generated method stub
		HashMap<String, Integer> headerMap = new HashMap<String, Integer>();
		ValueComparator bvc = new ValueComparator(headerMap);
        TreeMap<String, Integer> sorted_map = new TreeMap<String, Integer>(bvc);
        
		int size = tList.size();
		
		//counting item
		for(int i = 0; i < size; i++){
			Transaction tran = tList.get(i);
			
			int tSize = tran.transaction.size();
//			System.out.print("Transaction:\t");
			for(int j = 0 ; j < tSize ; j++){
				String item = tran.transaction.get(j);
//				System.out.print(item+"\t");
				if(headerMap.containsKey(item)){
					headerMap.put(item, headerMap.get(item)+1);
				} else {
					headerMap.put(item, 1);
				}
			}
//			System.out.println();
		}
		
//		System.out.println("HeaderMapSize:\t"+headerMap.size());
		//sort Table
		sorted_map.putAll(headerMap);
//		System.out.println(sorted_map);
		
		Object[] keyList = sorted_map.keySet().toArray();
		
		int len = keyList.length;
		
		//make FP-Growth header Table
		for(int i = 0; i < len ; i++){
//			System.out.println((String)keyList[i]+"\t"+headerMap.get((String)keyList[i]));
			
			FPHeaderTable fpt = new FPHeaderTable();
			
			fpt.item = (String)keyList[i];
			fpt.count = headerMap.get((String)keyList[i]);
			
//			System.out.println(fpt.count+"\t"+minSup);
			if(fpt.count >= minSup){
				fpt.NodeId = -1;
//				System.out.println(fpt.item +"\t"+fpt.count);
				mHeaderTable.add(fpt);
			}
		}
	}
	
	private void buildFPTree(ArrayList<Transaction> tList) {
		// TODO Auto-generated method stub
		
		fpt.setHeaderTable(mHeaderTable);
//		System.out.println(mHeaderTable.size());
		int size = tList.size();
		
		for(int i = 0; i < size; i++){
			Transaction tran = tList.get(i);

			int tSize = tran.transaction.size();
			Transaction sortedTran = new Transaction();
			
			//Make Sorted Transaction 
			for(int k = 0; k < mHeaderTable.size(); k++) {
				FPHeaderTable fpt = mHeaderTable.get(k);
				
//				if(fpt.count >= minSup){
					for(int j = 0 ; j < tSize ; j++){
						String item = tran.transaction.get(j);
						
						if(fpt.item.equals(item)){
							sortedTran.transaction.add(item);
	//						System.out.println(item);
							break;
						}
					}
//				}
			}
			
			//add FP-Tree
			int tempSize = sortedTran.transaction.size();
			
//			for(int j = 0 ; j < tempSize; j++){
//				System.out.print(sortedTran.transaction.get(j));
//				System.out.print("\t");
//			}
//			System.out.print("\r\n");
			fpt.addTransaction(sortedTran);
		}
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

class ValueComparator implements Comparator<String> {
    Map<String, Integer> base;

    public ValueComparator(Map<String, Integer> base) {
        this.base = base;
    }

    // Note: this comparator imposes orderings that are inconsistent with
    // equals.
    public int compare(String a, String b) {
        if (base.get(a) >= base.get(b)) {
            return -1;
        } else {
            return 1;
        } // returning 0 would merge keys
    }
}
