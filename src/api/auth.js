import {server} from "./axios";

class AuthService {
    async login(email, password) {
        await server.post('login', {
            email, password
        })
    }
}

export const authService = new AuthService();

export default authService;