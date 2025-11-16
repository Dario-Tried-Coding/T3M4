export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  if (Array.isArray(value)) return false;
  return true;
}

export function hasSpaces(str: string): boolean {
  return /\s/.test(str);
}
