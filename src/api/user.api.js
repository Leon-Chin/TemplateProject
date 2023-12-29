import { request } from './request';

export const apiLogin = (data, params) => request('post', '/user/create', data, { params });



