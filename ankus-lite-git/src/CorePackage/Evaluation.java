package CorePackage;

import java.text.DecimalFormat;
import java.util.ArrayList;
/**
 * 클래스가 Nominal 타입인 분류 문제 학습 모델 테스트를 위한 Confusion Matrix Table 생성 및 평가 Measure 측정 클래
 * @author randol
 *
 */
public class Evaluation {
	private static DecimalFormat	mDecimalFormat = null;
	
	public Evaluation(){
		mDecimalFormat = new DecimalFormat("######.##");
	}
	/**
	 * Confusion Matrix 생성 및 결과 값을 출력하는 함
	 * @param original 평가 데이터 
	 * @param predict Double형으로 이루어진(Instance 클래스 변수값을 그대로 입력) 분류 결과 값 리스트 
	 */
	public void getCMResult(Instances original, ArrayList<Double> predict){
		int classIndex = original.getClassAttributeIndex();
		
		Attribute attr = original.getAttributeObjs().get(classIndex);
		int matrixSize = attr.getNumNominalValues();
		
		int[][] matrix = new int[matrixSize][matrixSize];
		
		//matrix initialize
		//
		
		
		for(int i = 0; i < matrix.length; i++){
			for(int j = 0; j < matrix[i].length; j++){
				matrix[i][j] = 0;
			}
		}
		
		int size = original.getNumData();
		
		for(int i = 0; i < size; i++){
			double originalValue = original.getInstance(i).getValue(classIndex);
			double predictValue = predict.get(i);
			
			matrix[(int)originalValue][(int)predictValue]++;
		}
		printMatrix(attr,matrix);
		calculateAccuracy(attr, matrix);
	}
	
	/**
	 * 평가 정확도 측정 함수 
	 * @param attr Instances 헤더 정보 
	 * @param matrix Confusion Matrix 정
	 */
	
	public void calculateAccuracy(Attribute attr, int[][] matrix){
		double accuTable[][] = new double[5][matrix.length]; 
		
		double TP = 0.0;
		double FP = 0.0;
		double FN = 0.0;
		double TN = 0.0;
		
		double[][][] TFMatrix = new double[matrix.length][2][2];
		for(int idx = 0; idx < matrix.length; idx++){
			
			for(int i = 0; i < matrix.length; i++){
				for(int j = 0; j < matrix[i].length; j++){
					
					if(idx == i && i == j){
						TFMatrix[idx][0][0] = matrix[i][j];
					} else if(idx == i){
						TFMatrix[idx][0][1] += matrix[i][j];
					} else if(idx == j){
						TFMatrix[idx][1][0] += matrix[i][j];
					} else {
						TFMatrix[idx][1][1] += matrix[i][j];
					}
				}
			}
		}
		System.out.println("");
		System.out.println("=== Detailed Accuracy By Class ===");
		System.out.println("");
		System.out.println("TP Rate\tFP Rate\tPrecision\tRecall\tF-Measure\tAccuracy\tClass");
		for(int idx = 0; idx < TFMatrix.length; idx++){
			
			//https://en.wikipedia.org/wiki/Confusion_matrix 참고 
			TP = TFMatrix[idx][0][0];
			TN = TFMatrix[idx][1][1];
			FP = TFMatrix[idx][0][1];
			FN = TFMatrix[idx][1][0];
			
//			System.out.print("\t");
			//TPR True positive rate
			System.out.print(String.valueOf(mDecimalFormat.format(TP/(TP+FN))));
			System.out.print("\t");
			
			//FPR False positive rate
			System.out.print(String.valueOf(mDecimalFormat.format(FP/(FP+TN))));
			System.out.print("\t");
			
			//Precision
			System.out.print(String.valueOf(mDecimalFormat.format(TP/(TP+FP))));
			System.out.print("\t");
			
			//Recall
			System.out.print(String.valueOf(mDecimalFormat.format(TP/(TP+FN))));
			System.out.print("\t");
			
			//F-Measure
			System.out.print(String.valueOf(mDecimalFormat.format(2*TP/(2*TP+FP+FN))));
			System.out.print("\t");
			
			//Accuracy
			System.out.print(String.valueOf(mDecimalFormat.format(((TP+TN)/(TP+TN+FP+FN)))));
			System.out.print("\t");
			
			//Class
			System.out.print(attr.getNominalValue(idx));
			System.out.println();
		}
		
	}
	
	/**
	 * Confusion Matrix 출력 함수 
	 * @param attr Instances 헤더 정보 
	 * @param matrix Confusion Matrix 데이터 
	 */
	public void printMatrix(Attribute attr, int[][] matrix){
		System.out.println("");
		System.out.println("=== Confusion Matrix ===");
		System.out.println("");
		System.out.print("\t");
		for(int i = 0; i < matrix.length; i++){
			System.out.print(attr.getNominalValue(i)+"\t");
		}
		System.out.println("<-- Classified as");
		System.out.println("----------------------------");
		for(int i = 0; i < matrix.length; i++){
			System.out.print(attr.getNominalValue(i)+" |\t");
			for(int j = 0; j < matrix[i].length; j++){
				System.out.print(matrix[i][j]+"\t");
			}
			System.out.println();
		}
		System.out.println("----------------------------");
	}
}
