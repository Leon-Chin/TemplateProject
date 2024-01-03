import { request } from './request';

export const createNewExpenseCategory = () => request("post", `/expense-category/create-expense-category`)
export const updateExpenseCategory = (expenseCategoryID) => request("put", `/expense-category/update-expense-category/${expenseCategoryID}`)
export const deleteExpenseCategory = (expenseCategoryID) => request("delete", `/expense-category/delete-expense-category/${expenseCategoryID}`)
export const getAllExpenseCategory = () => request("get", `/expense-category/get-all_expense-category`)