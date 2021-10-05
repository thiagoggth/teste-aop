import { stringify } from 'querystring';
import { PaginateSubActive, Result } from '../types/inventory.types';
import api from './api';

class SubActiveTypeService {
  async getSubActive(query = '', page = 1, limit = 50): Promise<Result<PaginateSubActive>> {
    const queryParams = stringify({ page, limit, query });
    const response = await api.get(`/active-sub-types?${queryParams}`);
    return response.data;
  }
}

export default new SubActiveTypeService();
