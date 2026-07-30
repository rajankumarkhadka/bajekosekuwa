import vendorBranchService from '@/api/services/vendorBranch.service';
import { slugifyBranchName } from '@/utils/outletMatcher';

export async function generateBranchStaticParams() {
  try {
    const branches = await vendorBranchService.getBranches();
    if (branches && branches.length > 0) {
      return branches.map((b) => ({
        country: 'nepal',
        branch: slugifyBranchName(b.name),
      }));
    }
  } catch (err) {
    console.warn('generateBranchStaticParams branches API warning:', err);
  }
  return [{ country: 'nepal', branch: 'anamnagar' }];
}
