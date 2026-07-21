export function extractNumericId(gid: string): string {
  const match = gid.match(/MailingAddress\/(\d+)/);
  return match ? match[1] : gid;
}
