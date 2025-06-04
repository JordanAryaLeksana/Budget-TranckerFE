import api from "@/api";
import getTokenHeader from "@/utils/getTokenHeader";
import { handleApiError } from "@/utils/handleApiError";


export const fetchAllMonthlySummaries = async () => {
    try {
        const response = await api.get("/monthly-summaries", {
            headers: getTokenHeader(),
        });
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch monthly summaries");
    }
}

export const fetchAllMonthlySummariesbyId = async (id: number) => {
    try {
        const response = await api.get(`/monthly-summaries/${id}`, {
            headers: getTokenHeader(),
        });
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch monthly summaries");
    }
}

export const createMonthlySummaries = async (data: Record<string, unknown>) => {
    try {
        const response = await api.post("/monthly-summaries", data, {
            headers: getTokenHeader(),
        });
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch monthly summaries");
    }
}

export const updateMonthlySummaries = async (id: number,data: Record<string, unknown>) => {
    try {
        const response = await api.put(`/monthly-summaries/${id}`, data, {
            headers: getTokenHeader(),
        });
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch monthly summaries");
    }
}



export const deleteMonthlySummaries = async (id: number) => {
    try {
        const response = await api.delete(`/monthly-summaries/${id}`, {
            headers: getTokenHeader(),
        });
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch monthly summaries");
    }
}
export const generateMonthlySummaries = async () => {
    try {
        const response = await api.post(`/monthly-summaries/generate`,{}, {
            headers: getTokenHeader(),
        });
        console.log("Generate Monthly Summary Response:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch monthly summaries");

    }
}
