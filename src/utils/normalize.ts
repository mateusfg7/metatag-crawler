export default function normalize(text?: string | null): string {
  return (text && text.trim().replace(/\s+/g, ' ')) || ''
}
