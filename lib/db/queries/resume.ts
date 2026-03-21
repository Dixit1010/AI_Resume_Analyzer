export type ResumeSummary = {
  id: string;
  title: string;
  createdAt?: string;
};

export async function listResumesByUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _userId: any,
): Promise<ResumeSummary[]> {
  // TODO: implement Prisma queries.
  return [];
}

