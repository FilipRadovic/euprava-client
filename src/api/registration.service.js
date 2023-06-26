import {server} from "./axios";

export class RegistrationService {
    async getRegistrations(page = 0, size = 10) {
        const response = await server.get('registrations', {
            params: {
                page, size
            }
        });

        return response.data;
    }

    async register(data) {
        const transformedData = { ...data };
        transformedData.city_id = data.city;
        transformedData.document = {
            number: data.document_number,
            type_id: data.document_type
        }

        const response = await server.post('register', transformedData);

        if (response.data && response.data.success === false) {
            throw new Error(response.data);
        }
    }
}

export const registrationService = new RegistrationService();

export default registrationService;