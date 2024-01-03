import { request } from './request';

export const createNewLoan = (params) => request('post', '/loans/create', params);
// format {
// dateString: dd-MM-yyyy
// amount
// loan_type
// person
// status
// reason
// user_id
// }

export const updateLoan = (params) => request('put', `/loans/update/${params.loan_id}`, params);
// format {
// loan_id
// dateString: dd-MM-yyyy
// amount
// loan_type
// person
// status
// reason
// user_id
// }

export const deleteLoan = (params) => request('delete', `/loans/delete/${params.loan_id}`);
// format {
//  loan_id: xx
// }

export const getLoanById = (id) => request('get', `/loans/get-by-id/${id}`);
export const getAllLoansByUser = (id) => request('get', `/loans/get-all-by-user/${id}`);
export const getLoanDataForYear = (userId, year) => request('get', `/loans/get-loan-data-for-year/${userId}/${year}`);
export const calculateTotalToRepay = (id) => request('get', `/loans/total-to-repay/${id}`);
export const calculateTotalToReceive = (id) => request('get', `/loans/total-to-receive/${id}`);