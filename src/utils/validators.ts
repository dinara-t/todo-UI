export function minLen(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function isPositiveInt(n: unknown): n is number {
  const v = Number(n);
  return Number.isInteger(v) && v > 0;
}
