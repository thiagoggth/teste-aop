import { stringify } from 'querystring';
import { PaginateLocation, Result } from '../types/inventory.types';
import api from './api';

class LocationService {
  async getLocations(query = '', page = 1, limit = 50): Promise<Result<PaginateLocation>> {
    const queryParams = stringify({ page, limit, query });
    const response = await api.get(`/locations?${queryParams}`);
    return response.data;
  }
}

export default new LocationService();
