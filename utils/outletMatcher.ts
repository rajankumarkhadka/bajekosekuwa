import { VendorBranch } from '@/types';

/**
 * Converts a branch name into a clean URL-friendly slug.
 * Example: "Anamnagar, Kathmandu" -> "anamnagar"
 */
export function slugifyBranchName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Centralized utility function to match an incoming identifier (UUID, name, or slug)
 * against live server branch data fetched from `/api/v1/public/branches`.
 *
 * @param branches - Array of VendorBranch items loaded from server API
 * @param identifier - UUID, branch name, or slug to match
 * @returns Matched VendorBranch object or null if no match found
 */
export function matchBranchId(
  branches: VendorBranch[],
  identifier?: string | null
): VendorBranch | null {
  if (!branches || branches.length === 0 || !identifier) {
    return null;
  }

  const cleanIdentifier = identifier.trim().toLowerCase();

  // 1. First priority: Exact UUID match
  const uuidMatch = branches.find(
    (branch) => branch.id.toLowerCase() === cleanIdentifier
  );
  if (uuidMatch) return uuidMatch;

  // 2. Second priority: Match by branch name (case-insensitive)
  const nameMatch = branches.find(
    (branch) => branch.name.trim().toLowerCase() === cleanIdentifier
  );
  if (nameMatch) return nameMatch;

  // 3. Third priority: Match by slugified branch name
  const slugMatch = branches.find(
    (branch) => slugifyBranchName(branch.name) === cleanIdentifier
  );
  if (slugMatch) return slugMatch;

  // 4. Fourth priority: Partial substring match on branch name
  const partialMatch = branches.find(
    (branch) => branch.name.toLowerCase().includes(cleanIdentifier)
  );
  if (partialMatch) return partialMatch;

  return null;
}

/**
 * Converts a country name into a clean URL-friendly slug.
 */
export function slugifyCountryName(name?: string | null): string {
  if (!name) return 'nepal';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Constructs the canonical URL path for a given outlet and subpage.
 * Example: branch "Kuleshwor", country "Nepal", subpage "about" => "/nepal/kuleshwor/about"
 */
export function getOutletUrlPath(branch: VendorBranch | null, page: string = ''): string {
  if (!branch) {
    return page ? (page.startsWith('/') ? page : `/${page}`) : '/';
  }
  const countrySlug = slugifyCountryName(branch.country?.name);
  const branchSlug = slugifyBranchName(branch.name);
  const cleanPage = page ? (page.startsWith('/') ? page : `/${page}`) : '';
  return `/${countrySlug}/${branchSlug}${cleanPage}`;
}

