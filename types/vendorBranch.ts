import { ApiResponse } from './api';

/**
 * Country metadata model representing international location details.
 */
export interface Country {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly currency: string;
  readonly currency_symbol: string;
  readonly dial_code: string | null;
  readonly flag_url_4x3: string;
  readonly flag_url_1x1: string;
}

/**
 * Vendor Branch / Outlet domain model.
 */
export interface VendorBranch {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly open: boolean;
  readonly image: string | null;
  readonly description: string | null;
  readonly country: Country | null;
  readonly distance_km: number | null;
}

/**
 * Query parameters for filtering and sorting vendor branches.
 */
export interface GetVendorBranchesQueryParams {
  latitude?: number;
  longitude?: number;
  countryId?: string;
  openOnly?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
}

export type VendorBranchListResponse = ApiResponse<VendorBranch[]>;
export type VendorBranchSingleResponse = ApiResponse<VendorBranch>;
