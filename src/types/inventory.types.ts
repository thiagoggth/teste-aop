import { Inventory } from '../models/inventory';
import { Location } from '../models/location';
import { SubActive } from '../models/subActive';
import { User } from '../models/user';

export interface Report {
  name: string;
  message: string;
}

export interface ResultLogin {
  user: User;
  token: string;
}

export interface Result<T> {
  data: T;
  message: string;
  success: boolean;
  errors: Report[];
}

export type PaginateInventory = {
  results: Inventory[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type PaginateUsers = {
  results: User[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type PaginateLocation = {
  results: Location[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type PaginateSubActive = {
  data: SubActive[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type InventoryOffline = {
  id: number;
  inventory: Inventory;
  files: any[];
}
