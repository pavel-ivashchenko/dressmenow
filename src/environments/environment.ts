
import CONFIG from '../config';
import { Env } from '@app/shared/interfaces';

export const environment: Env = {
  production: false,
  baseURL: CONFIG.API.DEV.BASE_URL
};
