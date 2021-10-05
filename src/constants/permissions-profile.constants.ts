import { PERMISSIONS_APP } from '../infra/permissions.enum';

export const PERMISSIONS_INVENTORY_MAKER: PERMISSIONS_APP[] = [
  PERMISSIONS_APP.CREATE_INVENTORY,
  PERMISSIONS_APP.READ_INVENTORY,  
];

export const PERMISSIONS_BACKOFFICE: PERMISSIONS_APP[] = [
  PERMISSIONS_APP.READ_INVENTORY,
  PERMISSIONS_APP.UPDATE_INVENTORY,
  PERMISSIONS_APP.IMPORT_IMAGE,
  PERMISSIONS_APP.DELETE_INVENTORY
];

export const PERMISSIONS_CLIENT: PERMISSIONS_APP[] = [PERMISSIONS_APP.READ_INVENTORY];
