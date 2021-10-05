import { stringify } from 'querystring';
import { User } from '../models/user';
import { PaginateUsers, Result } from '../types/inventory.types';
import api from './api';

class UserCreateService {
  async createUser(user: User): Promise<Result<User>> {
    const response = await api.post(`/users`, user);
    return response.data;
  }

  async getUsers(query = '', page = 1, limit = 10): Promise<Result<PaginateUsers>> {
    const queryParams = stringify({ page, limit, query });
    const response = await api.get(`/users?${queryParams}`);
    return response.data;
  }

  async updateUser(id: number, user: User): Promise<Result<null>> {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  }

  async getUser(id: number): Promise<Result<User>> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  async removeUser(id: number): Promise<Result<null>> {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
}
export default new UserCreateService();
