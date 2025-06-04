import api from "@/api";
import { handleApiError } from "@/utils/handleApiError";
import getTokenHeader from "@/utils/getTokenHeader";

export const fetchAllCategories = async () => {
    try {
        const res = await api.get('/categories', {
            headers: getTokenHeader(),
        });
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch categories");
    }
}

export const fetchCategoryById = async (id: number) => {
    try {
        const res = await api.get(`/categories/${id}`, {
            headers: getTokenHeader(),
        });
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch category id");
    }
}

export const createCategory = async (data: {name: string; description?: string}) => {
    try {
        const res = await api.post('/categories', data, {
            headers: getTokenHeader(),
        });
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch categories");
    }
}

export const updateCategory = async (id: number, data: {name: string; description?: string}) => {
    try {
        const res = await api.put(`/categories/${id}`, data, {
            headers: getTokenHeader(),
        });
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch categories");
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const res = await api.delete(`/categories/${id}`, {
            headers: getTokenHeader(),
        });
        return res.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch categories");
    }
}