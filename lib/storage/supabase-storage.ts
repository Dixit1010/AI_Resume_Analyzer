export type UploadResult = {
  url: string;
};

export async function uploadToSupabase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _file: any,
): Promise<UploadResult> {
  // TODO: implement with supabase-js.
  return { url: "" };
}

