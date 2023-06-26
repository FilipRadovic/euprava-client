import {server} from "./axios";

class DocumentService {
    async getDocumentTypes() {
        const response = await server.get('documents/types');
        return response.data;
    }
}

export const documentService = new DocumentService();

export default documentService;