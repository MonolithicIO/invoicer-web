export function nullIfEmpty(input: string): string | null {
  return input.trim() === "" ? null : input;
}
