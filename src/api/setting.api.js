import { request } from './request';

export const updateSaving = (savingID) => request('put', `/expense-category/update-saving/${savingID}`, data);