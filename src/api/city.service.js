import {server} from "./axios";

class CityService {
    async getCities() {
        const response = await server.get('cities');
        return response.data;
    }
}

export const cityService = new CityService();

export default cityService;