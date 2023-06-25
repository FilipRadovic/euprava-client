import { useQuery } from "@tanstack/react-query";
import registrationService from "../api/registration.service";

export const useRegistrations = (page = 0, size = 10) => {
    const key = `registrations?page=${page}&size=${size}`;
    const { data, isLoading, isError } = useQuery({
        queryKey: key,
        queryFn: () => {
            return registrationService.getRegistrations(page, size);
        }
    });

    return {
        page: data,
        isLoading,
        isError
    }
}