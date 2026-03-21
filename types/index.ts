export interface ResumeContent {
  contact: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    id: string;
    company: string;
    title: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    location?: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    certifications: string[];
  };
}

export interface ATSScore {
  total: number;
  sections: {
    contact: number;
    summary: number;
    experience: number;
    skills: number;
    education: number;
    formatting: number;
  };
  parsingWarnings: string[];
  keywordScore: number;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  before: string;
  after: string;
  impact: 'high' | 'medium' | 'low';
  category: 'keywords' | 'formatting' | 'content' | 'structure';
  section?: string;
}

export interface JDMatchResult {
  matchScore: number;
  semanticScore: number;
  keywordCoverageScore: number;
  experienceLevelScore: number;
  skills: {
    criticalMissing: string[];
    beneficialMissing: string[];
    present: string[];
    overqualified: string[];
  };
  rewrites: Array<{
    section: string;
    original: string;
    rewritten: string;
    keywordsAdded: string[];
  }>;
}

