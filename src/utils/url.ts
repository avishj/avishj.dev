export const base = import.meta.env.BASE_URL;

export function url(path: string): string {
  return `${base}${base && !base.endsWith('/') ? '/' : ''}${path}`;
}
