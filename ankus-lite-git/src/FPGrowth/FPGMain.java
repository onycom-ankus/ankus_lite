package FPGrowth;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import CorePackage.Evaluation;
import CorePackage.Instances;
import MLP.MultilayerPerceptron;

public class FPGMain {
	private static Instances	mInstances = null;
	
	public static void main(String[] args) throws IOException {
		
		mInstances = new Instances();
		
		// 1.속성유형 설정
		LoadingFromAttributeFile("DataSets/weather_header.csv");
	
		// 2.입력데이터 불러오기
		mInstances.LoadingFromCSVFile("DataSets/weather.csv");
	
		System.out.println("===========================================");
		System.out.println("데이터 개수: "+mInstances.getNumData());
	
		
		System.out.println("선택된 클래스 속성명: "+mInstances.getClassAttributeName());
		System.out.println("선택된 클래스 속성 인덱스:  "+mInstances.getClassAttributeIndex());
		
		System.out.println("===========================================");
		
		FPGrowth fpg = new FPGrowth(mInstances, 0.1 , 0.9);
		
		
		fpg.buildTree();
	}
	
	/**
	 * 각 속성이름과 유형을 파일로부터 입력받아 attribute 객체에 세팅
	 * @param filePath		파일경로
	 * @throws IOException
	 */
	private static void LoadingFromAttributeFile(String filePath) throws IOException {
		
		BufferedReader reader = new BufferedReader(new FileReader(filePath));
		
		String s;
		String[] token;
		int index=0;
		
		while((s = reader.readLine()) != null){
			token = s.split(",");
			mInstances.addAttribute(index,token[0],token[1]);
			index++;
		}
		
		System.out.println("===========================================");
		System.out.println("속성 개수: "+mInstances.getNumAttributes("all"));
		System.out.println("기호적 속성 개수: "+mInstances.getNumAttributes("nominal"));
		System.out.println("수치적 속성 개수: "+mInstances.getNumAttributes("numeric"));
		System.out.println("속성정보 출력: \n"+mInstances.toStringAttributes());
	}
}
