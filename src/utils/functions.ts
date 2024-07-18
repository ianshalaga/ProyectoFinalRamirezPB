export function generateCode(prefix: string) {
  return (
    `${prefix.toUpperCase()}-` +
    Math.random().toString(36).slice(2, 9).toUpperCase()
  );
}
