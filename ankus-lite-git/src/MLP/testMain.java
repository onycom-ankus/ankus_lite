package MLP;
import java.util.Random;

public class testMain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Random randSeed = new Random(1);
		double rand = Math.abs(randSeed.nextGaussian());
		System.out.println(rand);
		
		rand = Math.abs(randSeed.nextGaussian());
		System.out.println(rand);
		rand = Math.abs(randSeed.nextGaussian());
		System.out.println(rand);
		rand = Math.abs(randSeed.nextGaussian());
		System.out.println(rand);
		rand = Math.abs(randSeed.nextGaussian());
		System.out.println(rand);
		
	}

}
