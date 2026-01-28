
export interface CipherStep {
  index: number;
  char: string;
  normalizedChar: string;
  v1: number;
  v_group: number;
  v_final: number;
}

export interface CalculationResult {
  steps: CipherStep[];
  grouping: Record<string, number>;
  grandTotal: number;
  digitalRoot: number;
}

export function normalizeArabic(text: string): string {
  return text
    .replace(/ؤ/g, 'وأ')      // ؤ = و + أ
    .replace(/ئ/g, 'أأ')      // ئ = أ + أ
    .replace(/آ/g, 'أأ')      // آ = أ + أ
    .replace(/[اإىء]/g, 'أ')  // Normalize Alephs/Hamza to أ
    .replace(/ة/g, 'ت')
    .replace(/هـ/g, 'ه')
    .replace(/\s+/g, '');     // Remove spaces for indexing
}


export function calculateCipher(text: string): CalculationResult {
  const normalized = normalizeArabic(text);
  const chars = normalized.split('');
  const L = chars.length;
  
  // Step 1: Initial Mapping Vn = (n/L) * n
  // n is 1-based index
  const step1Values = chars.map((char, i) => {
    const n = i + 1;
    return {
      char,
      n,
      v1: (n / L) * n
    };
  });

  // Step 2: Grouping (Sum of v1 for each character)
  const grouping: Record<string, number> = {};
  step1Values.forEach(item => {
    grouping[item.char] = (grouping[item.char] || 0) + item.v1;
  });

  // Step 3 & 4: Multiplication by position and Summation
  // The user describes Step 4 as substituting the character value (from grouping) multiplied by its order (n)
  let grandTotal = 0;
  const steps: CipherStep[] = step1Values.map(item => {
    const v_group = grouping[item.char];
    // Step 4: Multiply the group value by the current position
    const v_final = item.n * v_group;
    grandTotal += v_final;
    return {
      index: item.n,
      char: item.char,
      normalizedChar: item.char,
      v1: item.v1,
      v_group,
      v_final
    };
  });

  // Step 5: Special Digital Root with Decimals
  // "Note if the number has decimals they must be reduced also. e.g. 123.123 equals 6.6"
  // "Note take only first 3 decimal places"

  // Fix to 3 decimal places for consistency
  const fixedTotal = parseFloat(grandTotal.toFixed(3));
  const digitalRoot = calculateDecimalAwareRoot(fixedTotal);

  return {
    steps,
    grouping,
    grandTotal,
    digitalRoot
  };
}

function calculateDecimalAwareRoot(num: number): number {
  if (num === 0) return 0;
  
  const [intPart, decPart] = num.toString().split('.');
  
  const reducedInt = calculateSingleDigitalRoot(parseInt(intPart || '0'));
  
  if (!decPart) {
    return reducedInt;
  }

  // Handle decimal part: "take only first 3 decimal places" - already handled by toFixed(3) above effectively, 
  // but toFixed might round. User said "take only", implying truncation? 
  // "123.123" -> 0.123. 
  // Let's stick to the string we got from the number.
  // Note: toFixed(3) on 123.1234 becomes 123.123. Correct.
  
  const reducedDec = calculateSingleDigitalRoot(parseInt(decPart));
  
  return parseFloat(`${reducedInt}.${reducedDec}`);
}

function calculateSingleDigitalRoot(num: number): number {
  if (num === 0) return 0;
  let s = num.toString();
  while (s.length > 1) {
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      sum += parseInt(s[i]);
    }
    s = sum.toString();
  }
  return parseInt(s);
}
