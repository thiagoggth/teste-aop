import { Location } from './location';
import { User } from './user';

export type Attachment = {
  id: number;
  mimeType: string;
  extension: string;
  name: string;
  base: string;
  size: number;
  createdAt: string;
};

export interface Inventory {
  id: number;
  location?: Location;
  room?: string;
  activeType?: string;
  activeSubType?: string;
  tag?: string;
  patrimonyNumber?: string;
  serialNumber?: string;
  description?: string;
  status?: string;
  createdAt: string;
  attachments: Attachment[];
  createdBy: User;
  updatedBy?: User;
  updatedAt?: string;
  link?: string;
  isSyncField?: boolean;
}
