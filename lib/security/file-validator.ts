export type FileValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export function validateFileUpload(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _file: any,
): FileValidationResult {
  // TODO: enforce size limits + allowed MIME types.
  return { ok: true };
}

