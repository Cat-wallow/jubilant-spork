import api from "@/lib/api";

export async function getReferenceTypes(type?: string) {
    try {
        console.log(`[getReferenceTypes] Fetching type: ${type}`);
        const response = await api.get("project/reference-types", {
            params: {
                ...(type && { type: type }),
            },
        });
        console.log(`[getReferenceTypes] Response:`, response.data);
        return response.data.data;
    } catch (error) {
        console.error(`[getReferenceTypes] Error:`, error);
        throw error;
    }
}
