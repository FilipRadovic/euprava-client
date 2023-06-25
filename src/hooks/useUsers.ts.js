import { useQuery } from "@tanstack/react-query";
import userService from "../api/user.service";

export const useUsers = (page = 0, size = 10) => {
    const key = `users?page=${page}&size=${size}`;
    const { data, isLoading, isError } = useQuery({
        queryKey: key,
        queryFn: () => {
            return userService.getUsers(page, size);
        }
    });

    return {
        page: data,
        isLoading,
        isError
    }
}