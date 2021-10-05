import FormData from 'form-data';
import { stringify } from 'querystring';
import { Inventory } from '../models/inventory';
import { PaginateInventory, Result } from '../types/inventory.types';
import convertObjectToFormData from '../utils/convertObjectFormData';
import api from './api';

class InventoryService {
  async getInventories(query = '', page = 1, limit = 10): Promise<Result<PaginateInventory>> {
    const queryParams = stringify({ page, limit, query });
    const response = await api.get(`/inventories?${queryParams}`);
    return response.data;
  }

  async getLinkToPSGITSM(itemId: number): Promise<string> {
    const response = await api.get(`/inventories/glpiitem/${itemId}`);
    return response.data.data;
  }

  async getOneInvetory(id: string): Promise<Result<Inventory>> {
    const response = await api.get(`/inventories/${id}`);
    return response.data;
  }

  async createInventory(inventory: Inventory, files: any[]): Promise<Result<Inventory>> {    
    const formDataInventory = convertObjectToFormData(new FormData(), inventory);

    if (files.length > 0) {
      for (const file of files) {
        formDataInventory.append('files', file);
      }
    }

    const response = await api({
      method: 'POST',
      url: '/inventories',
      data: formDataInventory,
      maxContentLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  async changeStatusSyncField(itemId: Number, status: boolean) {
    const response = await api.put(`/inventories/${itemId}/`, { isSyncField: status });
    return response.data;
  }

  async updateInventory(inventoryFormData: FormData, id: string): Promise<Result<Inventory>> {    
    const response = await api({
      method: 'PUT',
      url: `/inventories/${id}`,
      data: inventoryFormData,
      maxContentLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  async toggleStatus(id: number, status: string): Promise<Result<null>> {
    const response = await api.put(`/inventories/${id}/status/`, { status });
    return response.data;
  }

  async removeInventory(id: number): Promise<Result<null>> {
    const response = await api.delete(`/inventories/${id}`);
    return response.data;
  }
}

export default new InventoryService();