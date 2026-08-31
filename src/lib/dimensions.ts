export interface DimensionColors {
  primary: string;
  secondary: string;
}

export interface DimensionTab {
  slug: string;
  label: string;
  available: boolean;
  colors?: DimensionColors; // each dimension defines its own; falls back to a neutral default if unset
}

// As each dimension gets its own rating module built, flip `available` to true
// and add a route at src/app/[slug]/page.tsx.
// Planned Rigor and Student Efficacy Development are no longer separate dimensions,
// and have also been dropped entirely from Authentic Global Competency Teaching
// Practices (per Aug 25, 2026 call) -- that dimension is pending a full rebuild.
export const DIMENSION_TABS: DimensionTab[] = [
  { slug: "gca", label: "Global Competency Alignment", available: true, colors: { primary: "#e06666", secondary: "#f4cccc" } },
  { slug: "asp", label: "Attention to Students' Perspectives", available: true, colors: { primary: "#595959", secondary: "#d9d9d9" } },
  { slug: "authentic", label: "Authentic Global Competency Teaching Practices", available: false },
  { slug: "gcm", label: "Global Competency Measurement", available: true, colors: { primary: "#4a86e8", secondary: "#dee8fa" } },
  { slug: "pa", label: "Pedagogical Analysis", available: true, colors: { primary: "#ffd966", secondary: "#fff2cc" } },
  { slug: "swa", label: "Analysis of Student Work", available: true, colors: { primary: "#a64d79", secondary: "#ead1dc" } },
];

export const DEFAULT_COLORS: DimensionColors = { primary: "#0f172a", secondary: "#e2e8f0" }; // slate fallback

export function getDimensionColors(slug: string): DimensionColors {
  const dim = DIMENSION_TABS.find((d) => d.slug === slug);
  return dim?.colors ?? DEFAULT_COLORS;
}
