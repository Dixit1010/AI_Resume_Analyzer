export type AnalysisSummary = {
  id: string;
  resumeId: string;
  atsScore: number;
  createdAt?: string;
};

export async function listAnalysisByResume(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _resumeId: any,
): Promise<AnalysisSummary[]> {
  // TODO: implement Prisma queries.
  return [];
}

