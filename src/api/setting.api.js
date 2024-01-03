import { request } from './request';

export const createNewExpenseCategory = (data) => request("post", `/expense-category/create-expense-category`, data)
// format {category_name:, user_id: }
export const updateExpenseCategory = (expenseCategoryID, data) => request("put", `/expense-category/update-expense-category/${expenseCategoryID}/`, data)
// format {category_name:, user_id: }
export const deleteExpenseCategory = (expenseCategoryID) => request("delete", `/expense-category/delete-expense-category/${expenseCategoryID}/`)
export const getAllExpenseCategory = (userID) => request("get", `/expense-category/get-all-expense-category/${userID}/`)