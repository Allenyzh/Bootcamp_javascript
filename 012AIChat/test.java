
import java.util.Scanner;

public class test {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("\\------------------------------------------------------------\\");
        System.out.println("/             Simple Tailsman-Land Access Program            /");
        System.out.println("\\------------------------------------------------------------\\");

        System.out.print("Enter a code as am integer between 0 and 999 (inclusive): ");
        int input = scanner.nextInt();

        int d3 = (input / 100) % 10;
        int d2 = (input / 10) % 10;
        int d1 = input % 10;

        System.out.printf("          The first button to press is %d%n", d3);
        System.out.printf("          The second button to press is %d%n", d2);
        System.out.printf("          The third button to press is %d%n", d1);

        System.out.println("\nAt Tailsman-Land, we must safeguard the treasure.");

        scanner.close();
    }
}
