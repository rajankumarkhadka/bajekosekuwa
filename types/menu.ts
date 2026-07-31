import { ApiResponse } from './api';

export interface MenuProduct {
  readonly id: string;
  readonly name: string;
  readonly regular_price: number;
  readonly sale_price?: number | null;
  readonly is_recommended?: boolean;
  readonly dietary_preference?: string | null;
  readonly has_inventory?: boolean;
  readonly image?: string | null;
  readonly gallery?: string[];
}

export interface MenuItem {
  readonly id: string;
  readonly product_id: string;
  readonly category_id: string;
  readonly sort_order?: number;
  readonly product: MenuProduct;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MenuCategory {
  readonly id: string;
  readonly title: string;
  readonly menu_id: string;
  readonly sort_order?: number;
  readonly items: MenuItem[];
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface BranchMenuData {
  readonly id: string; // menu_id
  readonly name: string;
  readonly is_active: boolean;
  readonly branch_id: string;
  readonly categories: MenuCategory[];
  readonly created_at?: string;
  readonly updated_at?: string;
}

export type BranchMenuResponse = ApiResponse<BranchMenuData>;
