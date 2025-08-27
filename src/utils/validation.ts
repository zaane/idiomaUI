export function isValidSearchQuery(query: string): boolean {
  return query.trim().length > 0 && query.trim().length <= 100;
}

export function sanitizeSearchQuery(query: string): string {
  return query.trim().replace(/[<>]/g, '');
}