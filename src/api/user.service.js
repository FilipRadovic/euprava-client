import {server} from "./axios";

export class UserService {
    async getUsers(page = 0, size = 10) {
        const response = await server.get('users', {
            params: {
                page, size
            }
        });

        return response.data;
    }
}

export const userService = new UserService();

export default userService;