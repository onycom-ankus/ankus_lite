package MLP;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Random;
import java.util.Set;

import CorePackage.Attribute;
import CorePackage.Instance;
import CorePackage.Instances;

public class MultilayerPerceptron {
	private NN mNet;
	private static DecimalFormat	mDecimalFormat = null;
	
	public HashMap<String, double[][]> inputNodesMap = new HashMap<String, double[][]>();
	
	/**
	 * Instances 클래스 반영 신규 초기화 클래스 
	 * @param inputData
	 */
	public MultilayerPerceptron(Instances inputData) {
		// TODO Auto-generated constructor stub

		this.mNet = new NN();
		
		this.mSeed = 6; //랜덤 시드
//		this.mNum_hidden = 6; //히든노드수 -> NN 클래스 신규 생성으로 인한 비사용 주석처리 
		this.mIdx = 14; //클래스 인덱스 위치
		this.mNumEpoch = 500; //반복학습횟수 
		
		this.mLearning_rate = 0.3; //학습률
		this.mMomentum = 0.2; //학습모멘텀 0에 가까울 수록 빠른속도로 학습
		
		this.mDecimalFormat = new DecimalFormat("######.##");
		
		mNet.numHiddenNodes = 6;
		
		mNet.maxTable = new HashMap<Integer, Double>();
		mNet.minTable = new HashMap<Integer, Double>();
		mNet.dataType = new HashMap<Integer, Integer>();
		mNet.m_attrMap = new HashMap<String, Integer>();
		mNet.m_ClassMap = new HashMap<Integer, String>();
		
		this.mHeader = inputData.getAttributeObjs();
		this.mData  =  convertInstancesToArray(inputData);
	}
	
	public MultilayerPerceptron() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 신경망 초기모델 생성
	 * @param numInputNodes 입력노드수
	 * @param numHiddenNodes 은닉노드수
	 * @param numOutputNodes 출력노드수
	 * @return
	 */
	public int initialze(int numInputNodes, int numHiddenNodes, int numOutputNodes){
		mNet.numInputNodes = numInputNodes;
		mNet.numOutputNodes = numOutputNodes;

		mNet.hiddenWeight = new double[numHiddenNodes][numInputNodes+1];
		mNet.outputWeight = new double[numOutputNodes][numHiddenNodes+1];
		
		
		return 1;
	}
	
	/**
	 * 신경망 모델 반환-> 이부분을 MR환경에 맞게 파일로 쓰는 부분으로 변경
	 * @return
	 */
	public ArrayList<HashMap<String, double[][]>> getStructNN(){
		ArrayList<HashMap<String, double[][]>> nnWeightModel = new ArrayList<HashMap<String, double[][]>>();
		HashMap hMap = new HashMap<String, double[][]>();
		HashMap oMap = new HashMap<String, double[][]>();
		
		hMap.put("nMet.hiddenWeight", mNet.hiddenWeight);
		oMap.put("nMet.outputWeight", mNet.outputWeight);
		nnWeightModel.add(hMap);
		nnWeightModel.add(oMap);
		
		return nnWeightModel;
	}
	
	/**
	 * 가중치를 화면에 출력
	 * -> 시각화를 위해 파일에 저장 혹은 협의 후 맞게 교체
	 */
	public void printNode(){
		for(int j = 0; j < mNet.numHiddenNodes; j++){
			for(int k = 0; k < mNet.numInputNodes; k++){
				System.out.println ("히든: "+mNet.hiddenWeight[j][k]);
			}
		}
		for(int j = 0; j < mNet.numHiddenNodes ; j++){
			
			for(int k = 0; k < mNet.numOutputNodes; k++){
				System.out.println ("출력: "+mNet.outputWeight[k][j]);
			}

		}
	}
	
	/**
	 * 
	 * @param learningRate 학습률
	 * @param numEpoch 학습횟수
	 * @param seed 초기 연결강도(가중치) 설정을 위한 랜덤시드
	 * @param numHiddenNodes 은닉층(Hidden Layer)에 생성될 노드 개수
	 * @param input 학습데이터
	 * @return 학습 결과 및 에러코드
	 * 		1: 정상 수행
	 * 		2xx: 입력값 이상
	 * 		
	 */
	public int train(double learningRate, double momentum, int numEpoch, int idx, int numTrain, int seed, double[][] input, double[][] tOutput){
		
		if(learningRate <= 0){
			//learningRate 입력값 이상
			return 201;
		}	
		if(seed <= 0){
			//seed 입력값 이상
			return 202;
		}
		if(numTrain <= 0 ){
			//numTrain 입력값 이상
			return 203;
		}

		
		//기본 신경망 모델 생성
		/**
		 * hidden: 은닉층 노드 수
		 * hiddenDelta: 입력층- 은닉층간 변화폭
		 * output: 출력층 노드 수
		 * outputDelta: 은닉층 - 출력층간 변화폭
		 */
		int cntEpoch = 0;
		
		double error = 0;
		double hidden[] = new double[mNet.numHiddenNodes];
		double hiddenDelta[] = new double[mNet.numHiddenNodes];
		
		double output[] = new double[mNet.numOutputNodes];
		double outputDelta[] = new double[mNet.numOutputNodes];
		
		double sum = 0;
		
		Random randSeed = new Random(seed);
//		randSeed.nextInt(1000);
		double rand = randSeed.nextDouble();
		
		
		//신경망 가중치 초기화
		for(int i = 0; i < mNet.numHiddenNodes ; i++){
			//numHiddenNodes + 1 1: 바이아스 노드분
			for(int j = 0; j < mNet.numInputNodes + 1; j++){
//				rand = Math.random();
				mNet.hiddenWeight[i][j] =  rand - 0.5f;
				
//				System.out.println(rand);
				//rladuddml06
//				randSeed.nextInt(1000);
//				rand = Math.abs(randSeed.nextGaussian());
//				rand = randSeed.nextGaussian();
				
				rand = randSeed.nextDouble();
			}
		}
		
		for(int i = 0; i < mNet.numOutputNodes ; i++){
			//numHiddenNodes + 1 1: 바이아스 노드분
			for(int j = 0; j < mNet.numHiddenNodes + 1; j++){
//				rand = Math.random();
				mNet.outputWeight[i][j] = rand - 0.5f;
				
//				System.out.println(rand);
				
//				randSeed.nextInt(1000);
//				rand = randSeed.nextGaussian();
				 
				rand = randSeed.nextDouble();
			}
		}
//		//초기 가중치 출력
//		printNode();
//		//모멘텀 적용을 위한 직전 기울기 저장용
		double preDelta = 0.0F;
		
		do{ //epoch 수치만큼 반복학습
			error = 0; //에러 초기화
			//신경망 가중치 조정
			//모멘텀 변수 추가
//			System.out.println(cntEpoch);
			for(int i = 0 ; i < numTrain; i++){
				//출력값 계산
				//160622 구조 수정 필요
//				System.out.println(tOutput[i][0]+" "+tOutput[i][1]+" "+tOutput[i][2]+" ");
				
				ComputeOutput(input[i], hidden, output);

				//출력미분값 계산
				for(int j = 0; j < mNet.numOutputNodes; j++){
					preDelta = outputDelta[j];
					outputDelta[j] = (output[j] - tOutput[i][j]) * (1 - output[j]) * output[j] * learningRate + momentum * preDelta;
//					outputDelta[j] = learningRate * (output[j] - tOutput[i][j]) * (1 - output[j]) * output[j] + momentum * preDelta;
					//모멘텀 적용
//					outputDelta[j] = momentum * preDelta + ( 1 - momentum ) * outputDelta[j];
				}
				//출력가중치 조정
				for(int j = 0; j < mNet.numOutputNodes; j++){
					for(int k = 0; k < mNet.numHiddenNodes; k++){
						//16.06.30이전 공식
						mNet.outputWeight[j][k] -= outputDelta[j] * hidden[k];
					}
					mNet.outputWeight[j][mNet.numHiddenNodes] -= outputDelta[j]; //bias Node
				}
				
				//은닉층 미분값 계산
				for(int j = 0; j < mNet.numHiddenNodes ; j++){
					sum = 0;
					
					for(int k = 0; k < mNet.numOutputNodes; k++){
						sum += outputDelta[k] * mNet.outputWeight[k][j];
					}
					preDelta = hiddenDelta[j];
					hiddenDelta[j] = momentum * preDelta + sum * (1 - hidden[j]) * hidden[j];
//					hiddenDelta[j] = sum * (1 - hidden[j]) * hidden[j] + momentum * preDelta;
//					hiddenDelta[j] =  momentum * preDelta + ( 1 - momentum ) * hiddenDelta[j];
				}
				
				//은닉가중치 조정
				for(int j = 0; j < mNet.numHiddenNodes; j++){
					for(int k = 0; k < mNet.numInputNodes; k++){
						mNet.hiddenWeight[j][k] -= hiddenDelta[j] * input[i][k];
					}
					mNet.hiddenWeight[j][mNet.numInputNodes] -= hiddenDelta[j]; // bias Node
				}
				
				//오차 계산
				for(int j = 0; j < mNet.numOutputNodes ; j++){
					error += 0.5 * (output[j] - tOutput[i][j]) * (output[j] - tOutput[i][j]);
				}
//				if(cntEpoch == numEpoch -1){
//					System.out.println("Traininged:\t"+tOutput[i][0]+"\tPredicted:\t"+output.length+"\t"+output[0]);
//				}
			}
			//모델 업데이트 과정 모니터링
			if(cntEpoch % 10 == 0){
				System.out.println("===> 반복횟수: "+cntEpoch+", 오차: "+error);
			}
			
		} while( cntEpoch++ < numEpoch); //최대 학습 횟수만큼 학습 
//		printNode();		
		//가중치 값 출력
//		for(int j = 0; j < numHiddenNodes; j++){
//			for(int k = 0; k < numInputNodes; k++){
//				System.out.println ("히든: "+nMet.hiddenWeight[j][k]);
//			}
//		}
//		for(int j = 0; j < numHiddenNodes ; j++){
//			
//			for(int k = 0; k < numOutputNodes; k++){
//				System.out.println ("출력: "+nMet.outputWeight[k][j]);
//			}
//
//		}
		
//		for(int i = 0 ; i < numTrain; i++){
//			System.out.println(ComputeOutput(input[i], hidden, output)[0]+"\t"+ComputeOutput(input[i], hidden, output)[1]);
//		}
		return 1;
	}
	
	/**
	 * 신경망 결과 계산
	 * @param object
	 * @param hidden
	 * @param output
	 * @param numInputNodes
	 * @param numHiddenNodes
	 * @param numOutputNodes
	 */
	private double[] ComputeOutput(double input[], double[] hidden, double[] output) {
		// TODO Auto-generated method stub
		//결과 출력 계산 함수
		double sum = 0;

		for(int i = 0; i < mNet.numHiddenNodes; i++){
			hidden[i] = 0.0f;
		}
		for(int i = 0; i < mNet.numOutputNodes; i++){
			output[i] = 0.0f;
		}
		
//		for(int j = 0; j < mNet.numInputNodes; j++){
//			System.out.print(input[j]+"\t");
//		}
//		System.out.println();
		
		for(int i = 0; i < mNet.numHiddenNodes; i++){
			sum = 0;
//			System.out.println(input.length +" "+mNet.hiddenWeight.length+" "+mNet.hiddenWeight[i].length);
			for(int j = 0; j < mNet.numInputNodes; j++){
//				System.out.println(input.length+"\t"+j);
				sum += input[j] * mNet.hiddenWeight[i][j];
			}
			sum += mNet.hiddenWeight[i][mNet.numInputNodes]; //bias 노드 
			hidden[i] = activationFS(sum);
		}
		for(int i = 0; i < mNet.numOutputNodes; i++){
			sum = 0;
			for(int j = 0; j < mNet.numHiddenNodes; j++){
				sum += hidden[j] * mNet.outputWeight[i][j];
			}
			sum += mNet.outputWeight[i][mNet.numHiddenNodes]; //bias 노드 
			output[i] = activationFS(sum);
			
//			System.out.print(output[i]+"\t");
//			System.out.print(sum+"\t");
		}
//		System.out.println();
		return output;
	}
	
	/**
	 * 신경망 결과 계산
	 * @param object
	 * @param hidden
	 * @param output
	 * @param numInputNodes
	 * @param numHiddenNodes
	 * @param numOutputNodes
	 */
	private double[] ComputeOutput(double input[]) {
		double sum = 0;
		
		//여기 수정 요함 
		double[] hidden = new double[mNet.numHiddenNodes];
		double[] output = new double[mNet.numOutputNodes];
		
//		System.out.println(mNet.numInputNodes+"\t"+mNet.numHiddenNodes+"\t"+mNet.numOutputNodes+"\t");
		for(int i = 0; i < mNet.numHiddenNodes; i++){
			sum = 0;
//			System.out.println(input.length +" "+mNet.hiddenWeight.length+" "+mNet.hiddenWeight[i].length);
			for(int j = 0; j < mNet.numInputNodes; j++){
//				System.out.println(input.length+"\t"+j);
				sum += input[j] * mNet.hiddenWeight[i][j];
			}
			sum += mNet.hiddenWeight[i][mNet.numInputNodes]; //bias 노드 
			hidden[i] = activationFS(sum);
		}
		for(int i = 0; i < mNet.numOutputNodes; i++){
			sum = 0;
			for(int j = 0; j < mNet.numHiddenNodes; j++){
				sum += hidden[j] * mNet.outputWeight[i][j];
			}
			sum += mNet.outputWeight[i][mNet.numHiddenNodes]; //bias 노드 
			output[i] = activationFS(sum);
			
//			System.out.print(output[i]+"\t");
		}
//		System.out.println();
		return output;
	}
	
	/**
	 * 출력값 테스트
	 * @param input
	 * @param output
	 */
	public void test(double input[], double output[]){
		double hidden[] = new double[mNet.numHiddenNodes];
		 
		ComputeOutput(input, hidden, output);
	}
	
	/**
	 * 시그모이드 활성함수
	 * @param val
	 */
	public double activationFS(double val){
		return 1/(1+Math.exp(-val));
	}
	
    private int mSeed; //랜덤 시드
    private int mNum_hidden; //히든노드수
    private int mIdx; //클래스 인덱스 위치
    private int mNumEpoch; //반복학습횟수 
    
    private double mLearning_rate; //학습률
    private double mMomentum; //학습모멘텀 0에 가까울 수록 빠른속도로 학습
	private int mClassIndex;
    
	/**
	 * 싱글머신 신경망 동작 테스트 함수
	 * 2016.06.29 다중 클래스를 위한 idx값 형태 판별 및 출력 노드 수 수정 모듈 구현 시작
	 * @param argv
	 */
//	static public void main(String[] argv){
//		long startTime = System.currentTimeMillis();
//
//	    int seed = 12; //랜덤 시드
//	    int num_hidden = 3; //히든노드수
//	    int idx = 14; //클래스 인덱스 위치
//	    int numEpoch = 500; //반복학습횟수 
//	    
//	    double learning_rate = 0.3; //학습률
//	    double momentum = 0.2; //학습모멘텀 0에 가까울 수록 빠른속도로 학습
//	    
//	    String path = "hour2.csv";
////	    String path = "vote.arff.csv";
//	 
////	    double input[][]         = new double[num_train][num_input];
////	    double target_output[][] = new double[num_train][num_output];
//	 
//	    MultilayerPerceptron mlp = new MultilayerPerceptron();
//	    //2016.06.28: 타겟과 트레이닝을 먼저 구분한 후 데이터 변환
//	    //이부분을 MR로 적용할때 전처리 모듈로 처리할 수 있도록 모듈 재설계
//	    
//	   
//	    ArrayList<String[]> data  =  mlp.convertInstancesToArray();
//	    
//	    double target_output[][] = mlp.getTarget(data, idx);
//	    
//	    double input[][] = mlp.convDataToInputNode(mlp.readCSVFile(path, true), idx);
//	    double train[][] = mlp.getTrain(input, idx);
//	    
////	    System.out.println(target_output[0].length);
//	    
//	    int num_input  = train[0].length;
//	    int num_output = target_output[0].length;
//	    int num_train  = input.length;
////	    
//	    mlp.initialze(num_input, num_hidden, num_output);
////	     
//	    
//	    //파일입력이 아닌 테스트를 위한 테스트 값
////	    input[0][0] = 0;    input[0][1] = 0;
////	    input[2][0] = 1;    input[2][1] = 0;
////	    input[3][0] = 1;    input[3][1] = 1;
////	 
////	    target_output[0][0] = 0;
////	    target_output[1][0] = 0;
////	    target_output[2][0] = 0;
////	    target_output[3][0] = 1;
////	 
////	    target_output[0][1] = 0;
////	    target_output[1][1] = 1;
////	    target_output[2][1] = 1;
////	    target_output[3][1] = 0;
////	    	    
//	    mlp.train(learning_rate, momentum, numEpoch, idx, num_train, seed, train, target_output);
//	    System.out.println("수행시간: "+(System.currentTimeMillis() - startTime));
//	    
//	    //결과확인을 위한 테스트 출력 구현 완료 후 테스트 쪽으로 반영
//	    
//	    FileWriter fw;
//	    BufferedWriter bw;
//	    
//	    
//	    try {
//			fw = new FileWriter("test.txt");
//			bw = new BufferedWriter(fw);
//			
//			for(int i = 0;i < num_train;i++){
//		        double[] output = new double[num_output];
//		 
////		        System.out.print("입력: ");
////		        for(int j = 0;j < num_input;j++){
////		        	System.out.print(" "+train[i][j]);
////		        }
//		        mlp.test(train[i], output);
//		 
////		        System.out.print("  출력: ");
////		        for(int j = 0;j < num_output;j++){
////		        	System.out.print(" "+ output[j]);
////		        }
//		        if(output.length == 1){
//		        	bw.append(output[0]+"\r\n");
////		        	System.out.println(output[0]);
//		        } else {
//		        	bw.append(m_ClassMap.get(mlp.getClass(output))+"\r\n");
////		        	System.out.println(m_ClassMap.get(mlp.getClass(output)));
//		        }
//		        bw.flush();
//		        fw.flush();
//		    }
//			bw.close();
//			fw.close();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
	
	/**
	 * 클래스명을 가져오는 함수. 메인 클러스터에서만 동작
	 * @param output
	 */
	public int getClass(double[] output){
		int len = output.length;
		double max = -1;
		int maxIdx = 0;
//		String retVal = new String();
		
		for(int i = 0; i < len ; i++){
			if(output[i] > max){
				max = output[i];
				maxIdx = i;
			}
		}
		return maxIdx;
	}
	
	/**
	 * 원본 데이터에서 트레이닝 데이터를 추출
	 * @param data
	 * @param idx
	 * @return
	 */
	public double[][] getTrain(double[][] data, int idx){
		int len = data.length;
		int rowLen = data[0].length;
		
		double[][] target = new double[len][rowLen];
		for(int i = 0; i < len ; i++ ){
			for( int j = 0; j < rowLen ; j++){
				if( j < idx )
					target[i][j] = data[i][j];
				else if( j == idx){
					
				} else {
					target[i][j-1] = data[i][j];
				}
			}
		}
		return target;
	}
	
	/**
	 * 원본 데이터에서 타겟을 추출
	 * 타겟 추출시 데이터 타입 자동 판별
	 * @param data
	 * @param idx
	 * @return
	 */
	public double[][] getTarget(ArrayList<String[]> data, int idx){
		int size = data.size();
//		System.out.println(size);
		//1번 라인 체크
		String[] line = data.get(0);
//		int len = line.length;
		int classId = 0;
		
		double[][] target;
		double max = Double.MAX_VALUE * -1;
		double min = Double.MAX_VALUE;
		
		String targetItem = new String();
		double tmpDouble = 0.0F;
			
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		if(isDoubleOrR(line[idx])){
//			System.out.println("실수형 데이터");
			target = new double[size][1];
			for(int i = 0; i < size ; i++ ){
				tmpDouble = Double.parseDouble(data.get(i)[idx]);

				//0~1 정규화를 위한 min max값 체크
				if(max < tmpDouble){
					max = tmpDouble;
				} else if (min > tmpDouble){
					min = tmpDouble;
				}
			}
			for(int i = 0; i < size ; i++ ){
				tmpDouble = Double.parseDouble(data.get(i)[idx]);
				if(min < 0){
					double absMin = Math.abs(min);
					target[i][0] = ((tmpDouble+absMin) - (min+absMin))/((max+absMin)-(min+absMin));
					
				} else {
					target[i][0] = (tmpDouble - min)/(max-min);
//					System.out.println("target\t"+target[i][0]);
				}
			}
		} else{
//			System.out.println("범주형 데이터");
			for(int i = 0; i < size ; i++ ){
//				System.out.println(data.get(i)[idx]);
				if(!map.containsKey(data.get(i)[idx])){
					map.put(data.get(i)[idx], classId);
					
					//메인클러스터에서만 동작하도록 수정
					mNet.m_ClassMap.put(classId, data.get(i)[idx]);
					
					classId++;
				}
			}
//			System.out.println(len);
			target = new double[size][map.size()];
			for(int i = 0; i < size ; i++ ){
				//Map에서 걸리면 해당 인덱스를 1 아니면 0
				targetItem = data.get(i)[idx];
				classId = map.get(data.get(i)[idx]);
				for(int j = 0; j < map.size(); j++){
					if( j == classId){
						target[i][j] = 1;
					} else {
						target[i][j] = 0;
					}					
				}
			}
		}
		
		mNet.classMax = max;
		mNet.classMin = min;
		
//		for(int i = 0; i < target.length; i++){
//			for(int j = 0; j < target[i].length; j++){
//				System.out.print(target[i][j]+"\t");
//			}
//			System.out.println();
//		}
		return target;
	}
	
	public void calculateMinMax(ArrayList<String[]> data, int classIdx){
		int size = data.size();
		
		//1번 라인 체크
		String[] line = data.get(0);
		int len = line.length;
		
		HashMap<Integer, Integer> doubleIdxMap = new HashMap<Integer, Integer>();
		
		int inputNodeIndexCnt = 0;
		//데이터 값이 실수이면 0, 문자열이면 1		
		
		for(int j = 0; j < len; j++){
			if(j != classIdx){
//				System.out.println(line[j]);
				if(isDoubleOrR(line[j])){
//					System.out.println(j + "\t실수형");
					mNet.dataType.put(j, 0);
					mNet.m_attrMap.put(new String().valueOf(j), inputNodeIndexCnt);
					
					inputNodeIndexCnt++;
				} else{
//					System.out.println(j + "\t범주형");
					mNet.dataType.put(j, 1);
				}
			}
		}
		
		double max[] = new double[len];
		double min[] = new double[len];
			
		for(int i = 0; i < len ; i++){
			max[i] = -1 * Double.MAX_VALUE;
			min[i] = Double.MAX_VALUE;
		}


		double tmpDouble = 0.0F;
		
		//0~1 정규화를 위한 항목별 Min, Max 값 측정
		//문자열의 경우 항목 수를 측정한 뒤 Max 값에 저장
		
		for(int i = 0; i < size ; i++){
			line = data.get(i);
			for(int j = 0; j < len; j++){
				if( j != classIdx){
					if(mNet.dataType.get(j) == 0){
						tmpDouble = Double.parseDouble(line[j]);
						if(max[j] < tmpDouble){
							max[j] = tmpDouble;
						} else if (min[j] > tmpDouble){
							min[j] = tmpDouble;
						}
					} else {
						if(!mNet.m_attrMap.containsKey(j+" "+line[j])){
							mNet.m_attrMap.put(j+" "+line[j],inputNodeIndexCnt);
							
							inputNodeIndexCnt++;
						}				
					}
				}
			}
		}
		
		for(int i = 0; i < len ; i++){
			
			mNet.maxTable.put(i, max[i]);
			mNet.minTable.put(i, min[i]);
			
		}
	}
	
	private double convertNomalizeDouble(int idx, double val){
		
		double retVal = 0.0F;
		
		if(mNet.dataType.get(idx) == 0){
			if(mNet.maxTable.get(idx) == mNet.minTable.get(idx)){
				retVal = 0;
			} else {
				double tmpDouble = val;
				retVal = 2* (tmpDouble - mNet.minTable.get(idx))/(mNet.maxTable.get(idx)-mNet.minTable.get(idx)) - 1;
			}
		} else {
			retVal = 1.0f;
		}
		
		return retVal;
	}
	
	/**
	 * 데이터 0~1 정규화
	 * @param data
	 * @return
	 */
	public double[][] convDataToInputNode(ArrayList<String[]> data, int classIdx){
		calculateMinMax(data, classIdx);
		//데이터 0~1 정규화: 데이터 타입이 0일때는 실수형변환, 1일때는 범주형 변환
		
		int size = data.size();
		double retDouble[][] = new double[size][mNet.m_attrMap.size()];
		String[] line;
		
		for(int i = 0; i < size ; i++){
			line = data.get(i);
			int len = line.length;
			
			for(int j = 0; j < len; j++){
				if( j != classIdx){
					if(mNet.dataType.get(j) == 0){
//						if(mNet.maxTable.get(j) == mNet.minTable.get(j)){
//							retDouble[i][mNet.m_attrMap.get(j+"")] = 0;
//						} else {
//							double tmpDouble = Double.parseDouble(line[j]);
//							retDouble[i][mNet.m_attrMap.get(j+"")] = 2* (tmpDouble - mNet.minTable.get(j))/(mNet.maxTable.get(j)-mNet.minTable.get(j)) - 1;
//						}
						
						retDouble[i][mNet.m_attrMap.get(j+"")] = convertNomalizeDouble(j, line[j]);
					} else {
						retDouble[i][mNet.m_attrMap.get(j+" "+line[j])] = 1.0f;
					}
				}
			}
		}
		
		//출력 테스트
		System.out.print("idx"+"\t");
		for(int i = 0; i < mNet.m_attrMap.keySet().size(); i++){
			for(int j = 0; j < mNet.m_attrMap.keySet().size(); j++){
				if(mNet.m_attrMap.get(mNet.m_attrMap.keySet().toArray()[j]) == i){
					System.out.print(mNet.m_attrMap.keySet().toArray()[j]+"\t");
					break;
				}
			}
		}
		System.out.println();
		
		for(int i = 0; i < retDouble.length ; i++){
			System.out.print(i+"\t");
			for(int j = 0; j < retDouble[i].length; j++){
				System.out.print(retDouble[i][j]+"\t");
			}
			System.out.println();
		}
		return retDouble;
	}
	
	private double convertNomalizeDouble(int idx, String val) {
		double retVal = 0.0F;
		
		if(mNet.dataType.get(idx) == 0){
			if(mNet.maxTable.get(idx) == mNet.minTable.get(idx)){
				retVal = 0;
			} else {				
				double tmpDouble = Double.parseDouble(val);
				retVal = 2* (tmpDouble - mNet.minTable.get(idx))/(mNet.maxTable.get(idx)-mNet.minTable.get(idx)) - 1;
			}
		} else {
			retVal = 1.0f;
		}
		
		return retVal;
	}

	/**
	 * 데이터가 실수형인지 범주형인지 확인 
	 * @param string
	 * @return
	 */
	private boolean isDoubleOrR(String string) {
		try
		{
//			System.out.print(string+"\t");
			Double.parseDouble(string);
//			Double.parseDouble(new String().valueOf(Integer.parseInt(string)));
			return true;
		}
		catch(NumberFormatException e)
		{
			return false;
		  //not a double
		}
	}
	
	/**
	 * CSV파일을 읽어서 double[][] 형태의 배열로 저장
	 * @param headInfo
	 * @return
	 */
	public ArrayList<String[]> readCSVFile(String path, boolean headInfo){
		FileReader fr;
		BufferedReader br;
		
		ArrayList<String[]> data = new ArrayList<String[]>();
		
		String line = new String();
		try {
			fr = new FileReader(path);
			br = new BufferedReader(fr);
			
			while((line = br.readLine())!=null){
				if(headInfo){
					line = br.readLine();
					headInfo = false;
				}
				data.add(line.split(","));
			}
			br.close();
			fr.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return data;
	}
	
	/**
	 * CSV파일을 읽어서 double[][] 형태의 배열로 저장
	 * @param headInfo
	 * @return
	 */
	public ArrayList<String[]> convertInstancesToArray(Instances instances){		
		ArrayList<String[]> data = new ArrayList<String[]>();
		
		String line = new String();

		int size = instances.getNumData();
			
		Hashtable<Integer, Attribute> header = instances.getAttributeObjs();
			
		List<Integer> subData = new ArrayList<Integer> ();
		
		Hashtable<Integer,Attribute> attributes = instances.getAttributeObjs();
		this.mClassIndex = instances.getClassAttributeIndex();
		int numClasses = attributes.get(this.mClassIndex).getNumNominalValues(); 
			
		Object[] headerIDs = attributes.keySet().toArray();

//		for(int i = 0; i < headerIDs.length; i++){
//			System.out.println(headerIDs[i]+"\t"+attributes.get(headerIDs[i]).getAttributeType());
//		}
//		
//		System.out.println("numClasses:"+numClasses);
		
		for(int i=0 ; i< instances.getNumData() ; i++){
			subData.add( instances.getInstance(i).getID());
			
			Instance instance =  instances.getInstance(i);
			
			String[] record = new String[headerIDs.length];
			for(int j = 0; j < headerIDs.length;j++){
				
				if(attributes.get(j).getAttributeType().equals("nominal")){
					System.out.print(instance.getValue(j)+"\t");
					record[j] = attributes.get(j).getNominalValue(instance.getValue(j));
				} else if(attributes.get(j).getAttributeType().equals("numeric")) {
					record[j] = new String().valueOf(instance.getValue(j));
				}
				System.out.print(record[j]+"\t");
			}
			System.out.println();
			data.add(record);
		}
		return data;
	}
	
	/**
	 * 폴드 변경 미구현 
	 * @param fold
	 */
	public void setTestFold(int fold) {
		// TODO Auto-generated method stub
		
	}
	
	private ArrayList<String[]> mData;
	
	/**
	 * 모델 학습 
	 */
	public void buildClassifier() {
		// TODO Auto-generated method stub
		long startTime = System.currentTimeMillis();
	    
	    double target_output[][] = getTarget(mData, this.mClassIndex);
	    
	    double input[][] = convDataToInputNode(mData, this.mClassIndex);
	    double train[][] = getTrain(input, this.mClassIndex);
	    
	    int num_input  = train[0].length;
	    int num_output = target_output[0].length;
	    int num_train  = input.length;

	    //HiddenNodes 사이즈 재정의 
	    initialze(num_input, mNet.numHiddenNodes, num_output);
	    	    
	    train(mLearning_rate, mMomentum, mNumEpoch, this.mClassIndex, num_train, mSeed, input, target_output);
	    System.out.println("수행시간: "+(System.currentTimeMillis() - startTime));
	}

	private Hashtable<Integer, Attribute> mHeader;
	
	public double classifer(Hashtable<Integer, Attribute> headerTable, Instance instance) {
		// TODO Auto-generated method stub
		//instance ID를 이용해서 입력데이터 라인 로드 및 테스트
		int len = mHeader.size();
		
//		String inputArray[] = new String[len-1];
		
		double input[] = new double[mNet.m_attrMap.size()];
		
		for(int i = 0; i < len-1 ; i++){
			if(mNet.dataType.get(i) == 0){			
				input[mNet.m_attrMap.get(i+"")] = convertNomalizeDouble(i, instance.getValue(i));
			} else {
//				System.out.println(i+" "+headerTable.get(i).getNominalValue(instance.getValue(i)));
				input[mNet.m_attrMap.get(i+" "+headerTable.get(i).getNominalValue(instance.getValue(i)))] = 1.0f;
			}
		}
		
//		for(int i = 0; i < input.length ; i++){
//			System.out.print(input[i]+"\t");
//		}
//		System.out.println();
//		System.out.println(input.length);
//		
		
		double output[] = ComputeOutput(input, new double[mNet.numHiddenNodes], new double[mNet.numOutputNodes]);
		double retVal = 0.0F;
		
		if(output.length > 1){
			retVal = getClass(output);
		} else {
			retVal = output[0];
		}
		
		return retVal;
	}
}
