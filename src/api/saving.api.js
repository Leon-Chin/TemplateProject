import { request } from './request';

export const createSaving = (data) => request('post', '/savings/create-saving', data);
export const updateSaving = (savingID) => request('put', `/savings/update-saving/${savingID}`, data);
// data format
// {
// user_id: user_id
// category_id: category_id
// targetDate: targetDate
// goal_val: goal_val
// saving_val: saving_val
// comments: comments
// }

// /add-more-saving/{saving_id}
export const addMoreSaving = (savingID, data) => request('put', `/savings/add-more-saving/${savingID}`, data);
// format
// { saving_val: saving_val }

// /delete-saving/{saving_id}
export const deleteSaving = (savingID) => request('delete', `/savings/delete-saving/${savingID}`);

// /{saving_id}
export const getSavingByID = (savingID) => request('get', `/savings/${savingID}`);

// /get-by-user/{user_id}
export const getSavingByUserID = (userID) => request('get', `/savings/get-by-user/${userID}`);

