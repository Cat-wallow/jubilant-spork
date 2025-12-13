import api from "@/lib/api";

export async function getReferenceTypes(type?: string) {
    try {
        const response = await api.get("project/reference-types", {
            params: {
                ...(type && { type: type }),
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
