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
}

export const registrationService = new RegistrationService();

export default registrationService;