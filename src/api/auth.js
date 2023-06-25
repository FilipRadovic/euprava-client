import {server} from "./axios";
import {AxiosError} from "axios";

class AuthService {
    async login(email, password) {
        try {
            const response = await server.post('login', {
                email, password
            })

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const status = error.response.status;
                if (status === 401 || status === 422) throw new InvalidCredentialsError();
            }

            throw error;
        }
    }
}

export const authService = new AuthService();

export class InvalidCredentialsError extends Error {}