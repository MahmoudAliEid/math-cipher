
import { calculateCipher, normalizeArabic } from './src/lib/cipher';

const cases = [
  { text: "ثالث مثلث", expected: 367 }, 
  { text: "كريم وكريمة", expected: 5 }, 
  { text: "123.123 test", manualValue: true } // not a real test case for cipher, but maybe I can mock the internal function. 
                                              // Actually I'll just check the outputs of the above which might produce decimals now.
];

cases.forEach(c => {
  if (c.manualValue) return;
  const result = calculateCipher(c.text);
  console.log(`Input: "${c.text}"`);
  console.log(`Normalized: "${normalizeArabic(c.text)}"`);
  console.log(`Grand Total: ${result.grandTotal}`);
  console.log(`Digital Root: ${result.digitalRoot}`);
  console.log('---');
});
