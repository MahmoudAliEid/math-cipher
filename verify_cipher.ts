
import { calculateCipher } from './src/lib/cipher';

const text = "القرآن الكريم";
const result = calculateCipher(text);

console.log("Input:", text);
console.log("Grand Total:", result.grandTotal);
console.log("Digital Root:", result.digitalRoot);

// User expected: 831.153846... -> 3.2
// Previous code: 831.154 -> 3.1
