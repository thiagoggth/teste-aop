import { User } from '../models/user';
import { Result, ResultLogin } from '../types/inventory.types';
import api from './api';

export async function signIn(login: User): Promise<Result<ResultLogin>> {
  const response = await api.post('/login', login);
  return response.data;
}
