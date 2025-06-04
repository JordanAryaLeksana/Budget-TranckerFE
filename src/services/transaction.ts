import api from "@/api";
import { handleApiError } from "@/utils/handleApiError";
import getTokenHeader from "@/utils/getTokenHeader";

export const fetchTransaction = async (page = 1, limit = 10, search = "") => {
    try {
        const params = new URLSearchParams({ page: String(page), limit: String(limit)});
        if(search) params.append("search", search);

        const res = await api.get(`/transactions?${params.toString()}`, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fetchTransactionById = async (id: number) => {
    try {
        const res = await api.get(`/transactions/${id}`, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const createTransaction = async (data: Record<string, unknown>) => {
    try {
        const res = await api.post(`/transactions`, data, {
            headers: getTokenHeader(),
        });
        console.log("Transaction created:", res.data);
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const editTransaction = async (id: number, data: Record<string, unknown>) => {
    try {
        const res = await api.put(`/transactions/${id}`, data, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const deleteTransaction = async (id: number) => {
    try {
        const res = await api.delete(`/transactions/${id}`, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fetchMonthlySummary = async () => {
    try {
        const res = await api.get(`/transactions/monthly-summary`, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fetchMonthlyChart = async () => {
    try {
        const res = await api.get(`/transactions/monthly-chart`, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fetchTodayTransaction = async () => {
    try {
        const res = await api.get(`/transactions/today`, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fetchTotalExpenseStat = async () => {
    try {
        const res = await api.get(`/transactions/today-expense-stats`, {
            headers: getTokenHeader(),
        });
        return res.data
    } catch (error) {
        handleApiError(error, "Transaction Error")
    }
}