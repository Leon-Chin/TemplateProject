import { request } from './request';

export const signUp = (params) => request('post', '/user/create', null, { params });

export const signIn = (data) => request('post', '/user/login', data);
// format
// {
//     email:
//     password:
// }



