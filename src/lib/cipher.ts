
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
    .replace(/آ/g, 'اا') // Madd rule: Double Alif
    .replace(/[أإ]/g, 'ا')
    .replace(/ة/g, 'ت')
    .replace(/هـ/g, 'ه')
    .replace(/\s+/g, ''); // Remove spaces for indexing
}


export function calculateCipher(text: string): CalculationResult {
  const normalized = normalizeArabic(text);
  const chars = normalized.split('');
  
  // Step 1: Initial Mapping Vn = (n/10) * n
  const step1Values = chars.map((char, i) => {
    const n = i + 1;
    return {
      char,
      n,
      v1: (n / 10) * n
    };
  });

  // Step 2: Grouping
  const grouping: Record<string, number> = {};
  step1Values.forEach(item => {
    grouping[item.char] = (grouping[item.char] || 0) + item.v1;
  });

  // Step 3 & 4: Multiplication and Summation
  let grandTotal = 0;
  const steps: CipherStep[] = step1Values.map(item => {
    const v_group = grouping[item.char];
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

  // Step 5: Digital Root of the integer part
  const integerPart = Math.floor(grandTotal);
  const digitalRoot = calculateDigitalRoot(integerPart);

  return {
    steps,
    grouping,
    grandTotal,
    digitalRoot
  };
}

function calculateDigitalRoot(num: number): number {
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
