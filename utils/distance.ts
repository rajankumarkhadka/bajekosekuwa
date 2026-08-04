export function calculateDistanceKm(
  lat1: number | string | null | undefined,
  lon1: number | string | null | undefined,
  lat2: number | string | null | undefined,
  lon2: number | string | null | undefined
): number | null {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;

  const nLat1 = typeof lat1 === 'number' ? lat1 : parseFloat(String(lat1));
  const nLon1 = typeof lon1 === 'number' ? lon1 : parseFloat(String(lon1));
  const nLat2 = typeof lat2 === 'number' ? lat2 : parseFloat(String(lat2));
  const nLon2 = typeof lon2 === 'number' ? lon2 : parseFloat(String(lon2));

  if (
    isNaN(nLat1) ||
    isNaN(nLon1) ||
    isNaN(nLat2) ||
    isNaN(nLon2) ||
    (nLat1 === 0 && nLon1 === 0) ||
    (nLat2 === 0 && nLon2 === 0)
  ) {
    return null;
  }

  const R = 6371; // Earth's radius in kilometers
  const dLat = ((nLat2 - nLat1) * Math.PI) / 180;
  const dLon = ((nLon2 - nLon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((nLat1 * Math.PI) / 180) *
      Math.cos((nLat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const safeA = Math.min(1, Math.max(0, a));
  const c = 2 * Math.atan2(Math.sqrt(safeA), Math.sqrt(1 - safeA));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // 1 decimal place
}

