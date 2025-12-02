import { Transform } from 'class-transformer';

export function TrimString() {
  return Transform(({ value }: { value: unknown }) => {
    return typeof value === 'string' ? value.trim() : value;
  });
}

export function ToLowerCaseString() {
  return Transform(({ value }: { value: unknown }) => {
    return typeof value === 'string' ? value.toLowerCase() : value;
  });
}
