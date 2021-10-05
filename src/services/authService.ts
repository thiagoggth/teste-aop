import { User } from '../models/user';
import { Result, ResultLogin } from '../types/inventory.types';
import api from './api';

class AuthService {
  async signIn(login: User): Promise<Result<ResultLogin>> {
    const response = await api.post('/login', login);
    return response.data;
  }
}

export default new AuthService();

