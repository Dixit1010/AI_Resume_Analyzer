export type JobDescriptionSummary = {
  id: string;
  title?: string;
  company?: string;
  createdAt?: string;
};

export async function listJDByUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _userId: any,
): Promise<JobDescriptionSummary[]> {
  // TODO: implement Prisma queries.
  return [];
}

