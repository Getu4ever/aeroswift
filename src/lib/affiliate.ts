export function getAffiliateLink(params?: string): string {
  const baseUrl = "https://www.aviasales.com/";
  const marker = process.env.NEXT_PUBLIC_AVIASALES_MARKER || "730324";
  
  if (params) {
    return `${baseUrl}?marker=${marker}&${params}`;
  }
  return `${baseUrl}?marker=${marker}`;
}