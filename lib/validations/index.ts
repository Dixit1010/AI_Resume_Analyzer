export type ValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export function validatePayload(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _payload: any,
): ValidationResult {
  return { ok: true };
}

