
import { normalizeArabic } from './src/lib/cipher';

const cases = [
  { input: "ؤ", expected: "وأ" },
  { input: "ئ", expected: "أأ" },
  { input: "آ", expected: "أأ" },
  { input: "ا", expected: "أ" },
  { input: "ى", expected: "أ" },
  { input: "ء", expected: "أ" },
  { input: "ة", expected: "ت" },
  { input: "ه", expected: "ه" },
  { input: "أحمد", expected: "أحمد" }, 
  { input: "إسلام", expected: "أسلام" } 
];

console.log("Verifying Normalization Rules:");
cases.forEach(c => {
  const got = normalizeArabic(c.input);
  if (got !== c.expected) {
     console.error(`FAIL: "${c.input}" -> Expected "${c.expected}", Got "${got}"`);
  } else {
     console.log(`PASS: "${c.input}" -> "${got}"`);
  }
});
