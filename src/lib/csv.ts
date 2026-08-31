export interface GcaRatingRecord {
  ratedAt: string;
  raterInitials: string;
  teacherOrPortfolioId: string;
  presence: boolean;
  usedOfficialIndicator: string; // "true" / "false" / ""
  selectedIndicatorCodes: string; // semicolon-joined
  customCompetencyText: string;
  adherence: string; // "true" / "false" / "" (blank if not reached)
  scope: string; // "true" / "false" / "" (blank if not reached)
  finalScore: number;
  scoreJustification: string;
  rationale: string;
}

export interface AspRatingRecord {
  ratedAt: string;
  raterInitials: string;
  teacherOrPortfolioId: string;
  connection: boolean;
  instructionalNecessity: string; // "true" / "false" / "" (blank if not reached)
  deep: string; // "true" / "false" / "" (blank if not reached)
  finalScore: number;
  scoreJustification: string;
  rationale: string;
}

export interface GcmRatingRecord {
  ratedAt: string;
  raterInitials: string;
  teacherOrPortfolioId: string;
  prioritizedIndicatorCodes: string; // semicolon-joined
  partialAlignment: boolean;
  alignedIndicatorCodes: string; // semicolon-joined
  fullAlignment: string; // "true" / "false" / "" (blank if not reached)
  performanceLevelsPresent: string; // "true" / "false" / "" (blank if not reached)
  sufficientDetail: string; // "true" / "false" / "" (blank if not reached)
  finalScore: number;
  scoreJustification: string;
  rationale: string;
}

export interface PaRatingRecord {
  ratedAt: string;
  raterInitials: string;
  teacherOrPortfolioId: string;
  rationaleDepth: boolean;
  rationaleDetail: boolean;
  engagementDepth: string; // "true" / "false" / "" (blank if not reached)
  engagementDetail: string;
  mechanismPresent: string;
  mechanismConnected: string;
  finalScore: number;
  scoreJustification: string;
  rationale: string;
}

export interface SwaRatingRecord {
  ratedAt: string;
  raterInitials: string;
  teacherOrPortfolioId: string;
  sampleCount: number;
  samplesJson: string; // JSON-stringified SwaSample[]
  wholeClassJson: string; // JSON-stringified SwaWholeClass
  finalScore: number;
  scoreJustification: string;
  rationale: string;
}

export interface AuthenticRatingRecord {
  ratedAt: string;
  raterInitials: string;
  teacherOrPortfolioId: string;
  practiceRatings: string; // JSON-stringified per-practice { level, notes }
  bestPractice: string;
  bestPracticeLevel: string;
  ctPracticeScores: string; // JSON-stringified { practiceKey: score } for every qualifying practice scored
  ctFinalScore: string;
  efficacyRatings: string; // JSON-stringified per-source { observed, highQuality, notes }
  efficacyConnected: string; // "true" / "false" / "" (not asked)
  efficacyScore: string;
  finalScore: number;
  rationale: string;
}

function csvEscape(value: string | number | boolean): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function recordToCsv<T extends object>(record: T): string {
  const headers = Object.keys(record) as (keyof T)[];
  const headerRow = headers.join(",");
  const valueRow = headers
    .map((h) => csvEscape(record[h] as unknown as string | number | boolean))
    .join(",");
  return `${String(headerRow)}\n${valueRow}`;
}

export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
